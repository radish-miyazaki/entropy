---
title: Gremlins がどうやってコードを置き換えているのかを追う
description: Go のミューテーションテストツール Gremlins が、コードを一時ディレクトリにコピーし、AST のトークンを書き換えて変異体を作る流れをソースコードで追った
tags: [blog, gremlins, go]
date: 2026-07-17
draft: false
---

## TL;DR

- [[gremlins|Gremlins]] は元のコードを書き換えず、モジュールを一時ディレクトリにコピーして、そちらを書き換える。
- 置き換えは文字列置換ではなく [[abstract-syntax-tree|AST]] で行い、書き換えた AST をコードに出力し直してからテストを実行する。

## 背景

Gremlins は [[go|Go]] の[[mutation-testing|ミューテーションテスト]]のツールである。ミューテーションテストを行うなら、どこかでコードを置き換えているはずなので、その箇所を探した。

ミューテーションテストを実行するコマンドは `gremlins unleash` である（unleash は「解き放つ」という意味で、しゃれたコマンド名である）。このコマンドの実体は `cmd/unleash.go` の `runUnleash` 関数なので、ここから追っていく。以下のコードでは、エラー処理を意図的に省略している。

## 検証

### 1. 一時ディレクトリの作成

`runUnleash` 関数では、Go モジュールを読み込み、`gremlins-` で始まる一時ディレクトリを作る。このディレクトリは終了時に削除される。

```go
mod, err := gomodule.Init(path)                          // Go モジュールでなければエラー
workDir, err := os.MkdirTemp(os.TempDir(), "gremlins-")  // ルート作業ディレクトリ
defer cleanUp(workDir)                                   // 終了時に RemoveAll
```

この関数から呼ばれる `run` 関数で、以降の処理に必要なコンポーネントを組み立てている。

### 2. テストカバレッジの取得

`run` 関数で[[code-coverage|テストカバレッジ]]を取得する。

```go
c := coverage.New(workDir, mod)
cProfile, err := c.Run()
```

`Coverage.Run` メソッドは、`go test -cover` を実行して所要時間を計り、プロファイルをパースする。

```go
_ = os.Chdir(c.mod.Root)
if err := c.downloadModules(); err != nil { ... }    // go mod download を先に実行
elapsed, err := c.executeCoverage()                  // go test -cover。所要時間を計測
profile, err := c.profile()                          // プロファイルをパース
return Result{Profile: profile, Elapsed: elapsed}, nil
```

`executeCoverage` の前に `go mod download` を実行している。コメントによると、計った実行時間を変異体のテストのタイムアウトに使うので、ダウンロードの時間が入らないように別の手順に分けている。

> Before executing the coverage, it downloads the go modules in a separate step.
> This is done to avoid that the download phase impacts the execution time which
> is later used as timeout for the mutant testing execution.

プロファイルのパースには、`golang.org/x/tools/cover` の関数を使っている。

### 3. タイムアウトの決定

`run` 関数で、2 で測った実行時間からタイムアウトを計算する。

```go
jDealer := engine.NewExecutorDealer(mod, wdDealer, cProfile.Elapsed)
```

### 4. 変異させる箇所の特定

`run` 関数で、変異体を作るエンジンを動かす。

```go
mut := engine.New(mod, codeData, jDealer)
results := mut.Run(ctx)
```

`Engine.Run` メソッドは、ディレクトリをたどり、テストでも除外対象でもない Go のファイルごとに `Engine.runOnFile` メソッドを呼ぶ。変異体はチャネルに流され、同じメソッドから呼ばれる `executeTests` で消費される。

```go
mu.mutantStream = make(chan mutator.Mutator)
go func() {
	defer close(mu.mutantStream)
	_ = fs.WalkDir(mu.fs, ".", func(path string, _ fs.DirEntry, _ error) error {
		isGoCode := filepath.Ext(path) == ".go" && !strings.HasSuffix(path, "_test.go")
		if isGoCode && !mu.codeData.Exclusion.IsFileExcluded(path) {
			mu.runOnFile(path)
		}
		return nil
	})
}()
res := mu.executeTests(ctx)
```

`Engine.runOnFile` メソッドは、ファイルをパースし、`ast.Inspect` 関数で AST をたどる。`NewTokenNode` 関数で、変異の対象になるノード（`AssignStmt`、`BinaryExpr`、`BranchStmt`、`IncDecStmt`、`UnaryExpr` の演算子や代入）だけを取り出す。

```go
set := token.NewFileSet()
file, _ := parser.ParseFile(set, fileName, src, parser.ParseComments)
ast.Inspect(file, func(node ast.Node) bool {
	n, ok := NewTokenNode(node)
	if !ok {
		return true
	}
	mu.findMutations(fileName, set, file, n)
	return true
})
```

`Engine.findMutations` 関数は、トークンに適用できる変異の種類を引き、変異体を作ってチャネルに送る。

```go
mutantTypes, ok := TokenMutantType[node.Tok()]   // このトークンに適用できる変異タイプの一覧
...
tm := NewTokenMutant(pkg, set, file, node)       // set と file を共有したまま変異体を作る
tm.SetType(mutantType)
tm.SetStatus(mu.mutationStatus(set.Position(node.TokPos)))
mu.mutantStream <- tm
```

### 5. 変異体の実行

変異体は、`executeTests` 関数の中で呼ばれる `Start` メソッドで実行される。カバーされていない変異体やスキップする変異体、dry run のときは、テストを実行せずに結果だけを流す。

```go
rootDir, err := m.wdDealer.Get(workerName) // ⑤-1 隔離。ワーカー用コピーを取得(初回のみ実コピー)
workingDir := filepath.Join(rootDir, m.module.CallingDir)
m.mutant.SetWorkdir(workingDir)

if m.mutant.Status() == mutator.NotCovered ||
	m.mutant.Status() == mutator.Skipped ||
	m.dryRun {
	m.outCh <- m.mutant // 実行せず結果だけ流す
	return
}

if err := m.mutant.Apply(); err != nil { ... }            // ⑤-2 差し替え
m.mutant.SetStatus(m.runTests(rootDir, m.mutant.Pkg()))   // ⑤-3 テスト実行と判定
if err := m.mutant.Rollback(); err != nil { ... }         // ⑤-4 復元
m.outCh <- m.mutant
```

#### 5-1. コードのコピー

`run` 関数で、コピーをキャッシュする構造体を `NewCachedDealer` で初期化する。

```go
wdDealer := workdir.NewCachedDealer(workDir, mod.Root)
defer wdDealer.Clean()
```

実際のコピーは、`Start` メソッドから呼ばれる `CachedDealer.Get` メソッドが、ワーカーごとに最初の 1 回だけ行う。たとえばワーカーが 8 つあっても、変異体が 3 つしかなければ、コピーは 3 回しか起きない。

```go
dstDir, ok := cd.fromCache(idf)
if ok {
	return dstDir, nil                                    // 同じ idf なら同じディレクトリ
}
dstDir, err := os.MkdirTemp(cd.workDir, "wd-*")
err = filepath.Walk(cd.srcDir, cd.copyTo(dstDir))       // モジュール全体をファイルコピー
cd.setCache(idf, dstDir)
```

#### 5-2. 差し替え

`TokenMutator.Apply` メソッドは、元のファイルを退避してから、共有している AST のトークンを書き換え、`printer.Fprint` でファイル全体を出力して上書きする。書き出したら、AST はすぐに元に戻す。

```go
func (m *TokenMutator) Apply() error {
	fileLock(m.Position().Filename).Lock()
	defer fileLock(m.Position().Filename).Unlock()

	filename := filepath.Join(m.workDir, m.Position().Filename)
	// (1) 元のバイト列を退避
	m.origFile, err = os.ReadFile(filename)

	m.origSnippet = extractSnippet(m.origFile, m.Position().Line, 3)

	// (2) 現在のトークンを保存
	m.actualToken = m.tokenNode.Tok()
	// (3) 共有 AST を書き換え
	m.tokenNode.SetTok(tokenMutations[m.Type()][m.tokenNode.Tok()])

	// (4) printer.Fprint で全体を再出力して上書き
	if err = m.writeMutatedFile(filename); err != nil {
		return err
	}

	// (5) AST を即座に元へ戻す
	m.tokenNode.SetTok(m.actualToken)

	return nil
}
```

#### 5-3. テストの実行と判定

`runTests` メソッドは、コピー側のディレクトリで `go test` を実行する。タイムアウトの `testExecutionTime` は 3 で計算した値である。タイムアウトすれば `TimedOut`、テストが失敗すれば終了コードに応じた状態、成功すれば変異体が生き残ったとして `Lived` になる。

```go
ctx, cancel := context.WithTimeout(context.Background(), m.testExecutionTime)
cmd := m.execContext(ctx, "go", m.getTestArgs(pkg)...)
cmd.Dir = m.mutant.Workdir()          // コピー側で実行
...
if errors.Is(ctx.Err(), context.DeadlineExceeded) {
	return mutator.TimedOut
}
var exitErr *exec.ExitError
if errors.As(err, &exitErr) {
	return getTestFailedStatus(exitErr.ExitCode())
}
return mutator.Lived
```

#### 5-4. 復元

`Rollback` メソッドで、退避しておいた元のバイト列をファイルに書き戻す。

```go
func (m *TokenMutator) Rollback() error {
	defer m.resetOrigFile()
	filename := filepath.Join(m.workDir, m.Position().Filename)
	return os.WriteFile(filename, m.origFile, 0o600)
}
```

## キーワード

- [[gremlins|Gremlins]]
- [[mutation-testing|ミューテーションテスト]]
- [[go|Go]]
- [[abstract-syntax-tree|抽象構文木]]
- [[code-coverage|コードカバレッジ]]

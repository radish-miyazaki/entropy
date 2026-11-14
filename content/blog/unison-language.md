---
title: プログラミング言語 Unison を知る
description: 純粋関数型言語 Unison の特徴、構文、コードベースをハッシュで管理する仕組みと、それを操作する ucm を調べて動かしてみた
tags: [blog, unison, 関数型プログラミング]
date: 2025-09-19
draft: false
---

## TL;DR

- [[unison|Unison]] は純粋関数型のプログラミング言語で、[[algebraic-effects|Algebraic Effects]]（Ability）で副作用を書く。
- ソースファイルを持たず、コードベースを AST のハッシュで管理する。コードの追加や Git 相当の操作は、すべて ucm（Unison Codebase Management）で行う。

## 背景

[ある動画](https://www.youtube.com/watch?v=vhIQZ0px-Lc)を見ていたら、知らない言語が 2 つ出てきた。[[roc|Roc]] と Unison である。少し調べると、Roc はほかの[[functional-programming|関数型プログラミング]]言語とそれほど違わなかった。一方、Unison はこれまでのプログラミング言語や開発スタイルを[[unlearn|アンラーン]]する必要があるくらい、根本から違っていた。そこで、とりあえず学んでみることにした。

## 検証

### 言語の特徴

Unison は純粋関数型のプログラミング言語で、[[haskell|Haskell]] や [[python|Python]] のようにインデントでブロックを表す構文を持つ。

```unison
double : Nat -> Nat
double x =
  x * 2
```

```unison
use List ++ +: :+
[0, 1, 2, 3] ++ [4, 5]
head = 1 +: [2, 3, 4]
head :+ 5
```

[[type-class|型クラス]]や[[monad|モナド]]の概念はない。代わりに Algebraic Effects を採用していて、Unison ではこれを Ability と呼ぶ。副作用も Ability で書く。Algebraic Effects は、[[ocaml|OCaml]]、Eff、Koka などの言語でも採用されている。

評価戦略は基本的に正格評価だが、[[lazy-evaluation|遅延評価]]もできる。型の前の `'` が遅延評価を表し、`do` はそれ以降を遅延して計算するキーワードである。

```unison
helloWorld : '{IO, Exception} ()
helloWorld = do printLine "Hello World"
```

[[elixir|Elixir]] のようなパイプ演算子（`|>`）もある。

```unison
Nat.range 0 10
  |> List.map (x -> x Nat.* 100)
  |> List.filter (const true)
  |> List.foldLeft (Nat.+) 0
```

```unison
Optional.filter Nat.isEven <| Some 5
```

純粋関数型なので、依存している実装が変わっていない限り、テストの結果がキャッシュされる。テストのキャッシュは [[go|Go]] などでも採用されている。テスティングフレームワークも言語に含まれていて、[[property-based-testing|プロパティベーステスト]]も書ける。標準ライブラリ（`lib/base`）の機能は豊富で、[@unison/http](https://share.unison-lang.org/@unison/http) のような公式のライブラリも多い。

### コードベースをハッシュで管理する

Unison は、コードベース（AST）をハッシュで管理する。たとえば次の `increment` 関数は、

```unison
increment : Nat -> Nat
increment x = x + 1
```

次のような形で管理される。

```unison
increment = (#arg1 -> #a8s6df921a8 #arg1 1)
```

ソースファイルは存在しないので、コードベースを自分で直接管理することはできない。一時的なバッファである `.u` ファイルにコードを書き、ucm を使ってコードベースに追加する。コードの管理はすべて ucm を介して行い、Git や GitHub の代わりも ucm が担う。この仕組みによって、変更管理、依存関係の解決、分散実行が容易になり、最低限の[[incremental-build|インクリメンタルビルド]]もできる。詳しくは [The big technical idea](https://www.unison-lang.org/docs/the-big-idea/) にある。

### サンプルコード

パターンマッチは `match ... with` で書く。`cases` はその糖衣構文である。

```unison
isEven num = match num with
  n | mod n 2 === 0 -> "even"
  _ -> "odd"

isEven = cases
  n | mod n 2 === 0 -> "even"
  _ -> "odd"
```

```unison
match Some 12 with
  Optional.None -> "none"
  -- ガードパターン
  Some n| Nat.isEven n  -> "n is a variable and | is a pattern guard"
  -- as パターン
  opt@(Some n) -> "opt binds to the entire optional value"
```

型宣言では、直和型と直積型（[[algebraic-data-type|代数的データ型]]）を書ける。

```unison
type LivingThings
  = Animal | Plant | Fungi | Protists | Monera

type Pet = {
  age : Nat,
  species : Text,
  foodPreferences : [Text]
}
```

例外も Ability で扱う。

```unison
nonZero : Nat ->{Exception} Nat
nonZero =
  use Nat ==
  cases
    n
      | n == 0 -> Exception.raise (Generic.failure "Zero was found" n)
      | otherwise -> n

catch do nonZero 0
```

副作用のある処理の例を示す。

```unison
getRandomElem : [a] ->{Abort, Random} a
getRandomElem list =
  use unison_base_4_8_0.abilities.Random natIn
  randomIndex = natIn 0 (List.size list)
  List.at! randomIndex list

toOptional! do splitmix 42 do getRandomElem [1, 2, 3]
```

`toOptional!` と `splitmix` が、Ability を処理するハンドラである。`toOptional! : '{g Abort} a -> {g} Optional a` は、Abort を `Optional` に変換する。`splitmix : Nat ->'{g, Random} t -> {g} t` は、受け取ったシードをもとに乱数を生成する。

Ability は次のように定義する。`structural` は構造的型付けで型を定義するキーワードで、通常は名前的型付けになる。

```unison
structural ability Abort where
  abort : {Abort} a

structural ability Exception where
  raise : Failure ->{Exception} x
```

HTTP クライアント（[@unison/http](https://share.unison-lang.org/@unison/http)）を使う例である。

```unison
exampleGet : '{IO, Exception, Threads} HttpResponse
exampleGet _ =
  use unison_base_4_8_0.IO.net.URI parse
  uri = parse "https://share.unison-lang.org/@unison/httpclient"
  req = do Http.get uri
  Http.run req

printResponse : '{IO, Exception} ()
printResponse =
  use unison_base_4_8_0.abilities Random.run
  use systemfw_concurrent_7_2_1 Threads.run
  do
    Random.run do
      Threads.run do
        response = exampleGet ()
        printLine (bodyText response)
```

### ucm

ucm は、Git 相当の操作、依存関係のインストール、コード検索など、あらゆる操作を行う対話型の CLI である。Git と Lisp の REPL を合わせたものをイメージするとよい。[[github|GitHub]] に相当するサービスとして [Unison Share](https://share.unison-lang.org/) があり、Unison Share への push なども ucm で行う。`ucm` を実行すると立ち上がる。

主なコマンドは次のとおり。

- `help`: ucm のコマンド一覧
- `auth.login`: ucm と Unison Share のアカウントを連携する
- プロジェクト
  - `projects` / `project.list`: プロジェクトの一覧
  - `project.create` / `project.delete`: プロジェクトの作成と削除
  - `switch`: プロジェクトの切り替え
  - `lib.install`: サードパーティのライブラリのインストール
  - `ls`: 名前空間の一覧
- コードベース
  - `view`: 指定した名前の定義を表示する。[Unison Desktop](https://www.unison-lang.org/docs/tooling/ucm-desktop/) を使えば GUI でも見られる
  - `add` / `update`: 一時バッファのコードをすべてコードベースに反映する。`---` より下の行は無視される
  - `delete`: 指定した定義を削除する
  - `edit`: 指定した名前の定義を、編集のために一時バッファにコピーする
  - `reflog`: 現在のブランチの変更履歴を表示する
  - `find`: コードベースで定義されている型や関数を検索する
  - `docs`: コードのドキュメントを見る
- ブランチ
  - `branches` / `branch.list`: ブランチの一覧
  - `merge`: ブランチのマージ
- 実行
  - `run`: 指定した `{IO, Exception} ()` の関数を実行する
  - `compile`: 指定した `'{IO, Exception} ()` の関数をコンパイルし、実行ファイル（`.uc`）を生成する。生成したファイルは `ucm run.compiled` で実行できる
- テスト
  - `test`: テストを実行する

### デプロイと教材

[Unison Cloud](https://www.unison.cloud/) を使うと、`ucm` から直接デプロイできるようである（[HTTP hello world](https://www.unison.cloud/learn/http-hello-world/)、未調査）。[Docker イメージ](https://www.unison-lang.org/docs/usage-topics/docker/)も提供されていて、`compile` で生成した実行ファイルを `ucm run.compiled` で実行できるので、[[aws|AWS]] などの一般的な PaaS でも動かせると思う。

学ぶ教材としては、公式のチュートリアルと [Exercism](https://exercism.org/tracks/unison/) がある。Web アプリケーションを作りたいなら、[Unison Cloud のチュートリアル](https://www.unison.cloud/learn/)がある。開発の進め方は、公式ドキュメントの [Project workflows](https://www.unison-lang.org/docs/tooling/project-workflows/) が参考になる。`update` した実装は、デスクトップアプリで確かめられる。

## 考察

新しいプログラミング言語の可能性を見られた。一方で、AI に書かせると Haskell のコードを補完しがちだった。`ucm` の操作をツールとして AI に認識させればうまくいくかもしれない。有志が [[model-context-protocol|MCP]] サーバ（[mizchi/unison-mcp](https://github.com/mizchi/unison-mcp)）を開発している。

インタフェースが AI エージェントで、内部では Unison のようにコードベースを管理する言語というのは面白そうである。ハッシュで管理するのが最善の解決策なのかは分からない。

## キーワード

- [[unison|Unison]]
- [[roc|Roc]]
- [[functional-programming|関数型プログラミング]]
- [[algebraic-effects|Algebraic Effects]]
- [[type-class|型クラス]]
- [[monad|モナド]]
- [[lazy-evaluation|遅延評価]]
- [[algebraic-data-type|代数的データ型]]
- [[property-based-testing|プロパティベーステスト]]
- [[incremental-build|インクリメンタルビルド]]
- [[unlearn|アンラーン]]

## 参考

- [Unison](https://www.unison-lang.org/)
- [The big technical idea - Unison](https://www.unison-lang.org/docs/the-big-idea/)
- [Quickstart - Unison](https://www.unison-lang.org/docs/quickstart/)
- [A tour of Unison](https://www.unison-lang.org/docs/tour/)
- [Unison at a glance](https://www.unison-lang.org/docs/at-a-glance/)
- [Wordle lab - Unison](https://www.unison-lang.org/docs/labs/wordle/docs/intro/)
- [Unison - Wikibooks](https://ja.wikibooks.org/wiki/Unison)
- https://zenn.dev/mizchi/articles/think-next-language-with-unison

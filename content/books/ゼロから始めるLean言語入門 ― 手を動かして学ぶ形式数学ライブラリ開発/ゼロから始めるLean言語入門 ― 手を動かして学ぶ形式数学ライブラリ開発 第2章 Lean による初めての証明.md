---
title: ゼロから始めるLean言語入門 ― 手を動かして学ぶ形式数学ライブラリ開発 › Leanによる初めての証明
description: elan と lake でプロジェクトを作り、ペアノの公理にもとづく自然数を定義して 1 + 1 = 2 を証明する章
tags: [book-chapter, lean]
date: 2026-02-23
book: "[[ゼロから始めるLean言語入門 ― 手を動かして学ぶ形式数学ライブラリ開発]]"
chapter: 2
---

## TL;DR

- elan と Lake で Lean のプロジェクトを作る。
- ペアノの公理にもとづいて自然数を帰納型で定義し、`rfl` タクティクで $1 + 1 = 2$ を証明する。

## 内容

### ツールとプロジェクトの作成

elan は Lean のバージョン管理ツールで、Lake はパッケージマネージャ兼ビルドツールである。プロジェクトは `lake new` で作る。

```sh
lake new LeanBook lib.lean
```

`lib` はライブラリだけで実行ファイルを持たないテンプレートを使う指定で、`.lean` は設定ファイルの形式を `.lean` にする指定である（`.toml` も選べる）。作られるディレクトリの構成は次のとおり。

```text
.
├── .github
│   └── workflows
│       └── lean_action_ci.yml
├── .gitignore
├── lake-manifest.json
├── lakefile.lean  # プロジェクトの設定ファイル。依存関係やビルド対象、ビルド時のオプションなどを書く
├── lean-toolchain # Lean のバージョン情報を書く
├── LeanBook
│   └── Basic.lean
├── LeanBook.lean
└── README.md
```

Lean のファイル名は `UpperCamelCase` にする。`import` で他のファイルを参照するときは、パスの区切りに `.` を使う。たとえば `LeanBook/Foo.lean` は `import LeanBook.Foo` で読み込む。

`.lean` ファイルをビルド対象にするには、`lakefile.lean` に登録する必要がある。

```lean
@[default_target]
lean_lib «LeanBook» where
  globs := #[.submodules `LeanBook]
```

### Unicode 文字の入力

VS Code の拡張機能では、`\` と ASCII 文字の組み合わせで Unicode 文字を入力できる。たとえば `∃` は `\exists`、`∀` は `\forall`、`⊢` は `\goal` で入力する。コマンドパレットで `Lean4 Docs: Show Unicode Input Abbreviations` を選ぶと一覧を確認できる。

### 自然数の定義

この章の目標は $1 + 1 = 2$ の証明である。Lean の標準ライブラリでは、自然数はペアノの公理にもとづいて定義されている。ペアノの公理は次のとおり。

- $0$ は自然数である
- 後者関数と呼ばれる、自然数から自然数への関数 $\mathrm{succ}$ がある。つまり、$n$ が自然数ならば $\mathrm{succ}(n)$ も自然数である
- $\mathrm{succ}$ は単射である。つまり、$\mathrm{succ}(n) = \mathrm{succ}(m)$ ならば $m = n$ である
- $0$ と $\mathrm{succ}$ の像は交わらない
- 帰納法が成り立つ。自然数上の任意の述語 $P$ について、$P(0)$ が成り立ち、かつ $\forall n, P(n) \Rightarrow P(\mathrm{succ}(n))$ が成り立つならば、すべての自然数 $n$ について $P(n)$ が成り立つ

この自然数を Lean で再現するには `inductive` コマンドを使う。`inductive` で定義したデータ型を帰納型と呼び、帰納型の項を作るものをコンストラクタと呼ぶ。

```lean
inductive MyNat where
  | zero
  | succ (n : MyNat)
```

1 と 2 は次のように定義する。`MyNat.succ` が受け取るのは `MyNat` 型なので、`.zero` のようにプレフィクスを省略できる。

```lean
def MyNat.one := MyNat.succ .zero
def MyNat.two := MyNat.succ .one
```

### 足し算の定義

足し算は、「0 を足しても何も変わらない」「$\mathrm{succ}(n)$ を足したものは、$n$ を足してから $\mathrm{succ}$ を適用したものに等しい」という 2 つの性質で定義する。

```lean
def MyNat.add (m n : MyNat) : MyNat :=
  match n with
  | .zero => m
  | .succ n => succ (add m n)
```

### 1 + 1 = 2 の証明

$1 + 1 = 2$ を `MyNat` で表して型を確かめると、`Prop` になる。`Prop` は Lean で命題を表す型である。

```lean
#check MyNat.add .one .one = .two
```

`#reduce` コマンドで両辺の式を簡約すると、どちらも同じ結果になる。`pp.fieldNotation.generalized` は、`#reduce` や `#check` の結果をフィールド記法で表示するかを切り替えるオプションである。

```lean
set_option pp.fieldNotation.generalized false

-- MyNat.succ (MyNat.succ MyNat.zero)
#reduce MyNat.add .one .one
-- MyNat.succ (MyNat.succ MyNat.zero)
#reduce MyNat.two
```

実際の証明には `example` コマンドを使う。

```lean
example : MyNat.add .one .one = .two := by
  rfl
```

`example` は、命題に名前を付けずに証明するコマンドで、後で参照しない結果の証明に使う。後で参照するなら `theorem` コマンドを使う。`rfl` タクティクは反射律（`a = a`）を使って証明する。両辺が定義上等しければ証明できる。

証明の過程は IDE で確認できる。`rfl` の先頭にカーソルを置くと `⊢ MyNat.add MyNat.one MyNat.one = MyNat.two` と表示される。`⊢` はゴール、つまり証明のその時点で示すべき命題（構成すべき項の型）を表す記号である。`rfl` の末尾にカーソルを置くと、示すべきものがなくなったことを表す「No goals」が表示される。

## キーワード

- [[lean|Lean]]
- elan
- Lake
- ペアノの公理
- 帰納型
- [[tactic|タクティク]]
- [[visual-studio-code|Visual Studio Code]]

## 自分の理解

Unicode 文字は、これまで「数学」と打って変換して入力していた。

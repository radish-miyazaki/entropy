---
title: ゼロから始めるLean言語入門 ― 手を動かして学ぶ形式数学ライブラリ開発 第1章 ゼロから始めるLean言語入門
description: Lean はプログラミング言語であり定理証明支援系でもあり、依存型やタクティクを持つことを、プログラムの例とともに紹介する章
tags: [book-chapter, lean]
date: 2026-02-23
book: "[[ゼロから始めるLean言語入門 ― 手を動かして学ぶ形式数学ライブラリ開発]]"
chapter: 1
---

## TL;DR

- [[lean|Lean]] はプログラミング言語であると同時に定理証明支援系でもあり、[[dependent-type|依存型]]や[[tactic|タクティク]]による証明の自動化を備えている。
- 言語としては静的型付けの純粋な関数型言語で、do 記法、マクロ、フィールド記法などを使って普通のプログラムも書ける。

## 内容

### Lean の特徴

Lean は、プログラミング言語と定理証明支援系を兼ねている。言語としては、静的型付けの純粋な[[functional-programming|関数型]]言語である。

型システムには[[dependent-type|依存型]]がある。依存型を使うと、`f a` の型が項 `a` によって変わることを表せる。

証明は[[tactic|タクティク]]（tactic）で自動化できる。タクティクとは、定理の証明に必要な操作をプログラムとして対話的に書くための機能である。Lean 固有の機能ではなく、Rocq（旧称 Coq）なども持っている。たとえば、数学の証明によく出てくる「これ以上簡単にできなくなるまで式を簡単にする」操作は `simp_all` で書ける。サードパーティ製のタクティクも使える。Mathlib には、線型方程式系を解く `linarith` や、可換環（半環）の等式を示す `ring` がある。

証明は IDE の上で対話的に進める。[[visual-studio-code|Visual Studio Code]] には [Lean 4 の拡張機能](https://marketplace.cursorapi.com/items/?itemName=leanprover.lean4)がある。`#eval` と書くと、その場で関数が実行されて結果がエディタに表示される。「いま何を証明しているのか」もすべて表示されるので、覚えておく必要はない。

### コメント

Lean のコメントには 3 種類ある。

- `/--` 〜 `-/`: ドキュメントコメント。コードに説明を付ける。VS Code ではマウスオーバーでポップアップ表示される
- `/-` 〜 `-/`: ブロックコメント
- `--`: 行コメント

### 言語としての Lean

言語の仕様は [Lean Language Reference](https://lean-lang.org/doc/reference/latest/) にある。例として、エラトステネスの篩を Lean で書くと次のようになる。

```lean
def eratosthenesAux (n : Nat) : Array Bool := Id.run do
  let mut isPrime := Array.replicate (n + 1) true

  isPrime := isPrime.set! 0 false
  isPrime := isPrime.set! 1 false

  for p in [2 : n + 1] do
    if not isPrime[p]! then
      continue

    if p ^ 2 > n then
      break

    let mut q := p * p
    while q <= n do
      isPrime := isPrime.set! q false
      q := q + p

  return isPrime

def eratosthenes (n : Nat) : Array Nat :=
  eratosthenesAux n
    |>.zipIdx
    |>.filterMap fun (isPrime, i) =>
      if isPrime then some i else none
```

`def` は関数を定義するコマンドである。`Id.run do` で do 記法が使えるようになる。`Id` は副作用のない恒等[[monad|モナド]]である。`let` で変数を宣言し、`mut` を付けるとミュータブルになる。代入には `:=` を使う。`Array.set!` は配列の要素を更新し、`[]!` は要素を取り出す。どちらもインデックスが範囲外なら panic する。`|>` はパイプライン演算子で、`x |>.f` は `f x` と同じ意味である。

### マクロ

Lean はマクロも提供している（第5章で詳しく扱う）。たとえば、リスト内包表記を次のように定義できる。`declare_syntax_cat` と `syntax` で新しい構文を定義し、`macro_rules` で展開先を定義する。

```lean
declare_syntax_cat compClause

syntax "for " term " in " term : compClause
syntax "if " term : compClause
syntax "[" term " | " compClause,* "]" : term

macro_rules
  | `([$t |]) => `([$t])
  | `([$t | for $x in $xs]) => `(List.map (fun $x => $t) $xs)
  | `([$t | if $x]) => `(if $x then [$t] else [])
  | `([$t | $c, $cs,*]) => `(List.flatten [[$t | $cs,*] | $c])
```

### フィールド記法

フィールド記法を使うと、関数の適用をオブジェクト指向言語のフィールドアクセスのような書き方で表せる。

```lean
structure Point (α : Type) where
  x : α
  y : α
```

```lean
let p : Point Nat := ⟨1, 2⟩
p.x + p.y
```

## キーワード

- [[lean|Lean]]
- 定理証明支援系
- [[dependent-type|依存型]]
- [[tactic|タクティク]]
- Mathlib
- Rocq
- [[functional-programming|関数型プログラミング]]
- [[monad|モナド]]
- [[visual-studio-code|Visual Studio Code]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

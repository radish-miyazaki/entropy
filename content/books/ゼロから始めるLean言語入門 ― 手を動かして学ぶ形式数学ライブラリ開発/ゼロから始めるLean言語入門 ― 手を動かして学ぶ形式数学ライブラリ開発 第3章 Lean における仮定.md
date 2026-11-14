---
title: ゼロから始めるLean言語入門 ― 手を動かして学ぶ形式数学ライブラリ開発 第3章 Lean における仮定
description: Lean では example の引数に仮定を書き、exact や assumption タクティクで仮定を使って証明する
tags: [book-chapter, lean]
date: 2026-02-23
book: "[[ゼロから始めるLean言語入門 ― 手を動かして学ぶ形式数学ライブラリ開発]]"
chapter: 3
---

## TL;DR

- Lean では、`example` の引数に仮定を書く。
- 仮定がそのままゴールの証明になるときは、`exact` か `assumption` タクティクで証明する。

## 内容

証明すべき命題を $P$ とする（つまりゴールは $\vdash P$）。$P$ が成り立つことを仮定してよいなら、この命題はその仮定を使えば証明できる。Lean では次のように書く。

```lean
example (P : Prop) (h : P) : P := by
  exact h
```

`example` の直後の `( )` は引数と呼ばれ、ここで仮定を定義する。`(P : Prop)` は「$P$ は命題である」、`(h : P)` は「`h` は $P$ の証明である」という意味である。`exact` タクティクは、指定した項がゴールの証明そのものであることを表す。

`assumption` タクティクを使うと、もっと簡潔に書ける。`assumption` は、今ある仮定からゴールに合うものを自動で探して適用する。

```lean
example (P : Prop) (h : P) : P := by
  assumption
```

## キーワード

- [[lean|Lean]]
- [[tactic|タクティク]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

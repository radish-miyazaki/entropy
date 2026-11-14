---
title: ゼロから始めるLean言語入門 ― 手を動かして学ぶ形式数学ライブラリ開発 第3章 Lean における同値性
description: Lean では同値を ↔ で表し、constructor で 2 つの含意に分け、rw で同値な命題に書き換える
tags: [book-chapter, lean]
date: 2026-02-23
book: "[[ゼロから始めるLean言語入門 ― 手を動かして学ぶ形式数学ライブラリ開発]]"
chapter: 3
---

## TL;DR

- 命題 $P$ と $Q$ が同値であるとは、$P \to Q$ と $Q \to P$ がともに成り立つことで、Lean では `↔` で表す。
- 同値を示すときは `constructor` で 2 つのゴールに分け、仮定にある同値は `rw` で書き換えに使う。

## 内容

### 同値の表し方

命題 $P$ と $Q$ が同値であるとは、$P \to Q$ と $Q \to P$ がともに成り立つことを指す。Lean では同値を `↔` で表す。なお、Lean では同値な命題を基本的に区別しない。これを[[propositional-extensionality|命題外延性]]と呼ぶ。

### constructor タクティク

ゴールが $P \iff Q$ のときは、$\vdash P \to Q$ と $\vdash Q \to P$ の 2 つのゴールを示せばよい。このためのタクティクが `constructor` である。`·` は、ゴールが複数あるときに、それぞれのゴールの証明を見やすく分けるための記法である。

```lean
example (P Q : Prop) (h1 : P → Q) (h2 : Q → P) : P ↔ Q := by
  constructor
  · apply h1
  · apply h2
```

### タクティク結合子 `<;>`

`constructor` を使うと、続けて `intro` を使うことが多い。

```lean
example (P Q : Prop) (hq : Q) : (Q → P) ↔ P := by
  constructor
  -- (Q → P) → P を証明する
  case mp =>
    intro h
    exact h hq

  -- P → Q → P を証明する
  case mpr =>
    intro hp hq
    exact hp
```

このような場合は、タクティク結合子 `<;>` を使うと記述量を減らせる。`<;>` は、直前のタクティクで生まれたすべてのゴールに、後ろのタクティクを適用する。

```lean
example (P Q : Prop) (hq : Q) : (Q → P) ↔ P := by
  constructor <;> intro h
  case mp =>
    exact h hq

  case mpr =>
    intro hq
    exact h
```

### rw タクティク

仮定に同値が含まれるときは、`rw` を使って同値なものに書き換えられる。たとえば `h : P ↔ Q` が仮定にあれば、`rw [h]` で $P$ を $Q$ に書き換えられる。

```lean
example (P Q : Prop) (h : P ↔ Q) (hq : Q) : P := by
  -- P ↔ Q が仮定にあるので、P の代わりに Q を示す
  rw [h]
  exact hq
```

逆に $Q$ を $P$ に書き換えるときは、`←` を付けて `rw [← h]` と書く。

```lean
example (P Q : Prop) (h : P ↔ Q) (hp : P) : Q := by
  rw [← h]
  exact hp
```

## キーワード

- [[lean|Lean]]
- [[tactic|タクティク]]
- [[propositional-extensionality|命題外延性]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

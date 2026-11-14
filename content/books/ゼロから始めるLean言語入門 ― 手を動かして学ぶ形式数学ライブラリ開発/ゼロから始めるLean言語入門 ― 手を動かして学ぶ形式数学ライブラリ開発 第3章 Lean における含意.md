---
title: ゼロから始めるLean言語入門 ― 手を動かして学ぶ形式数学ライブラリ開発 第3章 Lean における含意
description: Lean では含意を → で表し、apply タクティクで含意を使い、intro タクティクで含意を示す
tags: [book-chapter, lean]
date: 2026-02-23
book: "[[ゼロから始めるLean言語入門 ― 手を動かして学ぶ形式数学ライブラリ開発]]"
chapter: 3
---

## TL;DR

- Lean では含意を `→` で表す。`→` は右結合である。
- 含意を使うときは `apply`、含意を示すときは `intro` タクティクを使う。

## 内容

### 含意の表し方

含意は、命題 $P$ と $Q$ に「$P$ ならば $Q$ が成り立つ」という命題を対応させる関数である。Lean では `→` で表す。`→` は右結合なので、`P → Q → R` は `P → (Q → R)` と解釈される。

```lean
example (P Q R : Prop) : (P → Q → R) = (P → (Q → R)) := by
  rfl
```

### apply タクティク

数学では、$P \to Q$ が成り立つと分かっていて、示したいことが $Q$ のとき、「よって $P$ を示せばよい」と推論する。Lean ではこの推論に `apply` を使う。

たとえば `h : P → Q` があり、ゴールが `⊢ Q` のとき、`apply h` を実行するとゴールが `⊢ P` に変わる。さらに `hp : P` があれば、`apply hp` でゴールを閉じられる。

```lean
example (P Q : Prop) (h : P → Q) (hp : P) : Q := by
  apply h
  apply hp
```

ただし、この場合は `exact` を使ったほうが証明が読みやすくなる。

```lean
example (P Q : Prop) (h : P → Q) (hp : P) : Q := by
  exact h hp
```

### intro タクティク

数学では、$P \to Q$ を示したいとき、「$P$ を仮定して $Q$ を証明する」方法をよく取る。Lean ではこれに `intro` を使う。

```lean
example (P Q : Prop) (hq : Q) : P → Q := by
  intro hp
  exact hq
```

## キーワード

- [[lean|Lean]]
- [[tactic|タクティク]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

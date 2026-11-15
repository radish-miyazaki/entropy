---
title: ゼロから始めるLean言語入門 ― 手を動かして学ぶ形式数学ライブラリ開発 › Lean における論理積 / 論理和
description: 論理積は constructor や ⟨⟩ で示して .left と .right で取り出し、論理和は left、right で示して cases で場合分けする
tags: [book-chapter, lean]
date: 2026-02-23
book: "[[ゼロから始めるLean言語入門 ― 手を動かして学ぶ形式数学ライブラリ開発]]"
chapter: 3
---

## TL;DR

- 論理積 `P ∧ Q` は `constructor` か `⟨⟩` で示し、仮定にあるときは `.left` と `.right` で取り出す。
- 論理和 `P ∨ Q` は `left` か `right` で示し、仮定にあるときは `cases` で場合分けする。

## 内容

### 論理積

`constructor` を使うと、ゴール `⊢ P ∧ Q` を `⊢ P` と `⊢ Q` の 2 つのゴールに分けられる。

```lean
example (P Q : Prop) (hp : P) (hq : Q) : P ∧ Q := by
  constructor
  · exact hp
  · exact hq
```

`⟨⟩` を使うと、もっと短く書ける。

```lean
example (P Q : Prop) (hp : P) (hq : Q) : P ∧ Q := by
  exact ⟨hp, hq⟩
```

仮定に `h : P ∧ Q` があるときは、`h.left` で `P` を、`h.right` で `Q` を取り出せる。

```lean
example (P Q : Prop) (h : P ∧ Q) : P := by
  exact h.left

example (P Q : Prop) (h : P ∧ Q) : Q := by
  exact h.right
```

### 論理和

ゴールが `⊢ P ∨ Q` のとき、`left` タクティクを使うとゴールが `⊢ P` に、`right` タクティクを使うと `⊢ Q` に変わる。

```lean
example (P Q : Prop) (hp : P) : P ∨ Q := by
  left
  exact hp
```

```lean
example (P Q : Prop) (hq : Q) : P ∨ Q := by
  right
  exact hq
```

仮定に `h : P ∨ Q` があるときに `cases` タクティクを使うと、$P$ が成り立つ場合と $Q$ が成り立つ場合の 2 つのゴールが作られ、それぞれで仮定を取り出せる。`inl` と `inr` は自動で付くゴールの名前である。

```lean
example (P Q : Prop) (h : P ∨ Q) : Q ∨ P := by
  cases h with
  | inl hp =>
    right
    exact hp
  | inr hq =>
    left
    exact hq
```

`case` タクティクと組み合わせて、次のようにも書ける。

```lean
example (P Q : Prop) (h : P ∨ Q) : Q ∨ P := by
  cases h
  case inl hp =>
    right
    exact hp
  case inr hq =>
    left
    exact hq
```

## キーワード

- [[lean|Lean]]
- [[tactic|タクティク]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

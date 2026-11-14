---
title: ゼロから始めるLean言語入門 ― 手を動かして学ぶ形式数学ライブラリ開発 第3章 Lean における否定
description: Lean の否定 ¬ P は P → False という含意として定義され、contradiction や exfalso タクティクで矛盾を扱う
tags: [book-chapter, lean]
date: 2026-02-23
book: "[[ゼロから始めるLean言語入門 ― 手を動かして学ぶ形式数学ライブラリ開発]]"
chapter: 3
---

## TL;DR

- Lean では $P$ の否定を `¬ P` と書き、`P → False` という含意として定義している。
- 矛盾からは何でも示せるので、`contradiction` や `exfalso` タクティクで矛盾を使った証明を書ける。

## 内容

### 否定の定義

Lean では命題 $P$ の否定を `¬ P` と書く。数学では「$P$ を仮定すると矛盾するから、$P$ は偽である」という推論をよく行う。Lean の `¬ P` はこの考え方で定義されており、`P → False` という含意そのものである。

```lean
example (P : Prop) : (¬ P) = (P → False) := by
  rfl
```

`¬ P` は含意なので、`¬ P` を使うときは `apply`、`¬ P` を示すときは `intro` を使える。

```lean
/-- P と ¬ P を同時に仮定すると矛盾する -/
example (P : Prop) (hnp : ¬ P) (hp : P) : False := by
  -- ¬ P は P → False に等しいので、P を示せばよい
  apply hnp
  exact hp
```

```lean
/-- 対偶が元の命題と同値であることの、片方のケース -/
example (P Q : Prop) (h : P → ¬ Q) : Q → ¬ P := by
  -- Q → ¬ P を示したいので Q を仮定する
  intro hq
  -- ¬ P は P → False に等しいので、P を仮定する
  intro hp
  -- h : P → Q → False に適用して False を得る
  exact h hp hq
```

### contradiction タクティク

$P$ と $\neg P$ が両方あるときは矛盾が導かれる。矛盾からは何でも示せるので、$P$ と $\neg P$ があれば何でも示せる。Lean では `contradiction` でこれを表せる。

```lean
example (P : Prop) (hnp : ¬ P) (hp : P) : False := by
  contradiction
```

### exfalso タクティク

矛盾からは何でも示せるので、証明のどの時点でもゴールを `⊢ False` に置き換えてよい。こうすると証明が読みやすくなることがある。Lean では `exfalso` で置き換える。

```lean
example (P Q : Prop) (hnp : ¬ P) (hp : P) : Q := by
  exfalso
  contradiction
```

## キーワード

- [[lean|Lean]]
- [[tactic|タクティク]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

---
title: Lean
aliases: []
description: 純粋関数型プログラミング言語であり、定理証明支援系でもあるオープンソースの言語
tags: [word, プログラミング言語, 定理証明]
date: 2025-06-15
---

## TL;DR

純粋関数型プログラミング言語であり、[[theorem-proving|定理証明]]支援系でもある。仕様と証明を、プログラムと同じ言語で書ける。

## なぜ必要か

依存型を使って厳密な仕様を書き、プログラムがその仕様を満たすことを証明できる。テストと違い、1 つの証明でテストしていない入力も含むすべての入力に対する正しさを保証できる。数学者向けには、形式化された数学ライブラリ Mathlib がある。[[cedar|Cedar]] の形式検証にも Lean が使われている。

## 仕組み

ツールチェーンは、バージョン管理ツールの elan で入れる。パッケージ管理ツールの lake も elan に付いてくる。

```sh
# elan を入れる
curl https://elan.lean-lang.org/elan-init.sh -sSf | sh

# elan 自体を更新する
elan self update

# 最新の安定版を入れて有効にする
elan default leanprover/lean4:stable
```

`.zshrc` でパスを通す。

```sh
export PATH=$PATH:$HOME/.elan/bin
```

[[visual-studio-code|Visual Studio Code]] の拡張を入れても、必要なものが入るようである。ブラウザで試すなら [Playground](https://live.lean-lang.org/) がある。パッケージは [Reservoir](https://reservoir.lean-lang.org/) で探せる。

## 自分の理解

環境構築を IDE に依存させるのは気持ち悪いので、elan で手動で入れることにした。

## 関連

- [[theorem-proving|定理証明]]
- [[cedar|Cedar]]

## 出典

- [Lean 公式サイト](https://lean-lang.org/)
- [環境構築](https://lean-lang.org/documentation/setup/)
- [Functional Programming in Lean](https://lean-lang.org/functional_programming_in_lean/)
- [Theorem Proving in Lean 4](https://lean-lang.org/theorem_proving_in_lean4/)
- [Mathematics in Lean](https://leanprover-community.github.io/mathematics_in_lean/index.html)
- [Lean Game Server](https://adam.math.hhu.de)

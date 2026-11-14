---
title: Alloy
aliases: []
description: リレーションロジックに基づき、システムの構造と制約を記述して検証する形式仕様言語とツール
tags: [word, 形式手法]
date: 2025-01-17
---

## TL;DR

構造的なモデリングに特化した形式仕様言語と、その解析ツールである。MIT の Daniel Jackson 氏が開発した。リレーションロジックに基づいて、システムの静的な構造と制約を記述できる。

## なぜ必要か

[[formal-methods|形式手法]]のうち[[model-checking|モデル検査]]の道具として使い、設計の段階で仕様の矛盾や抜けを見つけられる。Alloy の特徴は次のとおりである。

- 宣言的に記述する
- リレーション（関係）を中心にモデルを組み立てる
- 仕様に反する例（反例）を自動で生成する
- 小さなスコープの範囲で網羅的に検証する

Alloy 6 は Alloy 4 から大きく改訂され、可変な状態と[[temporal-logic|時相論理]]が加わった。

## 仕組み

### 基本構文

- Signature（`sig`）: [[entity|エンティティ]]を定義する
- Multiplicity（多重度）: 関係の数を制約する
- Constraint（制約）: ビジネスルールを定義する
- Quantifiers（量詞）: 条件の範囲を指定する
- 論理演算: `and`、`or`、`not`、`implies`、`iff`
- 集合演算: `in`、`+`、`&`、`-`、`~`、`^`

### 問題の見つけ方

Assertion（表明）で、成り立つべき性質を検証する。Run コマンドでは問題のあるシナリオを探す。どちらも Alloy Analyzer で実際に実行できる。

### インストール

Homebrew で入れられる。

```sh
$ brew install --cask alloy
```

## 例

AI エージェントと組み合わせた活用事例がある。

- [[devin|Devin]] と [[adr|ADR]]: [形式手法（Alloy）で仕様をドキュメント化する](https://zenn.dev/loglass/articles/2d48f39c3e6424#形式手法（alloy）で仕様をドキュメント化する)
- [[cursor|Cursor]]: [Cursor と Alloy の活用事例](https://zenn.dev/loglass/articles/5e24364ef06aa9)

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[formal-methods|形式手法]]
- [[tla-plus|TLA+]]
- [[z-notation|Z 言語]]
- [[抽象によるソフトウェア設計－Alloyではじめる形式手法－]]: 唯一の日本語の本

## 出典

- [Alloy](https://alloytools.org/)
- [Alloy の言語仕様](https://alloytools.org/spec.html)
- [Alloy Documentation（非公式）](https://alloy.readthedocs.io/en/latest/index.html)
- [[AIと共に進化する開発手法：形式手法と関数型プログラミングの可能性]]
- [プロパティリストのモデル検証 - Zenn](https://zenn.dev/szktty/articles/property-list-model-verification)
- [Qiita の解説記事](https://qiita.com/kannkyo/items/0742253aeb5a43e449c9)
- [blog.nekoport.com](https://blog.nekoport.com/)

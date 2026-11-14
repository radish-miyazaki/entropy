---
title: なぜGoのジェネリクスはこの形なのか？ - Featherweight Goが明かす設計の核心
description: Go のジェネリクスが今の形になった背景を、設計の基礎になった Featherweight Go から読み解く
tags: [talk, go]
date: 2025-09-28
speakers: [ryotaros]
company:
event: "[[Go Conference 2025]]"
held: 2025-09-28
slide: https://speakerdeck.com/ryotaros/nazegonozienerikusuhakonoxing-nanoka-featherweight-gogaming-kasushe-ji-nohe-xin
video:
---

## TL;DR

- Go のジェネリクスは、当初の Contracts 案を撤回し、既存の interface で型制約を表す形になった。
- その設計の基礎が Featherweight Go で、ジェネリックなコードの変換を定式化している。

## 内容

### Contracts の撤回

[[go|Go]] の[[generics|ジェネリクス]]には、もともと Contracts という概念を導入する予定だった。しかし、新しい概念が増えることや、型の振る舞いを定義できる interface がすでにあることから、撤回された。

### Featherweight Go

[[featherweight-go|Featherweight Go]] は、Go のジェネリクスの設計思想を表し、ジェネリックなコードをどう変換するかを定式化したものである。Featherweight Java に強く影響を受けており、Featherweight Java の FJ と FGJ に対応して、FG と FGG というモデルがある。

設計の要件は、使いやすく理解しやすいこと、ランタイムコストが低いこと、可能な限り保守的な拡張であることの 3 つである。方針として、構造的部分型とジェネリクスを組み合わせ、追加の言語機能なしに型制約を導入し、[[monomorphization|モノモーフィゼーション]]に基づいてコンパイルする。

FG は、Go を[[turing-complete|チューリング完全]]な関数型の言語としてモデル化したものである。FGG は FG を拡張し、構造体、メソッド、インタフェースが型パラメータを持てるようにしたものである。

### コンパイル戦略

コンパイル戦略は Featherweight Java とは異なる。発表では、コンパイル時にダミーメソッドが生成される理由も説明された。

### Expression Problem

Expression Problem（式問題）を Go で解決するには、共変レシーバを使う。

## キーワード

- [[go|Go]]
- [[generics|ジェネリクス]]
- [[featherweight-go|Featherweight Go]]
- Featherweight Java
- [[monomorphization|モノモーフィゼーション]]
- [[turing-complete|チューリング完全]]
- Expression Problem

%%

## 自分の理解

自社に持ち帰れそうな点、疑問に思った点。書くときはこのコメントを外す
%%

## 関連

- [発表のページ](https://gocon.jp/2025/talks/958641/)
- [[Go の interface と Generics の内部構造と進化]]

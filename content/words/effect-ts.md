---
title: Effect（TypeScript）
aliases: [Effect]
description: 型付きのエラー処理や依存性の注入などを 1 つの仕組みで扱う TypeScript のライブラリ
tags: [word, typescript]
date: 2025-05-29
---

## TL;DR

[[typescript|TypeScript]] で本番品質のソフトウェアを書くためのライブラリ。型付きのエラー処理、構造化された並行処理、リソースの安全な解放、オブザーバビリティを 1 つの仕組みで扱う。

## なぜ必要か

TypeScript の型はデータの形をよく表せるが、プログラムがどう振る舞うか（どんなエラーを起こすか、何に依存するか）はほとんど表せない。Effect は失敗と依存関係を型に載せ、コンパイラから見えるようにする。

## 仕組み

中心にあるのは [[effect-effect|Effect 型]]である。Effect 型の値は、結果、起こりうるエラー、必要とする依存をすべて含めてプログラムを記述する。この型の上に、リトライとスケジューリング、並列数を制限した処理、[[dependency-injection|依存性の注入]]（[[effect-service|Effect Service]]）、トレースとメトリクス、ストリーミング、スキーマによる検証（[[effect-schema|Effect Schema]]）、型付きの設定（[[effect-configuration|Effect Configuration]]）などの機能がそろっている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[effect-effect|Effect.Effect]]
- [[effect-gen|Effect.gen]]
- [[effect-pipe|pipe（Effect）]]
- [[effect-service|Effect Service]]
- [[effect-schema|Effect Schema]]

## 出典

- [Effect](https://effect.website/)
- [Effect Documentation](https://effect.website/docs/)
- [[Effect with React 19： Project Template|Effect with React 19: Project Template]]
- [[Effect： Beginners Complete Getting Started|Effect: Beginners Complete Getting Started]]

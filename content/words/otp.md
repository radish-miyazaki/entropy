---
title: OTP
aliases: [Open Telecom Platform]
description: 耐障害性のあるシステムを作るための、Erlang のライブラリと設計原則の集まり
tags: [word, erlang, 並行処理]
date: 2026-11-14
---

## TL;DR

Open Telecom Platform の略。[[erlang|Erlang]] で耐障害性のあるシステムを作るための、ライブラリと設計原則の集まりである。

## なぜ必要か

[[erlang|Erlang]] のランタイムは、[[concurrency|並行処理]]、複数のマシンにまたがる分散、障害からの回復を言語の機能として備えている。OTP は、こうしたシステムを開発するためのミドルウェアになる。

## 仕組み

OTP の設計原則（OTP Design Principles）によると、Erlang/OTP の基本となる考え方は監視ツリー（supervision tree）である。監視ツリーは、コードをワーカーとスーパーバイザーに分けて組み立てる。ワーカーは計算などの実際の仕事をするプロセスで、スーパーバイザーはワーカーを監視するプロセスである。ワーカーが失敗すると、スーパーバイザーが再起動できる。

よく使う処理のパターンは、ビヘイビアとして形式化されている。ビヘイビアのモジュールが汎用的な処理を、コールバックモジュールが固有の処理を受け持つ。標準のビヘイビアには次のものがある。

- `gen_server`: クライアント・サーバ関係のサーバ
- `gen_statem`: 状態機械
- `gen_event`: イベント処理
- `supervisor`: 監視ツリーのスーパーバイザー

Erlang/OTP の部品はアプリケーションと呼ばれる。いくつかのアプリケーションを組み合わせた完全なシステムをリリースと呼び、動いているシステムのままリリースのバージョンを上げ下げできる。

## 例

[[beam|BEAM]] 上で動く [[lfe|LFE]] では、Erlang の耐障害性や高い並行性、OTP との統合を [[lisp|Lisp]] の構文で使える。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[erlang|Erlang]]
- [[elixir|Elixir]]
- [[actor-model|アクターモデル]]

## 出典

- [Overview - OTP Design Principles](https://www.erlang.org/doc/system/design_principles.html)

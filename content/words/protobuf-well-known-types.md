---
title: Well-Known Types
aliases: []
description: Google が提供している、日付や時刻などよく使われる Protocol Buffers のメッセージ型
tags: [word, protocol-buffers]
date: 2024-10-01
---

## TL;DR

Google が提供している、日付や時刻などよく使われる [[protocol-buffers|Protocol Buffers]] のメッセージ型。`google.protobuf` パッケージにある。

## 仕組み

主な型は次のとおり。

- `Timestamp`: UTC の時刻。Unix エポックからの秒とナノ秒で表す
- `Duration`: 暦に依存しない、符号付きの時間の長さ
- `Any`: 任意のメッセージを、その型を表す URL と一緒に保持する
- `Empty`: フィールドを持たないメッセージ。リクエストやレスポンスの型の代わりに使う
- `FieldMask`: 読み込むフィールドや、更新するフィールドを指定するパスの集合
- `Struct`、`Value`、`ListValue`: JSON のような動的な値
- `BoolValue`、`StringValue` などのラッパー型: スカラー値を 1 つ包む。新しい設計ではほとんど不要だが、互換性の維持や `Any` にスカラー値を入れるときに使う

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[protocol-buffers|Protocol Buffers]]
- [[protovalidate]]

## 出典

- [Protocol Buffers Well-Known Types](https://protobuf.dev/reference/protobuf/google.protobuf/)

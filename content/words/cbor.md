---
title: CBOR
aliases: []
description: RFC 8949 で標準化された、JSON のデータモデルを拡張したバイナリ形式のデータ交換フォーマット
tags: [word, データ形式]
date: 2025-01-11
---

## TL;DR

Concise Binary Object Representation の略で、[[rfc|RFC]] 8949 で標準化されたバイナリ形式のデータ交換フォーマットである。データモデルは [[json|JSON]] を拡張したものである。

## なぜ必要か

CBOR は、メモリや処理能力が極めて限られた環境でも扱えることを目指して設計された。RFC 8949 は、設計目標として次の点を挙げている。

- エンコーダとデコーダを非常に少ないコードで実装できる。メッセージサイズの小ささは、コードの小ささより優先度が低い
- JSON と同じく自己記述的で、スキーマなしでデコードできる
- バージョン交渉なしに拡張でき、古いデコーダも未知の拡張を含むデータを復号できる

## 仕組み

JSON の型と相互に変換できるうえ、JSON にはないバイト列を扱える。RFC 8949 は RFC 7049 を置き換えたもので、新しいバージョンのフォーマットを作ったわけではない。エンコード結果は [CBOR playground](https://cbor.me/) で確かめられる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[json|JSON]]
- [[protocol-buffers|Protocol Buffers]]
- [[serialization|シリアライズ]]

## 出典

- [RFC 8949: Concise Binary Object Representation (CBOR)](https://www.rfc-editor.org/rfc/rfc8949.html)
- [CBOR - Wikipedia](https://en.wikipedia.org/wiki/CBOR)
- [Qiita の解説記事](https://qiita.com/yoshii0110/items/d975610b4173043c77ca)

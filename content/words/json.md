---
title: JSON
aliases: [JavaScript Object Notation]
description: ECMAScript のオブジェクトリテラルに由来する、構造化データを表すテキスト形式
tags: [word, データ形式]
date: 2026-11-14
---

## TL;DR

JavaScript Object Notation の略で、構造化データを表すテキスト形式。[[rfc|RFC]] 8259 によると、ECMAScript のプログラミング言語標準に由来する。

## 仕組み

RFC 8259 では、JSON は 4 つのプリミティブ型（文字列、数値、真偽値、null）と、2 つの構造化された型（オブジェクト、配列）を表せる。閉じた環境の外でやり取りする JSON テキストは、UTF-8 でエンコードしなければならない。

## 例

```json
{ "name": "entropy", "tags": ["word", "json"], "draft": false, "count": 3 }
```

## 注意点

RFC 8259 は、オブジェクトの中の名前は一意であるべき（SHOULD）としか定めていない。名前が重複したときの挙動は実装によって違い、最後の値だけを残すもの、エラーにするもの、すべての組を残すものがある。

数値の範囲や精度も実装によって制限されうる。どの実装でも正確に扱えるのは、-(2^53)+1 から (2^53)-1 までの整数である。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[cbor|CBOR]]
- [[geojson|GeoJSON]]
- [[json-schema|JSON Schema]]
- [[document-database|ドキュメントデータベース]]

## 出典

- [RFC 8259: The JavaScript Object Notation (JSON) Data Interchange Format](https://www.rfc-editor.org/rfc/rfc8259)

---
title: OpenAPI
aliases: []
description: HTTP API のインタフェースを、プログラミング言語に依存しない標準の形式で記述するための仕様
tags: [word, http]
date: 2026-11-14
---

## TL;DR

[[http|HTTP]] API のインタフェースを、プログラミング言語に依存しない標準の形式で記述するための仕様（OpenAPI Specification）。ドキュメントは JSON か YAML で書く。

## なぜ必要か

OpenAPI Specification によると、OpenAPI で記述すると、人もコンピュータも、ソースコードや追加のドキュメントを読まずにサービスの機能を理解できる。

## 仕組み

OpenAPI のドキュメント（OpenAPI Description）は [[json|JSON]] のオブジェクトで、JSON か YAML で表現する。この記述をもとに、API を表示するドキュメントツール、クライアントやサーバのコードを生成するツール、テストツールなどを使える。

## 例

[[huma|Huma]] は OpenAPI 3 と [[json-schema|JSON Schema]] を土台にした [[go|Go]] のフレームワークである。[[utoipa|utoipa]] は、[[rust|Rust]] のエンドポイントに付けた[[macro|マクロ]]から OpenAPI のドキュメントを生成する（[[code-first|Code first]]）。[[typespec|TypeSpec]] は、1 つの定義から OpenAPI や [[protocol-buffers|Protocol Buffers]] の仕様を出力できる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[rest-api|REST API]]
- [[json-schema|JSON Schema]]
- [[schema-first|Schema first]]
- [[code-first|Code first]]

## 出典

- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html)

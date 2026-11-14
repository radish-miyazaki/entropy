---
title: JSON Schema
aliases: []
description: JSON データの構造と制約を宣言的に定義する言語
tags: [word, データ形式]
date: 2026-11-14
---

## TL;DR

[[json|JSON]] データの構造と制約を宣言的に定義する言語。スキーマに沿っているかの検証は、仕様を実装したバリデータが行う。

## なぜ必要か

JSON をやり取りするシステムどうしは、データの形について共通の定義を必要とする。公式サイトによると、スキーマがあれば既存のデータを記述でき、やり取りするデータの一貫性を保つルールを課せる。人間にも機械にも読めるドキュメントを生成したり、不正なデータを早い段階で見つけたりもできる。検証のコードを手で書く量も減る。

## 仕組み

スキーマは、データの性質をキーワードの組み合わせで記述する。スキーマ自体は言語にすぎず、JSON のドキュメントがスキーマに適合しているかは、別に用意したバリデータが確かめる。独自のキーワードやフォーマット、検証ルールを足して拡張することもできる。

## 注意点

仕様にはいくつかの版がある。公式サイトは最新版として 2020-12 を挙げ、draft-04、draft-06、draft-07 よりもこちらを使うよう勧めている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[json|JSON]]
- [[ajv|Ajv]]: JavaScript の JSON Schema バリデータ
- [[json-schema-to-typescript|json-schema-to-typescript]]
- [[typescript-json-schema|typescript-json-schema]]

## 出典

- [What is JSON Schema? - JSON Schema](https://json-schema.org/overview/what-is-jsonschema)

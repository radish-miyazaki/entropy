---
title: Ajv
aliases: []
description: スキーマを最適化した JavaScript のコードにコンパイルして検証する、JSON Schema のバリデータ
tags: [word, javascript]
date: 2025-06-08
---

## TL;DR

[[javascript|JavaScript]] の [[json-schema|JSON Schema]] バリデータ。JSON のデータを宣言的なスキーマで検証でき、検証のコードを手で書かなくてよい。

## 仕組み

スキーマを最適化した JavaScript のコードにコンパイルすることで、速く検証する。対応している仕様は JSON Schema の draft-04、06、07、2019-09、2020-12 と、JSON Type Definition（RFC 8927）である。Node.js、ブラウザ、Electron などで使える。

## 注意点

コンパイルされた検証関数の実行はとても速いが、コンパイル自体は比較的遅い。スキーマは一度だけコンパイルし、`compile` や `getSchema` が返す関数を使い回す。

検証関数を呼ぶたびに `errors` プロパティは上書きされる。エラーを後で使うなら、別の変数に配列を退避しておく。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[json-schema-to-typescript]]
- [[typescript-json-schema]]
- [[zod|Zod]]

## 出典

- [Ajv JSON schema validator](https://ajv.js.org/)
- [Getting started - Ajv](https://ajv.js.org/guide/getting-started.html)

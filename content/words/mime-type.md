---
title: MIME タイプ
aliases: []
description: データの種類を表す識別子。もともとは電子メールのために作られた
tags: [word, http]
date: 2024-11-05
---

## TL;DR

データの種類を表す識別子。もともとは電子メールのために作られた。

## なぜ必要か

Wikipedia によると、電子メールの書式を定める RFC 5322（旧 RFC 822）では US-ASCII のテキストしか扱えず、本文も 1 つに限られていた。MIME は新しいヘッダと符号化方式を定め、画像や音声などのデータを 1 通のメールで送れるようにした。[[http|HTTP]] でのデータの伝送にも、MIME の枠組みが使われている。

MDN によると、ブラウザは URL の扱い方を、ファイルの拡張子ではなく MIME タイプで決める。そのため、Web サーバはレスポンスの [[content-type|Content-Type]] ヘッダで正しい MIME タイプを返す必要がある。

## 仕組み

MIME タイプは `タイプ/サブタイプ` の形で書く。タイプは `text` や `video` のような大分類で、サブタイプは正確なデータの種類を表す。`;名前=値` の形でパラメータを付けられ、大文字と小文字は区別しない。現在の名前はメディアタイプで、[[rfc|RFC]] 6838 で定められ、[[iana|IANA]] が公式な一覧を管理している。

## 例

- `text/plain;charset=UTF-8`: 文字コードを指定したテキスト
- `text/html`、`text/css`、`text/javascript`: HTML、CSS、JavaScript
- `application/json`: JSON
- `application/octet-stream`: 種類の分からないバイナリデータ。ブラウザは通常、ダウンロードとして扱う
- `multipart/form-data`: HTML フォームを `POST` で送るときに、複数の部分をまとめたもの

## 注意点

MDN によると、MIME タイプがない、または誤っているとき、ブラウザは中身を調べて種類を推測する（MIME スニッフィング）。この挙動はブラウザごとに違い、セキュリティ上の懸念もあるので、サーバは `X-Content-Type-Options` ヘッダで推測を止められる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[content-type|Content-Type]]

## 出典

- [MIME タイプ（IANA メディア種別） - MDN](https://developer.mozilla.org/ja/docs/Web/HTTP/Guides/MIME_types)
- [Multipurpose Internet Mail Extensions - Wikipedia](https://ja.wikipedia.org/wiki/MIME)

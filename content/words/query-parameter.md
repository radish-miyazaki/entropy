---
title: クエリパラメータ
aliases: []
description: Web サーバに追加情報を渡すために URL に付ける、省略可能な Key=Value 形式の引数
tags: [word, url]
date: 2024-11-13
---

## TL;DR

Web サーバに追加情報を渡すために [[url|URL]] に付ける引数である。省略できる。

## 仕組み

クエリパラメータは `Key=Value` の形式で書く。複数ある場合は `&` で区切る。

URI の仕様である RFC 3986 では、この部分をクエリ（query）と呼ぶ。クエリは最初の `?` から始まり、`#` か URI の終わりまで続く。パスと合わせて、スキームとオーソリティの範囲内でリソースを識別するための、階層を持たないデータである。RFC 3986 は `Key=Value` の形を文法としては定めておらず、識別のための情報をその形で運ぶことが多い、と述べるにとどまる。

## 例

`category=books&sort=asc` は、カテゴリ（`category`）が本（`books`）のデータを昇順（`asc`）で取得する、という意味になる。

## 注意点

`/` や `;`、`?` は予約された文字なので、そのままでは使えない。

ただし RFC 3986 では、クエリの中の `/` と `?` はデータとして使ってよいとしている。古い実装にはこれを正しく扱えないものがある、とも注意している。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[url|URL]]
- [[url-path|パス]]

## 出典

- [URI - MDN](https://developer.mozilla.org/ja/docs/Web/URI#クエリー)
- [RFC 3986 - Uniform Resource Identifier (URI): Generic Syntax](https://www.rfc-editor.org/rfc/rfc3986.html#section-3.4)

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

## 例

`category=books&sort=asc` は、カテゴリ（`category`）が本（`books`）のデータを昇順（`asc`）で取得する、という意味になる。

## 注意点

`/` や `;`、`?` は予約された文字なので、そのままでは使えない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[url|URL]]
- [[url-path|パス]]

## 出典

- [URI - MDN](https://developer.mozilla.org/ja/docs/Web/URI#クエリー)

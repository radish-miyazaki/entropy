---
title: HTTP/1.0
aliases: []
description: 1996 年に RFC 1945 で文書化された HTTP のバージョン
tags: [word, http]
date: 2024-09-30
---

## TL;DR

1996 年に RFC 1945 で文書化された [[http|HTTP]] のバージョン。当時広く使われていた HTTP の実装をまとめたもので、インターネット標準ではなく情報提供（Informational）の RFC である。

## 仕組み

[[http-0-9|HTTP/0.9]] からの主な違いは次のとおり。

- リクエストとレスポンスに HTTP バージョンが入り、レスポンスにはステータスコードを含むステータス行が付く
- メッセージにヘッダと本体を持てる
- メソッドとして GET、HEAD、POST が定義された
- [[content-type|Content-Type]] でメディアタイプを示し、HTML 以外のデータも扱える

接続は、原則として 1 つのリクエストごとにクライアントが張り、レスポンスを送ったあとにサーバが閉じる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[http-0-9|HTTP/0.9]]
- [[http-1-1|HTTP/1.1]]

## 出典

- [RFC 1945 - Hypertext Transfer Protocol -- HTTP/1.0](https://www.rfc-editor.org/rfc/rfc1945)

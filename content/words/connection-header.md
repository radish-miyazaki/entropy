---
title: Connection
aliases: []
description: クライアントとサーバ間の接続に関する情報を指定する HTTP ヘッダ
tags: [word, http]
date: 2024-11-15
---

## TL;DR

クライアントとサーバの間の接続に関する情報を指定する HTTP ヘッダである。[[http-request|HTTP リクエスト]]と [[http-response|HTTP レスポンス]]のどちらにも書ける。

## 仕組み

省略でき、複数の値を指定できる。

## 例

- `Connection: keep-alive`: [[http-1-1|HTTP/1.1]] で導入された [[keep-alive|Keep-Alive]] を使い、接続を維持する
- `Connection: close`: リクエストを処理するたびに接続を切る（[[http-1-0|HTTP/1.0]] のデフォルトの動作）

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[keep-alive|Keep-Alive]]
- [[header-field|ヘッダフィールド]]
- [[http-message|HTTP メッセージ]]

---
title: Connection
aliases: []
description: クライアントとサーバ間の接続に関する情報を指定する HTTP ヘッダ
tags: [word, http]
date: 2024-11-15
---

## TL;DR

クライアントとサーバの間の接続に関する情報を指定する HTTP ヘッダである。[[http-request|HTTP リクエスト]]と [[http-response|HTTP レスポンス]]のどちらにも書ける。

## なぜ必要か

[[http|HTTP]] のヘッダには、通信経路上のすべての受信者に向けたもの（エンドツーエンド）と、隣の受信者との接続だけに関係するもの（ホップバイホップ）がある。Connection ヘッダを使うと、この 2 つを区別できる。

## 仕組み

Connection ヘッダは省略でき、複数の値を指定できる。

RFC 9110 によると、Connection ヘッダには、今の接続に対して送り手が望む制御オプションを並べる。オプションの大文字と小文字は区別しない。プロキシなどの中継者は、転送する前に Connection ヘッダを読み、そこに並んだ名前のヘッダを取り除いてから、Connection ヘッダ自体も取り除くか置き換える。Keep-Alive、TE、Transfer-Encoding、Upgrade などのヘッダは、Connection に書かれていなくても取り除くか置き換えるべきとされている。逆に、すべての受信者に向けたヘッダの名前を Connection に書いてはいけない。

## 例

- `Connection: keep-alive`: [[http-1-1|HTTP/1.1]] で導入された [[persistent-connection|Keep-Alive]] を使い、接続を維持する
- `Connection: close`: リクエストを処理するたびに接続を切る（[[http-1-0|HTTP/1.0]] のデフォルトの動作）

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[persistent-connection|Keep-Alive]]
- [[header-field|ヘッダフィールド]]
- [[http-message|HTTP メッセージ]]

## 出典

- [RFC 9110 - HTTP Semantics, 7.6.1. Connection](https://www.rfc-editor.org/rfc/rfc9110.html#name-connection)

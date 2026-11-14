---
title: WebSocket
aliases: []
description: 1 本の TCP 接続の上で、ブラウザとサーバが双方向に通信するためのプロトコル
tags: [word, ネットワーク]
date: 2026-11-14
---

## TL;DR

[[web-browser|ブラウザ]]上のクライアントとサーバが、1 本の [[tcp|TCP]] 接続で双方向に通信するためのプロトコル。[[rfc|RFC]] 6455 で定められている。

## なぜ必要か

RFC 6455 によると、WebSocket より前のリアルタイムな Web アプリケーションは、[[http|HTTP]] でサーバに更新を何度もポーリングしていた。メッセージごとに HTTP リクエストを送るので、毎回 HTTP ヘッダが付き、オーバーヘッドが大きい。WebSocket では、両方向の通信に 1 本の TCP 接続を使えば済む。

## 仕組み

接続はオープニングハンドシェイクから始まる。クライアントは HTTP の Upgrade リクエストを送り、サーバはステータス 101（Switching Protocols）を返す。その後、同じ接続で WebSocket のフレームをやり取りする。ハンドシェイクは既存の HTTP サーバやプロキシと共存できるように作られているので、1 つのポートで HTTP と WebSocket の両方を扱える。

データはメッセージとして送られ、1 つのメッセージは 1 つ以上のフレームからなる。フレームには、テキスト（UTF-8）、バイナリ、制御用のフレームがある。

URI のスキームは、暗号化しない `ws://` と、暗号化する `wss://` の 2 つである。デフォルトのポートはそれぞれ 80 と 443 で、HTTP と HTTPS と同じである。

## 例

- [[全てGoで作るP2P対戦ゲーム入門]]では、対戦相手のマッチングでクライアントと WebSocket でつなぐ
- [[mocket|Mocket]] では、`ws` メソッドで WebSocket のルートを登録する（[[WebSocket - Mocket]]）

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[http|HTTP]]
- [[tcp|TCP]]
- [[w3c|W3C]]

## 出典

- [RFC 6455 - The WebSocket Protocol](https://www.rfc-editor.org/rfc/rfc6455)

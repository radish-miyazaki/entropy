---
title: WebSocket -- Mocket
aliases: []
description: Mocket での WebSocket の扱い方。ws メソッドでルートを登録し、Pub/Sub にも対応する
tags: [word, mocket]
date: 2025-12-05
---

## TL;DR

[[mocket|Mocket]] では、[[websocket|WebSocket]] のルートを `ws` メソッドで登録する。ハンドラは接続、受信、切断のイベントを受け取り、[[pub-sub|Pub/Sub]] のチャネルも使える。

## 仕組み

### イベント

ハンドラは `WebSocketEvent` 列挙型を受け取る。

- `Open(WebSocketPeer)`: 新しい接続が確立されたときに呼ばれる
- `Message(WebSocketPeer, WebSocketAggregatedMessage)`: メッセージを受信したときに呼ばれる。メッセージは `Text`、`Binary`、`Ping` のいずれかである
- `Close(WebSocketPeer)`: 接続が閉じられたときに呼ばれる

```moonbit
app.ws("/ws", event => match event {
  Open(peer) => println("WS open: " + peer.to_string())
  Message(peer, msg) =>
    match msg {
      Text(s) => {
        println("WS message: " + s)
        peer.text(s)
      }
      Binary(bytes) => {
        println("WS binary: " + bytes.length().to_string() + " bytes")
        peer.binary(bytes)
      }
      Ping => {
        println("WS ping")
        peer.pong()
      }
    }
  Close(peer) => println("WS close: " + peer.to_string())
})
```

### WebSocketPeer

`WebSocketPeer` 構造体は接続中のクライアントを表し、やりとりのためのメソッドを持つ。

- `text(message: String)`: クライアントにテキストメッセージを送る
- `binary(message: Bytes)`: クライアントにバイナリメッセージを送る
- `subscribe(channel: String)`: クライアントを Pub/Sub のチャネルに購読させる
- `unsubscribe(channel: String)`: クライアントのチャネルの購読を解除する
- `publish(channel: String, message: String)`（静的メソッド）: チャネルの購読者全員にブロードキャストする

## 例

接続時にチャットルームのチャネルを購読させ、参加を全員に知らせる例である。

```moonbit
app.ws("/chat", event => match event {
  Open(peer) => {
    peer.subscribe("chat_room")
    @mocket.WebSocketPeer::publish("chat_room", "User joined")
  }
  Message(peer, msg) =>
    match msg {
      Text(msg) => peer.text(msg)
      _ => ()
    }
  Close(peer) => peer.unsubscribe("chat_room")
})
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[mocket|Mocket]]
- [[mocket-routing|Routing -- Mocket]]

## 出典

- [WebSocket - Mocket](https://mocket.oboard.fun/guide/websocket.html)

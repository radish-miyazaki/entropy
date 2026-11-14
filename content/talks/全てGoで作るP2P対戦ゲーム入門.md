---
title: 全てGoで作るP2P対戦ゲーム入門
description: 画面描画、マッチング、P2P 通信まで、すべて Go で対戦ゲームを作る方法の紹介
tags: [talk, go]
date: 2025-09-27
speakers: [ponyo877]
company:
event: "[[Go Conference 2025]]"
held: 2025-09-27
slide: https://speakerdeck.com/ponyo877/quan-tegodezuo-rup2pdui-zhan-gemuru-men
video:
---

## TL;DR

- 画面描画、マッチング、P2P 通信をすべて Go で実装した対戦ゲームの作り方の紹介。
- 描画は Ebitengine と WebAssembly、マッチングは WebSocket、プレイヤー同士の通信は WebRTC で行う。

## 内容

### 画面描画

[[go|Go]] と [[webassembly|WebAssembly]] で描画するので、HTML や CSS を書く必要はない。描画には、Go 製の 2D ゲームライブラリである [[ebitengine|Ebitengine]] を使う。

### マッチング

マッチングはシンプルなキューで管理する。クライアントとは [[websocket|WebSocket]] でつなぎ、[[goroutine|ゴルーチン]]で並行に処理する。

### P2P 通信

プレイヤー同士の通信には WebRTC を使う。Go のライブラリでは [pion/webrtc](https://github.com/pion/webrtc) が有名である。

WebRTC で接続するには、シグナリングサーバが必要になる。シグナリングサーバが接続用の情報交換を仲介するので、双方のブラウザが互いを見つけて通信を始められる。発表では [Ayame](https://github.com/OpenAyame/ayame) と、その Go クライアントの [go-ayame](https://github.com/hakobera/go-ayame) を使っていた。

### 描画とゲームロジックの分離

Ebitengine とゲームロジックは [[channel|チャネル]]でデータをやり取りする。描画処理と状態更新処理を分けられるので、並行処理を直感的に書ける。ほかに、レーティングサーバの構成も紹介された。

## キーワード

- [[go|Go]]
- [[webassembly|WebAssembly]]
- [[ebitengine|Ebitengine]]
- [[websocket|WebSocket]]
- [[goroutine|ゴルーチン]]
- WebRTC
- [[channel|チャネル]]

%%

## 自分の理解

自社に持ち帰れそうな点、疑問に思った点。書くときはこのコメントを外す
%%

## 関連

- [発表のページ](https://gocon.jp/2025/talks/956553/)

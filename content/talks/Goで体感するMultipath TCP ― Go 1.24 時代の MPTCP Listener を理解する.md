---
title: Goで体感するMultipath TCP ― Go 1.24 時代の MPTCP Listener を理解する
description: 複数の TCP コネクションを束ねる Multipath TCP の仕組みと、Go 1.24 でサーバ側が自動で MPTCP になった変更の解説
tags: [talk, go]
date: 2025-09-28
speakers: [takehaya]
company:
event: "[[Go Conference 2025]]"
held: 2025-09-28
slide: https://speakerdeck.com/takehaya/go-conference-2025-godeti-gan-surumultipath-tcp-go-1-dot-24-shi-dai-no-mptcp-listener-woli-jie-suru
video:
---

## TL;DR

- Multipath TCP は、複数の TCP コネクションを束ねて帯域と冗長性を高める技術である。
- Go 1.24 からは、OS が対応していればサーバ側が自動的に MPTCP で Listen するので、既存のコードは基本的に変えなくてよい。

## 内容

### Multipath TCP とは

Multipath TCP（MPTCP）は、[[tcp|TCP]] をマルチパス化する技術である。アプリケーションからは従来の TCP と同じように扱えるが、下のレイヤでは複数の TCP コネクション（subflow）を束ねている。複数のネットワークインターフェースを持つクライアントは、それぞれのコネクションを束ねて帯域を広げ、冗長性を高められる。

主なメリットは、シームレスなハンドオーバー、帯域幅の集約、最適な経路の選択である。curl や [[qemu|QEMU]] など、さまざまなツールが対応している。

### ネゴシエーション

最初の subflow は、TCP オプションの `MP_CAPABLE` を付けて作る。2 つ目以降は `MP_JOIN` を使い、既存の subflow があるセッションに紐付ける。また、`ADD_ADDR` で subflow を作れるアドレスを相手に通知できる。

### Go のサポート

[[go|Go]] は 1.21 で MPTCP をサポートしたが、明示的に有効にする必要があった。Go 1.24 からは、OS が対応していればサーバ側は自動的に MPTCP で Listen する。クライアント側は変わらず、TCP で Dial すれば TCP 接続になり、明示的に MPTCP を有効にしたときだけ MPTCP 接続になる。

そのため、既存のコードは基本的に修正しなくてよい。ただし、MPTCP は主な[[socket|ソケット]]オプションには対応しているものの、一部足りない機能もある。問題が起きる場合は、`ListenConfig.SetMultipathTCP(false)` か `GODEBUG=multipathtcp=0` で無効にする。

## キーワード

- [[go|Go]]
- [[tcp|TCP]]
- Multipath TCP
- [[socket|ソケット]]
- [[qemu|QEMU]]

%%

## 自分の理解

自社に持ち帰れそうな点、疑問に思った点。書くときはこのコメントを外す
%%

## 関連

- [発表のページ](https://gocon.jp/2025/talks/958952/)

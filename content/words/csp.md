---
title: CSP
aliases: [Communicating Sequential Processes]
description: 1978 年に C.A.R. Hoare が発表した、並行処理を表現するための形式言語
tags: [word, 並行処理]
date: 2025-02-10
---

## TL;DR

Communicating Sequential Processes の略。1978 年に C.A.R. Hoare が発表した、並行処理を表現するための形式言語である。

## 仕組み

CSP では、[[process|プロセス]]が値のコピーを受け渡すことで互いに通信する（[[message-passing|メッセージパッシング]]）。ここでいうプロセスは OS のプロセスではなく、独自の隔離された状態を持つ逐次処理のことである。

通信は、名前付きでバッファを持たない[[channel|チャネル]]を介して行われる。

## 例

[[go|Go]] は、[[goroutine|ゴルーチン]]とチャネルを使ってこのモデルを実装している。Go のデフォルトのチャネルは、CSP と同じくバッファを持たないので、送信側と受信側が同期する。

ただし Go では、チャネルが第一級オブジェクトである点が CSP と異なる。そのため、チャネルを関数や別のチャネルに渡せる。

CSP は Go のほかにも、[[ocaml|OCaml]]、[[erlang|Erlang]]、[[clojure|Clojure]] の `core.async`、Akka などに影響を与えた。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[actor-model|アクターモデル]]
- [[message-passing|メッセージパッシング]]
- [[goroutine|ゴルーチン]]

## 出典

- [[Go言語で学ぶ並行プログラミング　他言語にも適用できる原則とベストプラクティス|Go言語で学ぶ並行プログラミング]]
- [Communicating Sequential Processes - Wikipedia](https://ja.wikipedia.org/wiki/Communicating_Sequential_Processes)

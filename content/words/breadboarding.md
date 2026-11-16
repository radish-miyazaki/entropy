---
title: Breadboarding
aliases: [Breadboard, ブレッドボード]
description: Shape Up で、見た目を決めずに、画面などの場所、操作の手がかり、そのつながりだけを言葉と線で描いて UI の案を考える手法
tags: [word, project-management]
date: 2026-11-16
---

## TL;DR

[[shape-up|Shape Up]] で、見た目を決めずに、画面などの場所、操作の手がかり、そのつながりだけを言葉と線で描いて UI の案を考える手法。描いたものを breadboard と呼ぶ。

## なぜ必要か

[[shaping|Shaping]] ではいくつもの案を素早く試したいが、ワイヤーフレームを描くと要らない細部で止まる。breadboard は見た目を描かないので、流れと要素だけを素早く決められる。

電子工学のブレッドボードには部品と配線が全部あるが、外装はない。表示ランプやつまみを付けると決めることと、筐体の素材を議論することは別の話で、その考え方を UI に借りている。

## 仕組み

次の 3 つを言葉で描く。

- 場所: 画面、ダイアログ、メニューなど、移動して行ける所
- [[affordance|アフォーダンス]]: ボタン、入力欄、画面の文言など、ユーザが操作できるもの
- つなぐ線: どのアフォーダンスからどの場所へ移るか

## 例

請求書ツールの「自動支払い」では請求書の画面に「自動支払いをオンにする」を置き、カード情報の入力欄がある設定画面へつなぎ、確認画面へ進む流れを描いた。描くと、オンにしたら今の請求書も払われるのか、といった疑問が出てきた。自動支払いを止める手段は、[[appetite|Appetite]] に対してログインの流れを作るのは大きすぎると判断した。請求する側がすでに持っている顧客の詳細画面から止められるようにした。

## 注意点

手書きの breadboard は描くところを見ていない人には言葉と矢印の寄せ集めにしか見えない。[[shape-up-pitch|Pitch]] に載せるときは、既存の画面に埋め込むなど、読む人が分かる形に直す。

2 次元の配置そのものが問題のときは breadboard では要点を外すので、[[fat-marker-sketch|Fat marker sketch]] を使う。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[shaping|Shaping]]
- [[fat-marker-sketch|Fat marker sketch]]
- [[affordance|アフォーダンス]]
- [[level-of-abstraction|抽象度（Shape Up）]]

## 出典

- [Find the Elements | Shape Up](https://basecamp.com/shapeup/1.3-chapter-04)
- [Write the Pitch | Shape Up](https://basecamp.com/shapeup/1.5-chapter-06)
- [Glossary | Shape Up](https://basecamp.com/shapeup/4.5-appendix-06)
- [[Shape Up： Stop Running in Circles and Ship Work that Matters 第4章 Find the Elements|Shape Up › Find the Elements]]

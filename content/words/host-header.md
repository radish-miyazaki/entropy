---
title: Host
aliases: []
description: リクエスト先のホストとポート番号を指定する HTTP リクエストヘッダ
tags: [word, http]
date: 2024-11-15
---

## TL;DR

リクエスト先の[[host|ホスト]]と[[port-number|ポート番号]]を指定する HTTP リクエストヘッダである。

## なぜ必要か

1 つの [[ip-address|IP アドレス]]とポート番号で複数の Web サイトを運用しているとき、サーバは Host ヘッダの値でアクセス先の Web サイトを判断する（[[http-message|HTTP メッセージ]]を参照）。

## 仕組み

RFC 9110 によると、Host ヘッダは対象の URI のホストとポートの情報を運ぶ。オリジンサーバはこの値を使い、複数のホスト名でリクエストを受けているときにリソースを区別する。ユーザエージェントは、同じ情報を `:authority` 擬似ヘッダで送る場合を除いて、リクエストに Host ヘッダを付けなければならない。Host を送るときは、ヘッダセクションの最初のフィールドにすることが推奨されている。

## 注意点

[[http-1-1|HTTP/1.1]] では必須であり、省略できない。

RFC 9110 は、攻撃者が Host の値を操作して共有キャッシュを汚染したり、リクエストを別の宛先に向けたりする恐れがあると警告している。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[http-message|HTTP メッセージ]]
- [[header-field|ヘッダフィールド]]
- [[host|ホスト]]

## 出典

- [Host - MDN](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Host)
- [RFC 9110, Section 7.2: Host and :authority](https://www.rfc-editor.org/rfc/rfc9110.html#section-7.2)

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

## 注意点

[[http-1-1|HTTP/1.1]] では必須であり、省略できない。

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

---
title: Overexposure
aliases: []
description: インタフェースがシンプルでなく、詳細が漏れ出している状態
tags: [word, 設計]
date: 2023-12-20
---

## TL;DR

[[interface|インタフェース]]がシンプルでなく、[[information-leakage|情報漏洩]]が起きている状態。

## 仕組み

インタフェースがシンプルでないとは、メソッドの引数などに実装の詳細が反映されているということだ。その結果、よく使われる機能の API を使うだけなのに、めったに使われない他の機能についても学ぶことを利用者に強いてしまう。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[information-leakage|情報漏洩]]
- [[information-hiding|情報隠蔽]]
- [[red-flag|レッドフラグ]]

## 出典

- [[A Philosophy of Software Design 第5章 Information Hiding (and Leakage)|A Philosophy of Software Design 第5章]]

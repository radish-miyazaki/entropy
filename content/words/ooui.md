---
title: OOUI
aliases: []
description: GUI のように、操作の対象となるオブジェクトを起点に設計された操作モデル
tags: [word, ui]
date: 2023-12-16
---

## TL;DR

Object Oriented User Interface の略。[[gui|GUI]] のように、オブジェクトを起点として設計された操作モデルである。動詞を起点にする[[task-based-ui|タスクベース UI]] と対になる。

## 仕組み

Wikipedia によると、OOUI では、ユーザはドメインの実体を表すオブジェクト（描画アプリの線や円、業務アプリの顧客や注文など）を直接扱う。ユーザはオブジェクトを選び、大きさや色などのプロパティを変えたり、移動やコピーなどの操作を行ったりする。Jef Raskin は、先に対象を選んでから操作を選ぶ「名詞→動詞」の順序を、OOUI の重要な特徴としている。Jakob Nielsen は、アプリケーションの機能を起点にする機能指向のインタフェースと比べて、OOUI を「アプリケーションを裏返す」ものと表現した。

## 注意点

OOUI は、グラフィカルである必要も、直接操作である必要もない。初期の [[smalltalk|Smalltalk]] はコマンドラインのインタフェースだったが、OOUI だった。また、ユーザに見えるオブジェクトが、コードの中のドメインオブジェクトと一致している必要もない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[task-based-ui|タスクベース UI]]: 対になる操作モデル
- [[zui|ZUI]]

## 出典

- https://zenn.dev/stafes_blog/articles/shota1995m-ooui
- [Object-oriented user interface - Wikipedia](https://en.wikipedia.org/wiki/Object-oriented_user_interface)

---
title: レッドフラグ
aliases: []
description: コードの一部が必要以上に複雑であることを示す兆候
tags: [word, 設計]
date: 2023-12-19
---

## TL;DR

コードの一部が、必要以上に[[complexity|複雑]]であることを示す兆候。

## 例

レッドフラグには次のようなものがある。

- [[shallow-module|浅いモジュール]]
- [[information-leakage|情報漏洩]]
- [[temporal-decomposition|時間的分解]]
- [[overexposure|Overexposure]]
- [[pass-through-methods|Pass-through methods]]
- [[nonobvious-code|明白でないコード]]
- [[hard-to-describe|Hard to Describe]]
- [[vague-name|曖昧な名前]]
- [[hard-to-pick-name|名前を付けるのが難しい]]

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[complexity|複雑さ]]
- [[A Philosophy of Software Design]]

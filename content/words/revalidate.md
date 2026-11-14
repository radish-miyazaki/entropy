---
title: Revalidate
aliases: []
description: Next.js で、キャッシュしたデータを破棄して最新のデータを取り直すこと
tags: [word, next.js]
date: 2024-08-26
---

## TL;DR

[[nextjs|Next.js]] で、[[data-cache|Data Cache]] に保存したデータを破棄し、最新のデータを取り直すこと。

## 仕組み

Revalidate には 2 種類ある。

- [[time-based-revalidation|Time-based Revalidation]]: 指定した時間が経つと更新する
- [[on-demand-revalidation|On-demand Revalidation]]: 任意のタイミングで更新する

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[data-cache|Data Cache]]
- [[time-based-revalidation|Time-based Revalidation]]
- [[on-demand-revalidation|On-demand Revalidation]]

## 出典

- [Caching and Revalidating - Revalidating data](https://nextjs.org/docs/app/building-your-application/data-fetching/caching-and-revalidating#revalidating-data)

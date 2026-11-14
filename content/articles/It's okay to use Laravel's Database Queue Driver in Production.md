---
title: It's okay to use Laravel's Database Queue Driver in Production
description: Laravel の Database Queue Driver は本番環境向きではないとされてきたが、今は堅牢になり本番でも使えるという記事
tags: [article, laravel]
date: 2024-08-27
article-authors: []
site: DEV Community
published:
url: https://dev.to/lpheller/its-okay-to-use-laravels-database-queue-driver-in-production-38hb
---

## TL;DR

- [[laravel|Laravel]] の Database Queue Driver は「本番環境での使用は想定していない」とされてきたが、今は本番でも使える。
- 数年前から 2016 年ごろほどの問題ではなくなっており、2024 年の新しい話ではない。

## 内容

筆者は長年、小規模から中規模の Laravel アプリケーションで Database Queue Driver を使ってきた。その一方で、「Taylor Otwell 本人が、本番環境での使用は想定していないと言っている」という話がずっと気になっていた。

> For years, I've relied on the Database Queue Driver for small and mid-sized Laravel applications, despite a persistent whisper in my ear warning me, "Taylor Otwell himself says it was not intended for production."

ところが、最近の Laravel Podcast で Taylor が、データベースのキューは堅牢になってきたので本番でもキューに database ドライバを使える、と何気なく話した。

> So I was a bit surprised when Taylor casually mentioned in one of the recent Laravel Podcast episodes that queues in the database "have become more and more robust, so you can actually use the database driver for queues in production."

実際には 2024 年の新しい話ではない。数年前から 2016 年ごろほどの問題ではなくなっていて、Laravel の元社員でキューシステムに詳しい Mohammad Said も、2021 年の時点でこのことに触れていた。

> It turns out that this is not actually news from 2024, but has not been as much of a problem for several years as it was in 2016. Mohammad Said, a former Laravel employee and an expert on the queuing system for Laravel, already addressed this in 2021

## キーワード

- [[laravel|Laravel]]

%%

## 自分の理解

同意できる点、疑問に思った点、試してみたいこと。書くときはこのコメントを外す
%%

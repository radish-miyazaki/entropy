---
title: sidekiq-throttled の閾値は複数 Worker 間で共有される
description: sidekiq-throttled の閾値はプロセスの数によらずすべての Sidekiq インスタンスで共有され、プロセスごとに分けるには key_suffix を使う
tags: [blog, ruby-on-rails, sidekiq]
date: 2024-09-05
draft: false
---

## TL;DR

- sidekiq-throttled で設定した閾値は、プロセスごとではなく、すべての [[sidekiq|Sidekiq]] インスタンスや Worker の間で共有される。
- プロセスごとに閾値を分けたいときは、`key_suffix` オプションを使う。

## 結果

Sidekiq のプロセスが複数あるとき、閾値がプロセスごとに適用されるのか、全体で共有されるのかについて、sidekiq-throttled の [Issue #38](https://github.com/ixti/sidekiq-throttled/issues/38) でメンテナが次のように回答している。

> Threshold limitation works perfectly across multiple sidekiq instances/workers.

つまり、閾値はデフォルトでグローバルに適用される。たとえば 1 秒あたり 10 ジョブという閾値は、プロセスが 1 つでも 10 個でも、全体で 1 秒あたり 10 ジョブになる。タイムスタンプには `Time.now` が使われるので、すべてのインスタンスの時刻を同期しておく必要がある。

プロセスごとに閾値を分けたい場合は、`key_suffix` オプションに `proc { $PROCESS_ID }` のような値を渡すと、プロセスごとに独立した閾値になる。

## キーワード

- [[sidekiq|Sidekiq]]
- [[ruby-on-rails|Ruby on Rails]]

## 参考

- https://github.com/ixti/sidekiq-throttled/issues/38

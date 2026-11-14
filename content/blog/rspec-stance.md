---
title: RSpecについて最近話したことと自分のスタンス
description: perform_later で非同期に実行されるジョブの副作用を RSpec で確かめたいときは、ActiveJob::TestHelper の perform_enqueued_jobs を使う
tags: [blog, ruby, rspec]
date: 2023-11-30
draft: false
---

## TL;DR

- [[rspec|RSpec]] で `FooJob.perform_later` が非同期で起こす副作用を確かめたいときは、`perform_enqueued_jobs` を使う。
- `perform_enqueued_jobs` は RSpec ではなく、[[active-job|Active Job]] の `ActiveJob::TestHelper` が提供するメソッドである。

## 背景

あるクラスの処理の中で、`FooJob.perform_later` によってジョブを非同期に実行することがある。そのままテストを実行すると、RSpec は非同期で実行されたジョブの完了を待たないので、期待した結果が返ってこない。参考にした記事には次のように書かれている。

> 何らかのクラスの処理の中で `FooJob.perform_later` が非同期で起こす副作用を確認したいこともあるかもしれない。
> そのまま実行しても非同期で実行されたジョブはRSpecがその処理を待ってくれず、期待した結果が返ってこない。
> その時は `perform_enqueued_jobs` を使うと良い。RSpecではなく、`ActiveJob::TestHelper` のメソッドである。

Controller の中でエンキューしたジョブをテストでだけ即時実行する方法は、[[rails-perform-enqueued-jobs-in-test|Rails の Controller 内でエンキューしたジョブをテストでのみ即時実行する]] にまとめた。

## キーワード

- [[ruby|Ruby]]
- [[rspec|RSpec]]
- [[ruby-on-rails|Ruby on Rails]]
- [[active-job|Active Job]]

## 参考

- https://uvb-76.hatenablog.com/entry/2022/02/18/082114

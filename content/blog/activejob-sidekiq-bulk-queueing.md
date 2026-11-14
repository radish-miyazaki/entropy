---
title: ActiveJob + Sidekiq で bulk queueing する
description: Sidekiq の perform_bulk は ActiveJob からは使えないので、ActiveJob の perform_all_later で一括登録する
tags: [blog, ruby-on-rails]
date: 2025-04-02
draft: false
---

## TL;DR

- [[sidekiq|Sidekiq]] の `push_bulk` や `perform_bulk` は `Sidekiq::Job` でしか使えず、[[active-job|Active Job]] から呼ぶと分かりにくいエラーになる。
- Active Job が提供する `ActiveJob.perform_all_later` を使えば、Sidekiq でもジョブを一括でキューに登録できる。

## 背景

Sidekiq には、bulk queueing のための `push_bulk` と、その薄いラッパである `perform_bulk` がある。しかし [Sidekiq の Wiki](https://github.com/sidekiq/sidekiq/wiki/Bulk-Queueing) によると、これらは Active Job からは使えない。

> This functionality is only available if you use the Sidekiq::Job API; it does not work with ActiveJob.

## 検証

Active Job のジョブで `perform_bulk` を呼ぶと、次のエラーが出た。

```
undefined method `jid=' for #<XxxJob ...> (NoMethodError)
```

代わりに、Active Job 自体が提供する [`perform_all_later`](https://api.rubyonrails.org/v8.0/classes/ActiveJob.html#method-c-perform_all_later) を使う。

```rb
jobs = User.all.map { |user| UsersCleanupJob.new(user) }
ActiveJob.perform_all_later(jobs)
```

[Rails ガイド](https://railsguides.jp/active_job_basics.html#一括登録)によると、`perform_all_later` で複数のジョブを一括で登録すると、Redis やデータベースなどのキューのデータストアとの往復回数が減るので、個別に登録するよりパフォーマンスが上がる。

## 結果

一括登録には、キューのバックエンド側のサポートが必要である。[Rails ガイド](https://railsguides.jp/active_job_basics.html#キューバックエンドのサポート)によると、バックエンドがサポートしていなければ、`perform_all_later` はジョブを 1 件ずつ登録する。Sidekiq については次のように書かれているので、問題なさそうである。

> Sidekiq などの他のバックエンドには push_bulk メソッドがあり、大量のジョブをRedisにプッシュして、ラウンドトリップネットワークの遅延を防ぐようになっています。

## 考察

`jid=` のエラーは、Active Job の初期化処理が正しく行われず、Sidekiq が必要とするメタデータ（`jid`）が設定されないことが原因ではないかと思う。

## キーワード

- [[ruby-on-rails|Ruby on Rails]]
- [[active-job|Active Job]]
- [[sidekiq|Sidekiq]]

## 参考

- [Bulk Queueing - Sidekiq Wiki](https://github.com/sidekiq/sidekiq/wiki/Bulk-Queueing)
- [ActiveJob.perform_all_later - Rails API](https://api.rubyonrails.org/v8.0/classes/ActiveJob.html#method-c-perform_all_later)
- [Active Job の基礎 - Rails ガイド](https://railsguides.jp/active_job_basics.html)

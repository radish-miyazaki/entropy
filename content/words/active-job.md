---
title: Active Job
aliases: []
description: Ruby on Rails で、バックグラウンドジョブを宣言し、差し替え可能なキューイングのバックエンドで実行するフレームワーク
tags: [word, ruby, rails]
date: 2026-11-14
---

## TL;DR

[[ruby-on-rails|Ruby on Rails]] で、バックグラウンドジョブを宣言し、キューイングのバックエンドで実行するためのフレームワーク。非同期処理に共通のインタフェースを提供する。

## なぜ必要か

時間のかかる処理や急がない処理を、リクエストとレスポンスのサイクルから外に出せる。インタフェースが共通なので、ジョブのコードを変えずに、設定だけでバックエンドを切り替えられる。

## 仕組み

ジョブは `app/jobs` に `ApplicationJob` を継承したクラスとして置き、`perform` メソッドに処理を書く。`bin/rails generate job <名前>` で、クラスとテストのファイルを生成できる。

`perform_later` でジョブをキューに入れ、`perform_now` でその場で実行する。`set(wait: ...)` や `set(wait_until: ...)` を使うと、実行を遅らせられる。複数のジョブを一括でキューに入れるには `perform_all_later` を使う。

バックエンドは `config.active_job.queue_adapter` で選ぶ。Rails 8.0 からは、データベースを使う Solid Queue が既定である。ほかに Sidekiq、GoodJob、Resque なども使える。GlobalID の仕組みがあるので、Active Record のオブジェクトをそのまま `perform` の引数に渡せる。

## 例

```ruby
class GuestsCleanupJob < ApplicationJob
  queue_as :default

  def perform(*guests)
    # 後で実行したい処理
  end
end

GuestsCleanupJob.set(wait: 1.week).perform_later(guest)
```

## 注意点

- 既定では、失敗したジョブは再試行されない。再試行や破棄は `retry_on` と `discard_on` で指定する。
- [[activejob-sidekiq-bulk-queueing|ActiveJob + Sidekiq で bulk queueing する]] によると、Sidekiq の `push_bulk` や `perform_bulk` は `Sidekiq::Job` でしか使えず、Active Job から呼ぶと分かりにくいエラーになる。
- テストで使う `perform_enqueued_jobs` は [[rspec|RSpec]] ではなく、Active Job の `ActiveJob::TestHelper` が提供するメソッドである（[[RSpecについて最近話したことと自分のスタンス]]）。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[ruby-on-rails|Ruby on Rails]]

## 出典

- [Active Job Basics - Ruby on Rails Guides](https://guides.rubyonrails.org/active_job_basics.html)
- [[activejob-sidekiq-bulk-queueing|ActiveJob + Sidekiq で bulk queueing する]]
- [[RSpecについて最近話したことと自分のスタンス]]

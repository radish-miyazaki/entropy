---
title: Rails の Controller 内でエンキューしたジョブをテストでのみ即時実行する
description: ActiveJob::TestHelper の perform_enqueued_jobs にブロックを渡すと、その中でエンキューされたジョブをテストでだけ即時実行できる
tags: [blog, ruby-on-rails]
date: 2024-11-13
draft: false
---

## TL;DR

- `ActiveJob::TestHelper` の `perform_enqueued_jobs` にブロックを渡すと、ブロックの中でエンキューされたジョブを、テストでだけ即時実行できる。

## 背景

[[ruby-on-rails|Rails]] の Controller の中でエンキューしたジョブを、テストのときだけ即時実行したかった。

## 検証

[`perform_enqueued_jobs`](https://api.rubyonrails.org/classes/ActiveJob/TestHelper.html#method-i-perform_enqueued_jobs) で、リクエストを送る処理をブロックとして囲む。

```ruby
perform_enqueued_jobs { post path, params: }
```

`perform_enqueued_jobs` の実装を、コメントを付けて読んだ（幅の都合で一部を改変している）。

```ruby
# @param only 実行したいジョブの種類を指定するオプション値
# @param except 実行したくないジョブの種類を指定するオプション値
# @param queue 実行対象のジョブが属するキューを指定するオプション値
# @param at 特定の時刻にエンキューされ得たジョブのみを実行するためのオプション値
def perform_enqueued_jobs(only: nil, except: nil, queue: nil, at: nil, &block)
  # ブロックが渡されていない場合
  unless block_given?
    # キューアダプタとして、テスト用のアダプタ（ActiveJob::QueueAdapters::TestAdapter）がセットされているか
    require_active_job_test_adapter!("perform_enqueued_jobs (without a block)")

    # 引数で渡ってきたオプション値に基づいてエンキューされたジョブを即時実行する
    return flush_enqueued_jobs(only: only, except: except, queue: queue, at: at)
  end

  # テストアダプタが使われていない場合
  unless using_test_adapter?
    # ブロック実行（エラーが発生した場合、代わりに警告を出す）
    return _assert_nothing_raised_or_warn("perform_enqueued_jobs", &block)
  end

  # only, except に不正な値が入っていないかチェック
  validate_option(only: only, except: except)

  # 現在の設定を退避
  old_perform_enqueued_jobs = queue_adapter.perform_enqueued_jobs
  old_perform_enqueued_at_jobs = queue_adapter.perform_enqueued_at_jobs
  old_filter = queue_adapter.filter
  old_reject = queue_adapter.reject
  old_queue = queue_adapter.queue
  old_at = queue_adapter.at

  begin
    # 設定を上書き
    queue_adapter.perform_enqueued_jobs = true
    queue_adapter.perform_enqueued_at_jobs = true
    queue_adapter.filter = only
    queue_adapter.reject = except
    queue_adapter.queue = queue
    queue_adapter.at = at

    # ブロック実行（エラーが発生した場合、代わりに警告を出す）
    _assert_nothing_raised_or_warn("perform_enqueued_jobs", &block)
  ensure
    # 設定を元に戻す
    queue_adapter.perform_enqueued_jobs = old_perform_enqueued_jobs
    queue_adapter.perform_enqueued_at_jobs = old_perform_enqueued_at_jobs
    queue_adapter.filter = old_filter
    queue_adapter.reject = old_reject
    queue_adapter.queue = old_queue
    queue_adapter.at = old_at
  end
end
```

## 考察

ブロックを渡すと、テスト用のキューアダプタの設定を一時的に「エンキューしたら即時実行する」に書き換え、ブロックを実行した後で元に戻している。そのため、即時実行されるのはブロックの中でエンキューされたジョブだけで、ほかのテストには影響しない。ブロックを渡さない場合は、その時点までにエンキューされているジョブをまとめて実行する。

## キーワード

- [[ruby-on-rails|Ruby on Rails]]
- [[ruby|Ruby]]

## 参考

- https://api.rubyonrails.org/classes/ActiveJob/TestHelper.html#method-i-perform_enqueued_jobs

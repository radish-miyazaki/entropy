---
title: Sidekiq
aliases: []
description: スレッドで多くのジョブを並行に処理する、Ruby のバックグラウンドジョブのライブラリ
tags: [word, ruby]
date: 2026-11-14
---

## TL;DR

[[ruby|Ruby]] のバックグラウンドジョブのライブラリ。1 つのプロセスの中でスレッドを使い、多くのジョブを同時に処理する。

## なぜ必要か

処理をバックグラウンドのジョブとして実行できる。[Sidekiq の README](https://github.com/sidekiq/sidekiq) によると、どの Ruby アプリケーションでも使え、[[ruby-on-rails|Rails]] と [[active-job|Active Job]] にも対応している。

## 仕組み

ジョブのキューには Redis（または Valkey、Dragonfly）を使う。ジョブのクラスは `Sidekiq::Job` を include し、インスタンスメソッドの `perform` に処理を書く。クラスメソッドの `perform_async` でキューに入れ、`bundle exec sidekiq` で起動したプロセスが処理する。

OSS 版のほかに、機能を拡張した有償の Sidekiq Pro と Sidekiq Enterprise がある。

## 例

[Getting Started](https://github.com/sidekiq/sidekiq/wiki/Getting-Started) の例は次のとおりである。

```ruby
class HardJob
  include Sidekiq::Job

  def perform(name, count)
    # do something
  end
end

HardJob.perform_async('bob', 5)
HardJob.perform_in(5.minutes, 'bob', 5)
```

## 注意点

`perform` の引数は文字列、整数、真偽値のような、JSON で表せる単純な型にする必要がある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[active-job|Active Job]]
- [[ruby-on-rails|Ruby on Rails]]

## 出典

- [sidekiq/sidekiq](https://github.com/sidekiq/sidekiq)
- [Getting Started - sidekiq Wiki](https://github.com/sidekiq/sidekiq/wiki/Getting-Started)

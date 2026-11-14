---
title: eager_load と preload の使い分け
description: eager_load は LEFT OUTER JOIN で関連先を一度に取得し、preload は別のクエリでまとめて取得する。includes はどちらを使うかを Rails が判断する
tags: [blog, ruby-on-rails]
date: 2025-01-23
draft: false
---

## TL;DR

- `eager_load` は `LEFT OUTER JOIN` で関連先も一度に取得し、`preload` は親を取得した後に関連先を別のクエリでまとめて取得する。
- `includes` は、関連先のカラムを条件や並び順で参照しているかどうかで、`eager_load` と `preload` のどちらを使うかを判断する。複雑なクエリやパフォーマンスが重要な場面では、クエリログを見て直接指定するのがよい。

## 背景

[[ruby-on-rails|Rails]] の Active Record で関連先を読み込むメソッドには `eager_load`、`preload`、`includes`、`joins` があり、使い分けを整理したかった。

## 検証

### eager_load

`eager_load` は、`LEFT OUTER JOIN` で関連先も一度に取得する。ただし、データが巨大になると、かえってパフォーマンスが悪くなる。

### preload

`preload` は、親を取得した後で、関連先を別のクエリでまとめて取得する。`JOIN` はしない。

### includes

`includes` は、`eager_load` と `preload` のどちらを使うかを Rails が内部で判断して呼び出す。判断には `ActiveRecord::Relation#eager_loading?` を使っている。

```ruby
# ActiveRecord::Relation#eager_loading?
def eager_loading?
  @should_eager_load ||=
    eager_load_values.any? ||
    includes_values.any? && (joined_includes_values.any? ||
      references_eager_loaded_tables?)
end
```

`eager_load` が使われるのは、次の 3 つの場合である。

1. `includes` で指定した関連先のカラムを、`where` や `order` で参照している場合。条件は `includes_values.any? && references_eager_loaded_tables?` に当たる。`where` で関連先を参照すると、そのテーブル名が `references_values` に入り、`references_eager_loaded_tables?` がこれを見て `true` を返す。

   ```ruby
   def references_eager_loaded_tables?
     # ...

     # references_values の中で JOIN に含まれていないテーブルがあれば
     # eager load が必要なので true を返す
     !(references_values.map(&:to_s) - joined_tables).empty?
   end
   ```

2. `includes` で指定した関連先に対して、`joins` や `references` を呼び出している場合。`joins` なら `joined_includes_values.any?` が、`references` なら `references_eager_loaded_tables?` が `true` になる。
3. いずれかの関連先に `eager_load` を呼び出している場合。`eager_load_values.any?` が `true` になる。

関連先のカラムを参照していない場合、つまり単に [[n-plus-one-problem|N+1 問題]]を避けたいだけの場合は、`preload` が使われる。

条件に文字列を渡す場合は、`references` で関連を明示的に参照する必要がある。`references` には実際のテーブル名を指定する。

```ruby
# NG
User.includes(:posts).where('posts.name = ?', 'example').to_a

# OK
User.includes(:posts).where('posts.name = ?', 'example').references(:posts).to_a
```

条件をハッシュで指定した場合は、`references` は要らない。

```ruby
User.includes(:posts).where(posts: { name: 'example' })
```

### joins

`joins` は、単に `JOIN` するだけである。ほかの 3 つのメソッドと違って関連先を読み込まないので、関連先のレコードのモデルをキャッシュしない。その分、メモリの消費を抑えられる。

## 考察

`includes` の判断は完璧ではなく、条件も複雑である。たとえば、複数の関連先を指定したとき、関連先ごとに `eager_load` と `preload` を使い分けることはできない。そのため、複雑なクエリを扱う場合やパフォーマンスが重要な場合は、クエリログを分析し、必要に応じて `eager_load` と `preload` を直接指定するのがよい。解析には [`explain`](https://railsguides.jp/active_record_querying.html#explainを実行する) を使う。

## キーワード

- [[ruby-on-rails|Ruby on Rails]]
- [[n-plus-one-problem|N+1 問題]]

## 参考

- https://devdocs.io/rails~8.0/activerecord/querymethods#method-i-eager_load
- https://devdocs.io/rails~8.0/activerecord/querymethods#method-i-preload
- https://devdocs.io/rails~8.0/activerecord/querymethods#method-i-includes
- https://devdocs.io/rails~8.0/activerecord/querymethods#method-i-joins
- https://railsguides.jp/active_record_querying.html#eager-load
- https://railsguides.jp/active_record_querying.html#preload
- https://railsguides.jp/association_basics.html#includes
- https://railsguides.jp/active_record_querying.html#includes
- https://railsguides.jp/active_record_querying.html#joins
- https://railsguides.jp/active_record_querying.html#explainを実行する
- https://zenn.dev/mithuami/articles/c4b0e9694182d1
- https://qiita.com/k0kubun/items/80c5a5494f53bb88dc58
- https://qiita.com/Kazuyaa/items/ec663856925476f237e3
- https://moneyforward-dev.jp/entry/2019/04/02/activerecord-includes-preload-eagerload/

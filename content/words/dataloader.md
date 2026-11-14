---
title: DataLoader
aliases: []
description: バッチ処理とキャッシュによって、データベースなどからのデータ取得を効率化するライブラリ
tags: [word, graphql]
date: 2024-09-24
---

## TL;DR

アプリケーションのデータ取得層の一部として、バッチ処理とキャッシュによってデータ取得を効率化するライブラリ。もとは [[javascript|JavaScript]] のライブラリだが、[[go|Go]] など他の言語にも同じ名前のライブラリがある。

## なぜ必要か

[[graphql|GraphQL]] では [[graphql-resolver|Resolver]] がフィールドごとに実行されるので、[[n-plus-one-problem|N+1 問題]]が起きやすい。DataLoader はリクエストをまとめて処理することで、これを防ぐ。

## 仕組み

### Batching

データソースへのアクセスを一定の期間待ち、その間に来たリクエストをまとめて処理する。発行される SQL は次のようになる。

```sql
SELECT * FROM author
SELECT * FROM post WHERE author_id IN (1, 2, 3)
SELECT * FROM tag WHERE post_id IN (1, 2, 3, 4)
```

バッチ関数（Batch Function）を定義して `DataLoader` のコンストラクタに渡す。バッチ関数は `key` の配列を受け取り、対応する `value` の配列か `Error` を返す。このとき、`key` と `value` の配列は長さと順序が同じでなければならない。

`key` は `loader.load` で登録し、戻り値は対応する `value` の `Promise` になる。複数の `key` は `loader.loadMany` で取得する。

```ts
class PostDataSource {
  private loader = new DataLoader(async (keys: readonly number[]) => {
    const posts = await getPostsByAuthorIds(keys)
    return keys.map((key) => posts.filter((post) => post.author_id === key))
  })

  async getPostsBy(authorId: number) {
    return this.loader.load(authorId)
  }
}
```

### Caching

`load` に渡した `key` と、対応する `value` の組をメモ化する。同じ DataLoader のインスタンスで同じ `key` の値を何度も取得するときは、メモ化した値を返す。性能の向上と、データソースへの負荷の軽減が期待できる。

## 注意点

DataLoader のインスタンスはリクエストごとに作るべきである。そうしないと、ユーザやコンテキストの異なるリクエストからキャッシュが参照されたり、キャッシュがメモリに溜まり続けたりする。[[apollo-server|Apollo Server]] では、`context` の `dataSources` をリクエストごとに初期化すれば、インスタンスの寿命を 1 つのリクエストに限定できる。

```ts
const { url } = await startStandaloneServer(apolloServer, {
  context: async () => ({
    dataSources: {
      posts: new PostsDataSource(),
      tags: new TagsDataSource(),
    },
  }),
})
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[n-plus-one-problem|N+1 問題]]
- [[graphql-n-plus-one|GraphQL における N+1 問題の発生しやすさはデメリットなのか]]
- [[graphql-resolver|Resolver]]
- [[apollo-server|Apollo Server]]

## 出典

- [graphql/dataloader - GitHub](https://github.com/graphql/dataloader)
- [graph-gophers/dataloader - GitHub](https://github.com/graph-gophers/dataloader)

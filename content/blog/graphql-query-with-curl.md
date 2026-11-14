---
title: curl で GraphQL クエリを実行する
description: curl で JSON のボディに query を入れて POST すれば、GraphQL クエリを実行できる
tags: [blog, graphql]
date: 2024-09-24
draft: false
---

## TL;DR

- [[graphql|GraphQL]] のクエリは、[[curl|curl]] で `{"query": "..."}` を JSON のボディにして POST するだけで実行できる。

## 背景

[[graphql-query-with-fetch|fetch で GraphQL クエリを実行する]] で、[[fetch-api|Fetch API]] からクエリを実行できることを確かめた。同じリクエストを curl でも送ってみた。

## 検証

```sh
$ curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "query { authors { name posts { id tags { name } } } }"}'
```

## キーワード

- [[graphql|GraphQL]]
- [[curl|curl]]

## 参考

- [[graphql-query-with-fetch|fetch で GraphQL クエリを実行する]]

---
title: N+1 問題
aliases: []
description: 1 回の処理の中で、データベースの呼び出しが N+1 回発生してしまうパフォーマンスのアンチパターン
tags: [word, パフォーマンス]
date: 2024-09-23
---

## TL;DR

1 つのビジネストランザクションの中で、データベースの呼び出しが N+1 回発生してしまう、パフォーマンスのアンチパターン。一覧を 1 回取得したあと、その N 件それぞれについて関連データを取得すると起きる。

## 例

次のコードでは、全ユーザを取得する SQL が 1 回、各ユーザの投稿を取得する SQL が N 回呼ばれている。

```javascript
const users = await getUsers()
for (const user of users) {
  const posts = await getPostsByUserId(user.id)
  // ...
}
```

解決するには、Eager Loading や `JOIN` を使うか、N 回のクエリを 1 回にまとめる。

```javascript
const users = await getUsers()
const userIds = users.map((user) => user.id)
const posts = await getPostsByUserIds(userIds)
```

[[graphql|GraphQL]] では、[[graphql-resolver|Resolver]] がフィールドごとに実行されるので N+1 問題が起きやすい。一般には [[dataloader|DataLoader]] を使って避ける（[[graphql-n-plus-one|GraphQL における N+1 問題の発生しやすさはデメリットなのか]]）。

## 自分の理解

データベースの呼び出しに限らず、API の呼び出しなど、コストのかかる I/O でも同じ問題が起こりうる。

## 関連

- [[graphql-n-plus-one|GraphQL における N+1 問題の発生しやすさはデメリットなのか]]
- [[dataloader|DataLoader]]
- [[eager-load-vs-preload|eager_load と preload の使い分け]]

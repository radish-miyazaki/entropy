---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 › null値を型の外側に押しやる
description: ある値が null かどうかが別の値の null と暗黙に連動する設計を避け、値をまとめて全体が null か非 null になるようにする項目
tags: [book-chapter, typescript]
date: 2025-05-06
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 33
---

## TL;DR

- ある値が `null` かどうかが、別の値が `null` かどうかと暗黙に連動する設計を避ける。
- 関連する値を 1 つのオブジェクトや配列にまとめ、全体が `null` か非 `null` のどちらかになるようにする（`null` を外側に押しやる）。
- クラスは、すべての値がそろってからインスタンスを作るようにし、プロパティを nullable にしない。

## 内容

### null を外側に押しやる

ある値が `null` かどうかが、別の値が `null` かどうかと暗黙に関連していると、人間にとっても型チェッカにとってもコードが複雑になる。これを避けるには、関連する値を 1 つのオブジェクトや配列にまとめ、全体が `null` か非 `null` のどちらかになるようにする。つまり、`null` を API の外側に押しやる。

次の `extent` では、`min` が `null` かどうかが `max` が `null` かどうかと連動している。戻り値の型は `(number | undefined)[]` になる。

```ts
// NG
function extent(nums: Iterable<number>) {
  let min, max
  for (const num of nums) {
    if (!min) {
      min = num
      max = num
    } else {
      min = Math.min(min, num)
      max = Math.max(max, num)
    }
  }
  return [min, max]
} // 戻り値の型: (number | undefined)[]
```

`min` と `max` を 1 つのタプルにまとめると、全体が `null` か非 `null` のどちらかになる。戻り値の型は `[number, number] | null` になる。

```ts
// OK
function extent(nums: Iterable<number>) {
  let minMax: [number, number] | null = null
  for (const num of nums) {
    if (!minMax) {
      minMax = [num, num]
      continue
    }
    const [oldMin, oldMax]: [number, number] = minMax
    minMax = [Math.min(num, oldMin), Math.max(num, oldMax)]
  }
  return minMax
} // 戻り値の型: [number, number] | null
```

### 完全に非 null なクラスを作る

クラスのプロパティが nullable だと、そのぶん管理する状態が複雑になる。すべての値がそろってからインスタンスを作るようにし、完全に非 `null` なクラスにできないか検討する。プロパティを `Promise` に置き換える方法も、すべてのメソッドを非同期にせざるを得なくなり、かえってコードが混乱するので避ける。

```ts
// NG
class UserPosts {
  user: UserInfo | null
  posts: Post[] | null

  constructor() {
    this.user = null
    this.posts = null
  }

  async init(userId: string) {
    return Promise.all([
      async () => (this.user = await fetchUser(userId)),
      async () => (this.posts = await fetchPostsForUser(userId)),
    ])
  }
}
```

```ts
// OK
class UserPosts {
  user: UserInfo
  posts: Post[]

  constructor(user: UserInfo, posts: Post[]) {
    this.user = user
    this.posts = posts
  }

  static async init(userId: string): Promise<UserPosts> {
    const [user, posts] = await Promise.all([fetchUser(userId), fetchPostsForUser(userId)])
    return new UserPosts(user, posts)
  }
}
```

避けられない場合もある。たとえば、データを部分的にしか読み込んでいなくても操作を実行する必要がある場合である。

## キーワード

- [[typescript|TypeScript]]
- [[tuple|タプル]]
- [[promise|Promise]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

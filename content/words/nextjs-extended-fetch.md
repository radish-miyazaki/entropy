---
title: Next.js による fetch の拡張
aliases: []
description: Next.js が静的データをキャッシュするために拡張した fetch。Next.js 14 まではデフォルトでキャッシュし、15 からはキャッシュしない
tags: [word, next.js]
date: 2024-08-21
---

## TL;DR

[[nextjs|Next.js]] は、静的データをキャッシュするために `fetch` を拡張している。Next.js 14 まではデフォルトでキャッシュし、Next.js 15 からはデフォルトでキャッシュしなくなった。

## なぜ必要か

静的データとは、更新頻度が低く参照頻度が高い、誰もが共有できるデータである（商品概要、ブログ記事、ニュース記事など）。動的データとは、更新頻度が高く、アクセスできる人が限られたデータである（閲覧履歴、商品の在庫数、ログインユーザの情報など）。静的データをキャッシュすると、Web API サーバへのアクセス回数を減らせる。データ取得の遅延も減り、画面の表示も速くなる。

## 仕組み

### Next.js 14 まで

`fetch` はデフォルトで静的データの取得として扱われ、結果はキャッシュされる（[[data-cache|Data Cache]]）。キャッシュしたデータは `.next/cache/fetch-cache` に保存される。動的データとして扱いたいときは、第 2 引数に `{ cache: "no-store" }` を渡す。

```ts
fetch("https://...", { cache: "no-store" })
```

### Next.js 15 から

デフォルトでキャッシュされなくなった。キャッシュするには、第 2 引数に `{ cache: "force-cache" }` を渡す。

## 注意点

拡張元の `fetch` と同じく、400 以上のステータスコードが返っても Promise は reject されない。

> fetch() のプロミスは、サーバーがエラーを示す HTTP ステータスコード（404、504 など）を返しても拒否されません。

> 代わりに、 then() ハンドラーで Response.ok や Response.status プロパティをチェックする必要があります。

次のように `Response.ok` を確かめる `handleSucceed` を `then` に渡せばよい。

```ts
export class FetchError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

export const handleSucceed = async (res: Response) => {
  const data = await res.json()
  if (!res.ok) {
    throw new FetchError(res.statusText, res.status)
  }
  return data
}
```

```ts
fetch("...").then(handleSucceed)
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[fetch-api|Fetch API]]
- [[data-cache|Data Cache]]
- [[nextjs-caching|Next.js の 4 種類のキャッシュ]]
- [[server-rendering-strategies|Server Rendering Strategies]]

## 出典

- [Functions: fetch - Next.js](https://nextjs.org/docs/app/api-reference/functions/fetch)
- [Upgrading: Version 15 - fetch requests - Next.js](https://nextjs.org/docs/app/building-your-application/upgrading/version-15#fetch-requests)

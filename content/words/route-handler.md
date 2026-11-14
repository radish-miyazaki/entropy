---
title: Route Handler
aliases: []
description: Next.js の App Router で、route.ts に HTTP メソッドごとの関数を書いて Web API を作る仕組み
tags: [word, next.js, app-router]
date: 2024-08-23
---

## TL;DR

[[nextjs|Next.js]] の [[app-router|App Router]] で Web API を作る仕組み。[[route-segment|Route Segment]] のフォルダに [[route-ts|route.ts]] を置き、[[http|HTTP]] メソッドに対応する関数を `export` する。

## なぜ必要か

主な用途は、ブラウザからの HTTP リクエストの処理である。[[cookie|Cookie]] からのログインユーザの参照を Next.js に任せ、コンポーネントはエンドポイントを呼ぶだけで済む。

## 仕組み

`export` する関数の名前が HTTP メソッドに対応する。使えるメソッドは `GET`、`POST`、`PUT`、`PATCH`、`DELETE`、`HEAD`、`OPTIONS` である。リクエストされたメソッドが `export` されていなければ、405 Method Not Allowed を自動で返す。

Route Handler は Web 標準の [[fetch-api|Fetch API]] に準拠している。関数が受け取る `NextRequest` は Fetch API の `Request` に、返す `NextResponse` は `Response` に準拠する。ステータスコードは、`NextResponse.json()` の第 2 引数で指定できる。

```ts
if (!session) {
  return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
}
```

### Static と Dynamic

Route Handler にも、[[server-rendering-strategies|Server Rendering Strategies]] と同じく Static と Dynamic があり、ビルド時に決まる。

Static Route Handler は、レスポンスをキャッシュファイルとして出力し、複数のリクエストで使い回す（[[nextjs-extended-fetch|Next.js による fetch の拡張]]）。

Next.js 14 までは Static がデフォルトだった。[[dynamic-routes|Dynamic Segment]] や `cookies()` などの Dynamic Functions を使う、`GET` で `Request` を参照する、`GET` 以外を `export` する、`dynamic` に `"force-dynamic"` を指定する、のどれかで Dynamic になった。

Next.js 15 からは Dynamic がデフォルトになり、キャッシュされなくなった。`GET` をキャッシュするには、[[route-segment-config|Route Segment Config]] で `export const dynamic = 'force-static'` を指定する。

## 例

`app/api/hello/route.ts` に書くと、`/api/hello` へのリクエストを処理する。

```ts
export async function GET() {
  return new NextResponse("Hello, Next.js!")
}
```

[[client-component|Client Component]] からは、エンドポイントを呼ぶだけでよい。

```tsx
"use client"

export function LikeButton({ photoId }: { photoId: string }) {
  return (
    <button
      onClick={() => {
        fetch(`/api/photos/${photoId}/like`, { method: "POST" })
      }}
    >
      いいね
    </button>
  )
}
```

```ts
export async function POST(_: Request, { params }: { params: { photoId: string } }) {
  console.log(`photoId: ${params.photoId} が「いいね」されました`)
  return Response.json({ liked: true })
}
```

## 注意点

同じ階層に [[page-tsx|page.tsx]] も置くと、衝突してエラーになる。

## 自分の理解

Static になるかどうかに HTTP メソッドは関係ないようだった。Dynamic になる条件は日本語訳にはあったが原文から消えていた。Next.js 15 で Dynamic がデフォルトになったためだと思う。`"next": "14.2.5"` で Dynamic に切り替わることは確認した。

## 関連

- [[route-ts|route.ts]]
- [[fetch-api|Fetch API]]
- [[route-segment-config|Route Segment Config]]
- [[server-rendering-strategies|Server Rendering Strategies]]

## 出典

- [Route Handlers - Next.js](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Upgrading: Version 15 - Next.js（Route Handlers）](https://nextjs.org/docs/app/building-your-application/upgrading/version-15#route-handlers)
- [Request - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/Request)
- [Response - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/Response)
- [ルートハンドラー（キャッシュのオプトアウト）- Next.js 日本語訳](https://ja.next-community-docs.dev/docs/app-router/building-your-application/routing/route-handlers#キャッシュのオプトアウト)

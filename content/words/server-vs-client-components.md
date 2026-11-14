---
title: Server Component vs Client Component
aliases: []
description: React Server Component と Client Component のどちらを使うべきかの判断基準
tags: [word, react, next.js]
date: 2024-08-20
---

## TL;DR

[[react-server-component|Server Component]] と [[client-component|Client Component]] の使い分け。データの取得やバックエンドへのアクセスは Server Component、イベントや状態を扱うなら Client Component を使う。

## 仕組み

### Server Component を使うべきケース

- データを取得する。クライアントとサーバの間の[[request-waterfall|リクエストウォーターフォール]]を防ぎ、やり取りの回数を減らせる
- サイズの大きいファイルを扱う。クライアントに送る JavaScript を小さくできる
- バックエンドのリソースに直接アクセスする
- アクセストークンや API キーなどの機密情報を扱う

### Client Component を使うべきケース

- イベントリスナを扱う
- コンポーネント内に状態を持つ
- ブラウザ専用の API を使う
- `useState`、`useEffect`、`useReducer` などの [[react-hooks|React Hooks]] で、状態やライフサイクルを扱う
- React のクラスコンポーネントを使う

## 注意点

すべてを覚えておく必要はない。不適切な実装をするとエラーが出るので気付ける。たとえば、Client Component でしか使えない `useState` を Server Component で使うと、次のようになる。

```tsx
export default async function ServerComponent() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts")
  const posts = await res.json()
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <a href={post.url}>{post.title}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

> You're importing a component that needs useState. It only works in a Client Component but none of its parents are marked with "use client", so they're Server Components by default.

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[react-server-component|React Server Component]]
- [[client-component|Client Component]]
- [[use-client-boundary|use client は境界を宣言する]]

## 出典

- [Composition Patterns - Next.js](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns)

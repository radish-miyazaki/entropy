---
title: NextAuth.js (v4) を Next.js (v14) に導入する
description: NextAuth.js v4 を Next.js v14 に導入する手順。getServerSession を使うなら開発環境でも NEXTAUTH_SECRET が必要になる
tags: [blog, next.js, nextauth.js]
date: 2024-08-29
draft: false
---

## TL;DR

- [[nextauth-js|NextAuth.js]] v4 を [[nextjs|Next.js]] v14 に導入する手順を、環境変数、Middleware、`NextAuthOptions`、[[route-handler|Route Handler]]、`getServerSession` の順にまとめた。
- 公式ドキュメントでは `NEXTAUTH_SECRET` は本番環境でのみ必須とされているが、`getServerSession` を使う場合は開発環境でも設定しないとエラーになる。

## 環境

- NextAuth.js v4
- Next.js v14

## 検証

### 1. 環境変数 NEXTAUTH_SECRET を設定する

[公式ドキュメント](https://next-auth.js.org/configuration/options#secret)には、`secret` について次のように書かれている。

> - Default value: string (SHA hash of the "options" object) in development, no default in production.
> - Required: Yes, in production!

しかし、`getServerSession` を使っていると、開発環境でも次のエラーが出た。

```javascript
{
  message: 'decryption operation failed',
  stack: 'JWEDecryptionFailed: decryption operation failed\n' +
    '    at gcmDecrypt (webpack-internal:... +
    '    at decrypt (webpack-internal:...\n' +
    '    at flattenedDecrypt (webpack-internal:...\n' +
    '    at async compactDecrypt (webpack-internal:\n' +
    '    at async jwtDecrypt (webpack-internal:...\n' +
    '    at async Object.decode (webpack-internal:...\n'
    '    at async Object.session (webpack-internal:...\n' +
    '    at async AuthHandler (webpack-internal:...\n' +
    '    at async getServerSession (webpack-internal:...',
  name: 'JWEDecryptionFailed'
}
```

`getServerSession` の中では [[jwt|JWT]] のセッションをデコードしており、そのときに `secret` が使われるようである。公式ドキュメントにも次の記載がある。

> A random string is used to hash tokens, sign/encrypt cookies and generate cryptographic keys.

値は `openssl` コマンドで生成した文字列を使うとよい。

```sh
$ openssl rand -base64 32
```

これを `NEXTAUTH_SECRET=<生成した文字列>` のように設定する。

### 2. Middleware を置く

[Middleware](https://next-auth.js.org/configuration/nextjs#middleware) を使うと、特定の URL パターンにマッチするルートを、認証が必要なルートとして扱える。次のコードでは、未認証の状態で `/profile` にアクセスするとログイン画面にリダイレクトされる。

```ts
// src/middleware.ts
export { default } from "next-auth/middleware"

export const config = { matcher: ["/profile"] }
```

### 3. NextAuthOptions を設定する

[`NextAuthOptions`](https://next-auth.js.org/configuration/options#options) は、NextAuth.js を初期化するときに渡す設定値の型である。

```ts
import NextAuth from "next-auth"

const authOptions: NextAuthOptions = {
  // ...
}
const handler = NextAuth(authOptions)
```

[`adapter`](https://next-auth.js.org/configuration/options#adapter) には、ユーザやアカウントのデータを[[persistence|永続化]]するアダプタを指定する。次は [[prisma-client|Prisma Client]] を使う例である。

```ts
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma" // Prisma Client

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  // ...
}
```

[`providers`](https://next-auth.js.org/configuration/options#providers) には、利用する [[oauth|OAuth]] のサービスを複数指定できる。次は Google の例である。

```ts
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  // ...
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],
  // ...
}
```

[`callbacks`](https://next-auth.js.org/configuration/callbacks) では、次の 4 つのタイミングで呼ばれるコールバック関数を定義できる。

- `signIn`: ユーザがサインインしようとしたときに呼ばれる。主にメールアドレス認証で役に立つ。`true` を返すとサインインを許可し、`false` を返すと許可せずにデフォルトのエラーメッセージを表示する。文字列を返すと、その URL にリダイレクトする。
- `redirect`: サインインやサインアウトのときなど、コールバック URL にリダイレクトされるたびに呼ばれる。
- `jwt`: JWT の作成時（サインイン）や更新時（クライアントでセッションにアクセスしたとき）に呼ばれる。`session.strategy` が `jwt` のときだけ有効で、戻り値は暗号化されて [[cookie|Cookie]] に保存される。
- `session`: セッションがチェックされるたびに呼ばれる。具体的には、クライアントサイドの `useSession`、サーバサイドの `getServerSession`、`/api/auth/session` へのアクセスで呼ばれる。`jwt` の後に呼ばれるので、`jwt` で保存したデータを受け取れる。

```ts
export const authOptions: NextAuthOptions = {
  // ...
  callbacks: {
    async jwt({ token, user }) {
      const dbUser = await prisma.user.findFirst({
        where: { email: token.email },
      })
      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }
      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      }
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }
      return session
    },
  },
}
```

### 4. Route Handler を置く

NextAuth.js は専用の Route Handler、`api/auth/[...nextauth]/route.ts` を使う（[ドキュメント](https://next-auth.js.org/configuration/initialization#route-handlers-app)）。ここでは `NextAuth` の戻り値を `GET` と `POST` として `export` する。認可サーバからのリダイレクト URL も、この Route Handler で処理する。

```ts
// api/auth/[...nextauth]/route.ts
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
```

### 5. getServerSession を使う

[`getServerSession`](https://next-auth.js.org/configuration/nextjs#getserversession) は、サーバサイドでログイン情報を参照するための関数で、`NextAuthOptions` を引数に受け取る。クライアントサイドでは [`useSession`](https://next-auth.js.org/getting-started/client#usesession) を使う。

```tsx
export default async function Page() {
  const session = await getServerSession(authOptions)
  const profile = await prisma.profile.findUnique({
    where: { userId: session?.user.id },
  })

  return /* ... */
}
```

毎回 `authOptions` を渡すのは手間なので、あらかじめ適用した関数を用意しておくとよい。ついでに [[react-cache|React.cache]] も適用しておく。

```ts
import { getServerSession as originalGetServerSession } from "next-auth"

export const getServerSession = cache(async () => {
  return originalGetServerSession(authOptions)
})
```

## キーワード

- [[nextauth-js|NextAuth.js]]
- [[nextjs|Next.js]]
- [[jwt|JWT]]
- [[oauth|OAuth]]
- [[cookie|Cookie]]
- [[persistence|永続化]]
- [[prisma-client|Prisma Client]]
- [[route-handler|Route Handler]]
- [[react-cache|React.cache]]

## 参考

- https://next-auth.js.org/configuration/options#secret
- https://next-auth.js.org/configuration/nextjs#middleware
- https://next-auth.js.org/configuration/options#options
- https://next-auth.js.org/configuration/callbacks
- https://authjs.dev/getting-started/adapters/prisma
- https://next-auth.js.org/getting-started/example#add-api-route
- https://next-auth.js.org/configuration/initialization#route-handlers-app
- https://next-auth.js.org/configuration/nextjs#getserversession

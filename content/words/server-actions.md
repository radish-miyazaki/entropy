---
title: Server Actions
aliases: []
description: フォームからサーバの非同期関数を直接呼び出せる React の機能
tags: [word, react]
date: 2024-09-16
---

## TL;DR

フォームからサーバの非同期関数を直接呼び出せる [[react|React]] の機能。[[nextjs|Next.js]] ではなく React 本体の機能である。

## なぜ必要か

従来は、API クライアントを通して [[route-handler|Route Handler]] を呼び出していた。Server Actions を使うと、次の利点がある。

- 中間のコード（API クライアント）がなくなる
- ブラウザ向けにバンドルされる API クライアントのコードが減る
- [[hydration|ハイドレーション]]が終わる前にフォームを送信できる

最後の点が大きい。従来は `onSubmit` イベントハンドラで送信していたので、ハイドレーションが終わるまでユーザはフォームを送信できなかった。Server Actions は `<form>` の [`action` 属性](https://developer.mozilla.org/ja/docs/Web/HTML/Element/form#action)を使うので、ハイドレーション前でも送信でき、[[progressive-enhancement|Progressive Enhancement]] が実現できる。

## 仕組み

### use server ディレクティブ

Server Action を使うには `"use server"` ディレクティブを宣言する。このディレクティブは、[[react-server-component|React Server Component]] などサーバサイドのファイルでのみ有効である。宣言する場所は 2 通りある。

1 つ目は、非同期関数の本体の先頭に書く方法である。

```tsx
export default function ServerComponent() {
  async function myAction(formData: FormData) {
    "use server"
    // ...
  }
}
```

2 つ目は、Server Action 専用のファイルを作り、その先頭に書く方法である。ファイル名は自由で、定義した関数は Server Component からも [[client-component|Client Component]] からも import して使える。

```ts
// actions.ts
"use server"

export async function myAction(formData: FormData) {
  // ...
}
```

Server Action の関数は、第 1 引数に Web 標準の [FormData](https://developer.mozilla.org/ja/docs/Web/API/FormData) オブジェクトを受け取り、そこからフォームの入力値を参照する。

### 引数のバインド

hidden フィールドの代わりに、`bind` メソッドで引数を渡すこともできる。`bind` は、いくつかの引数を固定した新しい Server Action を作る。このとき関数は、固定した引数の後ろに `FormData` を受け取る。

```tsx
"use client"

import { myAction } from "./actions"

export default function ClientComponent({ id }: { id: string }) {
  const action = myAction.bind(null, id)

  return (
    <form action={action}>
      <button type="submit">Add to Cart</button>
    </form>
  )
}
```

```ts
export async function myAction(id: string, formData: FormData) {
  // ...
}
```

## 例

Progressive Enhancement を保ったままクライアント側でバリデーションするには、ハイドレーション前の送信ではクライアントのバリデーションを行わず、ハイドレーション後の送信では行えばよい。これは `<form>` の `action` と `onSubmit` を分けると実現できる。`onSubmit` でバリデーションに失敗したら `preventDefault` を呼び、`action` の実行を止める。

```tsx
export function PhotoForm({ photo, categories }: Props) {
  const [formState, formDispatch] = useFormState(updatePhoto, initialFormState({ ...photo }))
  const [clientErrors, setClientErrors] = useState<FieldErrors | undefined>(
    formState.error?.fieldErrors,
  )
  const errors = clientErrors || formState.error?.fieldErrors

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    try {
      const formData = new FormData(event.currentTarget)
      validateFormData(formData)
      setClientErrors(undefined)
    } catch (err) {
      // クライアントのバリデーションに失敗したら action の実行を止める
      event.preventDefault()
      if (!(err instanceof ZodError)) throw err
      setClientErrors(transformFiledErrors(err))
    }
  }

  return (
    <form action={formDispatch} onSubmit={handleSubmit}>
      {/* ... */}
    </form>
  )
}
```

## 自分の理解

[[sveltekit|SvelteKit]] の Form actions とほとんど同じイメージである。

## 関連

- [[use-action-state|useActionState]]
- [[use-form-status|useFormStatus]]
- [[use-optimistic|useOptimistic]]
- [[on-demand-revalidation|On-demand Revalidation]]
- [[zod|Zod]]

## 出典

- [Server Actions - React](https://ja.react.dev/reference/rsc/server-actions)

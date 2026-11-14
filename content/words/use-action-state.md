---
title: useActionState
aliases: []
description: Server Actions の結果に基づいて状態を更新するための React の Hook
tags: [word, react]
date: 2024-09-16
---

## TL;DR

[[server-actions|Server Actions]] の結果に基づいて状態（State）を更新するための [[react|React]] の Hook。React Canary より前のバージョンでは `useFormState` という名前だった。

## 仕組み

```ts
const [state, formAction] = useActionState(fn, initialState)
```

第 1 引数に Server Action の関数、第 2 引数に初期状態を渡す。返ってきた `formAction` を `<form>` の `action` に渡す。Server Action は現在の状態と `FormData` を受け取り、返した値が次の状態になる。

```ts
function action(currentState, formData) {
  // ...
  return "next state"
}
```

[[react-server-component|React Server Component]] と [[client-component|Client Component]] のどちらでも使える。

## 例

Server Action でエラーを処理し、エラーがあればメッセージを表示する。

```ts
// state.ts
export type FormState = {
  message: string | null
}

export const initialFormState: FormState = {
  message: null,
}
```

```ts
// action.ts
"use server"

export async function updateUser(_: FormState, formData: FormData): Promise<FormState> {
  const session = await getServerSession()
  if (!session) {
    return { message: "未認証です。再度ログインしてください" }
  }

  try {
    const { imageUrl, name, screenName, bio } = validateFormData(formData)
    // ユーザ情報を更新する
    revalidateTag(`users/${session.user.id}`)
  } catch (err) {
    return { message: "エラーが発生しました" }
  }

  redirect("/profile")
}
```

```tsx
// index.tsx
export function MyProfileEditForm({ user, profile }: Props) {
  const [formState, formDispatch] = useActionState(updateUser, initialFormState)

  return (
    <form action={formDispatch}>
      {formState?.message && <AlertLabel>{formState.message}</AlertLabel>}
      {/* ... */}
    </form>
  )
}
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[server-actions|Server Actions]]
- [[use-form-status|useFormStatus]]
- [[use-optimistic|useOptimistic]]
- [[on-demand-revalidation|On-demand Revalidation]]

## 出典

- [useActionState - React](https://ja.react.dev/reference/react/useActionState)

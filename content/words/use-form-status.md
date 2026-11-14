---
title: useFormStatus
aliases: []
description: フォームの送信状態を参照する React の Hook
tags: [word, react]
date: 2024-09-16
---

## TL;DR

フォームの送信状態を参照する [[react|React]] の Hook。

## 仕組み

```ts
const { pending, data, method, action } = useFormStatus()
```

`pending` は、フォームが送信中なら `true`、そうでなければ `false` になる。

## 例

送信中はボタンを押せなくし、表示も変える。

```tsx
function Submit() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </button>
  )
}

function Form() {
  return (
    <form action={submitForm}>
      <Submit />
    </form>
  )
}
```

## 注意点

`useFormStatus` は、`<form>` の中でレンダリングされるコンポーネントから呼び出す必要がある。そのため、`<form>` を含む親コンポーネントと、Hook を使う子コンポーネントは分ける。上の例で `Submit` を別のコンポーネントにしているのはこのためである。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[server-actions|Server Actions]]
- [[use-action-state|useActionState]]
- [[react-hooks|React Hooks]]

## 出典

- [useFormStatus - React](https://ja.react.dev/reference/react-dom/hooks/useFormStatus)

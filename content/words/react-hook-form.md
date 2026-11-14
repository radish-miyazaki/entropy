---
title: React Hook Form
aliases: [RHF]
description: 再レンダリングを抑え、バリデーションを簡単に書ける React のフォームライブラリ
tags: [word, react]
date: 2024-09-02
---

## TL;DR

[[react|React]] のフォームライブラリ。パフォーマンスが高く、バリデーションを簡単に書ける。依存関係がなく、サイズも小さい。

## 仕組み

`useState` で入力値を管理する [[controlled-component|Controlled Component]] とは違い、[[uncontrolled-component|Uncontrolled Component]] として入力を扱う。再レンダリングは必要なコンポーネントだけに限られ、`useWatch` を使うと値を読むコンポーネントだけが再レンダリングされる。

バリデーションは、必須、最小文字数、パターン、最小値などのルールをフィールドごとに指定する。外部のスキーマライブラリに任せる resolver も使える。バリデーションを実行するタイミングは、送信時、フォーカスが外れたとき、変更時などから選べる。

## 例

`useForm` が返す `register` で入力をフォームにつなぎ、ルールを指定する。`handleSubmit` で包んだ関数は、バリデーションを通ったときだけ呼ばれる。エラーは `formState.errors` に入る。

```tsx
import { useForm } from "react-hook-form"

type FormValues = { firstName: string }

export function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input {...register("firstName", { required: true, minLength: 2 })} />
      {errors.firstName && <p>名前は 2 文字以上で入力してください</p>}
      <button type="submit">送信</button>
    </form>
  )
}
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[controlled-component|Controlled Component]]
- [[uncontrolled-component|Uncontrolled Component]]
- [[react-hooks|React Hooks]]

## 出典

- [React Hook Form](https://www.react-hook-form.com/)

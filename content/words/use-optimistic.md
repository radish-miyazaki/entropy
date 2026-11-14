---
title: useOptimistic
aliases: []
description: UI を楽観的に更新するための React の Hook
tags: [word, react]
date: 2024-09-16
---

## TL;DR

UI を[[optimistic-updates|楽観的]]に（optimistically）更新するための [[react|React]] の Hook。

## 仕組み

```ts
const [optimisticState, addOptimistic] = useOptimistic(state, updateFn)
```

引数は 2 つある。

- `state`: `useState` などで保持している状態
- `updateFn`: 楽観的に更新した状態をマージして返す関数。「Web API のレスポンスはこうなるだろう」という状態を作って返す。更新前の状態 `currentState` と、楽観的更新の入力値 `optimisticValue` を受け取る

戻り値も 2 つある。

- `optimisticState`: 楽観的な状態。フォームの送信中は `updateFn` が返す値に、それ以外は `state` に等しい
- `addOptimistic`: 楽観的更新を行う関数。[[server-actions|Server Actions]] を実行する前に呼び出す

## 例

写真にコメントを投稿するカスタムフック。入力したコメントを先に一覧へ追加し、送信が終わるまで `sending: true` を付けておく。

```tsx
function useOptimisticUpdate({ photoId, userId, defaultComments }: Props) {
  const formRef = useRef<HTMLFormElement>(null)
  // 親から渡されたコメント一覧を初期状態にする
  const [comments, setComments] = useState(defaultComments)
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (prevComments, newComment: Comment) => [{ ...newComment, sending: true }, ...prevComments],
  )

  async function formAction(formData: FormData) {
    const comment = formData.get("comment")
    if (typeof comment !== "string") return
    const createdAt = new Date().toISOString()

    // 楽観的更新を実行する
    addOptimisticComment({
      id: `comment-${createdAt}`,
      createdAt,
      authorId: userId || "",
      photoId,
      comment,
    })
    formRef.current?.reset()

    // Server Actions を実行し、結果を state に反映する
    const data = await postComment(formData)
    if (!data.comment) return
    setComments([data.comment, ...defaultComments])
  }

  return { optimisticComments, formRef, formAction }
}
```

`postComment` は Server Action で、Web API にコメントを送ったあと、[[on-demand-revalidation|On-demand Revalidation]] でコメント一覧のキャッシュを無効化する。

```ts
export async function postComment(formData: FormData): Promise<FormState> {
  // 認証とバリデーション（省略）
  const { comment: commentData } = await postPhotoComment({
    photoId,
    comment,
    commentatorId,
  })
  revalidateTag(`photos/${photoId}/comments`)
  return handleSuccess(commentData)
}
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[optimistic-updates|楽観的更新]]
- [[server-actions|Server Actions]]
- [[use-action-state|useActionState]]

## 出典

- [useOptimistic - React](https://ja.react.dev/reference/react/useOptimistic)

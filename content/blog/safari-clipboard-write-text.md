---
title: Safari だと API を呼び出した後に writeText を呼んでもクリップボードコピー処理が走らない
description: Safari では、非同期の API 呼び出しを挟むとユーザー操作との関連付けが切れ、Clipboard API の writeText が拒否される
tags: [blog, javascript, safari]
date: 2024-02-07
draft: false
---

## TL;DR

- Safari では、ボタンのクリックなどのユーザー操作から直接呼ばれていない `navigator.clipboard.writeText` は拒否される。
- API 呼び出しのような非同期処理を挟むと、ユーザー操作との関連付けが切れてしまうらしい。`setTimeout` を使う回避策では解決しなかった。

## 背景

ボタンを押すと API を呼び出し、返ってきた値をクリップボードにコピーする処理を実装した。ところが、Safari ではコピーが行われなかった。

## 検証

[MDN の Clipboard API のドキュメント](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText)を見ると、次の記載がある。

> Must be called within user gesture event handlers such as pointerdown or pointerup

つまり Safari では、ボタンのクリックのようなユーザーの操作から直接呼ばれていないクリップボードへのコピーは拒否される。API の呼び出しには非同期処理が入るので、ユーザーの操作とクリップボードへのコピーとの関連付けが消えてしまうようである。

回避策として、非同期処理を強制的に同期的に実行する方法が[紹介されていた](https://teratail.com/questions/4lpz8dxq9bf1bz)ので試した。

```javascript
await new Promise((resolve, reject) => {
  setTimeout(() => {
    navigator.clipboard.writeText(text).then(resolve).catch(reject)
  }, 0)
})
```

## 結果

コピーは行われず、次のエラーが出た。

```
Unhandled Promise Rejection: NotAllowedError: The request is not allowed by the user agent or the platform in the current context, possibly because the user denied permission.
```

`setTimeout` を使う回避策では対応できなかった。

## 考察

別の方法を考える必要がある。1 つは、API から返ってくる値をフロントエンド側で事前に生成しておき、クリック時にはその値をそのままコピーする方法である。もう 1 つは、値を取得した後でコピー用のボタンを別に表示し、ユーザーに押してもらう方法である。Apple が想定しているのは後者の挙動だと思う。

## キーワード

- Clipboard API
- Safari
- [[promise|Promise]]

## 参考

- [Clipboard: writeText() method - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText)
- https://teratail.com/questions/4lpz8dxq9bf1bz

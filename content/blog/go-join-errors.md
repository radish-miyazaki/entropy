---
title: Go で複数のエラーを集約し、呼び出し元で分解する
description: errors.Join で複数のエラーを 1 つにまとめ、呼び出し元では interface{ Unwrap() []error } に型アサーションして個々のエラーを取り出す
tags: [blog, go]
date: 2025-09-05
draft: false
---

## TL;DR

- [[go|Go]] で複数のエラーを 1 つにまとめるには、[`errors.Join`](https://pkg.go.dev/errors#Join) を使う。
- まとめたエラーを分解するには、`interface{ Unwrap() []error }` に型アサーションしてから `Unwrap` メソッドを呼ぶ。

## 背景

複数のエラーを 1 つの `error` として返し、呼び出し元で 1 つずつ処理したかった。

## 検証

### エラーを集約する

`errors.Join` に複数のエラーを渡すと、1 つのエラーにまとめられる。

```go
err1 := errors.New("err1")
err2 := errors.New("err2")
err := errors.Join(err1, err2)
```

### エラーを分解する

集約したエラーを `interface{ Unwrap() []error }` に型アサーションし、`Unwrap` メソッドを呼ぶと、元のエラーのスライスを取り出せる。

```go
errs := err.(interface{ Unwrap() []error })
for _, e := range errs.Unwrap() {
	fmt.Println(e)
}
```

## キーワード

- [[go|Go]]
- [[error-handling|エラー処理]]

## 参考

- [errors.Join - pkg.go.dev](https://pkg.go.dev/errors#Join)

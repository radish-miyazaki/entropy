---
title: Huma
aliases: []
description: OpenAPI 3 と JSON Schema を土台にした、Go で HTTP API を作るためのマイクロフレームワーク
tags: [word, golang]
date: 2024-12-02
---

## TL;DR

[[go|Go]] で HTTP の REST/RPC API を作るためのマイクロフレームワーク。[[openapi|OpenAPI]] 3 と JSON Schema を土台にしており、FastAPI から影響を受けている。

## なぜ必要か

よくある誤りを防ぐガードレールと、実装から生成されるので古くならないドキュメントを提供することを目指している。

## 仕組み

Go の型に付けたタグから OpenAPI 3.1 と JSON Schema を生成し、`/openapi.json` などで公開する。chi などの既存のルーターの上で動く。パス、クエリ、ヘッダ、Cookie のパラメータやリクエストボディを型で受け取り、入力の検証とエラー処理を自動で行う。エラーは RFC 9457 の `application/problem+json` で返す。

## 例

```go
huma.Get(api, "/greeting/{name}", func(ctx context.Context, input *struct {
	Name string `path:"name" maxLength:"30" example:"world" doc:"Name to greet"`
}) (*GreetingOutput, error) {
	resp := &GreetingOutput{}
	resp.Body.Message = fmt.Sprintf("Hello, %s!", input.Name)
	return resp, nil
})
```

`name` の最大長 30 文字という制約は、検証と OpenAPI の両方に反映される。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 出典

- [danielgtaylor/huma](https://github.com/danielgtaylor/huma)

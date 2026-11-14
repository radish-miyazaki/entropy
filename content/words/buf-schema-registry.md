---
title: BSR
aliases: [Buf Schema Registry]
description: Buf が提供する、Protocol Buffers のモジュールを管理・公開・配布するためのホスティングサービス
tags: [word, protocol-buffers]
date: 2024-09-27
---

## TL;DR

[[buf|Buf]] が提供する、[[protocol-buffers|Protocol Buffers]] の API をホスティングする SaaS。proto ファイルの集まりをモジュールとして管理し、公開や配布ができる。

## なぜ必要か

モジュールを公開すると、BSR が各言語の SDK を生成する。そのため、利用者は自分でクライアントのコードを生成しなくてよい。[[go|Go]] なら `go get`、JavaScript や [[typescript|TypeScript]] なら `npm install` で、生成されたコードを使える。

## 仕組み

BSR には、SDK の生成のほかに次の機能がある。

- API ドキュメントを自動で生成する
- API の変更がクライアントに影響しないよう、ポリシーチェックを強制する
- 公開されたモジュールは誰でも使える。たとえば Google の API は `googleapis/googleapis` として公開されている
- [[buf-cli|Buf CLI]] の [[buf-generate|buf generate]] で使う Remote plugins も、BSR で管理されている

## 例

アカウントを作り、Buf CLI でログインする。認証に成功すると、認証情報が `$HOME/.netrc` に保存される。

```sh
$ buf registry login
```

BSR の画面でリポジトリを作ったあと、`buf push` でモジュールを Push する。

```sh
$ buf push
```

生成された SDK は、Go なら `go get` で取り込める。npm では、先に Buf のレジストリを登録してからインストールする。

```sh
$ go get buf.build/gen/go/<ユーザ>/<モジュール>/connectrpc/go@latest
$ npm config set @buf:registry https://buf.build/gen/npm/v1/
```

この SDK を使って [[connect-rpc|Connect]] のサーバとクライアントを実装すると、proto ファイルを手元に置かずに開発できる。Connect で作ったサーバは、Connect、[[grpc|gRPC]]、[[grpc-web|gRPC Web]] のどれでも呼べる。ブラウザから呼ぶときは [[cors|CORS]] の設定が必要になる。

## 注意点

GitHub Actions などの CI 環境で BSR を操作するときは、`.netrc` ではなく環境変数で認証情報を渡すことが推奨されている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[buf|Buf]]
- [[buf-cli|Buf CLI]]
- [[connect-rpc|Connect]]

## 出典

- [Buf Schema Registry](https://buf.build/product/bsr)
- [Explore - BSR](https://buf.build/explore)
- [Generated SDKs](https://buf.build/docs/bsr/generated-sdks/overview)
- [Documentation - BSR](https://buf.build/docs/bsr/documentation/overview)
- [Breaking change policy checks](https://buf.build/docs/bsr/policy-checks/breaking/overview)
- [Plugins](https://buf.build/plugins)
- [Authentication](https://buf.build/docs/bsr/authentication)
- https://zenn.dev/jy8752/books/33743f8091c39d/viewer/9

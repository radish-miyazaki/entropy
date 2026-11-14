---
title: Passport.js
aliases: []
description: Node.js 向けの認証ミドルウェア。認証の方式は Strategy と呼ばれる拡張機能で選ぶ
tags: [word, javascript, typescript, nodejs]
date: 2024-09-06
---

## TL;DR

[[nodejs|Node.js]] 向けの認証ライブラリ（ミドルウェア）。どのような認証を行うかは、Strategy と呼ばれる拡張機能で選ぶ。

## 仕組み

Passport.js 自体は認証の枠組みだけを提供し、具体的な認証の処理は Strategy に任せる。Strategy にはパスワード認証（passport-local）、[[oauth-2|OAuth]]、OpenID などがあり、公式サイトでは 500 を超える Strategy が公開されている。Express ベースの Web アプリケーションであれば、既存のコードをほとんど変えずに組み込める。

公式ドキュメントによると、Passport はリクエストを認証することだけを目的とし、データアクセスなどはアプリケーションに任せる。中心となる概念は、[[middleware|ミドルウェア]]、Strategy、セッションの 3 つである。

多くの Strategy は、アプリケーションが渡す `verify` 関数を使う。Strategy はリクエストから資格情報を取り出し、`verify` を呼んで、それがどのユーザのものかを判定する。`verify` は、成功ならユーザを返す。ユーザが見つからないか資格情報が誤っていれば `false` を返し、データベースが使えないなどの内部エラーのときだけエラーを返す。設定した Strategy は `passport.use()` で登録し、ルートで `passport.authenticate()` にその名前を渡して使う。

## 例

passport-local でパスワード認証を行う例。

```js
var passport = require("passport")
var LocalStrategy = require("passport-local")

passport.use(
  new LocalStrategy(function verify(username, password, cb) {
    // ユーザを探してパスワードを確かめ、
    // エラーなら cb(err)、失敗なら cb(null, false)、成功なら cb(null, user) を呼ぶ
  }),
)

app.post("/login/password", passport.authenticate("local"))
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[nestjs-passport-jwt|NestJS と Passport.js を組み合わせて JWT 認証を実現する]]
- [[jwt|JWT]]

## 出典

- [Passport.js](https://www.passportjs.org/)
- [Strategies - Passport.js](https://www.passportjs.org/packages/)
- [Authentication - Passport.js](https://www.passportjs.org/concepts/authentication/)
- [Strategies - Passport.js Documentation](https://www.passportjs.org/concepts/authentication/strategies/)

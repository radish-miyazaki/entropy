---
title: WebAuthn
aliases: [ウェブ認証 API, Web Authentication API]
description: 公開鍵暗号を使って、Web サイトでの登録、認証、多要素認証を行うためのブラウザの API
tags: [word]
date: 2025-04-12
---

## TL;DR

Web Authentication API の略。パスワードや SMS の代わりに[[public-key-cryptography|公開鍵暗号]]を使って、Web サイトでの登録、認証、多要素認証を行うためのブラウザの API である。

## なぜ必要か

- 署名がサイトのオリジンごとに変わるので、偽サイトではログインできず、フィッシングを防げる。
- サーバには公開鍵しか保存しないので、サーバから情報が漏れても、秘密鍵がなければ認証できない。
- テキストのパスワードはデジタル署名よりも総当たりで破りやすい。パスワードを使わないので、使い回しによる被害も防げる。

## 仕組み

秘密鍵は認証器（端末の生体認証や USB のセキュリティキーなど）に残り、サーバには公開鍵だけを保存する。

登録では、サーバがユーザの情報と乱数のチャレンジをアプリケーションに渡す。アプリケーションが `navigator.credentials.create()` を呼ぶと、認証器がユーザの同意を得て鍵ペアを作り、公開鍵を返す。サーバはチャレンジ、オリジン、署名を検証し、公開鍵を保存する。

認証では、サーバがチャレンジと許可する資格情報の一覧を送る。アプリケーションが `navigator.credentials.get()` を呼ぶと、認証器が秘密鍵でチャレンジに署名する。サーバは保存しておいた公開鍵で署名を検証する。

```js
// 登録
const credential = await navigator.credentials.create({
  publicKey: {
    challenge: new Uint8Array([/* サーバから受け取った乱数 */]),
    rp: { id: "acme.com", name: "ACME Corporation" },
    user: {
      id: new Uint8Array([/* ユーザ固有の ID */]),
      name: "jamiedoe",
      displayName: "Jamie Doe",
    },
    pubKeyCredParams: [{ type: "public-key", alg: -7 }],
  },
})
```

## 例

[[passkey|パスキー]]は、WebAuthn の検出可能な資格情報（discoverable credentials）を使った代表的な例である。

## 注意点

HTTPS などの安全なコンテキストでしか動かない。チャレンジは 16 バイト以上のランダムな値にする。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[passkey|パスキー]]

## 出典

- [ウェブ認証 API - MDN](https://developer.mozilla.org/ja/docs/Web/API/Web_Authentication_API)

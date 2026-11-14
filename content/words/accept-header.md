---
title: Accept
aliases: []
description: クライアントが受け入れられるレスポンスのコンテンツタイプを指定する HTTP リクエストヘッダ
tags: [word, http]
date: 2024-11-15
---

## TL;DR

クライアントが受け入れられるレスポンスのコンテンツタイプを指定する HTTP リクエストヘッダである。

## 仕組み

省略でき、複数の値を指定できる。指定できる値は [RFC 9110 12.5.1 Accept](https://datatracker.ietf.org/doc/html/rfc9110#name-accept) で定義されている。

RFC 9110 によると、値はメディアレンジの並びで、`*/*` はすべてのメディアタイプを、`text/*` のような `type/*` はその型のすべてのサブタイプを表す。各メディアレンジの後ろには `q` パラメータで相対的な重みを付けられる。1 つのメディアタイプに複数のメディアレンジが当てはまるときは、最も具体的なものが優先される。サーバがレスポンスで Accept を送ると、同じリソースへの次のリクエストで好ましいコンテンツタイプを伝えることになる。

## 例

`text/html`、`text/css`、`image/*` などを指定する。

RFC 9110 の例では、`Accept: audio/*; q=0.2, audio/basic` は「`audio/basic` が望ましいが、なければどの音声形式でもよい」という意味になる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[mime-type|MIME タイプ]]
- [[content-type|Content-Type]]
- [[header-field|ヘッダフィールド]]
- [[http-message|HTTP メッセージ]]

## 出典

- [Accept - MDN](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Accept)
- [RFC 9110 12.5.1 Accept](https://datatracker.ietf.org/doc/html/rfc9110#name-accept)

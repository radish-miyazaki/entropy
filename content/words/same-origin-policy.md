---
title: 同一生成元ポリシー
aliases: [Same Origin Policy]
description: 異なるオリジン間でのリソースへのアクセスを制限するブラウザのセキュリティの仕組み
tags: [word, web, セキュリティ]
date: 2024-11-13
---

## TL;DR

異なる[[origin|オリジン]]（Cross-origin）間で、リソースへのアクセスを制限するセキュリティの仕組み。[[xss|XSS]] や [[csrf|CSRF]] などの攻撃を軽減・防止できる。

## 仕組み

[[url-scheme|スキーム]]、[[host|ホスト]]、[[port-number|ポート番号]]がすべて同じとき、オリジンが同じ（Same-origin）とみなす。

`window.opener` のような [[javascript|JavaScript]] の API で異なるオリジンの情報を参照しようとすると、一部の情報は読み書きできないように制限される。

`XMLHttpRequest` や `<img>` で異なるオリジンとネットワーク越しにデータをやり取りする場合は、次の 3 つに分類される。

- **異なるオリジンへの書き込みは許可される。** リンクやフォームの送信がこれに当たる。
- **異なるオリジンのリソースの埋め込みは許可される。** `<iframe>`、`<script>`、`<link>` などのタグで、別のオリジンのリソースを自分の Web サイトに埋め込める。Google マップや [[x|X]] の投稿を埋め込むのがその例である。
- **異なるオリジンからの読み込みは、原則として許可されない。** 読み込みたい場合は、[[cors|CORS]] で明示的に許可する必要がある。

## 例

| URL 1                         | URL 2                         | 同じオリジンか                       |
| ----------------------------- | ----------------------------- | ------------------------------------ |
| `https://www.example.com:443` | `https://www.evil.com:443`    | Cross-origin（ドメイン名が異なる）   |
| `https://www.example.com:443` | `https://abc.example.com:443` | Cross-origin（サブドメインが異なる） |
| `https://www.example.com:443` | `http://www.example.com:443`  | Cross-origin（スキームが異なる）     |
| `https://www.example.com:443` | `https://www.example.com:80`  | Cross-origin（ポート番号が異なる）   |
| `https://www.example.com:443` | `https://www.example.com:443` | Same-origin                          |

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[cors|CORS]]
- [[site-isolation|サイト分離]]
- [[content-security-policy|コンテンツセキュリティポリシー]]
- [[xss|XSS]]
- [[csrf|CSRF]]

## 出典

- [同一オリジンポリシー - MDN Web Docs](https://developer.mozilla.org/ja/docs/Web/Security/Same-origin_policy)

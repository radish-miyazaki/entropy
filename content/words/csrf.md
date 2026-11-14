---
title: CSRF
aliases: [Cross-Site Request Forgery]
description: 信頼されたユーザになりすまし、Web サイトに不正なリクエストを送る攻撃
tags: [word, web, セキュリティ]
date: 2024-11-13
---

## TL;DR

信頼されたユーザになりすまし、Web サイトに不正なコマンドを送る攻撃。

## 仕組み

たとえば、[[url|URL]] に悪意のある引数を含めたリンクを、別のページに埋め込む。

```html
<img src="https://www.example.com/index.php?action=delete&id=123" />
```

この `<img>` が `https://www.example.com` の外のページにあっても、`https://www.example.com` で何らかの権限を持つユーザがそのページを開くと、気づかないうちに `https://www.example.com` への操作を実行してしまう。

## 注意点

対策には、次のようなものがある。

- RESTful な [[rest-api|API]] にする
- [[csrf-token|CSRF トークン]]を使う

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[xss|XSS]]
- [[same-origin-policy|同一生成元ポリシー]]
- [[cookie|Cookie]]

## 出典

- [Zenn の解説記事](https://zenn.dev/kazu1/articles/ba8c7a2a2292fd)

---
title: コンテンツセキュリティポリシー
aliases: [Content Security Policy]
description: Web ページが読み込めるリソースの取得元を制限し、XSS などのリスクを減らすセキュリティポリシー
tags: [word, web, セキュリティ, http]
date: 2024-11-13
---

## TL;DR

Web ページが読み込むリソースの取得元を制御するためのセキュリティポリシー。略して CSP と呼ぶ。

## なぜ必要か

CSP を使うと、ブラウザは Web ページに、許可したドメインからのリソースだけを読み込ませる。これにより、[[xss|XSS]] やインジェクション攻撃などのリスクを減らせる。

## 仕組み

CSP は、[[http|HTTP]] のレスポンスヘッダか、[[html|HTML]] の `<meta>` で定義する。HTTP レスポンスヘッダでは、`Content-Security-Policy` ヘッダを使う。

## 例

```http
Content-Security-Policy: default-src 'self'; img-src *; script-src https://trusted.cdn.com
```

それぞれのディレクティブの意味は次のとおりである。

- `default-src 'self'`: すべての種類のリソースを、同じ[[origin|オリジン]]からだけ読み込む。
- `img-src *`: 画像は、どのオリジンからでも読み込める。
- `script-src https://trusted.cdn.com`: [[javascript|JavaScript]] のスクリプトは、`https://trusted.cdn.com` からだけ読み込める。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[xss|XSS]]
- [[same-origin-policy|同一生成元ポリシー]]
- [[cors|CORS]]

## 出典

- [コンテンツセキュリティポリシー (CSP) - MDN Web Docs](https://developer.mozilla.org/ja/docs/Web/HTTP/CSP)
- [Content-Security-Policy - MDN Web Docs](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Content-Security-Policy)
- [CSP: default-src - MDN Web Docs](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Content-Security-Policy/default-src)
- [CSP: img-src - MDN Web Docs](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Content-Security-Policy/img-src)
- [CSP: script-src - MDN Web Docs](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Content-Security-Policy/script-src)

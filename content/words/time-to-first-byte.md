---
title: Time to First Byte
aliases: [TTFB]
description: ブラウザがページをリクエストしてから、サーバからレスポンスの最初のバイトを受け取るまでの時間
tags: [word, パフォーマンス]
date: 2024-09-18
---

## TL;DR

ブラウザがページをリクエストしてから、サーバからレスポンスの最初のバイトを受け取るまでの時間。リクエストの開始からレスポンスの開始までをミリ秒で表す。

## 仕組み

TTFB には、[[dns|DNS]] の名前解決、[[tcp|TCP]] ハンドシェイク、HTTPS の場合は TLS ハンドシェイクで接続を確立する時間が含まれる。Navigation Timing の値を使うと、次の式で求められる。

```text
TTFB = responseStart - navigationStart
```

web.dev では、0.8 秒以下を良好、1.8 秒を超えると改善が必要としている。ただし TTFB は [[core-web-vitals|Core Web Vitals]] の指標ではないので、目安として扱う。

## 例

各ブラウザの開発者ツールで確認できる。[[chrome-devtools|Chrome DevTools]] では、「ネットワーク」タブで任意のリクエストを選び、「タイミング」タブを開くと表示される。

## 注意点

TTFB が 0.8 秒を超えていても、[[largest-contentful-paint|Largest Contentful Paint]] など他の指標に悪影響がなければ、必ずしも問題ではない。サーバでレンダリングするサイトは、クライアントの JavaScript で描画する SPA より TTFB が長くなりやすい。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[largest-contentful-paint|Largest Contentful Paint]]
- [[core-web-vitals|Core Web Vitals]]

## 出典

- [Time to first byte - MDN Web Docs 用語集](https://developer.mozilla.org/ja/docs/Glossary/Time_to_first_byte)
- [Time to First Byte (TTFB) - web.dev](https://web.dev/articles/ttfb)

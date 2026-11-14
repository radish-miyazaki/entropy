---
title: Next.js の 4 種類のキャッシュ
aliases: []
description: Next.js の App Router が持つ Request Memoization、Data Cache、Full Route Cache、Client-side Router Cache の 4 つのキャッシュ
tags: [word, next.js]
date: 2024-09-20
---

## TL;DR

[[nextjs|Next.js]] には、[[request-memoization|Request Memoization]]、[[data-cache|Data Cache]]、[[full-route-cache|Full Route Cache]]、[[client-side-router-cache|Client-side Router Cache]] の 4 種類のキャッシュがある。前の 3 つはサーバに、最後の 1 つはクライアントにある。

## 仕組み

| 仕組み                                                 | 何をキャッシュするか                 | 場所         | 目的                                                   | キャッシュ期間                                                                  |
| ------------------------------------------------------ | ------------------------------------ | ------------ | ------------------------------------------------------ | ------------------------------------------------------------------------------- |
| [[request-memoization\|Request Memoization]]           | 関数の戻り値                         | サーバ       | React のコンポーネントツリーの中でデータを再利用する   | リクエストごと                                                                  |
| [[data-cache\|Data Cache]]                             | データ                               | サーバ       | ユーザのリクエストやデプロイをまたいでデータを保存する | 永続（[[revalidate\|Revalidate]] 可能）                                         |
| [[full-route-cache\|Full Route Cache]]                 | HTML と [[rsc-payload\|RSC Payload]] | サーバ       | レンダリングのコストを減らし、パフォーマンスを上げる   | 永続（Revalidate 可能）                                                         |
| [[client-side-router-cache\|Client-side Router Cache]] | RSC Payload                          | クライアント | ページ遷移のときのサーバへのリクエストを減らす         | ユーザのセッション、または [[time-based-revalidation\|Time-based Revalidation]] |

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[request-memoization|Request Memoization]]
- [[data-cache|Data Cache]]
- [[full-route-cache|Full Route Cache]]
- [[client-side-router-cache|Client-side Router Cache]]
- [[rsc-payload|RSC Payload]]
- [[revalidate|Revalidate]]

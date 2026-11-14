---
title: Stale-While-Revalidate
aliases: []
description: 古くなったキャッシュをすぐに返しつつ、バックグラウンドで新しい内容を取得して更新するキャッシュ戦略
tags: [word, キャッシュ]
date: 2024-09-19
---

## TL;DR

古くなったキャッシュをすぐに返しつつ、バックグラウンドで新しい内容を取りに行ってキャッシュを更新する仕組み。HTTP では `Cache-Control` ヘッダの `stale-while-revalidate` ディレクティブとして、RFC 5861 で定義されている。

## なぜ必要か

キャッシュをすぐに返す速さと、更新された内容を使う新しさを両立できる。

## 仕組み

`max-age` の期間内は、キャッシュを新鮮なものとしてそのまま使う。`max-age` を過ぎても `stale-while-revalidate` で指定した期間内であれば、古いキャッシュを返しながらバックグラウンドで再検証する。その期間も過ぎると、ネットワークからの応答を待つ。

## 例

```text
Cache-Control: max-age=1, stale-while-revalidate=59
```

この場合、0〜1 秒はキャッシュをそのまま使う。1〜60 秒は古いキャッシュを返し、裏でキャッシュを更新する。60 秒を過ぎるとネットワークから取得する。

[[nextjs|Next.js]] の [[time-based-revalidation|Time-based Revalidation]] や [[nextjs-image|next/image]] の画像キャッシュも、この挙動になる。

## 注意点

`stale-while-revalidate` に対応していないブラウザは、このディレクティブを無視する。その場合も `max-age` は効く。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[time-based-revalidation|Time-based Revalidation]]
- [[revalidate|Revalidate]]
- [[nextjs-image|next/image]]

## 出典

- [stale-while-revalidate - web.dev](https://web.dev/articles/stale-while-revalidate)
- [stale-while-revalidate のケーススタディ - web.dev](https://web.dev/case-studies/ads-case-study-stale-while-revalidate?hl=ja)

---
title: サブセット化
aliases: []
description: 使っている文字だけを抜き出してフォントにし、フォントファイルを軽くする技術
tags: [word, パフォーマンス]
date: 2024-09-19
---

## TL;DR

使っている文字だけを抜き出してフォントにすることで、フォントファイルを軽くする技術。

## なぜ必要か

W3C の Incremental Font Transfer の仕様によると、ブラウザはフォント全体をダウンロードし終えるまで、そのフォントで文字を描画できない。CJK（中国語・日本語・韓国語）のフォントは、WOFF 2 で圧縮しても実用的でないほど大きくなることがある。

## 仕組み

同じ仕様の定義では、フォントのサブセットとは、選んだ文字（コードポイント）、レイアウトの機能、デザインのバリエーションの範囲を描画するのに必要なデータだけを含むように変えたフォントファイルである。

## 例

[[nextjs-font|next/font]] では、[[google-fonts|Google Fonts]] のフォントが自動でサブセット化される。どのサブセットをプリロードするかは `subsets` で指定する。

Next.js のドキュメントによると、サブセット化でフォントファイルが小さくなり、パフォーマンスが上がる。`preload` が `true` のまま `subsets` を指定しないと警告が出る。

## 注意点

フォントを文字の範囲ごとに分け、CSS の `unicode-range` で読み分ける方法では、カーニングや合字のように、別々のサブセットに入った文字どうしをつなぐレイアウトの規則が適用されなくなるので、描画が変わることがある。Incremental Font Transfer は、この点を改善するとしている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[nextjs-font|next/font]]
- [[google-fonts|Google Fonts]]

## 出典

- [Incremental Font Transfer - W3C](https://www.w3.org/TR/IFT/)
- [Font Module - Next.js](https://nextjs.org/docs/app/api-reference/components/font)

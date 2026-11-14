---
title: Google Fonts
aliases: []
description: Google が提供する Web フォントのサービス
tags: [word]
date: 2024-09-19
---

## TL;DR

Google が提供する Web フォントのサービス（[公式サイト](https://fonts.google.com/)）。[[nextjs|Next.js]] では [[nextjs-font|next/font]] を使うと、Google Fonts のフォントを自動でセルフホスティングできる。

## 仕組み

Google Fonts のドキュメントによると、Web ページで使うには 2 つの手順を踏む。まず HTML の `<head>` に、Fonts API のスタイルシートを読み込む `<link>` を書く。URL の `family=` にフォント名を渡し、名前の空白は `+` に置き換える。複数のフォントは `|` で区切り、太さやスタイルはフォント名の後ろに `:` を付けて指定する。次に [[css|CSS]] の `font-family` でそのフォント名を指定する。

## 例

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Droid+Sans&display=swap" />
<style>
  body {
    font-family: "Droid Sans", sans-serif;
  }
</style>
```

`display` パラメータは、フォントの読み込み中の表示を決める CSS の `font-display` を指定する。ドキュメントでは、既定の `auto` 以外の値がたいてい適切だとしている。`subset=` で文字体系を絞ったり、`text=` で使う文字だけを指定してファイルを小さくしたりもできる。

## 注意点

`font-family` には、読み込みに失敗したときのために、Web セーフなフォントを少なくとも 1 つフォールバックとして並べておく。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[nextjs-font|next/font]]
- [[font-subsetting|サブセット化]]

## 出典

- [Get Started with the Google Fonts API - Google for Developers](https://developers.google.com/fonts/docs/getting_started)

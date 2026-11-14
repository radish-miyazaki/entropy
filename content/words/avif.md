---
title: AVIF
aliases: []
description: AV1 の圧縮技術を使う画像形式。WebP よりファイルサイズが小さい一方、エンコードに時間がかかる
tags: [word, パフォーマンス]
date: 2024-09-19
---

## TL;DR

動画の符号化方式 AV1 のデータを HEIF コンテナに格納する画像形式。[[webp|WebP]] よりファイルサイズを小さくできるが、エンコードに時間がかかる。

## 仕組み

MDN によると、非可逆圧縮では同程度の画質の JPEG より 50% ほど小さくなる。可逆圧縮、透過、アニメーション、HDR、広色域にも対応し、ロイヤリティはかからない。

## 例

一般に、WebP と比べてエンコードに 20% ほど長くかかるが、ファイルサイズは 20% ほど小さくなる。[[nextjs-image|next/image]] のように最初のリクエストで画像を変換する仕組みでは、初回は遅いが、その後はキャッシュされるので速くなる。

## 注意点

AVIF はプログレッシブ表示に対応していないので、ファイル全体をダウンロードするまで表示できない。また対応していないブラウザに向けて、`<picture>` 要素などで WebP、JPEG、PNG の代わりを用意するとよい。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[webp|WebP]]
- [[nextjs-image|next/image]]

## 出典

- [Image file type and format guide - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types)
- [Image Component - Next.js](https://nextjs.org/docs/app/api-reference/components/image#formats)

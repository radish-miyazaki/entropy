---
title: WebP
aliases: []
description: Google が開発した、非可逆圧縮と可逆圧縮の両方に対応する Web 向けの画像形式
tags: [word, パフォーマンス]
date: 2026-11-14
---

## TL;DR

Google が開発した Web 向けの画像形式。非可逆圧縮と可逆圧縮の両方に対応し、透過やアニメーションも扱える。

## なぜ必要か

画像を小さくすると、Web ページの表示が速くなる。Google の公式ドキュメントによると、可逆圧縮の WebP は PNG より 26% 小さく、非可逆圧縮の WebP は同じ SSIM の画質の JPEG より 25〜34% 小さい。

## 仕組み

非可逆圧縮では、動画コーデック VP8 のキーフレームと同じ予測符号化を使う。周りのブロックの画素からブロックの値を予測し、その差分だけを符号化する。可逆圧縮では、すでに出てきた画像の断片を再利用し、ローカルなパレットも使う。

透過は、可逆圧縮では 22% のバイトの追加だけで扱える。非可逆圧縮でも透過に対応しており、PNG よりおよそ 3 分の 1 の大きさになる。アニメーションの WebP は、GIF や APNG より小さくできる。

## 例

[[nextjs-image|next/image]] は、ブラウザが対応していれば画像を WebP に変換して配信する。デフォルトの `images.formats` は `['image/webp']` である。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[avif|AVIF]]
- [[nextjs-image|next/image]]

## 出典

- [An image format for the Web - Google for Developers](https://developers.google.com/speed/webp)
- [[nextjs-image|next/image]]

---
title: NativeWind
aliases: []
description: React Native のアプリケーションを Tailwind CSS のクラスでスタイリングするためのライブラリ
tags: [word, react-native, tailwind-css]
date: 2025-04-06
---

## TL;DR

[[react-native|React Native]] のアプリケーションを、[[tailwind-css|Tailwind CSS]] のユーティリティクラスでスタイリングするためのライブラリ。

## なぜ必要か

Web で使っているのと同じクラスベースの書き方で、React Native のコンポーネントにスタイルを当てられる。プラットフォームをまたいでスタイルの書き方をそろえられる。

## 仕組み

公式ドキュメントによると、NativeWind はプラットフォームごとに適したスタイルの仕組みを使う。ネイティブでは、ビルド時に Tailwind のスタイルを `StyleSheet.create` のオブジェクトにコンパイルし、hover や focus などの状態による条件分岐も決めておく。実行時には、小さなランタイムがそのスタイルをコンポーネントに当てる。Web では、React Native Web に `className` の対応を足す小さなポリフィルとして動き、Tailwind が生成した CSS をそのまま使う。

JSX の変換で `className` を扱うので、独自のラッパを作らなくてもサードパーティのコンポーネントに使える。ほかに、メディアクエリやコンテナクエリ、ダークモード、CSS 変数を使ったテーマにも対応している。

## 例

`ios:` のようなプレフィックスを付けると、特定のプラットフォームだけにスタイルを当てられる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[tamagui|Tamagui]]
- [[tailwind-variants|Tailwind Variants]]

## 出典

- [NativeWind](https://www.nativewind.dev/)
- [Introduction - NativeWind](https://www.nativewind.dev/docs)

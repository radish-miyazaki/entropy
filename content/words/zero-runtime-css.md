---
title: Zero-runtime CSS
aliases: []
description: JavaScript や TypeScript のコードに書いた CSS から、ビルド時に CSS ファイルを生成する CSS-in-JS ライブラリ
tags: [word, css, javascript]
date: 2024-08-30
---

## TL;DR

[[javascript|JavaScript]] や [[typescript|TypeScript]] のコードに [[css|CSS]] を直接書く [[css-in-js|CSS-in-JS]] のうち、ビルド時に実際の CSS ファイルを生成するもの。Compile-time CSS とも呼ばれる。

## なぜ必要か

[[runtime-css-in-js|Runtime CSS-in-JS]] と比べて、次の利点がある。

1. **パフォーマンス**: 実行中にスタイルを生成・挿入するオーバーヘッドがないので、ページの読み込みやレンダリングが速くなりうる
2. **予測しやすさ**: スタイルがビルド時に決まるので、実行中に予期しないスタイルの変更や[[side-effect|副作用]]が起きにくい
3. **バンドルサイズ**: ランタイムのコードが要らないので、バンドルサイズを減らせる
4. **[[server-side-rendering|SSR]] の簡素化**: SSR のための追加の設定や手順が減る、またはなくなる
5. **静的解析**: ビルド時にスタイルが生成されるので、ツールや Linter がスタイルを静的に解析しやすい
6. **環境の互換性**: 実行中にスタイルを挿入しにくい環境や、それが推奨されない環境でも動く

## 例

Panda CSS、Goober、Linaria、vanilla-extract、Astroturf、Treat、Compiled などのライブラリがある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[css-in-js|CSS-in-JS]]
- [[runtime-css-in-js|Runtime CSS-in-JS]]

## 出典

- [Why We're Breaking Up with CSS-in-JS](https://dev.to/srmagura/why-were-breaking-up-wiht-css-in-js-4g9b)

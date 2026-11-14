---
title: Runtime CSS-in-JS
aliases: []
description: アプリケーションの実行時にスタイルを解釈して適用する CSS-in-JS ライブラリ
tags: [word, css, javascript]
date: 2024-08-30
---

## TL;DR

[[javascript|JavaScript]] や [[typescript|TypeScript]] のコードに [[css|CSS]] を直接書く [[css-in-js|CSS-in-JS]] のうち、アプリケーションの実行時にライブラリがスタイルを解釈して適用するもの。代表的なライブラリに [[styled-components]] や [[emotion|Emotion]] がある。

## 仕組み

コンポーネントの中で CSS を定義するので、外部の CSS ファイルに頼らずにコンポーネント単体で完結させられる。コンポーネントがレンダリングされるときに、ライブラリがスタイルを変換してドキュメントに挿入する。

## 注意点

実行時にスタイルを扱うため、次の問題がある。

1. **実行時のオーバーヘッド**: レンダリングのたびにスタイルを変換する処理が必要で、その分 CPU を使う。アプリケーションのパフォーマンスに影響することがある
2. **バンドルサイズの増加**: ライブラリの JavaScript をダウンロードする必要がある。Emotion は 7.9 kB、styled-components は 12.7 kB ある
3. **デバッグのしにくさ**: 内部用のコンポーネントを React のツリーに挿入するため、[[react-devtools|React DevTools]] が正常に動かないことがある
4. **ブラウザの追加作業**: CSS のルールを挿入するたびに、ブラウザはそのルールが既存のツリーに当てはまるかを確かめる必要がある。React の並行レンダリングでは、レンダリング中にすべての CSS ルールとすべての DOM ノードについてスタイルの再計算が起き、パフォーマンスが大きく落ちる
5. **[[server-side-rendering|SSR]] やコンポーネントライブラリとの相性**: Emotion を SSR や、Emotion を使う他のコンポーネントライブラリと組み合わせると、Emotion のインスタンスが複数読み込まれる、スタイルの挿入順を制御しきれない、React 17 と 18 で SSR の対応が異なる、といった問題が起きうる

これらを解決する方法として、ビルド時に CSS を生成する [[zero-runtime-css|Zero-runtime CSS]] がある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[css-in-js|CSS-in-JS]]
- [[zero-runtime-css|Zero-runtime CSS]]
- [[styled-components]]

## 出典

- [Why We're Breaking Up with CSS-in-JS](https://dev.to/srmagura/why-were-breaking-up-wiht-css-in-js-4g9b)

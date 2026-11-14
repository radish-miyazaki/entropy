---
title: Container/Presentational Pattern
aliases: []
description: コンポーネントを「どのデータを表示するか」と「どう表示するか」に分けて、関心の分離を促すデザインパターン
tags: [word, フロントエンド]
date: 2025-01-29
---

## TL;DR

コンポーネントを、表示するデータを扱う Container と、データの見せ方を扱う Presentational に分ける[[design-pattern|デザインパターン]]。コンポーネントの[[separation-of-concerns|関心の分離]]を促す。

## 仕組み

Container は、どのようなデータをユーザに表示するかを管理するコンポーネントである。取得したデータを Presentational コンポーネントに渡す。自分ではレンダリングを行わないので、通常はスタイルを持たない。

Presentational は、データをユーザにどのように表示するかを管理するコンポーネントである。Container から Props で受け取ったデータを変更せず、スタイルも含めて意図どおりに表示する。同じ入力に対して同じ出力を返す[[pure-function|純粋関数]]として書ける。

[[react|React]] では、Container の役割を[[custom-hook|カスタムフック]]に持たせることもできる。ただし、Container からそのカスタムフックを呼び出す形にすることも多い。

## 例

React 以外の [[vue|Vue]] や [[svelte|Svelte]] にも適用できる。Vue では、Container の役割に [[composables|Composable]] を使う。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[react-patterns|React Patterns]]
- [[vue-patterns|Vue Patterns]]
- [[hoc-pattern|HOC Pattern]]
- [[svelte5-container-presentational|Svelte5 で Container/Presentational パターン]]

## 出典

- [Container/Presentational Pattern - patterns.dev](https://www.patterns.dev/react/presentational-container-pattern)
- https://qiita.com/andmorefine/items/26739269851ad785658f#コンテナプレゼンテーションパターン
- https://zenn.dev/morinokami/books/learning-patterns-1/viewer/presentational-container-pattern
- https://zenn.dev/cybozu_frontend/articles/design-patterns-in-react#presentational%26containerパターン

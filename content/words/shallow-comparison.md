---
title: Shallow comparison
aliases: []
description: 値を参照の同一性で比べる比較。オブジェクトは中身が同じでも、参照が違えば別の値とみなす
tags: [word, react]
date: 2024-08-27
---

## TL;DR

値を参照の同一性で比べる比較。[[react|React]] は props やメモ化した関数の引数を、`Object.is` による浅い比較で比べる。

## 仕組み

`memo` で包んだコンポーネントは、どれかの props が前回の値と浅い比較で等しくなければ再レンダリングされる。React は各 props を前回の値と `Object.is` で比べる。`Object.is(3, 3)` は `true` だが、`Object.is({}, {})` は `false` になる。

## 注意点

親が再レンダリングのたびに新しいオブジェクトや配列、関数を作ると、中身が同じでも React は変わったとみなす。これを避けるには、props を必要最小限の個別の値にするか、親の側で `useMemo` や `useCallback` を使ってメモ化する。

[[react-cache|React.cache]] の引数の比較も浅い比較なので、プリミティブ値を渡すのがよい。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[react-cache|React.cache]]
- [[memoization|メモ化]]

## 出典

- [memo - React](https://react.dev/reference/react/memo)
- [Shallow comparison の解説（Qiita）](https://qiita.com/minimabot/items/06ee899d1f8f9ab306a5)

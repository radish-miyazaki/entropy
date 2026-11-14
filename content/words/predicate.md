---
title: 述語関数
aliases: []
description: 引数を受け取り、真か偽のどちらかを返す関数
tags: [word]
date: 2026-11-14
---

## TL;DR

引数を受け取り、真（`true`）か偽（`false`）のどちらかを返す関数。数学では、ある集合 X から真偽の 2 値への関数 f : X → B として表され、述語（predicate）や命題（proposition）とも呼ばれる。

## 例

[[xstate|XState]] のガード関数は述語関数で、`true` を返したときだけ状態遷移を許す。`false` を返すと、`actions` も `target` も実行されない。

Effect の [[effect-filter-or-fail|Effect.filterOrFail]] は、第 1 引数の述語関数が `false` を返したとき、第 2 引数で作ったエラーで元の Effect を失敗させる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[xstate|XState]]
- [[effect-filter-or-fail|Effect.filterOrFail]]

## 出典

- [Boolean-valued function - Wikipedia](https://en.wikipedia.org/wiki/Boolean-valued_function)
- [[xstate-basics-with-deno|Deno を用いて xState の基本を学ぶ]]

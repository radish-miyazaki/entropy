---
title: Reagent
aliases: []
description: ClojureScript と React の間にシンプルなインタフェースを提供するライブラリ
tags: [word, clojure]
date: 2024-01-07
---

## TL;DR

[[clojurescript|ClojureScript]] と [[react|React]] の間に、シンプルなインタフェースを提供するライブラリ。[[jsx|JSX]] の代わりに、[[hiccup|Hiccup]] スタイルの DSL で HTML を表現する。

## なぜ必要か

少ない概念で複雑な UI を作れるようにすることを目指している。普通の ClojureScript の関数とデータだけで UI を組み立てられ、標準で十分に速いので、パフォーマンスを意識する場面は少ない。

## 仕組み

コンポーネントは ClojureScript の関数である。小さなコンポーネントを組み合わせて大きなコンポーネントを作り、子のコンポーネントには普通の Clojure のデータを渡す。

UI は ClojureScript の Vector、Map、Keyword などで表す。Vector の最初の要素がタグを表す Keyword で、続けて属性の Map を置き、残りの要素が子になる。

状態は、Reagent 版の `atom` である ratom で持つ。ratom は `clojure.core` の `atom` と同じように動くが、deref されるたびにそれを記録する。ratom を読んでいるコンポーネントは、値が変わると再描画される。

## 例

```clojure
[:p "Hello, " name "!"]
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[clojurescript|ClojureScript]]
- [[react|React]]
- [[hiccup|Hiccup]]

## 出典

- [Reagent](https://reagent-project.github.io/)

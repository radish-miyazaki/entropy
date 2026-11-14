---
title: Hiccup
aliases: []
description: Clojure のベクタをそのまま HTML に変換する、HTML を記述するためのライブラリ
tags: [word, clojure]
date: 2024-01-07
---

## TL;DR

[[clojure|Clojure]] で HTML を記述するためのライブラリ。Clojure のベクタをそのまま HTML に変換する。

## 仕組み

HTML の要素をベクタで、要素の属性をマップで表す。ベクタの最初の要素が要素名になる。2 番目の要素がマップなら、それが属性になる。残りの要素はすべて、その要素の中身になる。

## 例

```clojure
(str (h/html [:ul
  (for [x (range 1 4)]
    [:li x])]))
```

公式の README では、属性を付けた例を紹介している。

```clojure
user=> (require '[hiccup2.core :as h])
user=> (str (h/html [:span {:class "foo"} "bar"]))
"<span class=\"foo\">bar</span>"
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[reagent|Reagent]]

## 出典

- [weavejester/hiccup](https://github.com/weavejester/hiccup)
- [Clojure 入門（ayato-p）: テンプレートエンジン](https://ayato-p.github.io/clojure-beginner/intro_web_development/part4_template_engine.html)

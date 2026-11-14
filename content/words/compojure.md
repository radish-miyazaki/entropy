---
title: Compojure
aliases: []
description: Ring のための小さなルーティングライブラリ
tags: [word, clojure]
date: 2024-01-08
---

## TL;DR

[[ring|Ring]] のための小さなルーティングライブラリ。Web アプリケーションを、小さく独立した部品の組み合わせとして作れる。

## 仕組み

Compojure で定義したルートから、Ring のハンドラ（HTTP リクエストを処理する関数）が作られる。

## 例

公式の README では、2 つのルートから Ring のハンドラを作る例を紹介している。1 つ目は `GET /` を処理し、2 つ目はどのルートにも当てはまらないときの受け皿になる。

```clojure
(ns hello-world.core
  (:require [compojure.core :refer :all]
            [compojure.route :as route]))

(defroutes app
  (GET "/" [] "<h1>Hello World</h1>")
  (route/not-found "<h1>Page not found</h1>"))
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[ring|Ring]]
- [[luminus|Luminus]]

## 出典

- [weavejester/compojure](https://github.com/weavejester/compojure)

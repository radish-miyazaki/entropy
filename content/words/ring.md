---
title: Ring
aliases: []
description: HTTP の詳細を単純な API に抽象化する、Clojure の Web アプリケーションライブラリ
tags: [word, clojure]
date: 2024-01-08
---

## TL;DR

[[clojure|Clojure]] の Web アプリケーションライブラリ。HTTP の詳細を、単純で統一された API に[[abstraction|抽象化]]する。Python の WSGI と Ruby の Rack に影響を受けている。

## 仕組み

Ring は、ハンドラ、リクエスト、レスポンス、ミドルウェアの 4 つの概念でできている。

- **ハンドラ**: Web アプリケーションを定義する関数。リクエストのマップを受け取り、レスポンスのマップを返す
- **リクエスト**: HTTP リクエストを表す Clojure のマップ。`:uri`、`:request-method`、`:headers` などのキーを持つ
- **レスポンス**: ハンドラが返すマップ。`:status`、`:headers`、`:body` の 3 つのキーを持つ
- **ミドルウェア**: ハンドラを包んで機能を足す高階関数

Web サーバとは、Jetty を組み込んだ `ring-jetty-adapter` などのアダプタでつなぐ。

## 例

クライアントの IP アドレスをテキストで返すハンドラ。

```clojure
(defn what-is-my-ip [request]
  {:status 200
   :headers {"Content-Type" "text/plain"}
   :body (:remote-addr request)})
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[compojure|Compojure]]
- [[luminus|Luminus]]

## 出典

- [ring-clojure/ring](https://github.com/ring-clojure/ring)
- [Concepts - ring-clojure/ring Wiki](https://github.com/ring-clojure/ring/wiki/Concepts)

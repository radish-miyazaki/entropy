---
title: ClojureDart
aliases: []
description: Flutter と Dart のエコシステムで、モバイルやデスクトップのネイティブアプリを作るための Clojure の方言
tags: [word, clojure]
date: 2024-01-16
---

## TL;DR

Flutter と Dart のエコシステムを使って、モバイルやデスクトップのネイティブアプリを作るための [[clojure|Clojure]] の方言。2022 年に公開された新しい言語である。

> ClojureDart is a recent Clojure dialect to make native mobile and desktop apps using Flutter and the Dart ecosystem.

## 仕組み

Clojure の構文で Flutter のウィジェットを組み立てる。Dart のパッケージは `:require` で文字列として読み込み、Clojure の名前空間と同じように使う。

## 例

公式の README にあるサンプルコードは次のとおり。

```clojure
(ns acme.main
  (:require ["package:flutter/material.dart" :as m]
            [cljd.flutter :as f]))

(defn main []
  (f/run
    (m/MaterialApp
      .title "Welcome to Flutter"
      .theme (m/ThemeData .primarySwatch m.Colors/pink))
    .home
    (m/Scaffold
      .appBar (m/AppBar
                .title (m/Text "Welcome to ClojureDart")))
    .body
    m/Center
    (m/Text "Let's get coding!"
       .style (m/TextStyle
                .color m.Colors/red
                .fontSize 32.0))))
```

実際の開発にも耐えられる設計になっているらしい。

> It's production-ready: applications are being built with it.

ナレッジ管理ツールの [Roam Research](https://roamresearch.com/) は、2021 年からモバイルアプリを ClojureDart で開発し、App Store と Play Store でリリースしている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[clojure|Clojure]]

## 出典

- [Tensegritics/ClojureDart](https://github.com/Tensegritics/ClojureDart)
- [ClojureDart を試した感想（valerauko.net）](https://blog.valerauko.net/2022/12/11/clojuredart-first-impressions/)

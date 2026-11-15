---
title: 表明プログラミング
aliases: [表明, アサーション]
description: プログラムのある箇所で必ず真であるべき条件を表明（アサーション）として書き、実行時に検査する書き方
tags: [word, 設計]
date: 2026-11-15
---

## TL;DR

プログラムのある箇所で必ず真であるべき式を、表明（アサーション、英: assertion）としてコードに書く書き方。表明が偽になれば、そこにバグがあると分かる。

## なぜ必要か

日本語版 Wikipedia によると、表明はプログラムの前提条件を示すのに使われ、設計上の判断を文書化する目的でも使われる。前提をコメントではなく表明で書けば、実行のたびに検査されるので、コードと記述のずれを早く見つけられる。

## 仕組み

- 英語版 Wikipedia では、コードの区間の最初に置く表明を事前条件（precondition）、最後に置く表明を事後条件（postcondition）と呼ぶ。クラスの不変条件も表明で書ける
- 実行時に表明が偽になることを表明違反（assertion failure）と呼ぶ。ほとんどの実装では、実行がその場で止まる
- 多くの言語では、表明を有効にするか無効にするかを切り替えられる。開発中は有効にし、最終テストとリリースでは無効にすることが多い

## 例

[[clojure|Clojure]] の公式リファレンスでは、関数に実行時の事前条件と事後条件を `{:pre [...] :post [...]}` の形で書ける。`:post` の中では `%` が戻り値を指す。

```clojure
(defn constrained-sqr [x]
  {:pre [(pos? x)]
   :post [(> % 16), (< % 225)]}
  (* x x))
```

条件のどれかが `false` になり、`*assert*` が真のときは、`java.lang.AssertionError` が投げられる。

## 注意点

- 日本語版 Wikipedia によると、表明を有効にしても無効にしてもプログラムの意味が変わらないことが前提なので、表明に副作用を持たせてはいけない
- 英語版 Wikipedia では、表明は論理的に起こりえない状況のためのもので、通常のエラー処理に使うのは賢明でないとしている。表明違反からは回復できず、本番では無効にされることも多い

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[design-by-contract|契約による設計]]
- [[invariant|不変条件]]
- [[Clojure Book 第9章 事前条件・事後条件]]

## 出典

- [表明 (プログラミング) - Wikipedia](<https://ja.wikipedia.org/wiki/表明_(プログラミング)>)
- [Assertion (software development) - Wikipedia](<https://en.wikipedia.org/wiki/Assertion_(software_development)>)
- [Special Forms - Clojure](https://clojure.org/reference/special_forms)

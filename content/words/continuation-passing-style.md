---
title: 継続渡しスタイル
aliases: [Continuation-Passing Style, CPS]
description: 関数が値を返す代わりに継続を引数で受け取り、結果をその継続に渡す書き方
tags: [word, 関数型プログラミング]
date: 2025-06-14
---

## TL;DR

関数が値を返す代わりに、[[continuation|継続]]を引数として受け取り、結果をその継続に渡す書き方である。Continuation-Passing Style（CPS）とも呼ぶ。

## なぜ必要か

継続渡しスタイルで書くと、計算の順序を固定できる。

## 例

[[scheme|Scheme]] で、2 つの数を足す普通の関数は次のように書く。

```scheme
(define (add x y)
  (+ x y))
```

継続渡しスタイルでは、結果を返さずに、引数で受け取った継続 `cont` に渡す。次の例では、足した結果を 3 倍する処理を継続として渡している。

```scheme
(define (add-cps x y cont)
  (cont (+ x y)))

(add-cps 1 2 (lambda (result) (* result 3)))
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[continuation|継続]]
- [[delimited-continuation|限定継続]]

## 出典

- [継続渡しスタイル - Wikipedia](https://ja.wikipedia.org/wiki/継続渡しスタイル)
- [CPS(継続渡しスタイル)のプログラミングに入門する](https://qiita.com/Kai101/items/eae3a00fcd1fc87e25fb)

---
title: 遅延シーケンス
aliases: []
description: 要素が必要になったときに初めて計算され、その結果がキャッシュされる Clojure のシーケンス
tags: [word, clojure]
date: 2026-11-14
---

## TL;DR

[[clojure|Clojure]] で、要素が必要になったときに初めて計算されるシーケンス。[[lazy-evaluation|遅延評価]]をシーケンスに適用したものである。

## 仕組み

Clojure の公式リファレンスによると、シーケンスを返す関数は、消費されるのに合わせて少しずつ値を返し、引数のシーケンスも少しずつ消費する。`lazy-seq` マクロで作ったコレクションは、最初に `seq` が呼ばれたときだけ本体を実行し、結果をキャッシュする。

遅延シーケンスを返す関数には、コレクションから作る `seq`、`keys`、`vals`、生成関数から作る `lazy-seq`、`repeatedly`、`iterate`、定数から作る `repeat`、`range` などがある。評価を強制するには `doseq`、`dorun`、`doall` を使う。`realized?` で評価済みかを確かめられる。

## 注意点

遅延シーケンスは、空であっても `nil` とは限らない。空かどうかは真偽値として扱わず、`seq` で確かめる。また、シーケンスの先頭への参照を持ち続けると、計算済みの要素がメモリに残り続ける。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[lazy-evaluation|遅延評価]]
- [[clojure|Clojure]]

## 出典

- [Sequences - Clojure](https://clojure.org/reference/sequences)
- [Laziness - Clojure](https://clojure.org/reference/lazy)

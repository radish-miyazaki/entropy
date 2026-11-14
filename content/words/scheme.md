---
title: Scheme
aliases: []
description: 簡潔でミニマルな設計を持つ Lisp 系のプログラミング言語
tags: [word, プログラミング言語, 関数型プログラミング]
date: 2025-01-10
---

## TL;DR

[[lisp|Lisp]] 系の古典的なプログラミング言語である。[[functional-programming|関数型プログラミング]]とドメイン固有言語（DSL）を重視しつつ、他のスタイルにも対応する。設計は簡潔でミニマルである。

## 仕組み

言語の仕様は「Revised Report on Scheme」として標準化されており、実装ごとに R6 や R7 といった対応する版が示されている。設計の考え方として、標準報告書の次の一文が紹介されている。

> Programming languages should be designed not by piling feature on top of feature

言語は機能を積み重ねるのではなく、追加の機能が必要に見える原因となる制約を取り除いて設計すべきだ、という意味である。

実装は数多くある。たとえば、ネイティブコードにコンパイルする Chez Scheme、C にコンパイルする CHICKEN、GNU の Guile、組み込みライブラリが豊富な Gauche、そして [[racket|Racket]] などである。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[racket|Racket]]
- [[common-lisp|Common Lisp]]
- [[clojure|Clojure]]
- [[lisp|Lisp]]

## 出典

- [Scheme](https://www.scheme.org/)

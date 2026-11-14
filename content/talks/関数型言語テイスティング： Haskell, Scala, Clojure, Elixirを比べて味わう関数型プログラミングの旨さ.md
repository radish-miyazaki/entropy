---
title: "関数型言語テイスティング: Haskell, Scala, Clojure, Elixirを比べて味わう関数型プログラミングの旨さ"
description: Haskell、Scala、Clojure、Elixir を、関数、データ、評価戦略、ポリモーフィズムの観点で比べ、関数型プログラマのメンタルモデルを紹介する発表
tags: [talk, 関数型まつり-2025]
date: 2025-05-16
speakers: [lagenorhynque]
company:
event: "[[関数型まつり 2025]]"
held:
slide: https://www.docswell.com/s/lagenorhynque/Z6VX6E-functional-language-tasting-haskell-scala-clojure-elixir
video:
---

## TL;DR

- [[haskell|Haskell]]、[[scala|Scala]]、[[clojure|Clojure]]、[[elixir|Elixir]] を、関数、データ、評価戦略、ポリモーフィズムの観点で比べる発表。
- 関数型プログラマは適切な制約が解放をもたらすと考え、単純で安定した部品から全体を組み立てようとする。

## 内容

### 関数型プログラミングと関数型言語

[[functional-programming|関数型プログラミング]]（FP）は、[[pure-function|純粋関数]]を基本要素とし、その組み合わせでプログラムを作るスタイルであり、言語を問わず実践できる。関数型言語（FPL）は、FP が言語や標準ライブラリのレベルで十分に支援され、FP のスタイルが当たり前になっている言語である。

### 関数

部分式を関数として取り出し（部分適用）、関数を組み合わせて（[[function-composition|関数合成]]）式を組み立てる。

### データ

FPL ではイミュータブルなデータを関数を通して変換する。データ型を定義し、構築し、分解することもできる。

### 評価戦略

純粋関数とイミュータブルなデータを前提にすると、評価の順序やタイミングの自由度が高まるので、[[lazy-evaluation|遅延評価]]やメモ化ができるようになる。FPL に限った話ではないが、マクロでも評価を制御できる。

### ポリモーフィズム

オブジェクト指向プログラミングでは、ポリモーフィズムというと継承による仕組み（サブタイプ多相の一例）が思い浮かぶ。一方で FPL ではアドホック多相やパラメータ多相など、別の仕組みが提供されていることが多い。例えば[[type-class|型クラス]]、マルチメソッド、型パラメータである。

### 関数型プログラマのメンタルモデル

関数型プログラマの[[mental-model|メンタルモデル]]では、適切な制約は解放をもたらす。

- 引数から戻り値を返す以外のことをする関数は信頼できないので、純粋関数にする
- 破壊的に変更されるデータ構造は怖いので、イミュータブルなデータや永続データ構造を使う
- 取りうる値が分からないのは不安なので、不正な値を表現できないようにし、より型安全にする

そのうえで、単純で安定した部品をもとに全体を組み立てたいので、式指向、宣言的、合成可能な書き方を好む。

## キーワード

- [[functional-programming|関数型プログラミング]]
- [[pure-function|純粋関数]]
- [[function-composition|関数合成]]
- [[lazy-evaluation|遅延評価]]
- ポリモーフィズム
- [[type-class|型クラス]]
- [[mental-model|メンタルモデル]]
- [[haskell|Haskell]]
- [[scala|Scala]]
- [[clojure|Clojure]]
- [[elixir|Elixir]]

%%

## 自分の理解

自社に持ち帰れそうな点、疑問に思った点。書くときはこのコメントを外す
%%

## 関連

- [プロポーザル](https://fortee.jp/2025fp-matsuri/proposal/f7646b8b-29b0-4ac4-8ec3-46cabaa8ef1a)

---
title: Programming Clojure, Third Edition 第5章 spec を定義する
description: spec は述語の論理的な組み合わせであり、s/def で修飾キーワードの名前を付けてグローバルレジストリに登録する。置き場所、名前の付け方、自動解決キーワードを見る
tags: [book-chapter, clojure]
date: 2023-09-02
book: "[[Programming Clojure, Third Edition]]"
chapter: 5
---

## TL;DR

- spec はデータ値の集合を記述する述語の論理的な組み合わせである。`s/def` で、修飾キーワードの名前を付けてグローバルレジストリに登録する。
- spec はソースファイルのトップレベルに置き、関数の spec は関数定義の前か別の名前空間にまとめる。名前はプロジェクト名などから始まる十分に修飾されたキーワードにし、`::` で始まる自動解決キーワードで簡略化できる。

## 内容

[[clojure-spec|spec]] は、データ値の集合を記述するために使う[[predicate|述語]]の論理的な組み合わせである。spec ライブラリは、spec を作成、結合、登録する機能を提供している。

### spec ライブラリを使う

spec を使うには、`clojure.spec.alpha` 名前空間を読み込む必要がある。慣習として、`s` というエイリアスで使うことが多い。

```clojure
(require '[clojure.spec.alpha] :as s)
```

### `s/def` マクロ

**`s/def`** マクロは今の Clojure プログラムでアクセスできる spec のグローバルレジストリに、新しい spec を名前を付けて登録する。

```clojure
(s/def name spec)
```

spec の名前は修飾キーワード（qualified keywords）で表す。

```clojure
(s/def :my.app/company-name string?)
```

### spec をどこに定義・配置するか

spec の定義は`def` を使った var の定義と同様に、Clojure の**ソースファイルのトップレベルに配置**する。

関数の spec を作る場合は、その**関数定義の前に spec を配置**するか、spec を**別の名前空間にまとめる**。たとえば `clojure.core` も、別の名前空間である `clojure.core.specs.alpha` に spec をまとめている。

### spec はどのように動作するか

spec は実行時に関数定義と同様に読み込まれ、評価される。spec のグローバルレジストリは、名前をキー、spec を値として格納している。

### spec の名前について

spec の名前は**十分に修飾されたキーワード**でなければならない。具体的には、キーワードの修飾部分はドメイン名や**プロジェクト名から始めるべき**である。たとえば、`:cognitect.transit.handler/name` は完全に修飾されている。

修飾キーワードがコード内で冗長になる場合、エイリアスや自動解決キーワード（auto-resolved keywords）を使うと名前を簡略化できる。

### 自動解決キーワード（auto-resolved keywords）

自動解決キーワードは `::` で始まる。修飾子が指定されていない場合（`::ingredient`）、**現在の名前空間が修飾子として使われる**。プロジェクトの名前空間は通常十分に修飾されているので、これは良い選択肢である。

修飾子が指定されている場合、その修飾子は現在の名前空間で定義されたエイリアスを指せる。たとえば `::recipe/ingredient` は、`recipe` にエイリアスされた名前空間（e.g. `:cookingco.recipe/ingredient`）に展開される。

## キーワード

- [[clojure-spec|spec]]
- [[predicate|述語]]
- [[namespace|名前空間]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

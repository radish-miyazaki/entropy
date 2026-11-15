---
title: Programming Clojure, Third Edition 第2章 Clojure の基本
description: Clojure のコードはデータで組み立てられ、リーダがフォーム単位で読み込む。シンボル、文字と文字列、真偽値と nil のルールを見る
tags: [book-chapter, clojure]
date: 2023-08-25
book: "[[Programming Clojure, Third Edition]]"
chapter: 2
---

## TL;DR

- Clojure のコードは同図像性を持ち、リーダがプログラムをフォーム単位で読み込んで Clojure のデータ構造に変換する。
- シンボルは様々なものに名前を付ける。`false` と `nil` 以外は真と評価され、述語の名前には `?` を付ける。

## 内容

### 同図像性（Homoiconicity）

[[clojure|Clojure]] のコードは[[homoiconicity|同図像性]]を持つので、Clojure のコードは Clojure のデータによって組み立てられている。

### フォーム

Clojure プログラムを起動するときには、まず Clojure 内の[[clojure-reader|リーダ]]と呼ばれる部分が、プログラムを**フォーム**と呼ばれる単位ごとに読み込んで、Clojure のデータ構造へと変換する。それから、そのデータ構造をコンパイルして実行する。

Clojure のフォームの一覧は次のとおり。

| フォーム   | 例                             |
| ---------- | ------------------------------ |
| 真偽値     | `true`, `false`                |
| 文字       | `\a`                           |
| キーワード | `:tag`, `:doc`                 |
| リスト     | `(1 2 3)`, `(println “foo”)`   |
| マップ     | `{:name “Bill” :age 42}`       |
| Nil        | `nil`                          |
| 数値       | `1`, `4.2`                     |
| 集合       | `#{:snap :crackle :pop}`       |
| シンボル   | `user/foo`, `java.lang.String` |
| ベクタ     | `[1 2 3]`                      |

### シンボル

`+`, `concat`, `java.lang.String` といったフォームは**シンボル**と呼ばれ、様々なものに名前を付けるために使う。

- `str` や `concat` といった関数
- `+` や `-` といった演算子（Clojure ではこれらも単なる関数）
- `java.lang.String` や `java.util.Random` のような Java クラス
- `clojure.core` のような[[namespace|名前空間]]、`java.lang` のような Java パッケージ
- データ構造やリファレンスなど

シンボルは数字から始められない。使える文字は英数字と `+`, `-`, `*`, `/`, `!`, `?`, `.`, `_` である。ただし、`/` と `.` は名前空間をサポートするために特別扱いされる。

### 文字と文字列

Clojure の `str` 関数は `nil` を無視する。この挙動は Java の `toUpperCase` と異なる。

```clojure
(str 1 2 nil 3) ; "123"
```

Clojure の文字は Java の文字そのものである。リテラル表記は `\{letter}` で、`{letter}` は文字そのものか、文字の名前（`backspace`, `formfeed`, `newline`, `return`, `space`, `tab`）である。

```clojure
(str \h \e \y \space \y \o \u) ; "hey you"
```

### 真偽値と `nil`

Clojure の真偽値のルールは単純である。

- `true` が真、`false` が偽
- `false` の他に、`nil` も真偽値が必要とされる箇所では偽と評価される
- `false` と `nil` 以外は、真偽値が必要とされる箇所では真と評価される

`true` か `false` を返す関数を[[predicate|述語]]（predicate）と呼ぶ。慣習的に、Clojure では述語の名前の最後に `?` を付ける。

```clojure
(true? true)  ; true
(true? "foo") ; false

(zero? 0.0)      ; true
(zero? (/ 22 7)) ; false
```

Clojure のすべての述語関数を確認するには、次を実行すればよい。

```clojure
(find-doc #"\?$")
```

## キーワード

- [[clojure|Clojure]]
- [[homoiconicity|同図像性]]
- [[clojure-reader|リーダ]]
- [[namespace|名前空間]]
- [[predicate|述語]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

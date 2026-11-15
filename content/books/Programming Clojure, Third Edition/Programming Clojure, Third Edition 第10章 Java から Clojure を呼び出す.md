---
title: Programming Clojure, Third Edition › Java から Clojure を呼び出す
description: Java からは clojure.java.api.Clojure クラスの var と read で Clojure の関数やデータを扱い、clojure.core 以外の名前空間は require で読み込む
tags: [book-chapter, clojure]
date: 2023-09-20
book: "[[Programming Clojure, Third Edition]]"
chapter: 10
---

## TL;DR

- Clojure は Java から名前空間や var、関数に直接アクセスする Java API（`clojure.java.api.Clojure` クラス）を提供している。
- `Clojure.var` で関数を取り出して `invoke` で呼び、`Clojure.read` でデータ構造を読み込む。`clojure.core` 以外の名前空間は `require` で読み込む。

## 内容

Java から [[clojure|Clojure]] を呼び出せるように、Clojure は名前空間や var、関数に直接アクセスする Java API を提供している。

### clojure.java.api.Clojure クラス

Clojure Java API の `clojure.java.api.Clojure` クラスは、データの読み取りや var の検索、関数呼び出しに関する静的メソッドを提供している。

### Clojure.var

たとえば、`+` 関数を見つけるには `Clojure.var` を使う。このメソッドは var の名前空間と名前を受け取り、その値（関数）を返す。また、すべての Clojure の関数インスタンスは `clojure.lang.IFn` インタフェースを実装しており、引数を渡して呼び出せる。

```java
IFn plus = Clojure.var("clojure.core", "+");
System.out.println(plus.invoke(1, 2, 3);
```

注意点として、Clojure 関数の Java インタフェースは、一般的に `Object` を受け取り、`Object` を返す。

### Clojure.read

Clojure クラスは Clojure のデータ構造を文字列から読み込む `read` メソッドを持つ。

```java
Object vector = Clojure.read("[1 2 3]");
```

### clojure.core 以外の名前空間を読み込む

Clojure Java API はデフォルトで `clojure.core` を読み込む。`clojure.core` 以外の名前空間を読み込む場合は、`require` を使う。

```java
IFn require = Clojure.var("clojure.core", "require");
require.invoke(Clojure.read("clojure.set"));
```

## キーワード

- [[java-interop|Java 相互運用]]
- [[clojure-var|var]]
- [[namespace|名前空間]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

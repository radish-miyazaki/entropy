---
title: Programming Clojure, Third Edition › Java を呼び出す
description: new と . によるコンストラクタ、メソッド、フィールドへのアクセス、より簡潔な構文、パッケージのインポート、javadoc 関数を見る
tags: [book-chapter, clojure]
date: 2023-08-25
book: "[[Programming Clojure, Third Edition]]"
chapter: 2
---

## TL;DR

- Clojure は `new` と `.` で Java のオブジェクト生成、メソッド呼び出し、フィールドアクセスができ、`(.method instance)` や `Class/field` といった簡潔な構文も持つ。
- `java.lang` は自動でインポートされ、それ以外のパッケージは `import` で持ち込む。

## 内容

Clojure は[[java|Java]] を直接呼び出すのに便利な方法を提供している。

### コンストラクタ・メソッド・フィールドへのアクセス

オブジェクトを生成するには、`new` を使う。

```clojure
(new classname)
```

```clojure
(new java.util.Random)
```

クラス名に `.` を付ける省略記法も使える。

```clojure
(java.util.Random.)
```

`.` を使うと、メソッドを呼び出せる。

```clojure
(. class-or-instance member-symbol & args)
(. class-or-instance (member-symbol & args))
```

```clojure
(def rnd (java.util.Random.))
(. rnd nextInt) ; -1985059884
(. rnd nextInt 10) ; 7
```

`.` は静的なフィールドやメソッドにも使える。

```clojure
(. Math PI) ; 3.141592653589793
```

### より明示的なアクセス

同じ名前のメソッドとフィールドが両方ある場合、メソッドが優先される。このとき、名前の前に `-` を付けると、フィールドを呼び出せる。

```clojure
(. Math -PI) ; 3.141592653589793
```

ただし、Clojure はインスタンスと静的アクセスの両方に対して、より簡潔な構文を提供しているので、それを使うのが好ましい。

```clojure
(.method instance & args)
(.field instance)
(.-field instance)
(Class/method & args)
Class/field
```

```clojure
(.nextInt rnd 10) ; 8
(System/lineSeparator) ; "\n"
Math/PI ; 3.141592653589793
```

### パッケージのインポート

Clojure は自動的に `java.lang` をインポートしているので、`Math` には名前空間の接頭辞を付ける必要がない。`java.util.Random` など `java.lang` 以外のパッケージは、`import` フォームでインポートできる。

```clojure
(import (package-symbol & class-name-symbols)*)
```

```clojure
(import '(java.util Random Locale))
```

### Javadoc

Clojure の `javadoc` 関数を使うと、指定したクラスのドキュメントをブラウザで開いてくれる。

```clojure
(javadoc java.util.Random)
```

## キーワード

- [[java|Java]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

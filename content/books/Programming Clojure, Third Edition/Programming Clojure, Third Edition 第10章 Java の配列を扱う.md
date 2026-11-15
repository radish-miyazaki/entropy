---
title: Programming Clojure, Third Edition 第10章 Java の配列を扱う
description: 基本は Clojure のコレクションを使い、Java の配列が必要なときは make-array や aset、aget、alength、より高レベルな to-array、into-array、amap、areduce を使う
tags: [book-chapter, clojure]
date: 2023-09-20
book: "[[Programming Clojure, Third Edition]]"
chapter: 10
---

## TL;DR

- Clojure のコレクションはスレッドセーフでパフォーマンスも高く、Java のコレクションのインタフェースも実装しているので、基本的には Clojure のコレクションを使う。
- Java の配列は他のコレクションのインタフェースを実装していないので、配列にアクセスするときは `make-array`、`aset`、`aget`、`alength` や、より高レベルな `to-array`、`into-array`、`amap`、`areduce` を使う。

## 内容

### 基本的には Clojure のコレクションを使うべき

[[clojure|Clojure]] のコレクションは、ほとんどのケースで Java のコレクションを置き換えられる。Clojure のコレクションは[[thread-safety|スレッドセーフ]]で、パフォーマンスも高く、Java のコレクションのインタフェースも実装している。したがって、一般的には、Clojure 内で扱う場合も Java に渡す場合も、**Clojure のコレクションを使うべき**である。

### Java のコレクションの使用上の注意点

しかし、Java のコレクションを使うこと自体はできる。使用上の注意点は、Java のコレクションはロックを基本とした並行モデルを前提としている点である。したがって、Clojure のコレクションが保証している[[Programming Clojure, Third Edition 第6章 ref と STM|並行アクセスへの安全性や STM]] に保護**されない**。

### Java のコレクションを使うケース（Java の配列を扱う）

Java のコレクションが必要になるのは、**Java の配列にアクセスする**ケースである。

Java では配列を特別扱いしており、構文やバイトコードも専用のものが用意されている。また、配列は**他のコレクションのインタフェースを実装していない**。したがって、Clojure のコレクションは（Java のコレクションと同様に）Java の配列のように振る舞えない。

### make-array 関数

Clojure から Java の配列を作るには、`make-array` を使う。

```clojure
(make-array class length)
(make-array class dim & more-dims)
```

`make-array` は、クラスと 1 つ以上の配列の次元数を取る。

```clojure
(make-array String 5)
; #object["[Ljava.lang.String;" 0x5bb3131b
;   "[Ljava.lang.String;@5bb3131b"]
```

`[Ljava.lang.String;` は、JVM の規格でエンコードされた「文字列の一次元配列」を示している。これだと REPL で扱いにくいが、`seq` を使うと Clojure のシーケンスとして扱える。

```clojure
(seq (make-array String 5)) ; (nil nil nil nil nil)
```

### \*-array 関数群

Clojure は `make-array` 以外にも、プリミティブ型の配列を作るための `int-array` といった関数を用意している。REPL で次のコマンドを実行すると、これらの関数や他の関連する関数のドキュメントを見られる。

```clojure
(find-doc "-array")
```

### aset、aget、alength 関数

Clojure は `aset`、`aget`、`alength` といった、Java の配列への低レベルなアクセス関数も用意している。

```clojure
(aset java-array index value)
(aset java-array index-dim1 index-dim2 ... value)

(aget java-array index)
(aget java-array index-dim1 index-dim2 ...)
(alength java-array)
```

これらを使ったサンプルコードを示す。

```clojure
(defn painstakingly-create-array []
  (let [arr (make-array String 5)]
    (aset arr 0 "Painstaking")
    (aset arr 1 "to")
    (aset arr 2 "fill")
    (aset arr 3 "in")
    (aset arr 4 "arrays")
    arr))

(aget (painstakingly-create-array) 0)  ; "Painstaking"
(alength (painstakingly-create-array)) ; 5
```

### より高レベルな関数（to-array、into-array、amap、areduce）

ここまでの関数を使うよりも、より高レベルな関数を使うほうが簡単である。

#### to-array 関数

`to-array` は、コレクションから配列を直接作れる。

```clojure
(to-array sequence)
```

`to-array` は常に `Object` の配列を作る。

```clojure
(to-array ["Easier" "array" "creation"])
; #object["[Ljava.lang.Object;" 0x59e7fb3f
;  "[Ljava.lang.Object;@59e7fb3f"]
```

可変長引数を取る Java メソッドを呼び出すときに便利である。

```clojure
; clojure.core/format を用いたほうが良い
(String/format "Training Week: %s Mileage: %d"
							 (to-array [2 25]))
; "Training Week: 2 Mileage: 25"
```

#### into-array 関数

`into-array` は `to-array` と似ているが、単なる `Object` ではなく、指定したクラスの配列を作る。

```clojure
(into-array type? seq)
```

第 1 引数は省略でき、要素の型を明示できる。

```clojure
(into-array String ["Easier" "array" "creation"])
; #object["[Ljava.lang.String;" 0x33036b74
;  "[Ljava.lang.String;@33036b74"]
```

省略すると、シーケンスの最初の要素の型から配列の型を推測する。

```clojure
(into-array ["Easier" "array" "creation"])
; #object["[Ljava.lang.String;" 0x3d79abea
;  "[Ljava.lang.String;@3d79abea"]
```

#### amap マクロ

Clojure のシーケンスに変換せずに Java の配列を操作するときは、`amap` を使える。

```clojure
(amap a idx ret expr)
```

`amap` は配列 `a` のコピーを作り、それを `ret` で指定する名前に束縛する。そして、`a` の各要素について 1 回ずつ、`idx` を要素のインデックスに束縛しつつ `expr` を評価する。最後に、`amap` はコピーした配列を返す。

```clojure
(def strings (into-array ["some" "strings" "here"]))

(seq (amap strings idx _ (.toUpperCase (aget strings idx))))
; ("SOME" "STRINGS" "HERE")
```

#### areduce マクロ

`amap` は新しい配列を作るが、`areduce` はどんな値でも作れる。

```clojure
(areduce a idx ret init expr)
```

`ret` には最初に `init` の値がセットされ、それから `expr` が呼び出されるたびにその結果が再束縛される。

```clojure
(areduce strings idx ret 0 (max ret (.length (aget strings idx)))) ; 7
```

## キーワード

- [[java-interop|Java 相互運用]]
- [[thread-safety|スレッドセーフ]]
- [[software-transactional-memory|STM]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

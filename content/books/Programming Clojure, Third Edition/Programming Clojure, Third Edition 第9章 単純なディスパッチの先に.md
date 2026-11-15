---
title: Programming Clojure, Third Edition › 単純なディスパッチの先に
description: ベクタに Collection と IPersistentVector の両方のディスパッチ値がマッチして衝突したとき、Clojure は衝突を許容し prefer-method で優先するほうを指定して解消する
tags: [book-chapter, clojure]
date: 2023-09-19
book: "[[Programming Clojure, Third Edition]]"
chapter: 9
---

## TL;DR

- 1 つの引数に複数のディスパッチ値（e.g. `Collection` と `IPersistentVector`）がマッチすると、例外を投げる。
- 多くの言語は多重継承を禁止するなどして衝突を防ぐが、[[clojure|Clojure]] は衝突を許容し、`prefer-method` で衝突を解消する。

## 内容

### 複数のディスパッチ間での衝突

Clojure の `print` 関数は、シーケンスのようなものをリストとして出力する。`my-print` で同じことをするには、コレクション型（Java の継承ツリーの上層にある `Collection`）でディスパッチするようにすればよい。

```clojure
(defmethod my-print java.util.Collection [c]
  (.write *out* "(")
  (.write *out* (clojure.string/join " " c))
  (.write *out* ")"))
```

これで、さまざまなシーケンスを渡すと出力が得られる。

```clojure
(my-print (take 6 (cycle [1 2 3]))) ;; (1 2 3 1 2 3)
(my-print [1 2 3]) ;; (1 2 3)
```

より完璧を目指すならば、ベクタはリテラルと同じく `( )` ではなく `[ ]` で出力してほしい。ベクタはすべて `IPersistentVector` を実装しているので、次のコードで動作するはずである。

```clojure
(defmethod my-print clojure.lang.IPersistentVector [c]
  (.write *out* "[")
  (.write *out* (clojure.string/join " " c))
  (.write *out* "]"))
```

ただし、これだと例外を投げる。

```clojure
(my-print [1 2 3])
;; java.lang.IllegalArgumentException: Multiple methods
;; in multimethod 'my-print' match dispatch value:
;; class clojure.lang.PersistentVector ->
;;   interface java.util.Collection and
;;   interface clojure.lang.IPersistentVector, and
;;   neither is preferred
```

ベクタの引数に対して、**複数のディスパッチ値**（`Collection`、`IPersistentVector`）**がマッチしてしまう**からである。

こういった衝突が起きないように、多くの言語はメソッドディスパッチに多重継承を禁止するなど、さまざまな制約を設けている。Clojure は別のアプローチとして、衝突が起こることを許容し、`prefer-method` で衝突を解消する。

### prefer-method 関数

```clojure
(prefer-method multi-name loved-dispatch dissed-dispatch)
```

`prefer-method` をマルチメソッドに対して呼ぶと、衝突が起きたときに、2 つのディスパッチ値のうち **`loved-dispatch` のほうが `dissed-dispatch` より優先される**ことを伝える。

今回の `my-print` の場合、ベクタのほうを優先したいので、次のように書ける。

```clojure
(prefer-method
 my-print clojure.lang.IPersistentVector java.util.Collection)
```

これで、ベクタも他のシーケンスも、適切なメソッド実装へとディスパッチされるようになった。

```clojure
(my-print (take 6 (cycle [1 2 3]))) ;; (1 2 3 1 2 3)
(my-print [1 2 3]) ;; [1 2 3]
```

## キーワード

- [[multimethod|マルチメソッド]]
- [[dynamic-dispatch|動的ディスパッチ]]
- [[inheritance|継承]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

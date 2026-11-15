---
title: Programming Clojure, Third Edition 第2章 for ループはどこにある？
description: Apache Commons の indexOfAny を、for ループと可変な変数を使わずに Clojure で書き直し、Java 版より簡潔で汎用的になることを確かめる
tags: [book-chapter, clojure]
date: 2023-08-25
book: "[[Programming Clojure, Third Edition]]"
chapter: 2
---

## TL;DR

- Clojure には `for` ループも直接変更できる変数もない。
- Apache Commons の `StringUtils.indexOfAny` を、`indexed` と `index-filter` を組み合わせて Clojure で書き直すと、分岐や変数が減り、どんなシーケンスと述語にも使える汎用的なコードになる。

## 内容

Clojure には `for` ループがないし、**直接変更できる変数というものもない**。間接的に変更できるリファレンスはあるが、それを変更するには特別な関数呼び出しが必要になる。ここでは Java の OSS（Apache Commons）を例に説明する。

### `StringUtils.indexOfAny`

```java
public static int indexOfAny(String str, char[] searchChars) {
	if (isEmpty(str) || ArrayUtils.isEmpty(searchChars) {
		return -1;
	}

	for (int i = 0; i < str.length(); i++) {
		char ch = str.charAt(i);
		for (int j = 0; j < searchChars.length; j++) {
			if (searchChars[j] == ch) {
				return i;
			}
		}
	}
	return -1;
}
```

`indexOfAny` は `str` を順番に調べ、`searchChars` の中のいずれかの文字とマッチするものが見つかったらそのインデックスを返し、見つからなければ `-1` を返す。

ドキュメントから、いくつかの実行例を挙げる。

```java
StringUtils.indexOfAny(null, *);                  // -1
StringUtils.indexOfAny("", *);                    // -1
StringUtils.indexOfAny(*, null);                  // -1
StringUtils.indexOfAny(*, []);                    // -1
StringUtils.indexOfAny("zzabyycdxx", ['z', 'a']); // 0
StringUtils.indexOfAny("zzabyycdxx", ['b', 'y']); // 3
StringUtils.indexOfAny("aba", ['z']);             // -1
```

これを、Clojure 版の `index-of-any` としてステップバイステップで実装する。

### `indexed` 関数の実装

まず、コレクションを取って各要素にインデックスを付けたものを返す `indexed` 関数を作る。

```clojure
(defn indexed [coll]
  (map-indexed vector coll))
```

`indexed` は `[インデックス 要素]` のペアのシーケンスを返す。

```clojure
(indexed "abcde")
; ([0 \a] [1 \b] [2 \c] [3 \d] [4 \e])
```

### `index-filter` 関数の実装

次に、文字列中の文字のうち、探すべき文字の集合にマッチするもののインデックスを得る。`index-filter` 関数は Clojure の `filter` に似ているが、マッチした要素そのものではなくインデックスを返す。

```clojure
(defn index-filter [pred coll]
  (when pred
    (for [[idx elt] (indexed coll) :when (pred elt)] idx)))
```

Clojure の `for` はループではなく、シーケンスの[[list-comprehension|内包表記]]である。`(indexed coll)` が生成したインデックスと要素のペアは、`(pred 要素)` が真であるときだけ、それぞれ `idx` と `elt` に束縛される。

Clojure の**集合は引数をメンバに含むかどうかの判定関数にもなる**。そのため、文字の集合と文字列を `index-filter` に渡すと、文字列の中で文字の集合に含まれる文字のインデックスのリストが返ってくる。

```clojure
(index-filter #{\a \b} "abcdbbb") ; (0 1 4 5 6)
(index-filter #{\a \b} "xyz") ; ()
```

### `index-of-filter` 関数の実装

今必要なのは最初のインデックスだけなので、`index-filter` の最初の結果だけを取ればよい。

```clojure
(defn index-filter-any [pred coll]
  (first (index-filter pred coll)))
```

この関数に色々な入力を与えて試す。

```clojure
(index-filter-any #{\z \a} "zzabyycdxx") ; 0
(index-filter-any #{\b \y} "zzabyycdxx") ; 3
```

### Clojure 版と Java 版のコードの違い

Clojure 版は、命令型のコードよりもどう比べても簡潔である。

|            | 行数 | 分岐 | 1 メソッドあたりの出口 | 変数 |
| ---------- | ---- | ---- | ---------------------- | ---- |
| Java 版    | 14   | 4    | 3                      | 3    |
| Clojure 版 | 6    | 1    | 1                      | 0    |

この違いが生まれた理由は次のとおり。

- 命令型の `indexOfAny` は、文字列が空の場合、集合が空の場合、最終的にひとつもマッチしなかった場合といった、いくつかの特殊なケースを扱う必要がある。これにより、分岐や複数の出口ができてしまう。**関数型のアプローチでは、こういった特殊なケースを扱わなくても動作**する。厳密には、`index-of-any` はマッチしないときに `nil` を返すので `indexOfAny` と異なる。しかし、「マッチしなかった」ことを示すのに `-1` を返すよりも、**`nil` を返すほうが Clojure には合っている**
- 命令型の `indexOfAny` は、コレクション（文字列と文字の集合の両方）を順に見ていくためにローカル変数を必要とする。Clojure では、`map` のような[[higher-order-function|高階関数]]と `for` のようなシーケンス内包表記を使うので、`index-of-any` は**変数を必要としない**

また、Clojure 版のコードのほうが、より**汎用的**である。Java にも関数型やジェネリクスの機能が取り入れられているので、次の点はすべて実現しようとすれば実現できるが、記述が複雑になる。

- `indexOfAny` は文字列しか探せないが、`index-of-any` は**どんなシーケンスでも受け取れる**
- `indexOfAny` は文字の集合からマッチを探すが、`index-filter` は**どんな述語も取れる**
- `indexOfAny` は最初のマッチだけを返すが、`index-filter` は**すべてのマッチを返し、他の `filter` と組み合わせられる**

`index-of-any` の汎用性を示すために、たとえばコインを投げて裏（`:t`）か表（`:h`）かを記録した列から、「3 度目の表は全体のうち何回目に出たか」を調べるコードを書いてみる。

```clojure
(nth (index-filter #{:t} [:t :t :h :t :h :t :t :t :h :h]) 2) ; 3
```

## キーワード

- [[list-comprehension|シーケンス内包表記]]
- [[higher-order-function|高階関数]]
- [[functional-programming|関数型プログラミング]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

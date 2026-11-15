---
title: Clojure Book 第11章 コレクションの Spec
description: s/coll-of、s/cat、s/keys、s/def でコレクションの要素やマップのキーと値を検証する
tags: [book-chapter, clojure]
date: 2023-08-18
book: "[[Clojure Book]]"
chapter: 11
---

## TL;DR

- `s/coll-of` は要素すべての型を、`s/cat` は要素数と順番をチェックする。
- `s/keys` の `:req-un` は必須のキーを指定し、`s/def` でキーごとの値の Spec を定義すると値の型も確かめられる。

## 内容

### コレクションの要素の型

次は、コレクションの要素がすべて文字列であることを確かめる Spec である。

```clojure
(def string-collection? (s/coll-of string?))

(s/valid? string-collection? ["Hi" "Hello"]) ; true
```

`coll-of` は、コレクションの**要素すべて**が渡された述語を満たすかをチェックする。そのため、1 つでも文字列でない要素があれば `false` が返る。

```clojure
(s/valid? string-collection? ["Hi" 42]) ; false
```

同じように、コレクションの要素がすべて数値か文字列であることを確かめる Spec は次のように書ける。

```clojure
(def number-or-string?
  (s/or :n number? :s string?))

(def number-or-string-collection?
	(s/coll-of number-or-string?))

(s/valid? number-or-string-collection?
	[1 "Hi" "India" 42])       ; true
(s/valid? number-or-string-collection?
	[1 "Hi" "India" :keyword]) ; false
```

### コレクションの要素

次は、**要素数**が 3 つで、[文字列, 数値, キーワード] という**順番**で要素を持つベクタであることを確かめる Spec である。

```clojure
(def valid-person-vector?
  (s/cat :name string? :age number? :gender keyword?))
```

```clojure
(s/valid? valid-person-vector? ["Radish" 30 :male])        ; true
(s/valid? valid-person-vector? ["Radish" 30 :male, :hoge]) ; false
(s/valid? valid-person-vector? [30 "Radish" :male])        ; false
```

### マップのキー

次は、マップが特定のキーを持つかを確かめる Spec である。

```clojure
(def valid-person-map?
  (s/keys :req-un [::name
                   ::age
                   ::gender]))
```

`req-un` は Spec でキーを指定する方法の 1 つで、「**特定のキーは必須だが、キーに対応する値は何でもよい**」ことを示す。このとき、キー名は `::` を付けて指定する。

チェックは次のようにできる。

```clojure
(s/valid? valid-person-map?
	{:name "Radish" :age 30 :gender :male}) ; true
(s/valid? valid-person-map?
	{:name "Radish" :age 30})               ; false
```

ベクタの `s/cat` とは違い、**指定したキー以外を含んでいても `true` が返る**点に注意する。

```clojure
(s/valid? valid-person-map? {
	:name "Radish"
	:age 30
	:gender :male
	:hoge :fuga}) ; true
```

### マップの値

`:name` というキーを持ち、その値が文字列であることを確かめるには、`clojure.spec.alpha/def` を使って次のように書く。

```clojure
(s/def ::name string?)
```

`:age` と `:gender` も同じように書ける。

```clojure
(s/def ::age int?)
(s/def ::gender keyword?)
```

これらを組み合わせて `:person` という Spec を作るには、次のように書く。

```clojure
(s/def ::person (s/keys :req-un [::name, ::age, ::gender])
```

この Spec を使うと、マップにキーがあるかに加えて、値が想定どおりの型かも確かめられる。

```clojure
(s/valid? ::person { :name "Radish"
                     :age 30
                     :gender :male }) ; true

(s/valid? ::person { :name 30
                     :age "Radish"
                     :gender :male }) ; false
```

## キーワード

- [[clojure-spec|Spec]]
- [[predicate|述語]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

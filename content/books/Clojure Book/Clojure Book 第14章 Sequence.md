---
title: Clojure Book 第14章 Sequence
description: count や partition がリストだけでなくベクタ、集合、マップにも使えることと、seq でコレクションをシーケンスに変換することを扱う章
tags: [book-chapter, clojure]
date: 2023-08-18
book: "[[Clojure Book]]"
chapter: 14
---

## TL;DR

- [[clojure|Clojure]] の `count` や `partition` は、リストだけでなくベクタ、集合、マップにも使える。
- `seq` は、コレクションをリストの形に変換する。

## 内容

`count` 関数はリストだけでなく、ベクタや集合、マップでも使える。

```clojure
(count '(1 2 3 4))                       ; 4
(count [1 2 3 4])                        ; 4
(count #{1 2 3 4})                       ; 4
(count {:one 1 :two 2 :three 3 :four 4}) ; 4
```

`partition` 関数もさまざまなシーケンスで使える。

```clojure
(partition 2 {1 "one" 2 "two" 3 "three" 4 "four"})
; (([1 "one"] [2 "two"]) ([3 "three"] [4 "four"]))
(partition 2 '(1 2 3 4))       ; ((1 2) (3 4))
(partition 2 #{1 2 3 4})       ; ((1 4) (3 2))
(partition 2 [1 2 3 4])       ; ((1 2) (3 4))
```

`seq` は、シーケンスをリストに変換する関数である。

```clojure
(seq {:one 1 :two 2 :three 3 :four 4})
; ([:one 1] [:two 2] [:three 3] [:four 4])
(seq '(1 2 3 4)) ; (1 2 3 4)
(seq #{1 2 3 4}) ; (1 4 3 2)
(seq [1 2 3 4])  ; (1 2 3 4)
```

## キーワード

- [[clojure|Clojure]]
- [[clojure-sequence|シーケンス]]

## 自分の理解

（訳が誤っているかもしれないけど）一部 `count` に関する記述が誤っていたので、独自調査した。

`count` 関数の内部では、**データ型ごとに最適なアルゴリズムを選ぶ**戦略が取られている。

[`count` の実装](https://github.com/clojure/clojure/blob/clojure-1.10.1/src/clj/clojure/core.clj#L874)

```clojure
(defn count
  "Returns the number of items in the collection. (count nil) returns
  0.  Also works on strings, arrays, and Java Collections and Maps"
  {
   :inline (fn  [x] `(. clojure.lang.RT (count ~x)))
   :added "1.0"}
  [coll] (clojure.lang.RT/count coll))
```

`clojure.lang.RT count` の実装

```java
public static int count(Object o){
	if(o instanceof Counted)
		return ((Counted) o).count();
	return countFrom(Util.ret1(o, o = null));
}

static int countFrom(Object o){
	if(o == null)
		return 0;
	else if(o instanceof IPersistentCollection) {
		ISeq s = seq(o);
		o = null;
		int i = 0;
		for(; s != null; s = s.next()) {
			if(s instanceof Counted)
				return i + s.count();
			i++;
		}
		return i;
	}
	else if(o instanceof CharSequence)
		return ((CharSequence) o).length();
	else if(o instanceof Collection)
		return ((Collection) o).size();
	else if(o instanceof Map)
		return ((Map) o).size();
	else if (o instanceof Map.Entry)
		return 2;
	else if(o.getClass().isArray())
		return Array.getLength(o);

	throw new UnsupportedOperationException(
		"count not supported on this type: " + o.getClass().getSimpleName()
	);
}
```

`partition` は `count` と違い、**シーケンスを `seq` でリストに変換してから**要素を分割している。

[`partition` の実装](https://github.com/clojure/clojure/blob/clojure-1.10.1/src/clj/clojure/core.clj#L3184)

```clojure
(defn partition
  "Returns a lazy sequence of lists of n items each, at offsets step
  apart. If step is not supplied, defaults to n, i.e. the partitions
  do not overlap. If a pad collection is supplied, use its elements as
  necessary to complete last partition upto n items. In case there are
  not enough padding elements, return a partition with less than n items."
  {:added "1.0"
   :static true}
  ([n coll]
     (partition n n coll))
  ([n step coll]
     (lazy-seq
       (when-let [s (seq coll)]
         (let [p (doall (take n s))]
           (when (= n (count p))
             (cons p (partition n step (nthrest s step))))))))
  ([n step pad coll]
     (lazy-seq
       (when-let [s (seq coll)]
         (let [p (doall (take n s))]
           (if (= n (count p))
             (cons p (partition n step pad (nthrest s step)))
             (list (take n (concat p pad)))))))))
```

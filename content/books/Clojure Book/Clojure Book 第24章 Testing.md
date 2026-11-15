---
title: Clojure Book › Testing
description: clojure.test の deftest、is、testing を使い、最小限の単体テストを書いて実行する
tags: [book-chapter, clojure]
date: 2023-08-20
book: "[[Clojure Book]]"
chapter: 24
---

## TL;DR

- [[clojure-test|clojure.test]] の `deftest`、`is`、`testing` の 3 つで、最小限の[[unit-test|単体テスト]]を書く。
- テストが成功すると何も表示されず、失敗すると期待値と実際の値、行番号が表示される。

## 内容

以下のコードをテストする。

```clojure
;; calc_lib.clj
(defn add [a b]
  (+ a b))

(defn sub [a b]
  (- a b))
```

### テストファイル名

テストファイルは、テストであることを明示するために、ファイル名に **`_test` というサフィックス**を付ける。今回の例だと、`calc_lib_test.clj` というファイル名になる。

### 基本的な 3 つの関数（`deftest`、`is`、`testing`）

テストのために、テスティングライブラリから 3 つの関数を `require` する。テスト対象のファイルも `load-file` しておく。

```clojure
(require '[clojure.test :refer [deftest is testing]])

(load-file "calc_lib.clj")
```

- `deftest`: テストを定義するための関数
- `is`: アサーションが失敗したときにメッセージを出力するための関数
- `testing`: `deftest` で定義したテストに、**サブスペース**（テストをグループ化したり、階層的に整理したりするための概念）を追加するための関数

### 最初のテスト

先ほど `require` した関数を使うと、`add` の単体テストは以下のように書ける。

```clojure
(deftest calc_lib_test
  (testing "calc_lib"
    (testing "add"
      (is (= 4 (add 2 2))))))

(calc_lib_test)
```

`clj` で実行すると、テストが**成功して何も表示されない**。

```shell
$ clj calc_lib_test.clj
```

### テストを失敗させる

次は意図的に失敗させて、`clj` を実行する。

```clojure
(deftest calc_lib_test
  (testing "calc_lib"
    (testing "add"
      (is (= 5 (add 2 2))))))
```

```shell
$ clj calc_lib_test.clj
> FAIL in (calc_lib_test) (calc_lib_test.clj:8)
> calc_lib add
> expected: (= 5 (add 2 2))
>   actual: (not (= 5 4))
```

このように、アサーションが失敗した旨のメッセージと、期待される値と実際の値が表示される。失敗した行番号も表示されるので、デバッグと問題の特定がしやすい。

### 詳しい情報を書いて表示する

`is` の第 2 引数に文字列を渡すと、失敗したときにその文字列を表示できる。

```clojure
(deftest calc_lib_test
  (testing "calc_lib"
    (testing "add"
      (is (= 5 (add 2 2)) "adding 2 and two should give right output"))))
```

```shell
$ clj calc_lib_test.clj
> FAIL in (calc_lib_test) (calc_lib_test.clj:8)
> calc_lib add
> adding 2 and two should give right output
> expected: (= 5 (add 2 2))
>   actual: (not (= 5 4))
```

### テストを追加する

1 つの `testing` の中には複数の `is` を追加できる。

```clojure
(deftest calc_lib_test
  (testing "calc_lib"
    (testing "add"
      (is (= 4 (add 2 2)))
      (is (= 7 (add 3 4))))))
```

`sub` についても、同じようにテストを追加する。

```clojure
(deftest calc_lib_test
  (testing "calc_lib"
    (testing "add"
      (is (= 4 (add 2 2)))
      (is (= 7 (add 3 4))))
    (testing "sub"
      (is (= 0 (sub 2 2)))
      (is (= 1 (sub 4 3))))))
```

## キーワード

- [[clojure|Clojure]]
- [[clojure-test|clojure.test]]
- [[unit-test|単体テスト]]
- [[testing-framework|テスティングフレームワーク]]

## 自分の理解

テストファイルからテスト対象のコードを呼び出すと、Emacs 上でエラーが出る。これを解消するには、おそらくプロジェクトのパスを設定する必要がありそう。

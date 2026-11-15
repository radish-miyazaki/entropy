---
title: Clojure Book › Regular Expression
description: Clojure では #"" で正規表現を書き、re-matches、re-find、re-seq で文字列と照合する。(?i) などのフラグや、clojure.string の replace、split と組み合わせる方法も扱う
tags: [book-chapter, clojure]
date: 2023-08-22
book: "[[Clojure Book]]"
chapter: 19
---

## TL;DR

- [[clojure|Clojure]] では `#""` で囲むと[[regular-expression|正規表現]]になり、`re-matches` で完全一致、`re-find` で最初の部分一致、`re-seq` ですべての部分一致を調べる。
- `(?i)` で大文字と小文字を区別しなくなり、`clojure.string` の `replace` や `split` にも正規表現を渡せる。

## 内容

正規表現は巨大なトピックで、この章だけでは収まりきらない。詳細はオライリーの [詳説 正規表現](https://www.oreilly.co.jp/books/9784873113593/) を参照する。

### 基本（`#""`、`re-matches`、`re-find`、`re-seq`）

#### `#""`

Clojure では **`#""`** で囲むと正規表現になる。

```clojure
(type #"regexp") ; java.util.regex.Pattern
```

たとえば以下は 1 桁の数字を表す正規表現である。

```clojure
#"\d"
```

#### `re-matches` 関数

**`re-matches`** 関数を使うと、文字列が正規表現に**完全一致**するかを調べられる。一致する場合はその文字列を、一致しない場合は `nil` を返す。

```clojure
(re-matches #"\d" "There is no number here.") ; nil

(re-matches #"\d" "4"); "4"
(re-matches #"\d" "42"); nil
```

以下は 1 文字以上の数字を表す正規表現である。

```clojure
#"\d+"
```

この正規表現には `"4"` も `"42"` もマッチする。

```clojure
(re-matches #"\d+" "4")  ; "4"
(re-matches #"\d+" "42") ; "42"
```

`re-matches` は**文字列が正確に正規表現と一致するか**を調べる。そのため、以下のように `42` のあとにスペースで文章が続いている場合は **`nil`** を返す。

```clojure
(re-matches #"\d+" "42 is the answer.") ; nil
```

このようなケースでは代わりに `re-find` を使う。

#### `re-find` 関数

`re-find` 関数を使うと、文字列が正規表現に**部分一致**するかを調べられる。一致する場合はその文字列を、一致しない場合は `nil` を返す。

```clojure
(re-find #"\d+" "42 is the answer.") ; "42"
```

ただし、一致する箇所が複数あっても、**最初に一致する文字列だけ**を返す。

```clojure
(re-find #"\d+" "42 is the ultimate answer, and so is 52.") ; "42"
```

このようなケースでは代わりに `re-seq` を使う。

#### `re-seq` 関数

`re-seq` は、部分一致するすべての文字列をシーケンスにして返す。

```clojure
(re-seq #"\d+" "42 is the ultimate answer, and so is 52.")
; ("42" "52")
```

一致しない場合は `nil` を返す。

```clojure
(re-seq #"\d+" "Fourty two is the ultimate answer, and so is fifty two.")
; nil
```

### 大文字と小文字を区別しないパターン（`(?i)`）

正規表現に **`(?i)`** を足すと、大文字と小文字を区別せずに調べられる。

```clojure
(re-seq #"abc" "abc are small letters and ABC are capital letters.")
; ("abc")

(re-seq #"(?i)abc" "abc are small letters and ABC are capital letters.")
;; ("abc" "ABC")
```

正規表現自体に大文字と小文字が混ざっていても（`#"abC"`）、同じように動く。

```clojure
(re-seq #"(?i)abC" "abc are small letters and ABC are capital letters.")
;; ("abc" "ABC")
```

### 範囲を持つパターン（`[A-Z]`）

A から Z までの大文字のアルファベット 1 文字以上は、以下のように書ける。

```clojure
#"[A-Z]+"
```

```clojure
(re-seq #"[A-Z]+" "Finds all CAPITAL letter WORDS.")
; ("F" "CAPITAL" "WORDS")
```

### 文字列操作の関数との組み合わせ（`clojure.string/replace`、`split`）

Clojure の文字列操作の関数には、正規表現を受け取れるものがある。

まず、`replace` の例を示す。以下のコードは 1 つ以上のスペースを 1 つのスペースに置き換える。

```clojure
(require '[clojure.string :as str])
(str/replace "There    are     lots of   spaces" #"\s+" " ")
; "There are lots of spaces"
```

次に、`split` の例を示す。以下のコードは 1 つ以上のスペースごとに要素を区切って、シーケンスに格納する。

```clojure
(str/split "There   are     lots of   spaces" #"\s+")
; ["There" "are" "lots" "of" "spaces"]
```

### 正規表現で覚えておくべきこと（メタ文字）

正規表現を使うときに覚えておくべきこと（都度確かめるべきこと）を以下に並べる。後半の `(?i)` などについては Clojure のドキュメント（[re-pattern](https://clojuredocs.org/clojure.core/re-pattern)）を参照する。

| パターン   | 意味                                                                 |
| ---------- | -------------------------------------------------------------------- |
| `.`        | 任意の 1 文字                                                        |
| `\w`       | すべての半角英数字とアンダースコア                                   |
| `\W`       | 半角英数字とアンダースコア以外                                       |
| `\d`       | すべての半角数字                                                     |
| `\D`       | 半角数字以外すべて                                                   |
| `\s`       | 空白文字                                                             |
| `\S`       | 空白文字以外                                                         |
| `\b`       | 語の区切り位置                                                       |
| `^`        | 行頭                                                                 |
| `$`        | 行末                                                                 |
| `\A`       | 文字列の先頭                                                         |
| `\z`       | 文字列の末尾                                                         |
| `[abc]`    | `[^abc]`                                                             |
| `[a-z]`    | a から z の範囲の任意の 1 文字                                       |
| `[a-zA-Z]` | a から z、または A から Z の範囲の任意の 1 文字                      |
| `(…)`      | 含まれる文字をすべて捕捉する                                         |
| `(a \| b)` | a または b                                                           |
| `a?`       | 0〜1 個の a                                                          |
| `a*`       | 0 個以上の a                                                         |
| `a+`       | 1 個以上の a                                                         |
| `a{3}`     | 3 個の a                                                             |
| `a{3,}`    | 3 個以上の a                                                         |
| `a{3,6}`   | 3 個以上 6 個以下の a                                                |
| `(?x)`     | 正規表現の中の空白文字を無視する                                     |
| `(?i)`     | 大文字と小文字を区別しない                                           |
| `(?u)`     | 正規表現の中で Unicode の文字クラスを使えるようにする                |
| `(?m)`     | マルチラインモード（各行の先頭や末尾にマッチする）                   |
| `(?s)`     | ドットと改行が一致する                                               |
| `(?d)`     | 正規表現の中で `*` と `$` を、改行文字の前後の位置でのみマッチさせる |

## キーワード

- [[clojure|Clojure]]
- [[regular-expression|正規表現]]
- [[clojure-sequence|シーケンス]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

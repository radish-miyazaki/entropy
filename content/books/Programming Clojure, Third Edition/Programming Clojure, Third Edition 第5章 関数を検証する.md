---
title: Programming Clojure, Third Edition › 関数を検証する
description: 正規表現オペレーションの spec で可変長引数やマルチアリティの引数リストを記述し、s/fdef で関数の spec を定義して、stest/instrument で引数をチェックする
tags: [book-chapter, clojure]
date: 2023-09-02
book: "[[Programming Clojure, Third Edition]]"
chapter: 5
---

## TL;DR

- 関数は引数の args spec、戻り値の ret spec、両者を関連付ける fn spec の最大 3 つの spec を持ち、`s/fdef` でまとめて定義する。
- 引数リストは`s/cat`、`s/alt`、`s/?`、`s/*`、`s/+`、`s/keys*` といった正規表現オペレーションの spec で記述する。これらは連結しても単一のコレクションの構造を表す。
- 開発やテストのときは `stest/instrument` で関数の引数をチェックできる。高階関数が受け取る無名関数の spec は `s/fspec` で書く。

## 内容

### 概要

関数は最大で 3 つの [[clojure-spec|spec]] を持つ。

1. 関数の引数に対する **args spec**
2. 戻り値に対する **ret spec**
3. 引数と戻り値を関連付けるために使う **fn spec**

関数の spec を作ると、spec ライブラリの便利な機能（関数の自動生成テストなど）を使えるようになる。

引数の spec では、関数を呼び出すために使う引数のコレクションを定義する。これまで見てきた spec はコレクションの spec を作るために使うが、関数の引数に求められる表現力を満たすには、**繰り返し引数**や**オプション引数**、その他の構造化されたコレクションに対応する必要がある。`clojure.spec` はこれに対応するため、正規表現オペレーション（regexp op）による spec を提供する。

### 構造を持つシーケンス（`s/cat`, `s/alt`）

文字列の正規表現は文字列内の文字と一致する。たとえば `abc*` という正規表現は、`ab`, `abc`, `abcc` などの文字列と一致する。

正規表現オペレーションの spec は、文字列内の文字ではなく、**コレクション内の任意の値を一致させる**似た機能を提供する。文字列の正規表現と同様に、正規表現オペレーションの spec は、連結や繰り返し、オプションのパターンを一致させられる。

#### `s/cat` マクロ

最も一般的な正規表現オペレーションの spec は **`s/cat`** で、spec を**連結**する機能を持つ。`s/cat` で生成した spec は、有効な値の適合や無効な値の説明に使うために、各コンポーネント（spec）に名前を付ける。

たとえば、文字列と整数を続けて受け取るコレクションを記述する spec は、次のようになる。

```clojure
(s/def ::cat-example (s/cat :s string? :i int?))
(s/valid? ::cat-example ["hello" 10]) ; true
(s/valid? ::cat-example ["hello" 10 "world"]) ; false
```

`s/cat` の中の各コンポーネントには、適合結果の中でコンポーネントを示すキーワードのタグがある。

```clojure
(s/conform ::cat-example ["abc" 100])
; {:s "abc", :i 100}
```

#### `s/alt` マクロ

連続した構造の中で**代替**パターンを示す。適合結果として、適合したタグと値を持つエントリを返す。

```clojure
(s/def ::alt-example (s/alt :i int? :k keyword?))
(s/valid? ::alt-example [100]) ; true
(s/valid? ::alt-example [:foo]) ; true
(s/valid? ::alt-example [100 :foo]) ; false
(s/conform ::alt-example [:foo]) ; [:k :foo]
```

### 繰り返し操作（`s/?`, `s/*`, `s/+`）

繰り返し操作は`s/?`、`s/*`、`s/+` の 3 つがある。意味は正規表現とまったく同じで、それぞれ「0 または 1 回」「0 回以上」「1 回以上」を表す。

正規表現オペレーションは、すべて連結とネストができ、述語や集合、他の spec と組み合わせられる。重要なのは、連結されたすべての正規表現オペレーションは、**単一の連続したコレクションの構造を記述**することである。

例として、1 つ以上の奇数と、任意で末尾に偶数を含むコレクションを考える。

```clojure
(s/def ::oe (s/cat :odds (s/+ odd?) :even (s/? even?)))
(s/conform ::oe [1 3 5 100])
; {:odds [1 3 5], :even 100}
```

注目すべきはネストされた `s/+` と `s/?` が、`[[1 3 5] [100]]` のような**ネストされたコレクションを記述していない点**である。すべての正規表現オペレーションの spec は、**単一のトップレベルのコレクションの構造を記述**するために連結される。

これは名前付きの正規表現オペレーションにも当てはまるので、正規表現オペレーションの spec を小さな再利用可能な部品に分解できる。

```clojure
(s/def ::odds (s/+ odd?))
(s/def ::optional-even (s/? even?))
(s/def ::oe2 (s/cat :odds ::odds :even ::optional-even))

(s/conform ::oe2 [1 3 5 100])
; {:odds [1 3 5], :even 100}
```

### 可変引数リスト

複数の引数を受け取る関数の引数を、spec に落とし込む方法を見ていく。

#### 0 個以上の引数を受け取るケース

たとえば、`println` は 0 個以上のオブジェクトを受け取り、それらを文字列として空白で区切って表示する。各オブジェクトを指定するには `any?` を使い、繰り返しを示すには `s/*` を使う。

```clojure
(s/def ::println-args (s/* any?))
```

#### 一部固定された可変長引数を取るケース

一部が固定された引数と、可変長引数を取るケースもある。たとえば、`clojure.set/intersection` は少なくとも 1 つの集合を受け取り、それに続く任意の数の集合との積集合を計算する。

```clojure
(doc clojure.set/intersection)
;; -------------------------
;; clojure.set/intersection
;; ([s1] [s1 s2] [s1 s2 & sets])
;;   Return a set that is the intersection of the input sets
```

この引数の spec は、次のように定義できる。

```clojure
(s/def ::intersection-args
  (s/cat :s1 set? :sets (s/* set?)))
```

引数を適合させるには、ベクタで渡す必要がある。

```clojure
(s/conform ::intersection-args '[#{1 2} #{2 3} #{2 5}])
; {:s1 #{1 2}, :sets [#{3 2} #{2 5}]}
```

`intersection` の引数の spec は、次のように書くこともできる。

```clojure
(s/def ::intersection-args-2 (s/+ set?))

(s/conform ::intersection-args-2 '[#{1 2} #{2 3} #{2 5}])
; [#{1 2} #{3 2} #{2 5}]
```

#### オプションのキーワード引数を使うケース（`s/keys*`）

Clojure でよく見られるもう 1 つのケースは、**オプションのキーワード引数**を使うものである。

たとえば、[[Programming Clojure, Third Edition 第6章 State and Concurrency|atom 関数]]を見ると、シグネチャは `(options & :meta :validator)` のようになっており、`:meta` や `:validator` という名前のオプションを持っている。Clojure では、こういったオプションのキーワードを、まるでマップであるかのように扱える。spec でも同様に、**`s/keys*`** を使うと、これらがマップであるかのように振る舞う正規表現の spec を作れる。`s/keys*` は、[[Programming Clojure, Third Edition 第5章 データを検証する|s/keys]] と同じ構造を持っている。

`atom` の引数の spec は、次のように指定できる。検証のために、引数の一部は意図的に不適切に指定している。

```clojure
(s/def ::meta map?)
(s/def ::validator ifn?)
(s/def ::atom-args
  (s/cat :x any? :options (s/keys* :opt-un [::meta ::validator])))

(s/conform ::atom-args [100 :meta {:foo 1} :validator int?])
; {:x 100,
;  :options {:meta {:foo 1},
;            :validator #object[clojure.core$int_QMARK_ ...]}}
```

`atom` 関数は、オプションありとなしの 2 種類の引数を持つ。これはマルチアリティ（multi-arity）を持つ関数の一般的なケースである。

### マルチアリティ（multi-arity）の引数リスト

`repeat` は 2 つの[[arity|アリティ]]を持っており、最初の引数がアリティの間で異なる。

```clojure
(doc repeat)
;; -------------------------
;; clojure.core/repeat
;; ([x] [n x])
;;   Returns a lazy (infinite!, or length n if supplied) sequence of xs.
```

これを spec で表現すると、次のように書ける。

```clojure
(s/def ::repeat-args
  (s/cat :n (s/? int?) :x any?))

(s/conform ::repeat-args [100 "foo"]) ; {:n 100, :x "foo"}
(s/conform ::repeat-args ["foo"]) ; {:x "foo"}
```

めったにないが、アリティがまったく異なる場合は、`s/alt` を使うほうが適している場合もある。

### 関数に spec を適用する

関数の spec は、**引数**と**戻り値**、そして**それらの関係を記述する fn** の 3 つの異なる spec からなる。

#### `rand` 関数について考える

例として、`rand` 関数について考える。

```clojure
(doc rand)
;; -------------------------
;; clojure.core/rand
;; ([] [n])
;;   Returns a random floating point number between 0 (inclusive) and
;;   n (default 1) (exclusive).
```

#### 引数と戻り値の spec

最初に、空か数値を取る引数の spec を作る。

```clojure
(s/def ::rand-args (s/cat :n (s/? number?)))
```

ドキュメントには関数の戻り値が浮動小数点数であると書かれているが、spec ではより正確に、倍精度浮動小数点数であると書ける。

```clojure
(s/def ::rand-ret double?)
```

#### `:fn` spec

次に `:fn` spec について考える。これは引数と戻り値の spec に基づいて適合させた引数と戻り値を含むマップを受け取る。

`rand` の場合、ドキュメントには、ランダムな数値は 0 以上 n 未満である必要があると書かれている。これを spec で表現すると、次のようになる。

```clojure
(s/def ::rand-fn
  (fn [{:keys [args ret]}]
    (let [n (or (:n args) 1)]
      (cond (zero? n) (zero? ret)
            (pos? n) (and (<= 0 ret) (< ret n))
            (neg? n) (and (<= ret 0) (> ret n))))))
```

#### `s/fdef` マクロ

これらをすべて組み合わせるには、`s/fdef` を使う。

```clojure
(s/fdef clojure.core/rand
  :args ::rand-args
  :ret ::rand-ret
  :fn ::rand-fn)
```

### 無名関数

Clojure では[[higher-order-function|高階関数]]がよく使われる。[[anonymous-function|無名関数]]の spec を定義するには、`s/fspec` を使う。`s/fspec` は `s/fdef` と同じ構文を使うが、**関数名を省略**する。ただし、無名関数に常に完全な spec を作る必要はなく、`s/keys*` の例で使った `ifn?` だけで十分なケースもある。

たとえば、述語関数を受け取り、その逆の述語関数を作る `opposite` 関数を考える。

```clojure
(defn opposite [pred]
  (comp not pred))
```

引数で受け取る述語関数の spec は、次のように書ける。

```clojure
(s/def ::pred
  (s/fspec :args (s/cat :x any?)
           :ret boolean?))
```

`opposite` 自体の spec は、この spec を使って次のように定義できる。

```clojure
(s/fdef opposite
  :args (s/cat :pred ::pred)
  :ret ::pred)
```

### 関数のインストゥルメント化（`stest/instrument`）

**開発やテストのとき**に、spec を使って関数の引数が適合することを検証するには、`stest/instrument` を使える。`stest` は `clojure.spec.test.alpha` のエイリアスである。

使い方は関数の spec を `s/fdef` で定義し、完全修飾された関数のシンボルで `stest/instrument` を呼び出せばよい。

```clojure
(stest/instrument 'clojure.core/rand)
; [clojure.core/rand]
```

[[instrumentation|インストゥルメント化]]では、**`:ret` と `:fn` の仕様はチェックしない**。実際の関数の検証は[[Programming Clojure, Third Edition 第5章 関数の自動生成テスト|clojure.spec.test.alpha/check]] で行う。

### `stest/enumerate-namespace` を組み合わせる

`stest/enumerate-namespace` を使うと、指定された名前空間内のすべてのシンボルのコレクションを列挙して、`stest/instrument` に渡せる。

```clojure
(stest/instrument (stest/enumerate-namespace 'clojure.core))
; [clojure.core/rand]
```

### インストゥルメント化された関数の挙動

インストゥルメント化すると、その関数の **var が新しい var で置き換えられる**。新しい var は**引数をチェックし、古い関数をその var を介して呼び出す**。

不正な値を渡すと、次のようにエラーになる。エラーの内容から、**失敗した理由**が分かる。

```clojure
(rand :boom)
;; Call to clojure.core/rand did not conform to spec.
;; :boom - failed: number? at: [:n] spec: :user/rand-args
;; :clojure.spec.alpha/args (:boom),
;; :clojure.spec.alpha/failure :instrument,
;; :clojure.spec.test.alpha/caller {...}}
```

インストゥルメント化は**本番環境での使用を意図していない**が、ここで見たように、開発時やテスト時にエラーをより早く検出するための貴重なツールである。

## キーワード

- [[clojure-spec|spec]]
- [[arity|アリティ]]
- [[higher-order-function|高階関数]]
- [[anonymous-function|無名関数]]
- [[instrumentation|インストゥルメント化]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

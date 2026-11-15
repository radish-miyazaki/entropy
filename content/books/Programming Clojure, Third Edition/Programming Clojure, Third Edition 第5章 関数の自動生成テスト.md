---
title: Programming Clojure, Third Edition › 関数の自動生成テスト
description: stest/check で関数の spec から自動生成テストを実行し、s/exercise で入力値のサンプルを確かめ、s/and の組み合わせやカスタムジェネレータで有効な値を生成する
tags: [book-chapter, clojure]
date: 2023-09-02
book: "[[Programming Clojure, Third Edition]]"
chapter: 5
---

## TL;DR

- 関数が spec を持っていれば、`stest/check` で `:args` spec に従う 1000 個の引数を生成し、戻り値と引数との関係を検証する生成テストを自動で実行できる。
- `s/exercise` で、spec から生成される入力値のサンプルを確かめられる。`s/and` は最初の spec のジェネレータで値を生成し、後の spec でフィルタする。
- 自動生成されるジェネレータが効率的でない、または有効な値を生成できないときは、`s/with-gen` や `gen/fmap` でカスタムジェネレータを作る。

## 内容

spec による生成機能はすべて、本番実行時に含まれないように、**テストまたは開発環境の依存関係として test.check ライブラリを含める必要**がある。

### 自動生成テストとは

従来の単体テストでは、プログラマが関数に複数の具体的な入力値を書き、各入力値で関数を呼び出し、その戻り値をアサーションする。

一方、生成テスト（generative testing）は、数千のランダムな入力値を生成して関数を呼び出し、各出力に対して一連のプロパティを検証する。[[property-based-testing|プロパティベーステスト]]とも呼ばれる。

関数が [[clojure-spec|spec]] を持っている場合、**関数の生成テストを自動的に実行**できる。

### 関数の検証（`stest/check`）

spec は`clojure.spec.test.alpha` にある **`check`** という関数を使って、自動生成テストを実行する。`check` には、`s/fdef` で定義した spec を渡す。

`check` を呼び出すと、関数の `:args` spec に従って、有効な引数を **1000 個**生成する。`check` は各引数に対して関数を呼び出し、戻り値が `:ret` spec に従って有効であること、`:fn` spec に従って引数と戻り値の関係が有効であることを確認する。

#### `clojure.core/symbol` のサンプルテスト

例として、Clojure のコア関数である `symbol` に対してテストを実行する。

```clojure
(doc symbol)
;; -------------------------
;; clojure.core/symbol
;; ([name] [ns name])
;;   Returns a Symbol with the given namespace and name. Arity-1 works
;;   on strings, keywords, and vars.
```

この関数の spec は、次のように定義できる。

```clojure
(s/fdef clojure.core/symbol
  :args (s/cat :ns (s/? string?) :name string?)
  :ret symbol?
  :fn (fn [{:keys [args ret]}]
        (and (= (name ret) (:name args))
             (= (namespace ret) (:ns args)))))
```

これを使って、自動生成テストを実行する。

```clojure
(stest/check 'clojure.core/symbol)
;; ({:spec #object[clojure.spec.alpha$fspec_impl$reify__2518 ...],
;;   :clojure.spec.test.check/ret {
;;     :result true,
;;     :pass? true,
;;     :num-tests 1000,
;;     :time-elapsed-ms 103,
;;     :seed 1693915255927},
;;   :sym clojure.core/symbol})
```

出力結果から分かるように、`stest/check` は `clojure.core/symbol` に対して 1000 回のテストを実行し、問題がなかったことを示している。

エラーが発生すると、`test.check` ライブラリは**エラーが発生する最も単純な入力値を生成**する。これにより、**エラーの再現や修正**を行いやすくなる。

### 入力値のサンプルの生成（`s/exercise`）

`symbol` の引数の spec は、`(s/cat :ns (s/? string?) :name string?)` だった。この spec から `check` がどのようにランダムな引数を生成するかをシミュレートするには、**`s/exercise`** を使う。この関数は入力値のサンプルと、それらの**適合値**のペアを返す。

```clojure
(s/exercise (s/cat :ns (s/? string?) :name string?))
; ([("") {:name ""}]
;  [("0") {:name "0"}]
;  [("" "2C") {:ns "", :name "2C"}]
;  [("xr") {:name "xr"}] [("") {:name ""}]
;  [("p5HK" "v5lD") {:ns "p5HK", :name "v5lD"}]
;  [("1h03rw" "5d79E") {:ns "1h03rw", :name "5d79E"}]
;  [("w2a3a00" "") {:ns "w2a3a00", :name ""}]
;  [("Q6UdL7" "yjh5") {:ns "Q6UdL7", :name "yjh5"}]
;  [("" "Hh8l5Ka") {:ns "", :name "Hh8l5Ka"}])
```

この例ではうまく機能したが、spec が自動的に**有効なジェネレータを生成できないケースもある**。この場合は**カスタムジェネレータ**を別に作る必要がある。

### `s/and` を使ってジェネレータを組み合わせる

**`s/and`** は複数の spec を組み合わせる一般的な方法の 1 つである。このマクロは**最初のコンポーネントの spec のジェネレータを使って値を生成**し、その後のコンポーネントの spec で値をフィルタリングする。

#### ジェネレータがうまく動作しないサンプル

例として、100 より大きな奇数の spec を考える。

```clojure
(defn big? [x] (> x 100))
(s/def ::big-odd (s/and odd? big?))
```

これは **spec としては機能するが、ジェネレータはうまく動作しない**。

```clojure
(s/exercise ::big-odd)
;; Unable to construct gen at: [] for: odd?
```

原因は次の 2 つである。

1. 述語関数の多くは自動的にマッピングされたジェネレータを持っているが、`odd?` は**複数の数値型で動作**するので、ジェネレータがマッピングされていない
2. **自作した述語（`big?`）には、ジェネレータがマッピングされていない**

#### `s/and` を使ってジェネレータが動作するように修正

これを修正するには、マッピングされたジェネレータを持つ述語関数と `s/and` で組み合わせればよい。

```clojure
(s/def ::big-odd (s/and int? odd? big?))
```

これでジェネレータが動作する。

```clojure
(s/exercise ::big-odd)
;; ([3619 3619]
;;  [1023 1023]
;;  [117 117]
;;  ... )
```

`s/and` で作った spec のジェネレータをデバッグするときに覚えておくべきことは、**最初のコンポーネントの spec のジェネレータだけが使われる**点である。また、2 つ目以降のコンポーネントの spec で値がフィルタリングされるので、**有効な値を生成するのに時間がかかる**場合がある。これを解決するには、カスタムジェネレータを使うのがよい。

### カスタムジェネレータを生成する

#### なぜカスタムジェネレータを使う必要があるのか

自動生成されるジェネレータが効率的でない場合や、有効な値が生成されない場合がある。

有効な値が生成されないケースを見ていく。たとえば、引数の 1 つがコレクションで、もう 1 つが**そのコレクションの要素**であるような関数が挙げられる。自動生成されるジェネレータは、それぞれを独立に生成するので、**有効な値の組み合わせを生成するのは難しい**。この問題はカスタムジェネレータを使うと回避できる。

#### カスタムジェネレータを指定する

`s/coll-of` や `s/map-of`、`s/every`、`s/every-kv`、`s/keys` など、一部の spec には、カスタムジェネレータを指定できるオプションが用意されている。

また、`s/with-gen` を使って、既存の spec にカスタムジェネレータを追加することもできる。

加えて、`stest/instrument` や `stest/check` など一部の関数では、名前やパスによるジェネレータの一時的なオーバーライドもできる。このオーバーライドは、呼び出しの実行中だけ有効である。

#### カスタムジェネレータを作る

ジェネレータはいくつかの方法で作れるが、最も簡単な方法は、spec を作り、**`s/gen`** を使ってそのジェネレータを取得する方法である。

慣習として **`gen`** とエイリアスされる **`clojure.spec.gen.alpha`** 名前空間には、他のジェネレータや、ジェネレータを組み合わせるための関数が含まれている。

たとえば、[[Programming Clojure, Third Edition 第5章 データを検証する|列挙値]]で実装した `:marble/color` の代わりに、固定値だけを生成するカスタムジェネレータを作る方法を見る。

```clojure
(s/def :marble/color #{:red :blue :green})
(s/def :marble/color-red
  (s/with-gen :marble/color #(s/gen #{:red})))

(s/exercise :marble/color-red)
; ([:red :red] [:red :red] ... )
```

この手法は入力値のランダム性を減らしたり、生成が難しい複雑な入力値を直接提供したりするために使う。

#### `gen/fmap` 関数を使って生成された各値に関数を適用する

`clojure.spec.gen.alpha` 名前空間には、標準の Clojure の型やコレクション、その他の要素を生成するための多くの関数が含まれている。

その中に、`gen/fmap` という関数がある。この関数を使うと、特定のジェネレータを起点とし、その**ジェネレータから生成される各値を変更する**ために、別の関数を利用できる。

たとえば、特定の接頭辞で始まる文字列を生成するために、ランダムな接尾辞を生成し、それに接頭辞を結合できる。

```clojure
(s/def ::sku
  (s/with-gen (s/and string? #(str/starts-with? % "SKU-"))
    (fn [] (gen/fmap #(str "SKU-" %) (s/gen string?)))))
```

ここでは、`gen/fmap` は有効な文字列のジェネレータから始め、生成された値に関数を適用して、文字列の接頭辞として `SKU-` という文字列を付け加えている。そしてその後、spec に関連付けられる。

試しに実行してみる。

```clojure
(s/exercise ::sku)
; (["SKU-" "SKU-"]
;  ["SKU-" "SKU-"]
;  ["SKU-q" "SKU-q"] ... )
```

## キーワード

- [[clojure-spec|spec]]
- [[property-based-testing|プロパティベーステスト]]

## 自分の理解

`lein new` で生成したプロジェクトに test.check を追加するには、次を `project.clj` の依存関係に追加してから `lein deps` を実行する。

```clojure
:dependencies [[org.clojure/clojure "1.11.1"]
               [org.clojure/test.check "1.1.1"]]
```

プロパティベーステストについては、[『実践プロパティベーステスト ― PropErとErlang/Elixirではじめよう』](https://www.lambdanote.com/collections/proper-erlang-elixir)がある。

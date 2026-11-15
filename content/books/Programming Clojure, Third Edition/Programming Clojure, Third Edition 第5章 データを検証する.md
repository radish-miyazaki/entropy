---
title: Programming Clojure, Third Edition 第5章 データを検証する
description: 述語と s/valid?、列挙値、範囲、s/nilable、s/and と s/or、s/conform と s/explain、コレクション、タプル、s/keys によるマップの spec でデータを検証する
tags: [book-chapter, clojure]
date: 2023-09-02
book: "[[Programming Clojure, Third Edition]]"
chapter: 5
---

## TL;DR

- 1 つの値を受け取って真偽値を返す述語は、そのまま spec になる。集合で列挙値を、`s/int-in` で範囲を、`s/nilable` で `nil` を許す spec を作れる。
- `s/and` と `s/or` で spec を組み合わせ、`s/conform` で値がどの選択肢に一致したかを、`s/explain` で無効な理由を確かめられる。
- コレクションは `s/coll-of`、`s/map-of`、`s/tuple` で記述し、マップは属性の spec を独立に定義してから `s/keys` で必須と任意の属性を指定する。

## 内容

ユーザや外部リソースから値を受け取る場合、期待して**いない**値が含まれることがある。Clojure の [[clojure-spec|spec]] は、これらの期待を正確に記述し、データが有効かをチェックする機能を持っている。データが無効な場合は、どの部分がなぜ無効なのかも分かる。

spec では、単に[[predicate|述語]]を指定したり、**範囲を指定**したり、`and` や `or` で **spec を組み合わせ**たりできる。単一の値だけでなく、**コレクション**にも spec を付けられる。

### 述語と `s/valid?`

**1 つの値を受け取り、真偽値を返す**述語関数は有効な spec である。

Clojure には多くの述語が用意されており、その多くは接尾辞として `?` が付いている。これらの述語は標準ライブラリ `clojure.core` に含まれており、ロードせずに使える。

#### 型をチェックする述語

たとえば `boolean?` や `string?`、`keyword?` といった関数は、単一の基本型をチェックする。他の述語は整数や小数、比率といった値に対して `true` を返す `rational?` のように、複数の型を組み合わせる。

#### プロパティをチェックする述語

多くの述語は値自体のプロパティを検証する。たとえば、次のようなものがある。

- `pos?`: 正の数かどうかを確認
- `zero?`: ゼロかどうかを確認
- `empty?`: 空かどうかを確認
- `any?`: 1 つ以上の要素が存在するかどうかを確認
- `some?`: 少なくとも 1 つの要素があるかどうかを確認

#### サンプルコード

会社名に関する spec を定義する。

```clojure
(s/def :my.app/company-name string?)
```

この spec を使ったデータ検証は、次のように **`s/valid?`** で行う。

```clojure
(s/valid? :my.app/company-name "Acme Moving") ; true

(s/valid? :my.app/company-name 100) ; false
```

### 列挙値

Clojure の集合は、値を渡すとその値が含まれているかどうかを返す関数になる。この機能は spec に活用できる。

```clojure
(s/def :marble/color #{:red :blue :green})

(s/valid? :marble/color :red)  ; true
(s/valid? :marble/color :pink) ; false
```

キーワード以外の型でも同様に書ける。

```clojure
(s/def :bowling/roll #{0 1 2 3 4 5 6 7 8 9 10})
(s/valid? :bowling/roll 5) ; true
```

これは機能的には問題ないが、すべての数字を明示的に書くのは冗長である。この場合は代わりに範囲（range）の spec を使うとよい。

### 範囲を指定する spec（`s/int-in`）

**`s/int-in`** を使うと、値が指定した整数値の開始（含む）から終了（含まない）までの範囲に含まれているかをチェックできる。

```clojure
(s/def :bowling/roll (s/int-in 0 11))
```

他にも `s/double-in`、`s/inst-in` などがあり、それぞれ浮動小数点数、時間に対する範囲を定義するための spec である。

### `nil` を捕捉する（`s/nilable`）

Clojure のほとんどの述語は `nil` に対して `false` を返すが、`nil` を含めたいケースもある。既存の spec を拡張して `nil` を含むようにするには、`s/nilable` を使う。

#### `s/nilable` マクロ

例として、「述語と `s/valid?`」で定義した spec を、`nil` を許容するように拡張する。

```clojure
(s/def :my.app/company-name-2 (s/nilable string?))
(s/valid? :my.app/company-name-2 nil) ; true
```

`s/nilable` は最適なパフォーマンスを提供するので、**`nil` を含む spec を作るときは積極的に使う**のがよい。

#### `false` や `nil` を含む値をチェックする際の注意点

`true`、`false`、`nil` の値の集合を spec に使う場合、明示的な集合 `#{true false nil}` を使いたくなるかもしれない。しかし、集合は**特定の値を含むかどうかを確認すると、一致する値を返す**。そのため、`false` や `nil` の場合、spec は「述語が値を無効だと判断した」と解釈し、データが無効であると判断する。

代わりに `s/nilable` を使って、`nil` を `boolean?` の有効な値として追加するのがよい。これで、正しい動作と最適なパフォーマンスが得られる。

```clojure
(s/def ::nilable-boolean (s/nilable boolean?))
```

### 論理演算を使った spec

#### `s/and`, `s/or` マクロ

`s/and` または `s/or` を使って、他の spec を組み合わせて新しい spec を作れる。

たとえば、整数**かつ**奇数の spec を作るには、`int?` と `odd?` の述語を組み合わせる。

```clojure
(s/valid? ::odd-int 5)   ; true
(s/valid? ::odd-int 10)  ; true
(s/valid? ::odd-int 5.2) ; false
```

また、次は奇数の整数**または** 42 の spec である。

```clojure
(s/def ::odd-or-42 (s/or :odd ::odd-int :42 #{42}))
```

#### `s/conform` 関数

値がどの仕様と一致したかを知りたい場合、`s/conform` を使える。`s/conform` は、選択肢や値のコンポーネントに関する**情報を付加した値**を返す。これを適合値（conformed value）と呼ぶ。

`s/or` には選択肢が含まれており、適合値は選択された選択肢をキー（`:42` または `:odd`）でタグ付けしているので、`s/conform` で確認できる。

```clojure
(s/conform ::odd-or-42 42) ; [:42 42]
(s/conform ::odd-or-42 13) ; [:odd 13]
```

`s/or` の適合値はマップエントリであり、`key` と `val` でそれぞれタグと値を取り出せる。`s/conform` は値を解析し、タグを使って構造の解析結果を表す。これにより、値がどの選択肢に一致したかと、その構造を説明できる。

#### `s/explain` 関数（`s/explain-str`, `s/explain-data` 関数）

この関数は値が無効な理由に関するレポートをコンソールに表示する。

```clojure
(s/explain ::odd-or-42 0)
; 0 - failed: odd? at: [:odd] spec: :user/odd-int
; 0 - failed: #{42} at: [:42] spec: :user/odd-or-42
```

レポートには、失敗した述語だけが含まれる。レポートの各行には、失敗した値、チェックされている仕様、失敗した spec へのタグのパス、失敗した spec が表示される。

`s/explain` はコンソールにメッセージを表示するが、代わりに `s/explain-str` を使ってこの情報を文字列として取得したり、`s/explain-data` を使ってデータとして取得したりもできる。

### コレクションに関する spec

最も一般的なコレクションに関する spec は、`s/coll-of` と `s/map-of` の 2 つである。

#### `s/coll-of` マクロ

`s/coll-of` は、リストやベクタ、集合、シーケンスを記述する。コレクションのメンバが満たす必要がある spec を指定し、**すべてのメンバをチェック**する。

```clojure
(s/def ::names (s/coll-of string?))

(s/valid? ::names ["Alex" "Stu"])  ; true
(s/valid? ::names #{"Alex" "Stu"}) ; true
(s/valid? ::names '("Alex" "Stu")) ; true
```

`s/coll-of` には、spec の末尾にキーワード引数として渡す追加のオプションも多くある。

- `:kind`: 仕様の開始時にチェックされる述語。`vector?` や `map?` など
- `:into`: コレクションリテラル `[]`, `()`, `#{}` のいずれか。適合値は指定されたコレクションに収集される
- `:count`: コレクションの正確な要素数
- `:min-count`: コレクションの最小要素数
- `:max-count`: コレクションの最大要素数
- `:distinct`: コレクションの要素が一意である必要がある場合は `true`

これらのオプションを使うと、多くの一般的なコレクションの形状や制約を指定できる。

```clojure
(s/def ::my-set (s/coll-of int? :kind set? :min-count 2))
(s/valid? ::my-set #{10 20}) ; true
```

#### `s/map-of` マクロ

`s/map-of` は、キーと値がそれぞれ spec に従うマップの spec を記述する。

```clojure
(s/def ::scores (s/map-of string? int?))
(s/valid? ::scores {"Stu" 100, "Alex" 90}) ; true
```

`s/coll-of` のすべてのオプションも使えるが、マップ固有の設定がデフォルトで入っているので、**`:into` や `:kind` を設定する必要はない**。

`s/conform` 関数は、値が仕様に従ってどう解析されたかを示す。

```clojure
(s/def ::scores (s/map-of string? (s/or :string string? :int int?)))

(s/conform ::scores {"Stu" 100, "Alex" 90})
; "Stu" [:int 100], "Alex" [:int 90]}
```

`s/map-of` で定義した spec に対して `s/conform` を呼び出すと、値は**適合値を返すが**、**キーはそのまま返す（適合しない）**。

```clojure
(s/def ::scores (s/map-of (s/or :string string? :keyword keyword?) int?))

(s/conform ::scores {"Stu" 100, "Alex" 90})
; {"Stu" 100, "Alex" 90} ; 適合していないことが分かる。
```

キーも適合させたい場合は、`:conform-keys` フラグを使えばよい。

```clojure
(s/def ::scores (s/map-of
	(s/or :string string? :keyword keyword?) int? :conform-keys :t))

(s/conform ::scores {"Stu" 100, "Alex" 90})
; {[:string "Stu"] 100, [:string "Alex"] 90} ; キー値が適合している
```

### コレクションのサンプリング（sampling）

大きなコレクションやマップなど、すべての値を検証したくない場合は、`s/every` と `s/every-kv` を使うと、一部の値だけを検証（**サンプリング**）できる。これらは `s/*coll-check-limit*` で指定された数（デフォルトでは 101）までしかチェックしない。

### タプル（`s/tuple`）

[[tuple|タプル]]は、**固定長**で各要素ごとに spec を持つ、構造が分かっているベクタを指す。たとえば、x 座標と y 座標のベクタは点を表せる。

```clojure
(s/def ::point (s/tuple float? float?))
(s/conform ::point [1.0 2.0]) ; [1.0 2.0]
```

タプルは返されたフィールドに名前やタグを付けない。

### マップの情報

Clojure では、**ドメインオブジェクトをマップとして表現するのが一般的**である。たとえば、バンドや音楽アルバムに関するデータを管理しているとする。このとき、特定のリリースは次のように表現できる。

```clojure
{::music/id #uuid "40e3dc1c-9c8b-4e1c-8c3e-2c5b5d6d9b6e"
 ::music/artish "Rush"
 ::music/title "Moving Pictures"
 ::music/date #inst "1981-02-12"}
```

#### 属性の spec の定義

はじめに、属性の spec を書く。

```clojure
(s/def ::music/id uuid?)
(s/def ::music/artist string?)
(s/def ::music/title string?)
(s/def ::music/date inst?)
```

他の言語の多くの検証ライブラリは、属性の定義を含めてマップの構造を定義する。一方、Clojure の spec では、属性をマップとは独立して定義する必要がある。これにより、属性は独立した意味を持てるので、**再定義する必要がなく**、同じ意味を持つべき**異なる構造の間で再利用**できる。

#### マップの spec の定義（`s/keys`）

必須と任意の属性を指定するには、`s/keys` を使う。

```clojure
(s/def ::music/release
  (s/keys :req [::music/id]
          :opt [::music/artist
                ::music/title
                ::music/date]))
```

このコードでは、`::music/id` を必須にし、その他の属性を任意にしている。

`s/keys` の重要な機能の 1 つは、必須または任意としてリストに定義されていなくても、**すべての登録済みのキーの値を検証**することである。たとえば、`::music/release` に新しく任意の属性が追加された場合、`s/keys` はそれらも自動的に検証する。これにより、登録済みの属性を一貫して検証でき、システムの成長を支えられる。

#### 修飾されていない既存のマップを検証する（`:req-un`, `:opt-un`）

既存のマップが修飾されたキーを使っていない場合、`:req-un` と `:opt-un` を使うと、spec の修飾されていない名前で検証する値を見つける。

たとえば、次のようなマップがある場合、

```clojure
{:id #uuid "a0b1c2d3-e4f5-6789-0a1b-2c3d4e5f6a7b"
 :artist "The Beatles"
 :title "Sgt. Pepper's Lonely Hearts Club Band"
 :date #inst "1967-06-01"}
```

次のように spec を作ると検証できる。

```clojure
(s/def ::music/release-unqualified
  (s/keys :req-un [::music/id]
          :opt-un [::music/artist
                   ::music/title
                   ::music/date]))
```

## キーワード

- [[clojure-spec|spec]]
- [[predicate|述語]]
- [[tuple|タプル]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

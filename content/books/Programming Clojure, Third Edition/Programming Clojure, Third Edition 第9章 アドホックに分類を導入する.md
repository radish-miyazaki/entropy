---
title: Programming Clojure, Third Edition › アドホックに分類を導入する
description: 当座預金と普通預金のマップを名前空間付きキーワードのタグで区別し、複数の値でディスパッチするマルチメソッドと derive で作る親子関係でサービス料を計算する
tags: [book-chapter, clojure]
date: 2023-09-19
book: "[[Programming Clojure, Third Edition]]"
chapter: 9
---

## TL;DR

- マルチメソッドを使うと、自明でない型の関係を発見しながら、それに合わせた分類を導入できる。
- 口座をマップで表し、`::keyword` で名前空間付きのタグを付け、`:tag` や `[口座レベル :tag]` のベクタでディスパッチする。
- `derive` で `::checking` と `::savings` の親 `::account` を定義すると、メソッドをまとめられる。`derive` は Java の継承ではなく、既存のものに自由に関係を作れる。

## 内容

[[multimethod|マルチメソッド]]を使うと、自明でない型の関係を発見しながら、それに合わせた分類を導入できる。

例として、当座預金（Checking）と普通預金（Saving）を扱うアプリケーションを考える。これらのデータはマップで扱うことにする。当座預金口座は `:tag` の値に `::checking` を持たせ、普通預金口座は `::savings` を持たせる。

### コロンを重ねたキーワード（::keyword）

`::` を重ねると、そのキーワードは現在の[[namespace|名前空間]]で解決される。

```clojure
:checking  ; :checking
::checking ; :programming-clojure.account/checking
```

このようにキーワードに名前空間を含めると、他の名前空間から `::savings` などを使う場合には名前を完全に修飾する必要があるので、他の人が書いたコードと衝突する可能性が減る。

```clojure
{:id 1, :tag :programming-clojure/savings, :balance 100M}
```

### alias 関数

名前空間が長くて煩わしい場合は、`alias` で短い別名を付けられる。

```clojure
(alias short-name-symbol namespace-symbol)
```

```clojure
(alias 'acc 'programming-clojure.account)
```

これで、先ほどのコードは次のようになる。

```clojure
{:id 1, :tag :acc/savings, :balance 100M}
```

ただし、ソースファイルに書く場合は、`require` の `:as` キーワードを使うほうがよい（`alias` は REPL 上だけで使うのがよい）。

```clojure
(require [programming-clojure.account :as acc])
```

準備ができたので、テスト用の口座を作っておく。

```clojure
(def test-savings {:id 1, :tag ::acc/savings, ::balance 100M})
(def test-checking {:id 2, :tag ::acc/checking, ::balance 250M})
```

### 要件を追加する

当座預金の利率は 0%、普通預金は 5% とする。これを実現するには、`:tag` でディスパッチするマルチメソッドを定義すればよい。

```clojure
(defmulti interest-rate :tag)
(defmethod interest-rate ::acc/checking [_] 0M)
(defmethod interest-rate ::acc/savings [_] 0.05M)
```

動作を確かめると、期待どおりの結果が返ってくる。

```clojure
(interest-rate test-savings)  ; 0.05M
(interest-rate test-checking) ; 0M
```

### さらに要件を追加する

各口座からは、次の条件で年間サービス料が差し引かれる。

- 通常の当座預金口座は \$25 のサービス料がかかる
- 通常の普通預金口座は \$10 のサービス料がかかる
- プレミアム口座はサービス料がかからない
- \$5,000 以上の預金残高がある当座預金口座はプレミアム口座である
- \$1,000 以上の預金残高がある普通預金口座はプレミアム口座である

#### プレミアム口座かどうかを確かめる

この仕様における「プレミアム口座か否か」は、キーワード（`::premium`、`::basic`）として定義するのがよさそうである。そこで、口座がプレミアムかそうでないかを決めるマルチメソッドを実装する。

```clojure
(defmulti account-level :tag)
(defmethod account-level ::acc/checking [acc]
  (if (>= (:balance acc) 5000) ::acc/premium ::acc/basic))
(defmethod account-level ::acc/savings [acc]
  (if (>= (:balance acc) 1000) ::acc/premium ::acc/basic))
```

動作も確かめておく。

```clojure
(account-level {:id 1, :tag ::acc/savings, :balance 2000M})
; :programming-clojure.account/premium

(account-level {:id 1, :tag ::acc/checking, :balance 2000M})
; :programming-clojure.account/basic
```

#### 要件を満たすマルチメソッドを実装する

この `account-level` をディスパッチ関数にすれば、先に挙げた要件をすべて満たす関数 `service-charge` は、次のように定義できるかもしれない。

```clojure
(defmulti service-charge account-level)
(defmethod service-charge ::acc/basic [acct]
  (if (= (:tag acct) ::acc/checking) 25 10))
(defmethod service-charge ::acc/premium [_] 0)
```

しかし、`::acc/basic` に対する `service-charge` にある条件式は、`account-level` で既に行っているので、本来は不要なはずである。このようなケースでは `account-level` と `:tag` の**両方でディスパッチ**すればよい。

#### 複数の値でディスパッチする

次のように実装できる。

```clojure
(defmulti service-charge (fn [acct] [(account-level acct) (:tag acct)]))
(defmethod service-charge [::acc/basic ::acc/checking] [_] 25)
(defmethod service-charge [::acc/basic ::acc/savings] [_] 10)
(defmethod service-charge [::acc/premium ::acc/checking] [_] 0)
(defmethod service-charge [::acc/premium ::acc/savings] [_] 0)
```

期待どおり動作するかをテストする。

```clojure
(service-charge {:tag ::acc/checking, :balance 1000}) ; 25
(service-charge {:tag ::acc/savings, :balance 1000})  ; 0
```

### アドホックな型を継承する

プレミアム口座のサービス料は常に同じなので、`::savings` と `::checking` とで別々の `service-charge` を実装するのは無駄に思える。両方の口座種別の親となる `::account` という型を定義できれば、`::premium` と `::account` でディスパッチして、コードを共通化できるはずである。

[[clojure|Clojure]] では、`derive` を使って親子関係を自由に定義できる。

#### derive 関数

```clojure
(derive child parent)
```

この関数を使って、`::savings` と `::checking` の親となる `::account` を定義する。

```clojure
(derive ::acc/checking ::acc/account)
(derive ::acc/savings ::acc/account)
```

これで、1 つのメソッドにまとめられる。

```clojure
(defmulti service-charge (fn [acct] [(account-level acct) (:tag acct)]))
(defmethod service-charge [::acc/basic ::acc/checking] [_] 25)
(defmethod service-charge [::acc/basic ::acc/savings] [_] 10)
(defmethod service-charge [::acc/premium ::acc/account] [_] 0)
```

#### derive は継承ではない

`derive` は Java の継承機能を使って**いない**。Java の継承関係はクラスを定義した時点で固定される。一方、`derive` は**既に存在するオブジェクトに対して、自由に関係を構築できる。**

## キーワード

- [[multimethod|マルチメソッド]]
- [[namespace|名前空間]]
- [[inheritance|継承]]
- [[dynamic-dispatch|動的ディスパッチ]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

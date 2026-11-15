---
title: Programming Clojure, Third Edition 第6章 ref と STM
description: ref はイミュータブルな値への変更可能な参照で、dosync のトランザクション中で ref-set、alter、commute を使って更新し、STM は MVCC で ACI を保証する
tags: [book-chapter, clojure]
date: 2023-09-05
book: "[[Programming Clojure, Third Edition]]"
chapter: 6
---

## TL;DR

- ref はイミュータブルなオブジェクトへの変更可能な参照で、`deref`（`@`）で中身を取り出し、`dosync` で作るトランザクション中でだけ更新できる。
- STM のトランザクションは MVCC で実装され、アトミック性、一貫性、独立性を保証する。
- `commute` は `alter` より並行性が高いが使いどころが難しいので、基本的に `alter` を使う。

## 内容

[[clojure|Clojure]] のほとんどのオブジェクトはイミュータブルなので、ミュータブルなデータが必要な場合は、ミュータブルであることを明示する必要がある。

### ref と deref（@）

その方法の 1 つは、イミュータブルなオブジェクトへの**変更可能な参照**（ref）を作ることである。この参照は `ref` で作れる。`ref` は状態を包み、状態へのアクセスを保護する。

```clojure
(ref initial-state)
```

たとえば、音楽のプレイリストで現在再生中の曲名を持っておく参照は、次のように定義できる。

```clojure
(def current-track (ref "Mars, the Bringer of War"))
```

`ref` の中身を取り出すには `deref` を使う。`deref` は `@` で略記できる。

```clojure
(deref reference)
```

```clojure
(deref current-track) ; "Mars, the Bringer of War"

@current-track ; "Mars, the Bringer of War"
```

Clojure の参照モデルは現実世界にも合致している。上の例では、曲名そのものはイミュータブルである。曲の再生が終わっても曲名そのものは変化せず、**現在の**再生曲を示している**参照が変化**する。

### ref-set と dosync

参照先を変えるには `ref-set` を使う。

```clojure
(ref-set reference new-value)
```

ただし、単に呼び出すだけでは例外を投げる。

```clojure
(ref-set current-track "Venus, the Bringer of Peace")
;; java.lang.IllegalStateException: No transaction running
```

`ref` は変更可能なので、更新するときには保護する必要がある。多くの言語ではここでロックを使うが、Clojure では[[transaction|トランザクション]]を使う。トランザクションは `dosync` マクロで囲んで作る。

```clojure
(dosync & exprs)
```

```clojure
(dosync (ref-set current-track "Venus, the Bringer of Peace"))
; "Venus, the Bringer of Peace"
```

これで `current-track` は別の曲名を参照するようになった。

```clojure
(deref current-track)
; "Venus, the Bringer of Peace"
```

### トランザクションの性質

DB のトランザクションの [[acid|ACID 特性]]のように、[ソフトウェアトランザクショナルメモリ（STM）](https://ja.wikipedia.org/wiki/%E3%82%BD%E3%83%95%E3%83%88%E3%82%A6%E3%82%A7%E3%82%A2%E3%83%88%E3%83%A9%E3%83%B3%E3%82%B6%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%8A%E3%83%AB%E3%83%A1%E3%83%A2%E3%83%AA)のトランザクションも重要な特性を保証する。ただし、Clojure のトランザクションはインメモリなので、**持続性**（Durable）は保証しない。

- **更新はアトミックである**（Atomic）: トランザクション中で複数の ref を更新した場合、それぞれの更新の効果は、トランザクションの外からは不可分なイベントとして観測される
- **更新は一貫している**（Consistency）: ref にはバリデーション関数を付けられる。どれか 1 つでもバリデーションが失敗したら、トランザクション全体が失敗する
- **それぞれの更新は独立している**（Isolated）: トランザクションの中で、他のトランザクションの途中結果が見えることはない

1 つのトランザクションの中で複数の ref を更新すると、トランザクションの外からは、変更がすべて一度に起きたかのように見える。たとえば次のコードでは、`current-track` と `current-composer` の更新をまとめて行える。

```clojure
(def current-track (ref "Venus, the Bringer of Peace"))
(def current-composer (ref "Hoist"))

(dosync
	(ref-set current-track "Credo")
	(ref-set current-composer "Byrd")) ; "Byrd"
```

更新をトランザクション中で行うので、`current-track` だけが更新されて `current-composer` が更新されていない状態を、他のスレッドが見ることは決してない。

### alter

`alter` は STM 中で頻繁に使われる関数で、ref の中身を更新する主要な方法である。

より複雑な例として、簡単なチャットアプリケーションを考える。まず、送信者とテキストを持つ `Message` レコードを作る。

```clojure
(defrecord Message [sender text])
```

インスタンスは次のように作れる。

```clojure
(->Message "Aaron" "Hello")
; #user.Message{:sender "Aaron", :text "Hello"}
```

ユーザは一番新しいメッセージから先に見るので、リストが適切なデータ構造であると仮定する。参照 `messages` を作り、空リストを初期値とする。

```clojure
(def messages (ref ()))
```

新しいメッセージを `messages` の先頭に追加するには、`deref` でメッセージのリストを取り出し、新しいメッセージを `cons` して、`ref-set` で新しいリストを ref に格納すればよい。

```clojure
; あまり良くないコード
(defn native-add-message [msg]
	(dosync (ref-set message (cons msg @message))))
```

このコードは `alter` を使うとより簡潔に書ける。`alter` は、トランザクション内で**更新関数を参照内のオブジェクトに適用**し、ref の読み出しと更新を 1 ステップで行う。

```clojure
(alter ref update-fn & args)
```

```clojure
(defn add-message [msg]
  (dosync (alter messages conj msg)))
```

更新関数には `cons` ではなく `conj` を使っている。`conj` の引数の順序が、`alter` が更新関数を呼び出す順序に一致しているので、そうしている。

```clojure
(cons item sequence)
(conj sequence item)
```

`alter` は `update-fn` の第 1 引数に `ref` の現在の値を渡す。更新関数を自分で書く場合は、`conj` と同じ順序で引数を取るようにするとよい。

```clojure
(your-func 更新対象となるもの & 他の引数)
```

いくつかメッセージを追加して、動作を確かめる。

```clojure
(add-message (->Message "user 1" "hello"))
; (#user.Message{:sender "user 1", :text "hello"})

(add-message (->Message "user 2" "howdy"))
; (#user.Message{:sender "user 2", :text "howdy"}
;  #user.Message{:sender "user 1", :text "hello"})
```

STM の仕組みを少し知っていれば、特定のシナリオでトランザクションを最適化できる。

### STM の仕組み: MVCC

Clojure の STM はいくつかのメジャーなデータベースにも使われている**多版同時実行制御**（Multiversion Concurrency Control, [[multiversion-concurrency-control|MVCC]]）を使っている。

Clojure の MVCC の実装は次のようになっている。トランザクション A はまず**ポイント**を 1 つ取得する。ポイントとは STM の世界でユニークなタイムスタンプの役割を果たす数値である。これでトランザクション A はそのポイント時点で参照したいものについて、事実上のプライベートコピーにアクセスできるようになる。Clojure のデータ構造（[[persistent-data-structure|永続的データ構造]]）は、事実上のプライベートコピーを簡単に作れるようにできている。

トランザクション A では、ref に対する操作は、ref の持つデータのトランザクション固有のプライベートなコピーに対して行われる。このコピーは**トランザクション中の値**（in-transaction value）と呼ばれる。

トランザクション A が書き換えようとしている ref の内容を、他のトランザクションが既に置き換えていることを STM が検出すると、トランザクション A は再起動される。`dosync` から例外で抜け出したら、トランザクション A は再起動されずに中断される。

トランザクション A が**コミット**すると、プライベートコピーへの書き込みが、トランザクションの時間軸のある一点を指すポイントに結び付けられて公開される。

`alter` の取るアプローチは用途によっては慎重すぎる。たとえば、トランザクションの途中で、他のトランザクションが `alter` の対象となる ref を更新することを許容するならば、自分の更新さえコミットされればよい。この場合は、`alter` ではなく `commute` を使うとパフォーマンスが上がる。

### commute

`commute` は `alter` の特殊なバージョンで、より高い並行性を実現する。

```clojure
(commute ref update-fn & args...)
```

もちろんトレードオフもあり、`commute` は**交換可能**（commutative）な操作のためのものである。つまり、更新がどの順序で起きてもよい操作である。この性質のため、STM は `commute` の実行順序を自由に変えられる。

`alter` のサンプルコードを `commute` で定義し直すには、単に `alter` を `commute` で置き換えればよい。

```clojure
(defn add-message-commute [msg]
  (dosync (commute messages conj msg)))
```

`commute` は ref の新しい値を返すが、**`commute` が返すトランザクション内の値は、トランザクションが終了した後の ref の値と異なる可能性**がある。`commute` しようとした値が他のトランザクションに置き換えられていた場合、STM はトランザクション全体を再起動するのではなく、`commute` 関数だけを後で自動的に再実行するので、このようなことが起きる。

Clojure の STM は `commute` の実行順を知らないうちに変える可能性があるので、`commute` は実行順がどうであろうと関係がない操作でのみ使える。厳密に言えば、上のチャットアプリケーションはこの条件に当てはまらない。メッセージのリストでは順序が意味を持ち、2 つのメッセージの追加順序が逆転したら、結果のリストはメッセージが到着した順番を正しく反映しない。

しかし現実的には、チャットメッセージの更新は十分に交換可能である。STM の行う順序の変更は、マイクロ秒オーダーの話だからである。

### alter のほうが良い場合

結論として、基本的に `alter` を使う。多くの更新は交換可能ではない。

たとえば、数をインクリメントしてその値を数えるカウンタを考える。カウンタは数値への参照として実装できる。

```clojure
(def counter (ref 0))
```

このようなカウンタに `commute` を使ってはいけない。`commute` は実行された時点でのトランザクション内の値を返すが、順序の入れ替えのために、トランザクション終了時の値がそれと同じとは限らない。そのため、複数の呼び出し元が同じカウンタの値を見てしまう可能性がある。この場合は `alter` を使う。

```clojure
(defn next-counter [] (dosync (alter counter inc)))
```

`next-counter` を何回か呼んで、期待どおりに動くことを確かめる。

```clojure
(next-counter) ; 1
(next-counter) ; 2
```

一般的に、`commute` よりも `alter` を使うべきである。`alter` のセマンティクスは理解しやすく、間違いを起こしにくい。一方、`commute` はトランザクションの性質をよく理解して使う必要がある。`commute` で十分な場所に `alter` を使っても、悪くてパフォーマンスが少し落ちるくらいである。しかし、`alter` が必要な場所で `commute` を使うと、自動化テストでは見つけにくい厄介なバグを生む可能性がある。

### ref にバリデーションを追加する

データベースのトランザクションはさまざまな一貫性チェックを行って、データが正しいことを保証している。Clojure の STM でも、ref を作るときに**バリデーション関数**（`:validator`）を指定すると、同じようなチェックができる。

```clojure
(ref initial-state options*)
; 使用可能なオプション
;   :validator validate-fn
;   :meta metadata-map
```

バリデーション関数は例外を投げてトランザクションを中断できる。注意点として、`options` はマップではなく、引数リストにキーと値のペアを並べるだけでよい。

先ほどのチャットアプリケーションを例に挙げる。

```clojure
(defn valid-message? [msg]
  (and (:sender msg) (:text msg)))
(def validate-message-list #(every? valid-message? %))

(def messages (ref () :validator validate-message-list))
```

このバリデーションは、`msg` に `:sender` というキーと `:text` というキーが含まれていることをチェックしている。

```clojure
(add-message (->Message "user 1" "Hello"))
; (#user.Message{:sender "user 1", :text "Hello"})
```

無効な値を渡すと、トランザクション全体が巻き戻される。

```clojure
(add-message "not a valid message")
;; java.lang.IllegalStateException: Invalid reference state

@messages
;; (#user.Message{:sender "user 1", :text "Hello"})
```

ref は共有状態への協調したアクセスに力を発揮する。しかし、すべてのタスクが協調的なアクセスを必要とするわけではない。このようなケースでは atom を使うとよい（[[Programming Clojure, Third Edition 第6章 atom を用いた非協調的かつ同期的な更新]]）。

## キーワード

- [[clojure-ref|ref]]
- [[software-transactional-memory|STM]]
- [[transaction|トランザクション]]
- [[acid|ACID]]
- [[multiversion-concurrency-control|MVCC]]
- [[persistent-data-structure|永続的データ構造]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

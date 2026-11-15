---
title: Programming Clojure, Third Edition 第6章 atom を用いた非協調的かつ同期的な更新
description: atom は ref より軽量な機構で、単一の値を他の値と関係なく、トランザクションなしに reset! と swap! で同期的に更新する
tags: [book-chapter, clojure]
date: 2023-09-05
book: "[[Programming Clojure, Third Edition]]"
chapter: 6
---

## TL;DR

- atom は ref より軽量な機構で、単一の値を他の値とは関係なく更新するのに使う。
- トランザクションを使わないので `dosync` は要らず、`reset!` で値を設定し、`swap!` で更新関数を適用する。`swap!` は再試行されうるので、渡す関数は副作用を起こしてはいけない。

## 内容

atom は ref よりも軽量な機構である。複数の ref の更新はトランザクションを使って協調させる必要があったが、atom は単一の値を、他の値とは関係なく更新するのに使う。

### atom

atom は `atom` で作る。

```clojure
(atom initial-state options?)
; 使用可能なオプション
;   :validator validate-fn
;   :meta metadata-map
```

ref と同じように、音楽プレーヤーのサンプルを見てみる。

```clojure
(def current-track (atom "Venus, the Bringer of Peace"))
```

値を得るには、ref と同様に `deref` を使える。

```clojure
(deref current-track) ; "Venus, the Bringer of Peace"
```

### reset!

atom はトランザクションを使わないので、`dosync` も必要ない。atom の値を設定するには `reset!` を使う。

```clojure
(reset! an-atom newval)
```

```clojure
(reset! current-track "Credo")
```

### swap!

```clojure
(swap! an-atom f & args)
```

`swap!` は `f` を `an-atom` の現在の値に適用し、戻り値で `an-atom` を更新する。この関数と `assoc` を組み合わせると、atom で管理しているマップの一部のキーの値だけを変更できる。

```clojure
(swap! current-track assoc :title "Sancte Deus")
; {:title "Sancte Deus", :composer "Byrd"}

@current-track
; {:title "Sancte Deus", :composer "Byrd"}
```

他のスレッドが同じ atom を更新しようとした場合、`swap!` の呼び出し自身が再試行される可能性がある。そのため、**`swap!` に渡す関数は副作用を起こしてはいけない。**

ref も atom も同期的な更新で、更新関数が返ってきたら、その時点で値は既に更新されている。この制約が必要なく、実際の更新が起きるタイミングが少し遅れてもよいならば、agent が使える（[[Programming Clojure, Third Edition 第6章 agent を用いた非同期的な更新]]）。

## キーワード

- [[clojure-atom|atom]]
- [[atomic|アトミック]]
- [[side-effect|副作用]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

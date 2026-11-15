---
title: Programming Clojure, Third Edition › reify
description: reify はプロトコルかインタフェースを実装する無名のデータ型を作り、明示的なフィールドの代わりにクロージャで値を束縛する
tags: [book-chapter, clojure]
date: 2023-09-11
book: "[[Programming Clojure, Third Edition]]"
chapter: 7
---

## TL;DR

- `reify` は、プロトコルかインタフェースを実装する無名のデータ型を作る。
- フィールド名のベクタを使わず、明示的なフィールドの代わりに[[closure|クロージャ]]で値を束縛する。

## 内容

### reify マクロ

`reify` マクロはプロトコルかインタフェースを実装する**無名のデータ型**を作る。

```clojure
(reify & opts+specs)
```

`reify` も `deftype` や `defrecord` と同様に、プロトコルやインタフェース名とメソッド実装の並びを引数に取る。しかし、フィールド名のベクタは使わない。無名データ型のインスタンスは明示的なフィールドを持たない代わりに、クロージャで値を束縛する。

### [偶然性の音楽](https://ja.wikipedia.org/wiki/%E5%81%B6%E7%84%B6%E6%80%A7%E3%81%AE%E9%9F%B3%E6%A5%BD)によるサンプル

サンプルとして、`reify` を使い、`play` メソッドが呼ばれるたびに毎回異なるランダムな音符を演奏する `MidiNote` インスタンスを作る（`MidiNote` と `perform` は [[Programming Clojure, Third Edition 第7章 レコード]]で定義した）。

```clojure
(let [min-duration 250
      min-velocity 64
      rand-note (reify
                  MidiNote
                  (to-msec [this tempo] (+ (rand-int 1000) min-duration))
                  (key-number [this] (rand-int 100))
                  (play [this tempo midi-channel]
                    (let [velocity (+ (rand-int 100) min-velocity)]
                      (.noteOn midi-channel (key-number this) velocity)
                      (Thread/sleep (to-msec this tempo)))))]
  (perform (repeat 15 rand-note)))
```

`reify` で作ったインスタンスは、`play` が呼ばれるたびに、ランダムな音高、長さ、速さの値を選ぶ。そして、`repeat` 関数で単一の `rand-note` インスタンスから 15 個の音の並びを作り出し、演奏する。

## キーワード

- [[closure|クロージャ]]
- [[protocol-clojure|プロトコル]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

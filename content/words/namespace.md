---
title: 名前空間
aliases: []
description: 名前の集合を分けて、名前の衝突を防ぎつつ参照しやすくする仕組み
tags: [word, clojure]
date: 2026-11-14
---

## TL;DR

名前の集合を分けて、名前の衝突を防ぎつつ参照しやすくする仕組み。[[clojure|Clojure]] では、シンボルから [[clojure-var|Var]] やクラスへの対応付けを指す。

## なぜ必要か

Wikipedia によると、名前空間があれば、冗長な命名規則を使わなくても名前が衝突しない。複数のチームで開発するとき、チームごとに名前空間を決めておけば、同じ名前の関数を定義しても衝突しない。「一郎」だけでは同名の人を区別できないが、「鈴木一郎」と姓を付ければ区別できるのと同じ考え方である。

## 仕組み

Clojure の公式リファレンスによると、名前空間は修飾されていないシンボルから Var やクラスへの対応付けである。`def` は名前空間に Var を登録し、`refer` や `use` は他の名前空間の Var への対応を、`import` はクラスへの対応を足す。名前空間はファーストクラスで、実行中に列挙、作成、削除、変更ができる。

ソースファイルの先頭では `ns` マクロで名前空間を作る。`ns` は既定で java.lang のクラスを対応付け、clojure.core の関数を refer する。[[めだかのclojure.core学校]]では、clojure.core はすべての名前空間に自動で読み込まれるので、その中身を理解することが Clojure に慣れる第一歩だとしている。

REPL では `in-ns` を使う。`in-ns` で作った名前空間には java.lang のクラスしか対応付けられないので、clojure.core の名前を使うには `(clojure.core/refer 'clojure.core)` を実行する。現在の名前空間は `*ns*` に入っており、`in-ns` か `ns` でだけ切り替える。どちらも、名前空間がなければ作る。

## 例

[[java|Java]] のパッケージや、[[cpp|C++]]、C# の名前空間がある。

```clojure
(ns example.core)

(defn hello [] "hello")
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[clojure-var|Var]]
- [[clojure|Clojure]]

## 出典

- [名前空間 - Wikipedia](https://ja.wikipedia.org/wiki/名前空間)
- [Namespaces - Clojure](https://clojure.org/reference/namespaces)
- [[めだかのclojure.core学校]]

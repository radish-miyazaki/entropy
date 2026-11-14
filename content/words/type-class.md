---
title: 型クラス
aliases: [type class]
description: 型が満たすべき演算の集まりを定義し、型ごとにその実装を与えて関数を多重定義する仕組み。Haskell などで使われる
tags: [word, 型システム, 関数型プログラミング]
date: 2026-11-14
---

## TL;DR

型がサポートすべき演算の集まりを定義し、型ごとにその実装を与える仕組み。[[haskell|Haskell]] の型システムの一部で、関数の多重定義（オーバーロード）を構造的に導入する。

## なぜ必要か

Haskell 2010 Language Report によると、型クラスは多重定義された関数を構造的に導入するために型システムを拡張したものである。たとえば `(+)` や `negate` を `Int` と `Float` の両方で使えるように多重定義したいとき、型クラスを使う。

[[関数型言語テイスティング： Haskell, Scala, Clojure, Elixirを比べて味わう関数型プログラミングの旨さ|関数型言語テイスティング]]によると、オブジェクト指向プログラミングでは多相性というと継承による仕組みが思い浮かぶが、関数型言語ではアドホック多相やパラメータ多相など別の仕組みが提供されていることが多い。型クラスはその 1 つである。

## 仕組み

クラス宣言は、新しい型クラスと、そのインスタンスとなる型がサポートしなければならない多重定義の演算を導入する。インスタンス宣言は、ある型がそのクラスのインスタンスであることを宣言し、多重定義された演算の定義を与える。関数の型には `Eq a => a -> a` のように、型変数が属すべきクラスを制約として書ける。データ型の定義に `deriving` を付けると、`Eq` などのクラスのインスタンスを自動で導出でき、等価性の演算を自分で定義しなくて済む。

## 例

```haskell
class Num a where
  (+)    :: a -> a -> a
  negate :: a -> a

instance Num Int where
  ...

instance Num Float where
  ...
```

## 注意点

すべての関数型言語が型クラスを持つわけではない。[[unison-language|プログラミング言語 Unison を知る]]で調べたとおり、[[unison|Unison]] には型クラスや[[monad|モナド]]の概念がなく、代わりに[[algebraic-effects|Algebraic Effects]] を採用している。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[haskell|Haskell]]
- [[trait|トレイト]]
- [[interface|インタフェース]]
- [[function-overloading|オーバーロード]]
- [[higher-kinded-types|高カインド型]]

## 出典

- [Haskell 2010 Language Report, Chapter 4 Declarations and Bindings](https://www.haskell.org/onlinereport/haskell2010/haskellch4.html)
- [[関数型言語テイスティング： Haskell, Scala, Clojure, Elixirを比べて味わう関数型プログラミングの旨さ|関数型言語テイスティング]]
- [[unison-language|プログラミング言語 Unison を知る]]

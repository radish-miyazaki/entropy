---
title: Programming Clojure, Third Edition 第5章 はじめに
description: 汎用的なコレクションを再利用する Clojure のコードには明示的な型が不足する。Java のコードと比べ、spec がその問題をどう解決するかを見る
tags: [book-chapter, clojure]
date: 2023-09-02
book: "[[Programming Clojure, Third Edition]]"
chapter: 5
---

## TL;DR

- Clojure は汎用的なコレクション型を再利用してデータを表すので、再利用性や柔軟性は高いが、明示的な型が不足してコードが理解しづらい傾向にある。
- Clojure 1.9 で入った spec を使うと、書くコードはそのままで、データ構造や関数の入出力の仕様を明示できる。spec は単なるドキュメントではなく、データ検証やテストの自動生成にも使える。

## 内容

この章では、次のことを順番に見ていく。

1. コード内で**仕様（spec）を定義し、実行時にそれらを利用する**方法
2. 仕様を組み合わせて**データ検証**をする方法
3. `s/fdef` を使って、**引数のチェック**と**テストの自動生成**をする仕様を定義する方法

### Clojure のコードで不足する明示的な型

Java などの[[static-typing|静的型付け]]言語は、プログラム内の各データユニットに対して、ユニークな名前付きデータ構造（**クラス**）を作る。

一方、Clojure は[[dynamic-typing|動的型付け]]言語であり、プログラムのデータを表現するために**汎用的なコレクション型**（ベクタやマップ、集合、リスト、シーケンス）**を再利用**することに依存している。これにより、コードの再利用性や単純さ、汎用性、拡張性が向上する。

しかし、このアプローチだと、プログラマがコードを理解するのに必要な**明示的な型**が不足し、**コードが理解しづらい傾向**にある。

### Java と Clojure のコードの比較

たとえば、食材（ingredient）のレシピを取り、より大きなレシピのために数量をスケーリングする関数があるとする。

Java の場合、`Ingredient` と `Unit` クラスを定義し、メソッドは次のようになる。

```java
public class Ingredient {
	private String name;
	private double quantity;
	private Unit unit;

	// ...

	public static Ingredient scale(Integredient integredient, double factor) {
		ingredient.setQuantity(ingredient.getQuantity() * factor);
		return ingredient;
	}
}
```

Clojure の場合だと、食材は**単なるマップ**かもしれない。また、スケーリング関数は明示的な型に言及せずに、**マップを受け取り、マップを返す**かもしれない。

```clojure
(defn scale-ingredient [ingredient factor]
	(update ingredient :quantity * factor))
```

この Clojure のコードは、いくつかの点で Java のコードよりも優れている。

- ミュータブルな値を直接更新するのではなく、[[immutability|イミュータブル]]な値を受け取って返すので、**理解しやすく**、デフォルトで**スレッドセーフ**である
- マップは**簡単に変更できる属性の集合**であり、Java クラスの独自の API に閉じ込められることがなく、**柔軟性に優れている**

一方で、Clojure のコードには `ingredient` の**構造に関する明示的な情報が不足**している。プログラマはこの構造をドキュメントやプログラムのコードから推測する必要がある。

### 問題を解決する spec ライブラリ（Clojure 1.9〜）

Clojure 1.9 で、**[[clojure-spec|spec]]** というライブラリが導入された。これにより、データ構造や関数の入出力を記述する仕様（spec）を作れる。

**書くコード自体は変わらないが、コードに仕様を追加する**ことで、**暗黙的な構造を明示的に**できる。たとえば、次のようにコードに仕様を追加できる。

```clojure
(require '[clojure.spec.alpha :as s])

;; Specs describing on ingredient
(s/def ::ingredient (s/keys :req [::name ::quantity ::unit]))
(s/def ::name string?)
(s/def ::quantity number?)
(s/def ::unit keyword?)

;; Function spec for scale-ingredient
(s/fdef scale-ingredient
  :args (s/cat :ingredient ::ingredient :factor number?)
  :ret ::ingredient)
```

このコードは食材（ingredient）を表す**マップの形状やフィールド、その内容**について正確な説明を提供している。また、関数の spec は `scale-ingredient` の引数と戻り値を明示的に定義している。

これらの spec は**単なるドキュメントではなく**、実際の**データ検証**や**無効なデータの説明**、**サンプルデータの生成**、**テストの自動生成**など、様々な機能を持っている。

## キーワード

- [[clojure-spec|spec]]
- [[static-typing|静的型付け]]
- [[dynamic-typing|動的型付け]]
- [[immutability|イミュータブル]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

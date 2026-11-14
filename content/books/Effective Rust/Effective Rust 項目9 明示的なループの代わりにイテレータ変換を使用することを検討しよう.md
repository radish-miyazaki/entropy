---
title: Effective Rust 項目9 明示的なループの代わりにイテレータ変換を使用することを検討しよう
description: Iterator と IntoIterator の仕組み、イテレータを変換・消費するメソッド、イテレータ変換より明示的なループが向いている場面を説明する項目
tags: [book-chapter, rust]
date: 2025-01-11
book: "[[Effective Rust]]"
chapter: 9
---

## TL;DR

- [[rust|Rust]] には、[[iterator|イテレータ]]や for-each ループに加えて、イテレータ変換（イテレータアダプタ）という一歩進んだループの[[abstraction|抽象化]]がある。
- イテレータ変換を使うと、コードが Rust らしく、短く、意図が明確になる。ただし、無理にループをイテレータ変換に書き換える必要はない。

## 内容

### ループの抽象化

最近のプログラミング言語は、イテレータと for-each ループでループを抽象化している。イテレータは、コンテナの次の要素を、要素がなくなるまで順に返す型である。for-each は、コンテナのすべての要素について繰り返し実行するループで、ループ変数は要素そのものになる。Rust にはこれらに加えて、イテレータ変換がある。

```rust
let even_sum_squares: u64 = values
    .iter()
    .filter(|x| *x % 2 == 0)
    .take(5)
    .map(|x| x * x)
    .sum();
```

### Iterator と IntoIterator

[Iterator](https://doc.rust-lang.org/std/iter/trait.Iterator.html) [[trait|トレイト]]を実装するには、`next` メソッドだけを実装すればよい。要素の型は関連型 `Item` で指定する。

```rust
fn next(&mut self) -> Option<Self::Item>;
```

要素を繰り返し処理できるコレクションは、[IntoIterator](https://doc.rust-lang.org/std/iter/trait.IntoIterator.html) トレイトを実装する。必須メソッドの `into_iter` は、`self` を消費して（[[ownership|所有権]]を奪って）`Iterator` を返す。コンパイラは `for item in collection { ... }` という形の式を見つけると、自動でこのトレイトを使う。すべての `Iterator` には、`self` を返す `IntoIterator` の実装があらかじめ用意されている。

イテレータが要素を消費すると、そのコレクションは再利用できない。

```rust
let collection = vec![Thing(0), Thing(1), Thing(2), Thing(3)];
for item in collection {
    println!("Consumed item {item:?}")
}
println!("Collection = {collection:?}") // コンパイルエラー
```

これは `for item in &collection` のように各要素を借用すれば避けられる。このときコンパイラは `&Collection` に対する `IntoIterator` の実装を探し、標準のコレクション型はこの実装を提供している。`Thing` に `Copy` を実装しても避けられる。可変参照で繰り返したいときは `for item in &mut collection` と書く。

標準のコンテナは、要素への参照を返すイテレータを作る `iter()` と、要素を変更できる `iter_mut()` を実装するのが慣習になっている。`for` を使えばこれらは自動で呼ばれるが、イテレータ変換の起点として使えることが重要である。`collection.iter().map(|thing| thing.0).sum()` は `(&collection).into_iter().map(|thing| thing.0).sum()` と同じ意味になる。

### イテレータを変換するメソッド

`Iterator` トレイトには、多くのメソッドがデフォルト実装されている。

- 繰り返し全体を変える: `take(n)`、`skip(n)`、`step_by(n)`、`chain(other)`、`cycle()`（イテレータが `Clone` を実装している必要がある）、`rev()`（[DoubleEndedIterator](https://doc.rust-lang.org/std/iter/trait.DoubleEndedIterator.html) が必要）
- 要素を変える: `map(f)`、`cloned()`（`Item` が `Clone`）、`copied()`（`Item` が `Copy`）、`enumerate()`（`(usize, Item)` の組にする）、`zip(it)`
- 要素を絞り込む: `filter(p)`、`take_while(p)`、`skip_while(p)`
- 入れ子を平らにする: `flatten()`

`Option` や `Result` もイテレータとして扱える。`Some(value)` や `Ok(value)` は要素を 1 つ持ち、`None` や `Err(err)` は要素を持たない。そのため `flatten()` を使えば、有効な値だけを取り出せる。

```rust
let options = vec![Some(1), None, Some(3), None, Some(5)];
let valid_values: Vec<_> = options.into_iter().flatten().collect(); // [1, 3, 5]
```

### イテレータを消費するメソッド

最も汎用的なのは `for_each(f)` で、明示的な `for` ループでできることの大半ができる。ただし、クロージャの中で外の状態を更新するには可変参照が必要になる。用意されたメソッドで書けるなら、そちらを使うほうが短く、Rust らしいコードになる。

- 1 つの値を作る: `sum()`、`product()`、`min()`、`max()`、`min_by(f)`、`max_by(f)`、`reduce(f)`、`fold(f)`、`scan(init, f)`。`reduce` は累積値を `Item` 型で作り、`fold` はそれを任意の型に一般化したもの、`scan` は内部状態の可変参照を使う別方向の一般化である
- 1 つの要素を選ぶ: `find(p)`、`position(p)`、`nth(n)`
- 全要素を検査する: `any(p)`、`all(p)`。答えが決まった時点で繰り返しを止める
- クロージャのエラーを扱う: `try_for_each(f)`、`try_fold(f)`、`try_find(f)`。最初のエラーで止まり、そのエラーを返す
- 新しいコレクションを作る: `collect()`、`unzip()`、`partition(p)`

`collect()` は、[FromIterator](https://doc.rust-lang.org/std/iter/trait.FromIterator.html) を実装した任意のコレクション型を作れる。標準のコレクション型はすべてこれを実装しているので、作る型を明示する必要がある。

```rust
let myvec: Vec<i32> = (0..10).into_iter().filter(|x| x % 2 == 0).collect();
let h: HashSet<i32> = (0..10).into_iter().filter(|x| x % 2 == 0).collect();
```

また、Rust はベクタやスライスへのアクセスで境界チェックを行い、範囲外へのアクセスで panic を起こす。イテレータではこのチェックが不要なので、明示的なループより効率がよくなる可能性がある。ただし、コンパイラはアクセスが安全だと分かれば境界チェックを省くので、必ず速くなるとは限らない。

### Result からコレクションを作る

`collect()` は `Result` を含むコレクション型も作れる。`?` と組み合わせると、途中でエラーが起きれば繰り返しを止めて呼び出し元にエラーを返し、起きなければ正しい型の値のコレクションを得られる。

```rust
let result: Vec<u8> = inputs
    .into_iter()
    .map(|v| <u8>::try_from(v))
    .collect::<Result<Vec<_>, _>>()?;
```

### 明示的なループが向いている場面

1. ループの本体が大きく複雑な場合。クロージャに詰め込むと読みにくくなる
2. ループの本体でエラーが起き、早期リターンしたい場合。ただし、上のように `collect()` で `Result` をまとめて扱えるなら、`?` で簡潔に書ける
3. 性能が重要な場合。クロージャを使ったイテレータ変換が明示的なループと同じくらい速くなるかを確かめる必要がある。測るときは、コンパイラの最適化で楽観的な結果が出ることを考え、テストデータを実際の使われ方に合わせる（[[Effective Rust 項目30 ユニットテスト以上のものを書こう|項目30]]）。[[compiler-explorer|Godbolt compiler explorer]] で、コンパイラが出力するアセンブリを確かめるとよい

大事なのは、ループを無理にイテレータ変換に書き換えないことである。最終的には好みの問題でもある。

## キーワード

- [[iterator|イテレータ]]
- [[trait|トレイト]]
- [[ownership|所有権]]
- デフォルト実装
- [[abstraction|抽象化]]
- [[compiler-explorer|Godbolt compiler explorer]]
- [[functional-programming|関数型プログラミング]]

## 自分の理解

ループの本体でエラーが起きる場合に明示的なループのほうがよいのは、読みやすさと柔軟性を保てるからだと思う。

イテレータ変換に抵抗があるかどうかは、[[functional-programming|関数型プログラミング]]に親しんでいるかで変わるはずである。

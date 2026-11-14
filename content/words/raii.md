---
title: RAII パターン
aliases: [RAII]
description: 値の生存期間と外部リソースのライフサイクルを結びつけ、スコープを抜けると確実にリソースを解放するイディオム
tags: [word, c++, rust]
date: 2024-12-27
---

## TL;DR

ある値の生存期間を、外部リソースのライフサイクルと厳密に結びつけるイディオム。RAII は Resource Acquisition Is Initialization（資源の取得と同時に初期化する）の略である。

## なぜ必要か

[[cpp|C++]] では、手動でのメモリの確保（`new`、`malloc`）と解放（`delete`、`free`）を対応させるために使われてきた。C++11 で標準ライブラリに `std::unique_ptr<T>` が追加されてからは、これがメモリの所有権を持つ唯一の場所になり、一時的に使うときは `ptr.get` でポインタを「借用」するようになった。[[rust|Rust]] の所有権の考え方も、これに近い。

RAII はメモリ以外のリソースにも役立つ。後から制御の流れを変える修正をしても、値とリソースの生存期間は同じままなので、コードを保守しやすくなる。

## 仕組み

基本の原則は 2 つである。

- コンストラクタでリソースへのアクセスを確保する
- デストラクタでリソースへのアクセスを解放する

この結果、値が存在すればリソースにアクセスでき、存在しなければアクセスできない。コンパイラは変数のスコープが終わったときに値が破棄されることを保証するので、値が持つリソースもスコープが終わった時点で解放されることが保証される。

## 例

mutex をロックしてアンロックするコードを考える。RAII を使わないと、途中で `return` したときに mutex がロックされたままになるコードを書けてしまう。

```cpp
void add_with_modification(int delta) {
    mu_.lock();
    // ...
    value_ += delta;
    if (value_ > MAX_INT) {
        return;  // アンロックされない
    }
    // ...
    mu_.unlock();
}
```

ロックとアンロックをコンストラクタとデストラクタに持たせると、どこで関数を抜けても確実にアンロックされる。

```cpp
class MutexLock {
  public:
    MutexLock(Mutex* mu) : mu_(mu) { mu_->lock(); }
    ~MutexLock()                   { mu_->unlock(); }
  private:
    Mutex* mu_;
};

void add_with_modification(int delta) {
    MutexLock with_lock(&mu_);
    // ...
    value_ += delta;
    if (value_ > MAX_INT) {
        return;  // with_lock の破棄でアンロックされる
    }
    // ...
}
```

Rust では、`Drop` トレイトを実装して同じことを実現する。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[ownership|所有権]]

## 出典

- [[Effective Rust 項目11 RAIIパターンにはDropトレイトを実装しよう|Effective Rust 項目11]]
- [C++/RAII - Wikibooks](https://ja.wikibooks.org/wiki/C%2B%2B/RAII)

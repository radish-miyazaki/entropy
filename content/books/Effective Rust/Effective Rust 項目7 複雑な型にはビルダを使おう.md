---
title: Effective Rust › 複雑な型にはビルダを使おう
description: すべてのフィールドの指定を要求する Rust の構造体を作りやすくするために、ビルダパターンを使おうという項目
tags: [book-chapter, rust]
date: 2024-12-20
book: "[[Effective Rust]]"
chapter: 7
---

## TL;DR

- 複雑なデータ構造は、利用者が作りやすいように[[builder-pattern|ビルダパターン]]を使う。
- [[rust|Rust]] は構造体を作るときにすべてのフィールドの指定を求めるので、定型的なコードが増えやすい。

## 内容

https://effective-rust.com/builders.html

### ビルダを使わない場合

次の構造体を作るには、すべてのフィールドを書く必要がある。このような定型的なコードは、フィールドを追加したときなどに壊れやすい。

```rust
#[derive(Debug, Default, Clone)]
pub struct Details {
    pub given_name: String,
    pub preferred_name: Option<String>,
    pub middle_name: Option<String>,
    pub family_name: String,
    pub mobile_phone: Option<PhoneNumberE164>,
}
```

`Default` を実装していれば、`..Default::default()` で残りのフィールドを省略できる。しかし、`#[derive(Default)]` が使えるのは、すべてのフィールドが `Default` を実装している場合だけである。たとえば `time::Date` は `Default` を実装していない。自分で定義していない型には、[[orphan-rule|孤児ルール]]により `Default` を実装できない（[[Effective Rust 項目6 newtypeパターンを活用しよう|項目6]]）。結局、すべてのフィールドを指定することになる。

### ビルダを使う場合

最も簡単な実装は、構築に必要な情報を持つビルダ型を別に用意する方法である。必須の値は `new` で受け取る。

```rust
pub struct DetailsBuilder(Details);

impl DetailsBuilder {
    pub fn new(given_name: &str, family_name: &str, date_of_birth: time::Date) -> Self {
        DetailsBuilder(Details {
            given_name: given_name.to_owned(),
            preferred_name: None,
            middle_name: None,
            family_name: family_name.to_owned(),
            mobile_phone: None,
            date_of_birth,
            last_seen: None,
        })
    }

    pub fn middle_name(mut self, middle_name: &str) -> Self {
        self.0.middle_name = Some(middle_name.to_owned());
        self
    }

    pub fn build(self) -> Details {
        self.0
    }
}
```

フィールドを埋めるヘルパメソッドは `self` を消費するが、新しい `Self` を返すので、メソッドチェーンで書ける。最後に `build` で構築したデータ構造を返す。

```rust
let also_bob = DetailsBuilder::new("Robert", "Builder", date)
    .middle_name("the")
    .preferred_name("Bob")
    .just_seen()
    .build();
```

### 注意点と回避策

`self` を消費するビルダには、小さな問題が 2 つある。

1. 構築の手順を条件分岐などで分けられない
2. 同じビルダから `build` を何度も呼んで、複数のインスタンスを作れない

1 は、消費したビルダを同じ変数に代入し直せば回避できる。ヘルパメソッドが `&mut self` を受け取り `&mut Self` を返すようにしても回避できる。ただしこの場合は、`new` とヘルパメソッドの呼び出しを続けて書けないので、`new` の戻り値をいったん変数に束縛する。

```rust
let mut builder = DetailsBuilder::new("Robert", "Builder", date);
if informal {
    builder = builder.preferred_name("Bob");
}
```

2 は、`build` が `self` を消費しないようにすれば回避できる。対象の型が `Clone` を実装していれば `self.0.clone()` を返すだけでよい。実装していなければ、`build` のたびに新しいインスタンスを作れる情報をビルダに持たせる。

### derive_builder クレート

ビルダを自分で書く代わりに、[derive_builder](https://github.com/colin-kiegel/rust-derive-builder) クレートの [[derive-macro|derive マクロ]]を使う手もある。

```rust
#[derive(Debug, Clone, Builder)]
pub struct Details {
    pub given_name: String,
    #[builder(setter(into, strip_option), default)]
    pub preferred_name: Option<String>,
    // ...
}
```

## キーワード

- [[builder-pattern|ビルダパターン]]
- [[orphan-rule|孤児ルール]]
- [[derive-macro|derive マクロ]]
- [[init-struct-pattern|Init パターン]]

## 自分の理解

アプリケーションのコードではビルダはやりすぎなので、[[init-struct-pattern|Init パターン]]でもよいかもしれない。

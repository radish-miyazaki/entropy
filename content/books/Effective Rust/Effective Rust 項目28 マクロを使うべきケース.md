---
title: Effective Rust › マクロを使うべきケース
description: マクロを使う一番の理由は同じ記述を避けることであり、同じ構造のコードを繰り返し書いているときにマクロとしてまとめる
tags: [book-chapter, rust]
date: 2025-01-21
book: "[[Effective Rust]]"
chapter: 28
---

## TL;DR

- [[macro|マクロ]]を使う一番の理由は、同じ記述を避けることである。
- 同じ値の処理は関数に、複数の型の処理は[[generics|ジェネリクス]]に、同じ構造を持つコードはマクロにまとめる。

## 内容

[[Effective Rust 項目28 分別をもってマクロを使おう|項目28 分別をもってマクロを使おう]]のうち、マクロを使うべき場面の話である。

### 同じ記述を避ける

マクロを使う一番の理由は、同じ記述を避けることである。これは、普段のプログラミングで行っている[[encapsulation|カプセル化]]の延長にすぎない。特定の型の複数の値に同じコードを書いているなら、関数に切り出す。複数の型に同じコードを書いているなら、トレイト境界を持つジェネリクスにする。同じ構造を持つコードを繰り返し書いているなら、マクロにする。

### 使用例

1 つ目は、`enum` から特定のバリアントの値をすべて取り出す処理である。

```rust
#[macro_export]
macro_rules! values_of_type {
    { $values:expr, $variant:ident } => {
        {
            let mut result = Vec::new();
            for val in $values {
                if let Multi::$variant(v) = val {
                    result.push(v.clone());
                }
            }
            result
        }
    }
}

let ints = values_of_type!(&values, Int);   // [1000]
let bytes = values_of_type!(&values, Byte); // [1, 2]
```

2 つ目は、HTTP のステータスコードを表すデータ構造である。コード、グループ、説明文の組を並べるだけで、`Status` の `enum`、`group` と `text` のメソッド、`TryFrom<i32>` の実装をまとめて生成する。

```rust
#[macro_export]
macro_rules! http_codes {
    { $( $name:ident => ($val:literal, $group:ident, $text:literal), )+ } => {
        #[derive(Clone, Debug, Copy, PartialEq, Eq, Hash)]
        #[repr(i32)]
        enum Status {
            $( $name = $val, )+
        }
        impl Status {
            fn group(&self) -> Group {
                match self {
                    $( Self::$name => Group::$group, )+
                }
            }
            fn text(&self) -> &'static str {
                match self {
                    $( Self::$name => $text, )+
                }
            }
        }
        impl core::convert::TryFrom<i32> for Status {
            type Error = ();
            fn try_from(v: i32) -> Result<Self, Self::Error> {
                match v {
                    $( $val => Ok(Self::$name), )+
                    _ => Err(())
                }
            }
        }
    }
}
```

3 つ目は、失敗したときにエラーの位置（ファイル名と行）と内容を出力する処理である。

```rust
macro_rules! log_failure {
    { $e:expr } => {
        {
            let result = $e;
            if let Err(err) = &result {
                eprintln!("{}:{}: operation '{}' failed: {:?}",
                    file!(), line!(), stringify!($e), err);
            }
            result
        }
    }
}
```

## キーワード

- [[macro|マクロ]]
- [[encapsulation|カプセル化]]
- [[generics|ジェネリクス]]
- [[declarative-macro|宣言的マクロ]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

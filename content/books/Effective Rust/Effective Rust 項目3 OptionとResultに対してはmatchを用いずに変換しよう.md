---
title: Effective Rust › OptionとResultに対してはmatchを用いずに変換しよう
description: Option と Result は明示的な match ではなく変換メソッドと ? 演算子で扱い、Option より Result を使おうという項目
tags: [book-chapter, rust]
date: 2024-12-16
book: "[[Effective Rust]]"
chapter: 3
---

## TL;DR

- `Option` と `Result` は、明示的な `match` で分岐するより、`?` 演算子を使える型に変換して扱う。
- 変換に参照が絡むときは `as_ref` を使う。
- `Option` より `Result` を使う。

## 内容

https://effective-rust.com/transform.html

### 目的別の書き方

`None` や `Err` を無視したいなら、`if let` を使う。

```rust
if let Some(i) = &s.field {
    println!("field is {i}");
}
```

`None` や `Err` のときに[[panic|パニック]]させたいなら、`unwrap` か `expect` を使う。`expect` には失敗時のメッセージを指定できる。ただし、[[error-handling|エラー処理]]は呼び出し側に判断を任せるのが正しいことが多い。特にライブラリは、作者が予想できないさまざまな環境で使われる。利用者の負担を減らすためにも、`Result` と `Option` を返すほうがよい。

エラーを呼び出し元に伝えるなら、`?` 演算子を使う。`?` は `Err` にマッチし、必要ならエラー型を変換して `return Err(...)` するシンタックスシュガーである。`?` が呼ぶメソッドは `#[inline]` が付いているので、手で書いたコードと同じになり、性能への影響はほとんどない。

```rust
pub fn find_user(username: &str) -> Result<UserId, std::io::Error> {
    let f = std::fs::File::open("/etc/passwd")?;
    // ...
}
```

エラーを手動で別の型に変換するなら、`map_err` を使う。`From` トレイトを実装しておけば、`map_err` を呼ばなくても `?` が自動で変換する（[[Effective Rust 項目4 標準のError型を使おう|項目4]]）。

```rust
pub fn find_user(username: &str) -> Result<UserId, String> {
    let f = std::fs::File::open("/etc/passwd")
        .map_err(|e| format!("Failed to open password file: {:?}", e))?;
    // ...
}
```

### 変換メソッド

この種の変換は一般化でき、標準ライブラリには `Option` と `Result` を相互に、また中身の型を変換するメソッドが多く用意されている。対応関係は原書の同じページに図でまとめられており、`panic!` しうるメソッドには印が付いている。

よく使うものに、`&Option<T>` を `Option<&T>` に変換する `as_ref` がある。

```rust
struct InputData {
    payload: Option<Vec<u8>>,
}

impl InputData {
    pub fn encrypted(&self) -> Vec<u8> {
        encrypt(self.payload.as_ref().unwrap_or(&vec![]))
    }
}
```

### Result と Option のどちらを使うか

次の 2 つの理由から `Result` を使ったほうがよい。

1. エラーが起きたとき、`Err` に役立つ情報を持たせられる
2. `Result` には `#[must_use]` 属性が付いているので、返された `Result` を無視するとコンパイラが警告する

## キーワード

- [[error-handling|エラー処理]]
- [[panic|パニック]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

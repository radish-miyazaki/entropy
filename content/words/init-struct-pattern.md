---
title: Init パターン
aliases: []
description: 公開フィールドだけの初期化用構造体と Default を組み合わせて、Rust の構造体を作るパターン
tags: [word, rust]
date: 2024-12-27
---

## TL;DR

[[rust|Rust]] で構造体を作るためのパターン。公開フィールドだけを持つ初期化用の構造体に `Default` を実装し、必要なフィールドだけを上書きしてから `init()` で本来の構造体に変換する。

## なぜ必要か

The Init Struct Pattern によると、`pub fn new()` に引数を並べる方法は、引数が増えると読みにくくなり、引数を足すと破壊的変更になる。[[builder-pattern|Builder パターン]]はこの問題を避けられるが、フィールドごとにセッターを書くので冗長になる。Init パターンは、Builder パターンとほぼ同じ利点を、より少ないコードで得る。

## 仕組み

初期化用の構造体（`YakShaverInit` など）のフィールドをすべて公開にし、`impl Default` で既定値を与える。呼び出す側は構造体更新記法（`..Default::default()`）で、指定したいフィールドだけを書く。複雑な初期化の処理は `init()` メソッドに置く。

## 例

```rust
let yak_shaver = YakShaverInit {
    clipper_size: 4,
    clipper_color: String::from("red"),
    ..Default::default()
}.init();
```

## 注意点

呼び出す側がすべてのフィールドを明示して書くと、後でフィールドを足したときにそのコードは壊れる。これは防げず、`#[doc(hidden)]` を付けたダミーのフィールドで抑止するしかない。初期化用の構造体には非公開のフィールドを置けない。作者は 2022 年 11 月の追記で、このパターンの代わりに derive_builder クレートを勧めている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[builder-pattern|Builder パターン]]

## 出典

- [The Init Struct Pattern](https://xaeroxe.github.io/init-struct-pattern/)

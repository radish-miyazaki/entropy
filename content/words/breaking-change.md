---
title: 破壊的変更
aliases: []
description: 後方互換性を壊し、以前は動いていた利用側のコードを動かなくする変更
tags: [word, バージョニング]
date: 2026-11-14
---

## TL;DR

公開している API の後方互換性を壊す変更。これまで動いていた利用側のコードが、更新するとビルドできなくなったり、動かなくなったりする。[[semantic-versioning|セマンティックバージョニング]]では、メジャーバージョンを上げて知らせる。

## なぜ必要か

利用者は、更新しても自分のコードが壊れないかを知りたい。Semantic Versioning 2.0.0 の仕様では、公開 API に後方互換性のない変更を加えたら、メジャーバージョンを必ず上げると定めている。破壊的変更かどうかを見分けられないと、バージョン番号が利用者にとっての約束として機能しない。

## 仕組み

[The Cargo Book](https://doc.rust-lang.org/cargo/reference/semver.html) は、変更をメジャー、マイナー、破壊的になりうるもの（Possibly-breaking）の 3 つに分類している。最後のものは、プロジェクトによってメジャーともマイナーとも扱われる。ガイドの多くは「以前はビルドできたものが [[cargo|Cargo]] や rustc でビルドできなくなる」変更を扱っている。実行時の振る舞いを変える変更が破壊的かどうかは、メンテナの判断になることが多い。

## 例

The Cargo Book では、次のような変更をメジャーとしている。

- 公開している項目の名前を変える、移動する、削除する
- すべてのフィールドが公開されている構造体に、非公開のフィールドを足す（構造体リテラルで作れなくなる）

[[Effective Rust 項目24 APIに型が登場する依存ライブラリは再エクスポートしよう|Effective Rust 項目24]] では、`rand` の `gen_range()` が 0.7 系から 0.8 系で引数の形を変えた例を挙げている。

## 注意点

Cargo は、一番左の 0 でない数字の変更だけを非互換とみなす。そのため 0.y.z のバージョンでは y の変更がメジャー扱いになり、0.0.z のバージョンでは常にメジャー扱いになる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[semantic-versioning|セマンティックバージョニング]]
- [[cargo-semver-checks|cargo-semver-checks]]
- [[buf-breaking|buf breaking]]

## 出典

- [Semantic Versioning 2.0.0](https://semver.org/)
- [SemVer Compatibility - The Cargo Book](https://doc.rust-lang.org/cargo/reference/semver.html)
- [[Effective Rust 項目21 セマンティックバージョン（SemVer）を理解しよう|Effective Rust 項目21 セマンティックバージョン（SemVer）を理解しよう]]
- [[Effective Rust 項目24 APIに型が登場する依存ライブラリは再エクスポートしよう|Effective Rust 項目24 APIに型が登場する依存ライブラリは再エクスポートしよう]]

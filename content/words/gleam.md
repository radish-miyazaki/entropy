---
title: Gleam
aliases: []
description: BEAM 上で動き、JavaScript にもコンパイルできる静的型付けの関数型プログラミング言語
tags: [word, fp, プログラミング言語]
date: 2024-07-31
---

## TL;DR

静的型付けの[[functional-programming|関数型プログラミング]]言語。[[beam|BEAM]]（Erlang VM）上で動き、JavaScript のコードも出力できる。2018 年に生まれた新しい言語で、2024 年 3 月 4 日に正式バージョンの v1.0.0 がリリースされた。

## なぜ必要か

実用的な型システムを持ち、コードを動かす前にエラーを見つけることを目指している。null も例外もない。動作基盤には、[[concurrency|並行処理]]と耐障害性で知られる [[erlang|Erlang]] のランタイムを使う。

## 仕組み

コンパイラは [[rust|Rust]] で書かれている。Gleam のコードは Erlang のバイナリ（beam ファイル）にコンパイルされ、BEAM 上で動く。これは [[elixir|Elixir]] や [[lfe|LFE]] と同じである。そのため、Elixir など同じ BEAM 上で動く言語と親和性が高く、Erlang や Elixir のコードやライブラリを呼び出せる。

JavaScript にもコンパイルできるので、JavaScript のランタイム上でも動く。[[nodejs|Node.js]]、[[deno|Deno]]、[[bun|Bun]] での動作をサポートしている。

[[go|Go]] や Rust のように、基本的な機能は標準ライブラリに含まれている。コンパイラ、ビルドツール、フォーマッタ、パッケージマネージャも同梱されている。パッケージは Rust と同じように TOML ファイルで管理する。

## 例

```gleam
import gleam/io
import gleam/string

pub fn main() {
  // Use a function from the `gleam/io` module
  io.println("Hello, Mike!")

  // Use a function from the `gleam/string` module
  io.println(string.reverse("Hello, Joe!"))
}
```

一番人気の Web フレームワークは [wisp](https://github.com/gleam-wisp/wisp) のようである。開発者は Gleam と同じ人だ。データベースの操作には、[[postgresql|PostgreSQL]] のクライアントである [pgo](https://github.com/lpil/pgo) などがある（[Awesome Gleam の一覧](https://github.com/gleam-lang/awesome-gleam?tab=readme-ov-file#databases)）。

## 自分の理解

[[rust|Rust]] に [[elixir|Elixir]] と[[garbage-collection|ガベージコレクション]]を混ぜたようなイメージの言語である。

[[Gleam Language Tour|Gleam Language Tour]] は、Go でおなじみの形式のチュートリアルである。

アイコンはゆめかわで、ファイル名を見る限り Lucy という名前らしい。

## 関連

- [[Gleam Language Tour|Gleam Language Tour]]
- [[elixir|Elixir]]
- [[erlang|Erlang]]
- [[lfe|LFE]]
- [[beam|BEAM]]

## 出典

- [Gleam](https://gleam.run/)
- [gleam-lang/gleam](https://github.com/gleam-lang/gleam)
- [Gleam v1.0.0 のリリース](https://github.com/gleam-lang/gleam/releases/tag/v1.0.0)
- [Gleam version 1](https://gleam.run/news/gleam-version-1/)
- [Gleam Language Tour](https://tour.gleam.run/)、[日本語訳](https://gleam.lavoscore.org/)
- [Gleam Playground](https://johndoneth.github.io/gleam-playground/)
- [Gleam Packages](https://packages.gleam.run/)
- [Awesome Gleam](https://github.com/gleam-lang/awesome-gleam)
- [gleam-jp](https://scrapbox.io/gleam-jp/)（日本のコミュニティ）、[JS runtime](https://scrapbox.io/gleam-jp/JS_runtime)
- [wisp のドキュメント](https://gleam-wisp.github.io/wisp)
- [InfoQ: Gleam 1.0](https://www.infoq.com/jp/news/2024/03/gleam-erlang-virtual-machine-1-0/)
- 参考記事
  - https://zenn.dev/mzryuka/scraps/2a443bacb14cff
  - https://zenn.dev/comamoca/articles/gleam-tour-for-typescript-user
  - https://zenn.dev/mzryuka/articles/start-gleam_playground
  - https://note.com/taro_yamashita/n/ndf3b93a4ccfe
  - https://zenn.dev/helloyuki/scraps/4569649537e13c
  - https://techbookfest.org/product/3J3Jqx3hzAg4MpCP5WGxgN?productVariantID=6aZG6R2ddDXaeA9ue2nqAj
  - https://techbookfest.org/product/v1UACL80ppq5upN9Wd1Xqk
  - https://qiita.com/debiru/items/200dacd7ceef8b3beae6

---
title: WebAssembly
aliases: [WASM, Wasm]
description: ブラウザ内外で動く、軽量で高速なバイナリ形式の仮想命令セットアーキテクチャ
tags: [word, webassembly]
date: 2024-10-16
---

## TL;DR

軽量で高速なバイナリ形式の[[instruction-set-architecture|命令セットアーキテクチャ]]。厳密には、[[virtual-machine|仮想マシン]]とその命令セットを定めた仮想命令セットアーキテクチャである。[[web-browser|ブラウザ]]での性能向上を目的に設計されたが、ブラウザの外でも動く。

## なぜ必要か

WASM は多くのプログラミング言語のビルドターゲットにできる。[[rust|Rust]]、C、C++、[[zig|Zig]]、[[kotlin|Kotlin]]、[[swift|Swift]] には WASM を出力するコンパイラがある。[[ruby|Ruby]] や [[javascript|JavaScript]] は処理系ごと WASM にして動かすツールがある。

WASM の登場前は、C で書かれた機能を Web サイトで使うには JavaScript で書き直す必要があったが、WASM なら C のまま使える。拡張機能を受け付けるプラットフォームでも、拡張を書ける開発者の幅が広がる。

もう一つの利点は、作成元が信用できないコードも安全に実行できることである。

## 仕組み

### 安全に実行できる理由

WASM は[[sandbox|サンドボックス]]の中で実行される。インスタンスがアクセスできるメモリ（線形メモリ）はただのバイト列で、コードはその外に置かれ、実行可能フラグもない。そのため、スタック領域を書き換えたり、データとして書き込んだコードを実行したりする攻撃が難しい。

ファイルや通信などのリソースへは[[system-interface|システムインタフェース]]を通してアクセスする。これは実行環境が用意するので、触れるリソースを実行環境の側で制限できる。

### 仮想マシン

WASM の仮想マシンには[[cpu-register|レジスタ]]がなく、メモリから読み込んだ値をスタックに積んで演算する。メモリは 64KiB のページ単位で管理される。

バイナリは、テキスト形式の [[wat|WAT]] に変換すれば読める。

### 標準化

2015 年に発表され、2017 年に主要なブラウザが対応し、2019 年に [[w3c|W3C]] で仕様が勧告された。新しい仕様は Phase 0 から 5 の段階を経て標準になる。固定長の [[simd|SIMD]] はこうして追加され、[[webassembly-component-model|WebAssembly Component Model]] も議論が進んでいる。

## 例

- Goodnotes は、[[swift|Swift]] で書かれた iOS 向けのアプリを、2022 年に Web、ChromeOS、Android、Windows に展開した。[[swiftwasm|SwiftWasm]] で 10 万行を超えるコードを再利用した。
- Microsoft Flight Simulator と Shopify Functions は、拡張機能の仕組みに WASM を採用している。
- [[rust-build-wasm-target|Rust のビルドターゲットを WASM にしてビルドする]]

## 注意点

登場した当初は、JavaScript より速いことが利点とされた。しかし JavaScript の処理系が改善され、線形メモリとのデータのコピーもあるので、WASM のほうが遅い場合もある。2024 年 10 月時点では、速度よりも性能のばらつきが少ないことが注目されている。

C のコードを Web で使う場合も、C 特有の機能や同期的な処理を書き直す作業は残る。

## 自分の理解

2015 年の発表より前から、構想自体はあったようだ。

## 関連

- [[wat|WAT]]
- [[wasi|WASI]]
- [[webassembly-module|WebAssembly Module]]
- [[webassembly-instance|WebAssembly Instance]]
- [[webassembly-component-model|WebAssembly Component Model]]
- [[wasm-runtimes|WASM の処理系]]
- [[instruction-set-architecture|命令セットアーキテクチャ]]

## 出典

- [[Rustで学ぶWebAssembly ―入門からコンポーネントモデルによる開発まで]]
- [WebAssembly | MDN](https://developer.mozilla.org/ja/docs/WebAssembly)
- [WebAssembly Specification: Introduction](https://webassembly.github.io/spec/core/intro/introduction.html#scope)
- [WebAssembly/proposals](https://github.com/WebAssembly/proposals)
- [Goodnotes のケーススタディ](https://web.dev/case-studies/goodnotes?hl=ja)
- [Microsoft Flight Simulator: WebAssembly](https://docs.flightsimulator.com/html/Programming_Tools/WASM/WebAssembly.htm)
- [Shopify Functions: WebAssembly](https://shopify.dev/docs/apps/build/functions/programming-languages/webassembly-for-functions)
- [WebAssembly - Wikipedia](https://ja.wikipedia.org/wiki/WebAssembly)
- [WASM の仮想マシン（Qiita）](https://qiita.com/kawamou/items/7c56827e1e9a4795c026)
- [Qiita: wbcchsyn](https://qiita.com/wbcchsyn/items/3c9f331cefbd139a239e)
- [情報処理学会 デジタルプラクティス](https://www.ipsj.or.jp/dp/contents/publication/51/S1303-S03.html)

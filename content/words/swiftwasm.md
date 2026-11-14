---
title: SwiftWasm
aliases: []
description: Swift で書いたコードを WebAssembly にコンパイルし、ブラウザで動かすための OSS のツール
tags: [word, webassembly, swift]
date: 2024-10-18
---

## TL;DR

[[swift|Swift]] で書いたコードを [[webassembly|WebAssembly]] にコンパイルする OSS のツール。公式サイトは「Run Swift in browsers」を掲げている。

## 仕組み

SwiftWasm は Swift のコンパイラに手を加えたものである。チームは、その変更を公式の Swift コンパイラに取り込んでもらう作業を進めている。Swift から Web の API を呼ぶには、JavaScriptKit を使う。ブラウザ上で試せる SwiftWasm Pad も提供されている。

## 例

Goodnotes は、Swift で書かれた iOS 向けのアプリを Web や Android などに展開するとき、SwiftWasm を使って既存のコードを再利用した（[[webassembly|WebAssembly]] を参照）。

## 注意点

公式サイトでは、早期導入者が使える段階だが、まだ多くのテストと改善が必要だとしている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[swift|Swift]]
- [[webassembly|WebAssembly]]

## 出典

- [SwiftWasm](https://swiftwasm.org/)
- [swiftwasm/swift](https://github.com/swiftwasm/swift)

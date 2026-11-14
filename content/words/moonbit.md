---
title: MoonBit
aliases: []
description: 中国の IDEA が開発する、WebAssembly の生成を主なターゲットとする AI フレンドリーなプログラミング言語
tags: [word, プログラミング言語]
date: 2025-09-22
---

## TL;DR

中国の International Digital Economy Academy（[IDEA](https://www.idea.edu.cn/)）が開発しているプログラミング言語。クラウドや[[edge-computing|エッジコンピューティング]]で動く [[webassembly|WebAssembly]] のバイナリを生成することを主なターゲットにしている。以下は 2025 年 10 月時点の公式サイトの情報で、古い可能性がある。

## 仕組み

### 言語の設計

> Expressive multi-paradigm design, combining the best of dynamic and static, functional and practical
> Data-oriented language with a robust type system
> Multiple backend support including WebAssembly, JavaScript and more.

WebAssembly のほか、[[javascript|JavaScript]] やネイティブのコードも出力できる。マルチパラダイムで、強力な型システムを持つデータ指向の言語である。

### AI との統合

> AI-friendly language design, featuring safe-guard, easy testing, minimizing LLM hallucinations.

AI フレンドリーな言語設計として、安全面への配慮とテストのしやすさにより、[[large-language-model|LLM]] のハルシネーションを最小限に抑えることをうたっている。組み込みの AI アシスタントがテストやドキュメントの作成を自動化し、高精度で速いコード生成ができるとしている。

パッケージは [mooncakes.io](https://mooncakes.io/) で管理する。

## 自分の理解

パッと見た感じ、[[rust|Rust]] っぽさを感じる。最近の言語らしい特徴がモリモリである。出自が中国なだけあって、中国語の情報がとても豊富である。

## 関連

- [[webassembly|WebAssembly]]
- [[rust|Rust]]

## 出典

- [MoonBit](https://www.moonbitlang.com/)
- [ドキュメント](https://docs.moonbitlang.com/en/latest/)
- [チュートリアル](https://docs.moonbitlang.com/en/latest/tutorial/tour.html)
- [MoonBit Tour](https://tour.moonbitlang.com/)
- https://zenn.dev/mizchi/articles/introduce-moonbit
- https://zenn.dev/mizchi/articles/how-to-write-moonbit
- https://www.publickey1.jp/blog/24/webassemblymoonbitgithub.html

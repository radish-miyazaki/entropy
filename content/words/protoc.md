---
title: protoc
aliases: []
description: Protocol Buffers のコンパイラ。.proto ファイルから、データをエンコード・パースするコードを生成する
tags: [word]
date: 2026-11-14
---

## TL;DR

[[protocol-buffers|Protocol Buffers]] のコンパイラ。`.proto` ファイルに書いたスキーマから、データを自動でエンコード・パースするクラスを各言語向けに生成する。

## 仕組み

`protoc` には、ソースディレクトリ、出力先のディレクトリ、`.proto` ファイルのパスを渡す。ソースディレクトリを省略すると、カレントディレクトリが使われる。出力する言語は `--cpp_out` のようなオプションで選び、ほかの言語にも同じようなオプションがある。

プラグインで機能を足すこともできる。[[protoc-gen-doc|protoc-gen-doc]] はコメントからドキュメントを、[[protoc-gen-validate|protoc-gen-validate]] はバリデーションのコードを生成する protoc のプラグインである。

## 例

公式チュートリアルの C++ の例では、次のように実行する。

```sh
protoc -I=$SRC_DIR --cpp_out=$DST_DIR $SRC_DIR/addressbook.proto
```

これで、生成したクラスを宣言するヘッダ `addressbook.pb.h` と、その実装 `addressbook.pb.cc` ができる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[protocol-buffers|Protocol Buffers]]
- [[buf-cli|Buf CLI]]: protoc とは別の独自コンパイラを内蔵したツール
- [[buf-generate|buf generate]]
- [[protoc-gen-doc|protoc-gen-doc]]
- [[protoc-gen-validate|protoc-gen-validate]]

## 出典

- [Protocol Buffer Basics: C++ | Protocol Buffers Documentation](https://protobuf.dev/getting-started/cpptutorial/)

---
title: protoc-gen-validate
aliases: []
description: Protocol Buffers のメッセージのバリデーションコードを生成する protoc のプラグイン。後継は protovalidate
tags: [word, protocol-buffers]
date: 2024-09-30
---

## TL;DR

[[protocol-buffers|Protocol Buffers]] のメッセージに対するバリデーションのコードを生成する [[protoc|protoc]] のプラグイン。略して PGV と呼ばれる。現在はメンテナンスモードで、後継の [[protovalidate]] への移行が推奨されている。

## 仕組み

`.proto` ファイルに書いたルールから、各言語のバリデーションコードを生成する。[[go|Go]] と Java に対応し、C++ は一部だけ実装されている。[[python|Python]] はコンパイル時の生成ではなく、実行時のコード生成で動く。

## 注意点

リポジトリはアーカイブされており、新しい機能は追加されない。新しく使うなら [[protovalidate]] を選ぶ。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[protovalidate]]
- [[buf|Buf]]

## 出典

- [bufbuild/protoc-gen-validate](https://github.com/bufbuild/protoc-gen-validate)

---
title: YJIT
aliases: []
description: CRuby に組み込まれた、軽量な Ruby の JIT コンパイラ
tags: [word, ruby]
date: 2023-12-25
---

## TL;DR

Yet Another Ruby JIT の略。CRuby に組み込まれた、軽量な [[ruby|Ruby]] の [[jit-compilation|JIT]] コンパイラである。

## 仕組み

YJIT は Basic Block Versioning（BBV）という方式で、コードを必要になったときに遅延コンパイルする。対応環境は、macOS、Linux、BSD の x86-64 と arm64 である。

YJIT はデフォルトでは無効で、次のどれかの方法で有効にする。

- コマンドラインオプション `--yjit` を付けて `ruby` を起動する
- 環境変数 `RUBY_YJIT_ENABLE` を設定する。[[rubyopt|RUBYOPT]] でオプションを渡してもよい
- 実行時に Ruby のコードから `RubyVM::YJIT.enable` を呼ぶ

有効になったかは、`ruby --yjit -v` の出力に `+YJIT` が含まれるか、`RubyVM::YJIT.enabled?` で確かめられる。

## 例

```shell
$ ruby --yjit myscript.rb
$ RUBYOPT="--yjit" ruby myscript.rb
```

## 注意点

YJIT は、コンパイルした機械語とそのメタデータを保持するため、通常のインタプリタより多くのメモリを使う。また、起動時から有効にすると、起動時にしか使わないコードまでコンパイルしてしまう。その場合は、アプリケーションの初期化後に `RubyVM::YJIT.enable` で有効にすることが推奨されている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[rjit|RJIT]]
- [[jit-compilation|JIT]]
- [[rubyopt|RUBYOPT]]

## 出典

- [YJIT - Yet Another Ruby JIT（Ruby 3.4 ドキュメント）](https://docs.ruby-lang.org/en/3.4/yjit/yjit_md.html)

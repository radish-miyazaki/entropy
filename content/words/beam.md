---
title: BEAM
aliases: [BEAM VM]
description: Erlang のランタイムシステムの中でユーザのコードを実行する仮想マシン。Elixir や Gleam もこの上で動く
tags: [word, erlang]
date: 2026-11-14
---

## TL;DR

[[erlang|Erlang]] のランタイムシステム（ERTS）の中で、ユーザのコードを実行する仮想マシン。Bogdan/Björn's Erlang Abstract Machine の略である。[[elixir|Elixir]]、[[gleam|Gleam]]、[[lfe|LFE]] もこの上で動く。

## なぜ必要か

Erlang の FAQ によると、ほぼすべての利用者が BEAM を使っている。最初の Erlang の仮想マシンは JAM（Joe's Abstract Machine）で、BEAM はその後に作られた「新しい」仮想マシンである。

## 仕組み

BEAM はレジスタマシンで、名前付きのレジスタを操作する命令を実行する。各レジスタには Erlang の任意の項を入れられる。X レジスタは一時的なデータを持ち、関数の間で値を受け渡す。引数は `{x,0}` から順に入り、戻り値も `{x,0}` に入る。Y レジスタは、スタックフレームのローカルな値を持つ。

BEAM 自体は仮想マシンにすぎず、[[process|プロセス]]、ポート、ETS テーブルといった概念は持たない。それらは ERTS の側が提供する。`erlc -S` を使うと、コンパイルされた BEAM の命令を確かめられる。

## 例

- `elixirc` で Elixir のファイルを、BEAM 向けの中間コードである beam ファイルにコンパイルする（[[elixir-to-erlang-code|Elixir のコードから生成される Erlang のコードを確認する]]）。
- Gleam の `Int` は、BEAM 上では最大値も最小値もない。JavaScript に出力したときは、64 bit の浮動小数点数で表される（[[Gleam： Basics]]）。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[erlang|Erlang]]
- [[elixir|Elixir]]
- [[gleam|Gleam]]
- [[lfe|LFE]]

## 出典

- [Implementations and Ports of Erlang - Erlang FAQ](https://www.erlang.org/faq/implementations.html)
- [A Brief BEAM Primer - Erlang/OTP](https://www.erlang.org/blog/a-brief-beam-primer/)
- [[elixir-to-erlang-code|Elixir のコードから生成される Erlang のコードを確認する]]

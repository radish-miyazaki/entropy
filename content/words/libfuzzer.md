---
title: libFuzzer
aliases: []
description: LLVM に含まれる、プロセス内で動くカバレッジガイデッドなファジングエンジン
tags: [word, llvm, テスト]
date: 2025-01-20
---

## TL;DR

[[llvm|LLVM]] に含まれる、プロセス内（in-process）で動く[[coverage-guided-fuzzing|カバレッジガイデッド]]なファジングエンジン。テスト対象のライブラリと同じプロセスで動き、カバレッジを手がかりに入力を変化させる。

## 仕組み

利用者は「ファズターゲット」と呼ばれる関数 `LLVMFuzzerTestOneInput(const uint8_t *Data, size_t Size)` を書き、受け取ったバイト列をテスト対象の API に渡す。libFuzzer はコーパスの入力を変化させ、新しいコードを通った入力を残していく。カバレッジは LLVM の SanitizerCoverage による計装で取る。

ビルド時に `-fsanitize=fuzzer` を付けてコンパイル・リンクする。Clang 6.0 以降には libFuzzer が含まれているので、別途インストールする必要はない。

## 注意点

- メモリ破壊はその場でクラッシュせず見逃されることがあるので、AddressSanitizer などのサニタイザと組み合わせて使う
- ファズターゲットはどんな入力も受け付け、決定的で、速く動く必要がある。`exit()` を呼んではいけない
- 元の開発者は Centipede に移っている。重要なバグの修正は続くが、大きな新機能は期待できない

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[fuzz-testing|ファズテスト]]
- [[coverage-guided-fuzzing|カバレッジガイデッドテスト]]
- [[cargo-fuzz]]: Rust から libFuzzer を使うためのツール

## 出典

- [libFuzzer – a library for coverage-guided fuzz testing](https://llvm.org/docs/LibFuzzer.html)

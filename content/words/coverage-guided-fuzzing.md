---
title: カバレッジガイデッドテスト
aliases: [coverage-guided fuzzing]
description: コードの実行箇所を監視し、新しいコードパスを見つけるように入力を変化させながら試行を繰り返すファズテスト
tags: [word, テスト]
date: 2025-01-20
---

## TL;DR

コードのどの部分が実行されたかを監視し、新しい動作や条件（コードパス）を見つけるように入力データをランダムに変化させながら、試行を繰り返すテスト。[[fuzz-testing|ファズテスト]]を効率よく行う方法である。

## 仕組み

[[libfuzzer|libFuzzer]] の場合、テスト対象のコードを [[llvm|LLVM]] の SanitizerCoverage で計装し、実行時のカバレッジを取る。最初に与えたサンプル（コーパス）の入力を変化させ、新しいコードを通った入力をコーパスに加えていく。これを繰り返すことで、まだ試していない経路を優先して探索できる。

## 例

以前は [American fuzzy lop](https://lcamtuf.coredump.cx/afl/)（AFL）が主流だった。近年は、LLVM のツールチェーンに追加された [[libfuzzer|libFuzzer]] もよく使われる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[fuzz-testing|ファズテスト]]
- [[libfuzzer|libFuzzer]]

## 出典

- [Coverage-guided fuzz testing（GitLab Docs 日本語版）](https://gitlab-docs.creationline.com/ee/user/application_security/coverage_fuzzing/)
- [libFuzzer – a library for coverage-guided fuzz testing](https://llvm.org/docs/LibFuzzer.html)

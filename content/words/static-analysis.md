---
title: 静的解析
aliases: [static analysis]
description: プログラムを実行せずに、ソースコードなどを解析すること
tags: [word, テスト]
date: 2026-11-14
---

## TL;DR

プログラムを実行せずに解析すること。ふつうは自動化されたツールでソースコードを対象に行う。実行中のプログラムを調べる動的解析と対になる。

## なぜ必要か

[Wikipedia](https://en.wikipedia.org/wiki/Static_program_analysis) によると、コードを実行しないので、デプロイする前にプログラムを調べられる。バグになりそうな箇所の検出、脆弱性になりうるコードの特定（SAST）、プログラムが仕様どおりに振る舞うことの数学的な証明などに使われる。

## 例

- [[linter|リンター]]: ソースコードのプログラミングエラーや疑わしい構文、スタイルの問題を検査する、軽量な静的解析
- [[shellcheck|ShellCheck]]: シェルスクリプトの文法の不備や外部コマンドの誤用などを指摘する
- [[formal-verification|形式的検証]]: Prusti のように、コードを静的解析して形式的検証をするツールもある

## 注意点

Wikipedia によると、任意のプログラムの実行時エラーをすべて見つけることは、停止性問題に帰着できるので決定不能である。そのため、静的解析は近似的な答えを返すことになり、精度を犠牲にして単純さを取る手法もある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[linter|リンター]]
- [[shellcheck|ShellCheck]]
- [[formal-verification|形式的検証]]
- [[Goで作る静的解析ツール開発入門]]

## 出典

- [Static program analysis - Wikipedia](https://en.wikipedia.org/wiki/Static_program_analysis)

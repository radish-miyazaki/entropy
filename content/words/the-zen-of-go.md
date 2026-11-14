---
title: The Zen of Go
aliases: []
description: Dave Cheney がまとめた、シンプルで保守しやすい Go のコードを書くための 11 の心得
tags: [word, go]
date: 2025-02-16
---

## TL;DR

Dave Cheney がまとめた、[[go|Go]] でシンプルで保守しやすいコードを書くための 11 の心得。GopherCon Israel 2020 で発表された。

## 仕組み

次の 11 の心得からなる。

1. Each package fulfils a single purpose（各パッケージは単一の目的を果たす）
2. Handle errors explicitly（エラーは明示的に扱う）
3. Return early rather than nesting deeply（深くネストせず早めに return する）
4. Leave concurrency to the caller（並行処理は呼び出し側に任せる）
5. Before you launch a goroutine, know when it will stop（[[goroutine|ゴルーチン]]を起動する前に、いつ止まるかを知る）
6. Avoid package level state（パッケージレベルの状態を避ける）
7. Simplicity matters（シンプルさが大事）
8. Write tests to lock in the behaviour of your package's API（パッケージの API の振る舞いを固定するテストを書く）
9. If you think it's slow, first prove it with a benchmark（遅いと思ったら、まずベンチマークで示す）
10. Moderation is a virtue（節度は美徳である）
11. Maintainability counts（保守性は重要である）

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[go|Go]]
- [[goroutine|ゴルーチン]]

## 出典

- [The Zen of Go](https://the-zen-of-go.netlify.app/)

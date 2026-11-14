---
title: TLA+
aliases: [Temporal Logic of Actions]
description: 並行システムや分散システムの振る舞いを記述し、設計の誤りを見つけるための形式仕様言語
tags: [word, 形式手法]
date: 2025-06-14
---

## TL;DR

動的なシステムの振る舞いを記述するための[[formal-specification-language|形式仕様言語]]。Leslie Lamport が作った。名前は Temporal Logic of Actions の略である。

## なぜ必要か

[[concurrency|並行]]システムや[[distributed-system|分散システム]]の、時間による変化を記述できる。これにより、[[race-condition|競合状態]]、[[deadlock|デッドロック]]、[[livelock|ライブロック]]などを設計の段階で見つけられる。こうした設計の根本的な誤りは、コードになってからでは見つけにくく、直すのにも費用がかかる。

## 仕組み

TLA+ は単純な数学にもとづいている。主な特徴は次のとおり。

- [[temporal-logic|時相論理]]によって、システムの時間的な変化を数学的に記述できる
- 状態の変化をアクションとして定義する
- 複数の[[process|プロセス]]の相互作用を記述できる
- 安全性と活性を検証できる

仕様は、システムの状態を表す変数（Variables）、パラメータを表す定数（Constants）、変数の型の制約を表す型[[invariant|不変条件]]（Type Invariants）、状態の変化を表すアクション（Actions）で書く。振る舞いは、初期状態と状態遷移で表す。

検証する性質は 2 つある。安全性（Safety Property）は「悪いことは起こらない」、活性（Liveness Property）は「良いことはいずれ起こる」という性質である。全体の動作は仕様（Specification）として定義する。

仕様を確かめる主な道具には、[[model-checking|モデル検査]]器の TLC と、証明システムの TLAPS がある。IDE の TLA+ Toolbox や、Visual Studio Code の拡張機能も用意されている。

## 注意点

現在は TLA+ Foundation が管理している。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[formal-methods|形式手法]]
- [[model-checking|モデル検査]]
- [[temporal-logic|時相論理]]
- [[pluscal|PlusCal]]

## 出典

- [The TLA+ Home Page](https://lamport.azurewebsites.net/tla/tla.html)
- [TLA+ wiki](https://w.atwiki.jp/tlaplus/)

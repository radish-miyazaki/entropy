---
title: 永続化
aliases: []
description: 作成元のプロセスよりも長く続く状態
tags: [word, ddd]
date: 2024-08-02
---

## TL;DR

作成元のプロセスよりも長く続く状態。

## なぜ必要か

Wikipedia によると、永続化した状態は、それを作った[[process|プロセス]]が終わった後も残る。実際には状態をストレージにデータとして保存するので、プログラムはメモリ上のデータ構造をストレージ向けの形式に対応づけ、データをストレージとやりとりする必要がある。

## 仕組み

[[Domain Modeling Made Functional]] では、次のように定義されている。

> 作成元のプロセスよりも長く続く状態

Wikipedia では、永続化の方法として、システム全体の状態を丸ごと保存するシステムイメージ、イベントを先にログへ書いて起動時に再生するジャーナル、変わった部分だけを書き込む方法などを挙げている。データベース管理システムは、変わった部分の書き込みとトランザクションのジャーナルを組み合わせ、問い合わせやアクセス制御の機能も備える。

プログラムが明示的に保存と読み込みを書かなくても、実行環境が状態を残してくれる方式は、直交永続化（orthogonal persistence）と呼ばれる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[serialization|シリアライズ]]
- [[persistence-ignorance|永続性非依存]]

## 出典

- [[Domain Modeling Made Functional]]
- [Persistence (computer science) - Wikipedia](<https://en.wikipedia.org/wiki/Persistence_(computer_science)>)

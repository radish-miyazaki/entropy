---
title: Strangler Fig pattern
aliases: []
description: 旧システムを一度に置き換えず、新旧を共存させながら段階的に新システムへ移行するパターン
tags: [word, アーキテクチャ]
date: 2025-07-25
---

## TL;DR

新しいシステムへ移行するときに、一度にすべてを移行せず、段階的に移行するパターン。移行が終わるまで、新旧のシステムは共存する。

## 仕組み

移行中は、ユーザからのリクエストをプロキシで新旧のシステムに振り分ける。

名前の由来は Strangler Fig（絞め殺しの木）である。絞め殺しの木は、他の植物や岩などに巻きつき、絞め殺すように成長することからこの名前が付いている。

Azure Architecture Center によると、移行は 4 つの段階で進む。最初に、クライアントと新旧のシステムの間にファサード（プロキシ）を置き、ほとんどのリクエストを旧システムに送る。次に、新システムに機能を足すたびに、ファサードが送るリクエストを少しずつ新システムへ移す。すべての機能を移して旧システムへの依存がなくなったら、旧システムを廃止する。最後にファサードを外し、クライアントが新システムと直接やりとりするようにする。

## 注意点

ファサードが単一障害点や性能のボトルネックにならないようにする。移行中は新旧のシステムが互いを呼び出すことがあるので、[[anti-corruption-layer|腐敗防止層]]で両者のリクエストを変換し、新システムの設計を旧システムの事情から守る。

バックエンドへのリクエストを横取りできないとき、小さなシステムで丸ごと置き換えるのが簡単なとき、旧システムをすぐに廃止する必要があるときには向かない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[refactoring|リファクタリング]]
- [[anti-corruption-layer|腐敗防止層]]

## 出典

- [Original Strangler Fig Application（Martin Fowler）](https://martinfowler.com/bliki/OriginalStranglerFigApplication.html)
- [Strangler Fig pattern（Azure Architecture Center）](https://learn.microsoft.com/en-us/azure/architecture/patterns/strangler-fig)
- [絞め殺しの木（Wikipedia）](https://ja.wikipedia.org/wiki/絞め殺しの木)

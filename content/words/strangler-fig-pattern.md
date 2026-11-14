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

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[refactoring|リファクタリング]]

## 出典

- [Original Strangler Fig Application（Martin Fowler）](https://martinfowler.com/bliki/OriginalStranglerFigApplication.html)
- [Strangler Fig pattern（Azure Architecture Center）](https://learn.microsoft.com/en-us/azure/architecture/patterns/strangler-fig)
- [絞め殺しの木（Wikipedia）](https://ja.wikipedia.org/wiki/絞め殺しの木)

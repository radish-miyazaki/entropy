---
title: 叫ぶアーキテクチャ
aliases: []
description: パッケージ名やクラス名から、アプリケーションが何をするものかが分かるようにする考え方
tags: [word, アーキテクチャ]
date: 2024-08-16
---

## TL;DR

パッケージ名やクラス名から、アプリケーションの機能が分かるようにすること。Robert C. Martin が [[Clean Architecture（書籍）|Clean Architecture]] で名付けた。

## なぜ必要か

アーキテクチャは、使っているフレームワークではなく、システムそのものを伝えるべきだからである。

> アーキテクチャは、システムで使用しているフレームワークではなく、システムそのものについての情報を伝える必要がある。

## 例

[[手を動かしてわかるクリーンアーキテクチャ]]では、送金を扱う Web アプリケーションのパッケージ構成を、Web 層、ドメイン層、永続化層という層ごとの構成から、`account` のような機能ごとの構成に変えている。あわせて、`SendMoneyService` のように、クラスの責務がクラス名から分かるように名前を変えている。

```text
buckpal/
  account/
    Account
    SendMoneyController
    AccountRepository
    AccountRepositoryImpl
    SendMoneyService
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[clean-architecture|クリーンアーキテクチャ]]
- [[package-by-feature|Package by Feature]]
- [[model-code-gap|アーキテクチャ対コード間ギャップ]]

## 出典

- [[Clean Architecture（書籍）|Clean Architecture 達人に学ぶソフトウェアの構造と設計]]
- [[手を動かしてわかるクリーンアーキテクチャ 第4章 パッケージ構成に関する戦略|手を動かしてわかるクリーンアーキテクチャ 第4章 パッケージ構成に関する戦略]]

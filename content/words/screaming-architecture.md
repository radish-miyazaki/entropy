---
title: 叫ぶアーキテクチャ
aliases: []
description: パッケージ名やクラス名から、アプリケーションが何をするものかが分かるようにする考え方
tags: [word, アーキテクチャ]
date: 2024-08-16
---

## TL;DR

パッケージ名やクラス名から、アプリケーションの機能が分かるようにすること。Robert C. Martin が Clean Architecture で名付けた。

## なぜ必要か

アーキテクチャは、使っているフレームワークではなく、システムそのものを伝えるべきである。

> アーキテクチャは、システムで使用しているフレームワークではなく、システムそのものについての情報を伝える必要がある。

## 仕組み

Robert C. Martin のブログ記事によると、家の設計図を見れば玄関や台所から家だと分かり、図書館の設計図なら貸出カウンターや閲覧室から図書館だと分かる。同じように、ソフトウェアの最上位の構造は、使っているフレームワークではなく、ヘルスケアや会計といったシステムのユースケースを表すべきである。

Martin は「フレームワークは使う道具であって、従うべきアーキテクチャではない」として、フレームワークから距離を置くよう勧めている。ユースケースが中心にあり、フレームワークが離れていれば、Web サーバやデータベースなしでユースケースを[[unit-test|単体テスト]]できる。Web は配信の仕組みという詳細にすぎない。

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

- Clean Architecture 達人に学ぶソフトウェアの構造と設計
- [[手を動かしてわかるクリーンアーキテクチャ 第4章 パッケージ構成に関する戦略|手を動かしてわかるクリーンアーキテクチャ 第4章 パッケージ構成に関する戦略]]
- [Screaming Architecture - The Clean Code Blog](https://blog.cleancoder.com/uncle-bob/2011/09/30/Screaming-Architecture.html)

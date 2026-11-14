---
title: アーキテクチャ対コード間ギャップ
aliases: []
description: アーキテクチャが抽象的な概念にとどまり、コードと直接結びつかないことで生まれる乖離
tags: [word, アーキテクチャ]
date: 2024-08-16
---

## TL;DR

アーキテクチャは抽象的な概念でしかなく、コードと直接結びつかない、という乖離のこと。モデル対コード間ギャップとも呼ぶ。

## なぜ必要か

パッケージ構成がアーキテクチャを反映しなくなると、時間がたつにつれて、コードベースはアーキテクチャからかけ離れたものになる。どんなパッケージ構成でも、維持するにはプロジェクトに規律を課す必要があり、それができないとこのギャップが生じる。

## 仕組み

[[手を動かしてわかるクリーンアーキテクチャ]]では、アーキテクチャの構成要素を意識したパッケージ構成にすることで、このギャップを解消できるとしている。[[hexagonal-architecture|ヘキサゴナルアーキテクチャ]]なら、[[entity|エンティティ]]、ユースケース、ポートとアダプタをそれぞれパッケージに落とし込む。

```text
buckpal/
  adapter/
    in/web/SendMoneyController
    out/persistence/AccountPersistenceAdapter
  application/
    domain/
      model/Account
      service/SendMoneyService
    port/
      in/SendMoneyUseCase
      out/UpdateAccountStatePort
  common/
```

パッケージの数が増えると、いま書いているコードをどのパッケージに入れるべきかを考える必要が出てくる。そのため、開発者がアーキテクチャについて能動的に考えるようになる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[screaming-architecture|叫ぶアーキテクチャ]]
- [[hexagonal-architecture|ヘキサゴナルアーキテクチャ]]

## 出典

- https://www.bslash.co.jp/column/2014/10/86
- [[手を動かしてわかるクリーンアーキテクチャ 第4章 パッケージ構成に関する戦略|手を動かしてわかるクリーンアーキテクチャ 第4章 パッケージ構成に関する戦略]]

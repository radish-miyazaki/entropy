---
title: ワークフロー
aliases: []
description: ビジネスプロセスの一部を詳しく記述し、目標を達成するために従業員やソフトウェアコンポーネントが行うステップを示したもの
tags: [word, ddd, domain-modeling-made-functional]
date: 2024-07-02
---

## TL;DR

一般には、資源を体系的に組織した、繰り返せる業務活動のパターンを指す。[[Domain Modeling Made Functional]] の定義では、[[business-process|ビジネスプロセス]]の一部を詳しく記述したもの。ビジネスの目標を達成するために、従業員（またはソフトウェアコンポーネント）が行う正確なステップを示す。

## 仕組み

Wikipedia によると、ワークフローは、物の加工、サービスの提供、情報の処理などのために設計される。操作の列、個人やグループの決まった作業、従業員の組織、複数の機械の仕組みなどで表せる。

情報技術の分野では、ワークフロー管理システムを指して使うことが多い。作り方は大きく 2 つあり、XPDL や BPEL などの専用の言語で定義する方式と、Windows Workflow Foundation のようにプログラミング言語のライブラリを使う方式がある。ペトリネットのような数学的な形式で表すと、設計時の意味の誤りを静的解析で見つけられる。

## 例

保険金請求の処理、工場での部品の移動、Wikipedia の編集、Getting Things Done（GTD）などがワークフローの例である。

## 注意点

[[Domain Modeling Made Functional]] では、ワークフローを 1 人または 1 チームでできることに限定している。そのため、ビジネスプロセスが複数のチームにまたがるときは、全体を小さなワークフローの連なりに分割する。分割したワークフローどうしは、何らかの方法で連携させる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[business-process|ビジネスプロセス]]
- [[scenario|シナリオ]]
- [[use-case|ユースケース]]

## 出典

- [[Domain Modeling Made Functional]]
- [[Domain Modeling Made Functional 第1章 ビジネスイベントを通じてドメインを理解する|Domain Modeling Made Functional 第1章 ビジネスイベントを通じてドメインを理解する]]
- [ワークフロー - Wikipedia](https://ja.wikipedia.org/wiki/ワークフロー)

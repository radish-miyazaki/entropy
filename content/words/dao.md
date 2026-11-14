---
title: DAO
aliases: [Data Access Object]
description: データベースなどの永続化の仕組みへの抽象的なインタフェースを提供するデザインパターン
tags: [word]
date: 2024-07-21
---

## TL;DR

Data Access Object の略。データベースなどの[[persistence|永続化]]の仕組みへの抽象的なインタフェースを提供する[[design-pattern|デザインパターン]]。

## なぜ必要か

Wikipedia によると、DAO は、互いを知る必要のないアプリケーションの 2 つの部分を分ける。ビジネスロジックは DAO の安定したインタフェースだけに依存するので、永続化の仕組みを変えても、DAO を使う側は影響を受けない（[[separation-of-concerns|関心の分離]]）。保存の詳細はアプリケーションの他の部分から隠れるので、DAO をテスト用の代わりのオブジェクトに差し替えて[[unit-test|単体テスト]]を書きやすくなる。

## 仕組み

アプリケーションからの呼び出しを永続化の層への操作に対応づけ、データベースの動き方を見せずにデータを操作できるようにする。伝統的には、JDBC でリレーショナルデータベースにアクセスする [[java|Java]] EE のアプリケーションで使われてきた。Sun Microsystems のベストプラクティス集「Core J2EE Patterns」に由来する。

## 注意点

DAO を普通の Java のオブジェクトとして抽象化すると、データベースへのアクセス 1 回ごとの高いコストが見えにくくなる。その結果、1 回で済むクエリを何回も実行してしまうことがある。テーブルごとに DAO を作り、SELECT クエリをそのテーブルに限ると、抽象化の漏れやコードの重複が起きやすい。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[dto|DTO]]
- [[repository-pattern|リポジトリパターン]]
- [[persistence|永続化]]

## 出典

- [Data access object - Wikipedia](https://en.wikipedia.org/wiki/Data_access_object)

---
title: Domain Modeling Made Functional › リレーショナルデータベースを扱う
description: 関数型のドメインモデルをリレーショナルデータベースに保存するとき、テーブルと型をどう対応させ、どう読み書きするかをまとめた節
tags: [book-chapter]
date: 2024-08-09
book: "[[Domain Modeling Made Functional]]"
chapter: 12
---

## TL;DR

- テーブルは[[record-type|レコード型]]に直接マッピングできる。ただし、RDB にはプリミティブな値しか保存できず、[[discriminated-union|選択型]]もそのままでは表せない。
- RDB とやり取りするときは、[[domain-object|ドメインオブジェクト]]と [[dto|DTO]] を相互に変換する。[[orm|ORM]] は使わない。

## 内容

[[Domain Modeling Made Functional 第12章 Persistence|第12章 Persistence]] のうち、[[relational-database|リレーショナルデータベース]]（RDB）を扱う部分の概要である。詳細は節ごとのページにまとめた。

### テーブルとオブジェクトのマッピング

テーブルはレコード型に直接マッピングできる（[[Domain Modeling Made Functional 第12章 テーブルはレコード型に直接マッピングする|テーブルはレコード型に直接マッピングする]]）。ただし、RDB にはプリミティブな値しか保存できないので、保存する前に変換が必要になる。また、選択型にはそのまま対応できない。

選択型は、次のどちらかの方法でマッピングする（[[Domain Modeling Made Functional 第12章 選択型をテーブルにマッピングする手法|選択型をテーブルにマッピングする手法]]）。基本は 1 つ目を使い、ケース間の共通点が少ないときだけ 2 つ目を選ぶ。

1. すべてのケースを同じテーブルに格納する
2. ケースごとに別のテーブルに格納する

ネストした型は、その型が[[entity|エンティティ]]なら別のテーブルに、[[value-object|値オブジェクト]]なら同じテーブルに保存する（[[Domain Modeling Made Functional 第12章 ネストした型をテーブルにマッピングする手法|ネストした型をテーブルにマッピングする手法]]）。

### 読み取りと書き込み

RDB とやり取りするときは、ドメインオブジェクトと DTO を相互に変換する。読み取りは [[Domain Modeling Made Functional 第12章 RDB からの読み取り|RDB からの読み取り]] と [[Domain Modeling Made Functional 第12章 RDB から選択型を読み取る|RDB から選択型を読み取る]]、書き込みは [[Domain Modeling Made Functional 第12章 RDB への書き込み|RDB への書き込み]] にまとめた。

ORM では[[domain|ドメイン]]の[[coherence|整合性]]を保てないので、RDB の結果をドメインオブジェクトにマッピングするときは ORM を使わない。

## キーワード

- [[relational-database|リレーショナルデータベース]]
- [[record-type|レコード型]]
- [[discriminated-union|選択型]]
- [[entity|エンティティ]]
- [[value-object|値オブジェクト]]
- [[domain-object|ドメインオブジェクト]]
- [[dto|DTO]]
- [[orm|ORM]]
- [[coherence|整合性]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

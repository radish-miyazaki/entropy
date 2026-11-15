---
title: Domain Modeling Made Functional › 同じコンテキストの集約間の整合性
description: 基本は 1 つのトランザクションで 1 つの集約だけを更新し、複数の集約を更新するケースはリファクタリングのきっかけにする
tags: [book-chapter]
date: 2024-07-19
book: "[[Domain Modeling Made Functional]]"
chapter: 6
---

## TL;DR

- 基本は、1 つの[[transaction|トランザクション]]で 1 つの[[aggregate|集約]]だけを更新する。
- 2 つの口座間の送金のように、1 つのトランザクションで複数の集約を更新するケースもある。そのまま実装してもよいが、[[refactoring|リファクタリング]]のきっかけになる。

## 内容

同じ[[bounded-context|境界づけられたコンテキスト]]の中にある集約の間で、[[coherence|整合性]]をどう確保するかを考える。

一般的なルールは「1 つのトランザクションにつき 1 つの集約だけを更新する」である。複数の集約が同じ境界づけられたコンテキストにあっても、メッセージと[[eventual-consistency|結果整合性]]を使うべきである（[[Domain Modeling Made Functional 第6章 異なるコンテキスト間での整合性|異なるコンテキスト間での整合性]]）。

ただし、[[workflow|ワークフロー]]全体を 1 つのトランザクションと考えられる場合は、1 つのトランザクションで複数の集約を更新するのがよいこともある。典型的な例は 2 つの口座間の送金である。

```text
Start transaction
Add X amount to accountA
Remove X amount to accountB
Commit transaction
```

口座が `Account` 集約で表されている場合、同じトランザクションで 2 つの集約を扱うことになる。これでも問題はないが、トランザクション自体が独自のアイデンティティを持つと考えられるので、リファクタリングのきっかけになる。

```fsharp
type MoneyTransfer = {
    Id: MoneyTransferId
    ToAccount: AccountId
    FromAccount: AccountId
    Amount: Money
}
```

## キーワード

- [[aggregate|集約]]
- [[transaction|トランザクション]]
- [[bounded-context|境界づけられたコンテキスト]]
- [[coherence|整合性]]
- [[eventual-consistency|結果整合性]]
- [[workflow|ワークフロー]]
- [[refactoring|リファクタリング]]
- [[entity|エンティティ]]

## 自分の理解

送金というトランザクションそのものを[[entity|エンティティ]]として扱う、ということだと理解した。

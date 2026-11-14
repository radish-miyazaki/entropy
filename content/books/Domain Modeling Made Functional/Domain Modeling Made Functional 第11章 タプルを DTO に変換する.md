---
title: Domain Modeling Made Functional 第11章 タプルを DTO に変換する
description: タプルはほとんどのシリアライズフォーマットで扱えないので、DTO ではレコード型で表現する
tags: [book-chapter]
date: 2024-08-07
book: "[[Domain Modeling Made Functional]]"
chapter: 11
---

## TL;DR

- タプルはほとんどのシリアライズフォーマットで扱えないので、[[dto|DTO]] ではレコード型で表現する。

## 内容

[[Domain Modeling Made Functional 第11章 ドメイン型を DTO に変換する方法|ドメイン型を DTO に変換する方法]]の 1 つである。タプルはほとんどのシリアライズフォーマットが対応していないので、要素ごとにフィールドを持つレコード型で表現する。

```fsharp
// ドメイン
type Suit = Heart | Spade | Diamond | Club
type Rank = Ace | Two | Queen | King | ...
type Card = Suit * Rank // タプル

// DTO
type SuitDto = Heart = 1 | Spade = 2 | Diamond = 3 | Club = 4
type RankDto = Ace = 1 | Two = 2 | Queen = 12 | King = 13 | ...
type CardDto =
    { Suit: SuitDto
      Rank: RankDto }
```

`Suit` と `Rank` は[[Domain Modeling Made Functional 第11章 列挙型を DTO に変換する|列挙型を DTO に変換する]]と同じく整数の列挙型にしている。

## キーワード

- [[dto|DTO]]
- [[serialization|シリアライズ]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

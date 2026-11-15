---
title: Domain Modeling Made Functional › ジェネリクスを DTO に変換する
description: シリアライズライブラリがジェネリクスに対応していればジェネリックな DTO を作り、対応していなければ具体的なケースごとに具象型の DTO を作る
tags: [book-chapter]
date: 2024-08-07
book: "[[Domain Modeling Made Functional]]"
chapter: 11
---

## TL;DR

- そもそも [[dto|DTO]] に変換する必要があるジェネリクスはほとんどない。
- シリアライズライブラリがジェネリクスに対応していればジェネリックな DTO を作り、対応していなければケースごとに具象型の DTO を作る。

## 内容

[[Domain Modeling Made Functional 第11章 ドメイン型を DTO に変換する方法|ドメイン型を DTO に変換する方法]]の 1 つである。前提として、DTO に変換する必要があるジェネリクスはほとんど存在しない。

シリアライズライブラリがジェネリクスに対応している場合は、ジェネリックな DTO を作れる。たとえば `Result` は次のように書ける。`when 'OkData: null and 'ErrorData: null` で、それぞれの型が `null` を取れるようにしている。

```fsharp
type ResultDto<'OkData, 'ErrorData when 'OkData: null and 'ErrorData: null> =
    { IsError: bool
      OkData: 'OkData
      ErrorData: 'ErrorData }
```

対応していない場合は、具体的なケースごとに具象型を別に作る必要がある。たとえば、受注確定ワークフローの戻り値の型 `Result<PlaceOrderEvent list, PlaceOrderError>`（[[Domain Modeling Made Functional 第10章 実際のパイプラインでの bind と map の利用|実際のパイプラインでの bind と map の利用]]）は次のようになる。

```fsharp
type PlaceOrderResultDto =
    { IsError: bool
      OkData: PlaceOrderEventDto[]
      ErrorData: PlaceOrderErrorDto }
```

## キーワード

- [[dto|DTO]]
- [[serialization|シリアライズ]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

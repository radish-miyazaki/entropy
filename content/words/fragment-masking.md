---
title: Fragment Masking
aliases: []
description: コンポーネントが自分の Fragment で宣言したデータしか読めないようにして、Fragment Colocation を強制する方法
tags: [word, graphql]
date: 2024-09-25
---

## TL;DR

コンポーネントが、自分の [[graphql-fragment|Fragment]] で宣言したデータしか読めないようにする方法。[[relay|Relay]] が提唱しており、[[fragment-colocation|Fragment Colocation]] をカプセル化する。

## 仕組み

> Relay が提唱している、Fragment Colocation をカプセル化するための方法です。
> Relay のチュートリアルでは標準で Fragment Masking を使った流れが示されています。

親のコンポーネントは、子のコンポーネントの Fragment に含まれるフィールドを読めない。そのため、各コンポーネントは必要なデータを自分の Fragment に書くしかなくなる。

## 自分の理解

[[graphql-codegen|GraphQL Code Generator]] では `fragment-masking.ts` というファイルが生成され、手軽に実現できる。具体的なコードは [[fragment-colocation|Fragment Colocation]] の例を参照。

## 関連

- [[fragment-colocation|Fragment Colocation]]
- [[relay|Relay]]
- [[graphql-codegen|GraphQL Code Generator]]

## 出典

- [Fragment Masking で Fragment Colocation を強制する](https://scrapbox.io/wada-blog/Fragment%20Masking%20で%20Fragment%20Colocation%20を強制する)
- [Relay チュートリアル: Fragments](https://relay.dev/docs/tutorial/fragments-1/)

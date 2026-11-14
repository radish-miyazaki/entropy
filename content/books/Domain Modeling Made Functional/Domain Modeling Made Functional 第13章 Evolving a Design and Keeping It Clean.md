---
title: Domain Modeling Made Functional 第13章 Evolving a Design and Keeping It Clean
description: 要件が変わったら最初にドメインモデルを見直し、型駆動設計によるコンパイルエラーを頼りに安全に設計を変えていくことを説く章
tags: [book-chapter, ddd]
date: 2024-07-03
book: "[[Domain Modeling Made Functional]]"
chapter: 13
---

## TL;DR

- 要件が変わったら、必ず最初に[[domain-model|ドメインモデル]]を見直す。
- [[type-driven-design|型駆動設計]]のおかげで、変更によって壊れた箇所はコンパイルエラーとして見つかる。

## 内容

要件が変わったときは、コードより先にドメインモデルを見直す。

型駆動設計で作ったシステムは、変更に強い。[[domain-object|ドメインオブジェクト]]を変更すると、影響する箇所でコンパイルエラーが出るので、誤って壊す心配がない。[[workflow|ワークフロー]]に[[dependency|依存関係]]を追加したときも、同じようにコンパイルエラーが出る。

ワークフローに新しいステップを追加するときは、他のステップに手を加える必要がない。これは[[open-closed-principle|オープン・クローズドの原則]]に沿っている。また、入力と出力の型が同じであれば、互換性を保ったまま関数の中身を変更できる。

## キーワード

- [[domain-model|ドメインモデル]]
- [[type-driven-design|型駆動設計]]
- [[domain-object|ドメインオブジェクト]]
- [[workflow|ワークフロー]]
- [[dependency|依存関係]]
- [[open-closed-principle|オープン・クローズドの原則]]
- [[domain-driven-design|ドメイン駆動設計]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

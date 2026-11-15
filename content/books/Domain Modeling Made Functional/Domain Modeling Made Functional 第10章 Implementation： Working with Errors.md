---
title: "Domain Modeling Made Functional › Implementation: Working with Errors"
description: 第9章で取り除いた Result エフェクトを戻し、try/catch を使わない関数型のエラー処理とドメインエラーの扱い方を学ぶ章
tags: [book-chapter, ddd, fsharp]
date: 2024-07-29
book: "[[Domain Modeling Made Functional]]"
chapter: 10
---

## TL;DR

- [[Domain Modeling Made Functional 第9章 Implementation： Composing a Pipeline|第9章]]で意図的に取り除いた `Result` エフェクトを戻し、その扱い方を学ぶ章である。
- `try`/`catch` を使わず、[[monad|モナド]]や[[applicative|アプリカティブ]]を使う[[functional-programming|関数型プログラミング]]流の[[error-handling|エラー処理]]を扱う。
- ある種のエラーを[[domain-error|ドメインエラー]]として扱い、注意を払うべき理由も学ぶ。

## 内容

第9章では、合成と[[dependency|依存関係]]に集中するために、エフェクト（`Result`）を取り除いて実装した。しかし `Result` はとても重要なので、この章で元に戻す。各節のまとめは次のページにある。特に重要なのは、ドメインエラー、`Result` を返す関数の連鎖、[[computation-expression|コンピュテーション式]]の 3 つである。

- [[Domain Modeling Made Functional 第10章 Result 型を使ってエラーを明示する]]
- [[Domain Modeling Made Functional 第10章 ドメインエラーを扱う]]
- [[Domain Modeling Made Functional 第10章 Result を生成する関数の連鎖（bind と errorMap、map）]]
- [[Domain Modeling Made Functional 第10章 実際のパイプラインでの bind と map の利用]]
- [[Domain Modeling Made Functional 第10章 他の種類の関数を 2 トラックモデルに適合させる]]
- [[Domain Modeling Made Functional 第10章 コンピュテーション式の導入]]
- [[Domain Modeling Made Functional 第10章 なんとなく理解するモナドとアプリカティブ]]
- [[Domain Modeling Made Functional 第10章 非同期エフェクトの追加]]

## キーワード

- [[error-handling|エラー処理]]
- [[domain-error|ドメインエラー]]
- [[monad|モナド]]
- [[applicative|アプリカティブ]]
- [[computation-expression|コンピュテーション式]]
- [[functional-programming|関数型プログラミング]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

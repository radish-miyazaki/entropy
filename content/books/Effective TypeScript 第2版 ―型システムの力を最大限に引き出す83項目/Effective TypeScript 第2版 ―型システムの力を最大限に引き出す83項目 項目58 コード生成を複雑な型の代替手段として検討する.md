---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 › コード生成を複雑な型の代替手段として検討する
description: 型が複雑になりそうなときは型レベルの計算にこだわらず、コードと型を生成する方法を検討する項目
tags: [book-chapter, typescript]
date: 2025-05-02
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 58
---

## TL;DR

- 型で何でも解決するのが最適とは限らない。型が複雑になりそうなら、コード生成でコードと型を作ることを検討する。
- 生成したコードが古くならないよう、CI などで定期的に生成して差分がないかを確かめる。

## 内容

### 型で解決するのが最適とは限らない

[[typescript|TypeScript]] の型システムは[[turing-complete|チューリング完全]]なので、理論上はどんな計算もできる。しかし、いつも型で解決するのが最適とは限らない。SQL クエリのパーサがその例である。

型が複雑になりそうなときは、コードと型を生成すること（codegen）を検討するとよい。コード生成には次の利点がある。

- 生成ツールは TypeScript に限らず、好きな言語で書ける。[[rust|Rust]] のように型がより厳密な言語で実装してもよい
- 型の表示をコントロールできる。たとえば snake_case の型名が気に入らなければ、sed などのテキスト処理ツールで加工できる
- コンパイラや言語サービスの負荷が小さい

### 例: PgTyped

[PgTyped](https://pgtyped.dev/) は、TypeScript のコードの中に[[tagged-template|タグ付きテンプレート]]で書いた SQL クエリを実際のデータベースと照合し、入出力の型を含む[[declaration-file|型宣言ファイル]]を生成する。型宣言ファイルは次のコマンドで生成する。

```sh
npx pgtyped -c pgtyped.config.json
```

### 生成したコードを同期させる

生成したコードが元と同期していることを保証するため、生成は定期的に実行する必要がある（[[Effective Rust 項目32 CIシステムを設定しよう]]）。たとえば [[continuous-integration|CI]] 上や、[[git-hooks|Git フック]]の `pre-push` でコードを生成し、`git diff` で変更が出ないことを確かめる。

## キーワード

- コード生成
- [[turing-complete|チューリング完全]]
- [[tagged-template|タグ付きテンプレート]]
- [[declaration-file|型宣言ファイル]]
- [[continuous-integration|CI]]
- [[git-hooks|Git フック]]
- [[rust|Rust]]
- [[typescript|TypeScript]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

---
title: REST API
aliases: []
description: REST という設計原則に従って作られた Web API
tags: [word]
date: 2024-09-09
---

## TL;DR

REST という設計原則に従って作られた Web API。エンドポイント（URI）と HTTP メソッドの組み合わせで処理が決まる。

## 仕組み

REST（Representational State Transfer）は、Roy Fielding が博士論文の第 5 章で定義した、分散ハイパーメディアシステムのためのアーキテクチャスタイルである。制約を何も持たないスタイルから始め、次の制約を 1 つずつ足して導かれる。

1. クライアントサーバ: ユーザインタフェースの関心とデータの保存の関心を分ける
2. ステートレス: 各リクエストは、それを理解するのに必要な情報をすべて含む。セッションの状態はクライアントが持つ
3. キャッシュ: レスポンスのデータに、キャッシュできるかどうかを明示的または暗黙的に示す
4. 統一インタフェース: コンポーネントの間のインタフェースを統一する。REST をほかのネットワークのスタイルと分ける一番の特徴である
5. 階層化システム: 各コンポーネントは、直接やり取りする層しか見えない
6. コードオンデマンド: クライアントがコードをダウンロードして実行し、機能を広げられる。可視性が下がるので、任意の制約である

統一インタフェースは、リソースの識別、表現を通じたリソースの操作、自己記述的なメッセージ、アプリケーションの状態のエンジンとしてのハイパーメディアの 4 つの制約からなる。

## 注意点

エンドポイントが大量に作られやすい。また、リソースの取り方に柔軟性がない。必要のないデータまで返してしまうこと（[[over-fetching|Over-fetching]]）や、ネストしたデータを取るために別のエンドポイントを呼ぶ必要があること（Under-fetching）が起きる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[graphql|GraphQL]]
- [[grpc|gRPC]]
- [[schema-first|Schema first]]
- [[code-first|Code first]]

## 出典

- [Representational State Transfer (REST) - Roy Fielding の博士論文 第 5 章](https://roy.gbiv.com/pubs/dissertation/rest_arch_style.htm)
- [REST API とは - Red Hat](https://www.redhat.com/ja/topics/api/what-is-a-rest-api)
- [Software Design 2024年9月号](https://gihyo.jp/magazine/SD/archive/2024/202409)
- [Web APIの設計](https://www.shoeisha.co.jp/book/detail/9784798167015)
- [NestJS × Reactで学ぶフルスタックGraphQLアプリケーション開発](https://www.udemy.com/course/nestjs-react-graphql/)

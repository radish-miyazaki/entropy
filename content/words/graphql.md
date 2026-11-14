---
title: GraphQL
aliases: []
description: Meta が開発した Web API のためのクエリ言語で、スキーマで型を定義し、クライアントが必要なデータだけを取得できる
tags: [word, web-api]
date: 2024-09-06
---

## TL;DR

Meta が開発した、Web API のためのクエリ言語。[[graphql-schema|GraphQL Schema]] で型を定義し、クライアントは単一のエンドポイントに必要なデータだけを問い合わせる。

## なぜ必要か

[[rest-api|REST API]] と比べて、速度、柔軟性、開発のしやすさを重視して設計されている。クライアントが必要なデータを指定するので、Over-fetching や Under-fetching を避けられる。モバイル端末の普及で、限られた帯域で効率よく取得したいというニーズが増えたことが背景にある。

また、各 UI コンポーネントが Fragment で必要なデータを宣言し、1 つのクエリにまとめて送れる（[[fragment-colocation|Fragment Colocation]]）。

## 仕組み

スキーマを独自のスキーマ定義言語（SDL）で書き、独自のクエリ言語でリクエストする。特殊な通信プロトコルは必要とせず、この点が [[grpc|gRPC]] と大きく違う。リクエストには Query（取得）、Mutation（書き換え）、Subscription（購読）がある。

### 型システム

スキーマの定義は必須で、型に違反したリクエストやレスポンスはランタイムエラーになる。そのため、スキーマを API ドキュメントとして使え、実装とずれにくい。GraphiQL ではスキーマを使って補完できる。

### クエリの機能

- **Fragment**: クエリの重複部分を切り出して再利用し、[[dry|DRY]] にする。
- **変数**: `$` で始まる変数で外から値を受け取る。変数ごとに型を指定する。
- **ディレクティブ**: `@` で始まる修飾子。スキーマでは `@deprecated` で廃止予定を示し、クエリでは `@include` と `@skip` で取得するフィールドを条件で切り替える。

## 例

```graphql
fragment PostItem on Post {
  title
  author {
    name
  }
}

query IncludeQuery($showRanking: Boolean!) {
  post {
    ...PostItem
    ranking @include(if: $showRanking)
  }
}
```

```graphql
type Post {
  title: String! @deprecated
  body: String! @deprecated(reason: "Use `content` instead.")
  content: String! @constraint(maxLength: 1000)
}
```

## 注意点

クライアントが自由にクエリを組めるので、サーバの負荷を予測しにくい。負荷への対策は必須である。

- 監視: Datadog APM や Sentry で負荷やエラーを監視する。
- 外部向け: [[depth-limiting|Depth Limiting]] や [[query-cost-analysis|Query Cost Analysis]] で、フィールド数、ノード数、深さを制限する。
- 内部向け: [[persisted-query|Persisted Query]] や [[signed-query|Signed Query]] で、登録済みのクエリだけを受け付ける。

REST API と違ってキャッシュが複雑になりやすく、学習コストもかかる。`@include` や `@skip` はクエリの[[cognitive-load|認知的負荷]]を上げるので、困ったときの手段と考えるのがよい。

## 自分の理解

スキーマの定義が必須とはいえ、[[code-first|Code first]] のアプローチではスキーマを手で書かなくてよい。

当初は [[n-plus-one-problem|N+1 問題]]が起きやすいことをデメリットに挙げていたが、取り消した。関連する話は [[graphql-n-plus-one|GraphQL における N+1 問題の発生しやすさはデメリットなのか]] にある。

## 関連

- [[rest-api|REST API]]
- [[graphql-schema|GraphQL Schema]]
- [[graphql-resolver|Resolver]]
- [[fragment-colocation|Fragment Colocation]]
- [[graphql-codegen|GraphQL Code Generator]]
- [[trusted-documents|Trusted Document]]
- [[nestjs|NestJS]]
- [[nestjs-graphql-server|NestJS で GraphQL サーバを実装する]]

## 出典

- [GraphQL](https://graphql.org/)
- [GraphQL Specification](https://spec.graphql.org/)
- [Tools and Libraries](https://graphql.org/community/tools-and-libraries/)
- [Introspection](https://graphql.org/learn/introspection/)
- [Queries](https://graphql.org/learn/queries/)
- [Software Design 2024年9月号](https://gihyo.jp/magazine/SD/archive/2024/202409)
- [Web APIの設計](https://www.shoeisha.co.jp/book/detail/9784798167015)
- [Goで学ぶGraphQLサーバーサイド入門](https://zenn.dev/hsaki/books/golang-graphql)
- [NestJS × React で学ぶフルスタック GraphQL アプリケーション開発（Udemy）](https://www.udemy.com/course/nestjs-react-graphql/)

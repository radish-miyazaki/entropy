---
title: Nest CLI
aliases: []
description: NestJS のプロジェクトの作成や、Module、Resolver、Service などのファイルの生成を行うコマンドラインツール
tags: [word, nestjs]
date: 2024-09-09
---

## TL;DR

[[nestjs|NestJS]] のコマンドラインツール。プロジェクトの作成や、Module、Resolver、Service などのファイルの生成を行う。

## 仕組み

`npm i -g @nestjs/cli` でインストールし、`nest new <プロジェクト名>` でプロジェクトを作る。

`nest generate`（省略形は `nest g`）でファイルを生成する。

- `nest g module <名前>`: Feature module を生成する。`src/<名前>/<名前>.module.ts` が作られ、Root module（`app.module.ts`）の `imports` に追加される
- `nest g resolver <名前>`: [[graphql|GraphQL]] の [[graphql-resolver|Resolver]] を生成する。`src/<名前>/<名前>.resolver.ts` とテストファイル（`.resolver.spec.ts`）が作られ、Feature module に追加される
- `nest g service <名前>`: Service を生成する。`src/<名前>/<名前>.service.ts` とテストファイル（`.service.spec.ts`）が作られ、Feature module に追加される

テストファイルが不要なときは `--no-spec` を付ける。

## 例

`nest new` で生成されるファイルは次のとおり。

```sh
$ tree -I 'node_modules|dist|.git'
.
├── README.md
├── nest-cli.json
├── package-lock.json
├── package.json
├── src
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── tsconfig.build.json
└── tsconfig.json
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[nestjs|NestJS]]
- [[nestjs-graphql-server|NestJS で GraphQL サーバを実装する]]

## 出典

- [CLI Overview - NestJS](https://docs.nestjs.com/cli/overview)
- [CLI command reference - NestJS](https://docs.nestjs.com/cli/usages#nest-generate)

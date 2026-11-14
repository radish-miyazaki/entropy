---
title: typescript-json-schema
aliases: []
description: TypeScript のソースコードから JSON Schema を生成するライブラリ
tags: [word, typescript]
date: 2025-06-08
---

## TL;DR

[[typescript|TypeScript]] のソースコードから [[json-schema|JSON Schema]] を生成するライブラリ。

## 仕組み

TypeScript のプログラムをコンパイルして型の情報をすべて取り出し、型、必須のプロパティ、`extends`、注釈、プロパティの初期値（デフォルト値になる）をスキーマに変換する。JSDoc のコメントに `@minimum 0` や `@TJS-type integer` のように書くと、JSON Schema のキーワードを足せる。

## 例

CLI では、tsconfig か対象のファイルと、型の名前を渡す。型の名前に `"*"` を渡すとすべての型を変換する。

```sh
typescript-json-schema project/directory/tsconfig.json TYPE
```

プログラムから使うこともできる。

```ts
import * as TJS from "typescript-json-schema"

const program = TJS.getProgramFromFiles([resolve("my-file.ts")])
const schema = TJS.generateSchema(program, "MyType", { required: true })
```

## 注意点

README によると、このライブラリはほぼメンテナンスモードである。より完全なものとして [ts-json-schema-generator](https://github.com/vega/ts-json-schema-generator) を勧めている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[json-schema-to-typescript]]: 逆に JSON Schema から TypeScript の型を生成する
- [[ajv|Ajv]]

## 出典

- [YousefED/typescript-json-schema](https://github.com/YousefED/typescript-json-schema)

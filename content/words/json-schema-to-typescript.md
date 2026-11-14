---
title: json-schema-to-typescript
aliases: []
description: JSON Schema から TypeScript の型定義を生成するライブラリ
tags: [word, typescript]
date: 2025-06-08
---

## TL;DR

[[json-schema|JSON Schema]] をコンパイルして、[[typescript|TypeScript]] の型定義を生成するライブラリ。

## 仕組み

CLI の `json2ts` か、API の `compile`、`compileFromFile` で使う。スキーマの `title` がインタフェースの名前になり、`required` にないプロパティは省略可能になる。`enum` はリテラル型のユニオンになる。

## 例

```sh
json2ts -i foo.json -o foo.d.ts
json2ts -i 'schemas/**/*.json' -o types/
```

次のスキーマを入力すると、

```json
{
  "title": "Example Schema",
  "type": "object",
  "properties": {
    "firstName": { "type": "string" },
    "age": { "description": "Age in years", "type": "integer", "minimum": 0 },
    "hairColor": { "enum": ["black", "brown", "blue"], "type": "string" }
  },
  "additionalProperties": false,
  "required": ["firstName"]
}
```

次の型が生成される。

```ts
export interface ExampleSchema {
  firstName: string
  /**
   * Age in years
   */
  age?: number
  hairColor?: "black" | "brown" | "blue"
}
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[typescript-json-schema]]: 逆に TypeScript の型から JSON Schema を生成する
- [[ajv|Ajv]]

## 出典

- [bcherny/json-schema-to-typescript](https://github.com/bcherny/json-schema-to-typescript)

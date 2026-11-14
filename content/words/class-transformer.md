---
title: class-transformer
aliases: []
description: プレーンオブジェクトとクラスのインスタンスを相互に変換するライブラリ
tags: [word, javascript, typescript]
date: 2024-09-10
---

## TL;DR

プレーンオブジェクトとクラスのインスタンスを相互に変換するライブラリ。[[class-validator]] と組み合わせると、リクエストやレスポンスのバリデーションが容易になる。

## なぜ必要か

公式の README によると、API から受け取った JSON を `JSON.parse` すると、得られるのはプレーンな JavaScript のオブジェクトで、自分で定義したクラスのインスタンスではない。そのため、クラスに定義したメソッド（`getName()` など）を呼べない。class-transformer は、プレーンオブジェクトを手元のクラスのインスタンスに対応付けるためのライブラリである。

## 仕組み

`npm install class-transformer --save` でインストールする。`reflect-metadata` も必要で、Node.js ではアプリケーションのエントリポイント（`app.ts` など）でグローバルに import する。

主な関数は次のとおりである。

- `plainToInstance`: プレーンオブジェクト（または配列）をクラスのインスタンスに変換する
- `instanceToPlain`: クラスのインスタンスをプレーンオブジェクトに戻す
- `instanceToInstance`: クラスのインスタンスから新しいインスタンスを作る

変換の仕方はデコレータで指定する。`@Expose` は出力に含めるプロパティを指定し、`@Exclude` は除外するプロパティを指定する。TypeScript には十分なリフレクションの機能がないので、ネストしたオブジェクトや配列、`Date` などは `@Type` で型を明示する。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[class-validator]]
- [[nestjs|NestJS]]

## 出典

- [class-transformer - GitHub](https://github.com/typestack/class-transformer)

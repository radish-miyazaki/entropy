---
title: Juniper
aliases: []
description: Rust で GraphQL サーバを作るためのライブラリ。スキーマを Rust のコードで定義するコードファーストの方式を採る
tags: [word, rust, graphql]
date: 2024-09-24
---

## TL;DR

[[rust|Rust]] で [[graphql|GraphQL]] サーバを作るためのライブラリ。スキーマをスキーマファイルではなく Rust のコードで定義する、コードファーストの方式を採る。

## 仕組み

Juniper は GraphQL の仕様（October 2021）のクエリ言語をすべてサポートしており、インタフェース、ユニオン、イントロスペクション、バリデーションも扱える。定義したスキーマを GraphQL Schema Language として出力することもできる。

Juniper 自体は Web サーバを含まないので、既存のサーバに組み込んで使う。Actix、Hyper、Rocket、Warp、axum との統合が用意されている。シリアライズ形式や通信手段にも依存しない。

型はデフォルトで non-null になる。たとえば `Vec<Episode>` は `[Episode!]!` になる。

## 注意点

コードファーストなので、[[schema-first|Schema first]] で開発したい場合は、別プロジェクトの juniper-from-schema を使う。また、まだ 1.0 に達しておらず、API が変わる可能性がある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[gqlgen]]: Go の GraphQL サーバライブラリ。こちらは Schema first

## 出典

- [graphql-rust/juniper](https://github.com/graphql-rust/juniper)

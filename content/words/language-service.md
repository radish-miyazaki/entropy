---
title: 言語サービス
aliases: []
description: エディタや IDE に、自動補完やリネームなどの機能を提供するプログラム
tags: [word, typescript, エディタ]
date: 2026-11-14
---

## TL;DR

エディタや IDE に、自動補完、インスペクション、ナビゲーション、[[refactoring|リファクタリング]]などの機能を提供するプログラム。[[typescript|TypeScript]] の言語サービスは `tsserver` が提供する。

## なぜ必要か

[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]] によると、エディタで言語サービスを使って型を確かめると、型システムの動きや型推論の直感が身につく。外部ライブラリの型宣言ファイルも確認できる。

## 仕組み

TypeScript の Wiki によると、言語サービスは長く生き続けるコンパイルのコンテキストである。問い合わせに答えるのに必要な分だけ情報を計算するので、すばやく応答できる。

`tsserver` は、TypeScript のコンパイラと言語サービスを包んだ Node の実行ファイルである。標準入力で JSON のリクエストを受け取り、標準出力に応答を書く。エディタはクライアントとして `tsserver` にコマンドを送り、結果を表示するので、エディタ自身がコンパイラを組み込む必要がない。[[visual-studio-code|Visual Studio Code]] の TypeScript 対応も `tsserver` の上に作られている。

## 注意点

[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]] によると、`any` 型の値やインデックスシグネチャには、自動補完などの言語サービスの支援を受けられない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[language-server-protocol|Language Server Protocol]]
- [[typescript|TypeScript]]
- [[visual-studio-code|Visual Studio Code]]

## 出典

- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目6 エディターを使って型システムを調査、探求する|Effective TypeScript 第2版 項目6]]
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目5 any型の使用を制限する|Effective TypeScript 第2版 項目5]]
- [Using the Language Service API - TypeScript Wiki](https://github.com/microsoft/TypeScript/wiki/Using-the-Language-Service-API)
- [Standalone Server (tsserver) - TypeScript Wiki](<https://github.com/microsoft/TypeScript/wiki/Standalone-Server-(tsserver)>)

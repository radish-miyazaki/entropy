---
title: DefinitelyTyped
aliases: ["@types"]
description: JavaScript ライブラリの型宣言を集めたリポジトリ。npm の @types スコープに自動で公開される
tags: [word, typescript]
date: 2026-11-14
---

## TL;DR

JavaScript ライブラリの[[declaration-file|型宣言ファイル]]を集めた GitHub のリポジトリ。ここにある型定義は、npm の `@types` スコープに自動で公開される。

## なぜ必要か

型宣言を同梱していない JavaScript ライブラリでも、[[typescript|TypeScript]] から型付きで使えるようにする。TypeScript の公式ドキュメントによると、よく使われるライブラリの大半は DefinitelyTyped に型宣言がある。

## 仕組み

DefinitelyTyped の README によると、`master` ブランチの内容が専用のツールで `@types` スコープに自動で公開される。型パッケージのバージョンは、ライブラリのメジャーとマイナーのバージョンに合わせる。パッチの番号は 0 から始まり、公開のたびに増える。

利用者は `npm install --save-dev @types/react` のように入れる。型パッケージの名前はライブラリの名前と同じで、スコープ付きのパッケージは `@babel/preset-env` なら `@types/babel__preset-env` のようになる。TypeScript は `node_modules/@types` の下の型定義を自動で見つけるので、入れる以外の手順は要らない。

各パッケージは、`package.json` の `owners` に並ぶ定義の所有者が管理する。プルリクエストは、TypeScript か DefinitelyTyped のチームのメンバーがレビューしてからマージされる。

## 注意点

README では、TypeScript で書いたライブラリは DefinitelyTyped に公開せず、生成した型宣言をパッケージに同梱するよう勧めている。ライブラリが型を同梱したら、混乱を避けるために DefinitelyTyped から型を外す。

[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目|Effective TypeScript]] の項目 66 によると、`@types` を使うと、ライブラリ、`@types`、TypeScript の 3 つのバージョンが食い違って問題が起きることがある。型宣言をライブラリに同梱すれば食い違いはなくなるが、DefinitelyTyped で公開する場合に比べて不利な点もある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[declaration-file|型宣言ファイル]]

## 出典

- [DefinitelyTyped/DefinitelyTyped - GitHub](https://github.com/DefinitelyTyped/DefinitelyTyped)
- [TypeScript: Documentation - Type Declarations](https://www.typescriptlang.org/docs/handbook/2/type-declarations.html)
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目66 型宣言の依存関係に関わる3つのバージョンを理解する|Effective TypeScript 第2版 項目66]]

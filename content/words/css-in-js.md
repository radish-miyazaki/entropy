---
title: CSS-in-JS
aliases: []
description: CSS を JavaScript の中に書く手法
tags: [word, css, javascript]
date: 2024-09-02
---

## TL;DR

名前のとおり、[[css|CSS]] を [[javascript|JavaScript]] の中に書く手法。

## なぜ必要か

スタイルは同じモジュールの中に書くか、他の依存関係と同じように `import` するので、コンポーネントに関係するスタイルを探してコードベースを検索する必要がない。マークアップと同じく、スタイルもプロパティや状態に応じて生成できる。スタイルを単体テストの対象にすることもできる。

## 仕組み

スタイルを適用するタイミングによって、2 種類に分けられる。

- [[runtime-css-in-js|Runtime CSS-in-JS]]: アプリケーションの実行時にスタイルを解釈して適用する
- [[zero-runtime-css|Zero-runtime CSS]]: ビルド時に CSS ファイルを生成する

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[styled-components]]
- [[runtime-css-in-js|Runtime CSS-in-JS]]
- [[zero-runtime-css|Zero-runtime CSS]]

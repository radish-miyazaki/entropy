---
title: shadow-cljs
aliases: []
description: ClojureScript のコードをコンパイル・ビルドするためのツール
tags: [word, clojure]
date: 2024-01-07
---

## TL;DR

[[clojurescript|ClojureScript]] のコードをコンパイル・ビルドするためのツール。シンプルさと使いやすさを重視している。

## 仕組み

npm で管理する JavaScript のパッケージをそのまま使える。ClojureScript と CSS のライブリロードや、ClojureScript の REPL も備える。出力先として、ブラウザ、Node.js のスクリプト、npm モジュール、React Native、Chrome 拡張などに対応している。設定の初期値が適切に決められているので、細かい設定に悩まずに済む。

動かすには Node.js か Bun、npm などのパッケージマネージャ、Java SDK が必要である。

User's Guide によると、shadow-cljs は実際のビルドを行う Clojure のライブラリと、コマンドラインの起動役になる npm パッケージの 2 つからなる。ビルドは `shadow-cljs.edn` に定義し、ビルドごとの `:target` で、ブラウザや Node.js、Chrome 拡張などの実行環境に合わせたプリセットを選ぶ。開発用のビルドは素早いフィードバックを重視して REPL を備える。リリース用のビルドは開発用のコードを取り除き、Closure Compiler で出力を小さくする。

## 例

基本のコマンドは、1 回ビルドする `compile`、変更を監視してビルドし直す `watch`、リリース用にビルドする `release` の 3 つである。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[clojurescript|ClojureScript]]

## 出典

- [thheller/shadow-cljs](https://github.com/thheller/shadow-cljs)
- [Shadow CLJS User's Guide](https://shadow-cljs.github.io/docs/UsersGuide.html)

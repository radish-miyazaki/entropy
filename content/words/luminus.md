---
title: Luminus
aliases: []
description: Clojure の軽量なライブラリを集めて作られた、Web 開発のマイクロフレームワーク
tags: [word, clojure]
date: 2024-01-07
---

## TL;DR

[[clojure|Clojure]] の軽量なライブラリを集めて作られた、Web 開発のマイクロフレームワーク。実態はさまざまなライブラリを組み合わせた [[leiningen|Leiningen]] のテンプレートである。

## 仕組み

公式サイトは Luminus を「軽量なライブラリの集合に基づく Clojure のマイクロフレームワーク」と説明している。[[jvm|JVM]] 上で動き、REPL と組み込みの開発サーバを使ってすぐに開発を始められる。プロジェクトは `lein new luminus my-app` で作る。後継として Kit が公開されている。

## 注意点

公式はフレームワークと称しているが、実態はただの Leiningen テンプレートだという指摘がある。

> 確かに Luminus は公式でフレームワークであると謳っていますが、その実態はただの Leiningen テンプレートです。
> Rails のような素晴らしいドキュメントもありませんし、豊富な rails コマンドのようなもの提供されません。
> Luminus を使う際あなたは Ring を理解して、依存関係にある全てのライブラリの README やその他ドキュメントを読む必要があります。

最初の簡単なアプリケーションはチュートリアルに沿って作れる。しかし、それ以上に進むには [[ring|Ring]] をはじめ、各ライブラリのドキュメントを読む必要がある。

## 自分の理解

最初は Clojure の Web アプリケーションフレームワークだと思っていた。しかし、どうやらフレームワークではなく、Clojure のさまざまなパッケージの集合体（Leiningen テンプレート）らしい。

## 関連

- [[leiningen|Leiningen]]
- [[ring|Ring]]
- [[compojure|Compojure]]

## 出典

- [Luminus](https://luminusweb.com/)
- [Clojure 入門（ayato-p）: Web フレームワークについて](https://ayato-p.github.io/clojure-beginner/intro_web_development/column_about_web_frameworks.html)
- [Luminus - ayato-p](https://scrapbox.io/ayato-p/Luminus)
- [Luminus を試してみる（Qiita）](https://qiita.com/hakuro/items/c6e73f899659c33a6775)

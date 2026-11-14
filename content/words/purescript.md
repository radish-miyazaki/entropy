---
title: PureScript
aliases: []
description: JavaScript のランタイム上で動く、Haskell の影響を強く受けた静的型付けの純粋関数型プログラミング言語
tags: [word, fp, プログラミング言語]
date: 2024-08-07
---

## TL;DR

[[javascript|JavaScript]] のランタイム上で動く、[[static-typing|静的型付け]]の純粋[[functional-programming|関数型プログラミング]]言語。Phil Freeman が開発した。

## 仕組み

コンパイラは [[haskell|Haskell]] で書かれており、言語も Haskell の強い影響を受けている。ただし、PureScript と Haskell の間には重要な違いが数多くある。ソースファイルの拡張子は `.purs` である。テスティングフレームワークも最初から用意されている。[[elm|Elm]] も同じ純粋関数型の言語である。

### インストール

npm でインストールでき、`purs` コマンドが使えるようになる（バージョン 0.15.15 で確認した）。

```sh
npm i -g purescript
purs --version
# 0.15.15
```

### 開発環境

- パッケージマネージャ: [[spago|Spago]]（推奨）
- フォーマッタ: [purescript-tidy](https://github.com/natefaubion/purescript-tidy)
- [[visual-studio-code|Visual Studio Code]] の拡張機能: [PureScript Language Support](https://marketplace.visualstudio.com/items?itemName=nwolverson.language-purescript)、[PureScript IDE](https://marketplace.visualstudio.com/items?itemName=nwolverson.ide-purescript)
- その他のエディタの対応状況は[公式ドキュメント](https://github.com/purescript/documentation/blob/master/ecosystem/Editor-and-tool-support.md#editor-support)にまとまっている

### 学習や開発に使えるサイト

- [[PureScript by Example]]: 公式のチュートリアル
- [Purescript: Jordan's Reference](https://github.com/jordanmartinez/purescript-jordans-reference): PureScript by Example よりさらに深く踏み込んだ学習教材
- [Pursuit](https://pursuit.purescript.org/): PureScript の関数や型を検索できるサイト
- [PureScript Document Repository](https://github.com/purescript/documentation): PureScript の開発者や利用者が書いた、幅広い話題の記事と例
- [PureScript Cookbook](https://github.com/JordanMartinez/purescript-cookbook)
- [Try PureScript](https://try.purescript.org/): ブラウザ上でコードをコンパイルできるサイト

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[haskell|Haskell]]
- [[elm|Elm]]
- [[spago|Spago]]
- [[functional-programming|関数型プログラミング]]

## 出典

- [PureScript](https://www.purescript.org/)
- https://zenn.dev/arark/articles/80f005ab51a1ee
- https://qiita.com/hiruberuto/items/96a4a202a9a3471a9b4c

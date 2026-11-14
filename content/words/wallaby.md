---
title: Wallaby
aliases: []
description: コードを書くたびにテストを実行し、結果をエディタ上のコードに直接表示する JavaScript 向けの有料ツール
tags: [word, javascript]
date: 2024-08-29
---

## TL;DR

コードとテストの境界をなくすための、[[javascript|JavaScript]] 向けのテストツール。コードを入力するたびにテストが実行され、その結果がエディタ上のコードに直接表示される。有料だが、無料トライアルで試せる。

## 仕組み

コードを入力するたびにテストが走り、成功したテストが通るコードは緑色、失敗したテストに関わるコードは赤色でハイライトされる。テストが失敗した場合は、エラーの説明がコードの横に表示される。

[[visual-studio-code|Visual Studio Code]] のほか、IntelliJ IDEA などの [[ide|IDE]] にも対応している。

## 例

Visual Studio Code では、[拡張機能](https://marketplace.visualstudio.com/items?itemName=WallabyJs.wallaby-vscode)をインストールして次の手順で実行する。

1. コマンドパレットを開き、「Wallaby.js: Select Configuration」を実行する
2. `Automatic Configuration <project directory>` を選ぶ
3. プロジェクト内のファイルを開いて編集する

## 自分の理解

公式の説明動画が分かりやすい。似たことは、Visual Studio Code の [[jest|Jest]] の拡張機能を使っても実現できる。

## 関連

- [[jest|Jest]]
- [[visual-studio-code|Visual Studio Code]]

## 出典

- [Wallaby.js](https://wallabyjs.com/)
- [Wallaby.js のドキュメント](https://wallabyjs.com/docs/)
- [Installation](https://wallabyjs.com/docs/intro/install.html?editor=vsc)
- [Configuration](https://wallabyjs.com/docs/intro/config.html#vs-code)

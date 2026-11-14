---
title: Vibe.d
aliases: []
description: D 言語で書かれた、高性能な非同期 I/O・並行処理・Web アプリケーションのツールキット
tags: [word, d, フレームワーク]
date: 2025-01-22
---

## TL;DR

[[dlang|D]] 言語で書かれた、高性能な非同期 I/O、並行処理、Web アプリケーションのツールキット。MIT ライセンスで公開されている。

## 仕組み

ファイバーを使った非同期 I/O と並行処理の実装（`vibe-core`）を土台に、HTTP クライアント・サーバ（WebSocket、プロキシ、セッションを含む）、Web・REST フレームワーク、TLS、MongoDB や Redis のサポート、pug.js に影響を受けたコンパイル時の HTML テンプレート（Diet）などを提供する。

## 例

DUB でプロジェクトを作るのが推奨されている。

```sh
dub init <name> -t vibe.d
cd <name>
dub
```

最小の HTTP サーバは次のように書ける。

```d
import vibe.vibe;

void main()
{
    listenHTTP("127.0.0.1:8080", (req, res) {
        res.writeBody("Hello Vibe.d: " ~ req.path);
    });

    runApplication();
}
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[DLang Tour|DLang Tour]]

## 出典

- [vibe-d/vibe.d](https://github.com/vibe-d/vibe.d)

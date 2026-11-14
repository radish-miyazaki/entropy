---
title: Yjs
aliases: []
description: 共同編集アプリを作るための JavaScript の CRDT 実装
tags: [word, javascript]
date: 2025-06-19
---

## TL;DR

共同編集アプリを作るための CRDT の実装である。`Map` や `Array` のようなデータ型を共有型として提供し、変更は他の参加者に自動で配信され、競合なくマージされる。

## 仕組み

共有型には `Y.Array`、`Y.Map`、書式付きテキストを扱う `Y.Text`、XML 風の階層構造を扱う `Y.XmlFragment` などがあり、`Y.Doc` がそれらをまとめる。通信方式には依存せず、通信と永続化はプロバイダ（y-websocket、y-webrtc、y-indexeddb など）が担う。ProseMirror、CodeMirror、Monaco などのエディタとつなぐバインディングもある。オフライン編集、Undo/Redo、共有カーソルにも対応している。

## 例

```js
import * as Y from "yjs"

const doc = new Y.Doc()
const yarray = doc.getArray("my-array")
yarray.observe(() => console.log("yarray が変更された"))
yarray.insert(0, ["val"]) // 変更が起き、オブザーバが呼ばれる
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 出典

- [yjs/yjs - GitHub](https://github.com/yjs/yjs)

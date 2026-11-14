---
title: Session Storage
aliases: []
description: タブやウィンドウを閉じると消える、タブごとにキーと値の組でデータを保存する Web Storage API の一種
tags: [word, web]
date: 2024-11-13
---

## TL;DR

[[web-storage-api|Web Storage API]] の一種。[[local-storage|Local Storage]] と同じくキーと値の組でデータを保存するが、タブやウィンドウを閉じるとデータが消える。

## 仕組み

Local Storage との違いは次の 2 点である。

- **ウィンドウやタブを閉じると、データが削除される。**
- 同じ[[origin|オリジン]]の同じタブ内のページでは共有されるが、**別のタブやウィンドウとは共有されない。**

MDN によると、ページセッションはタブやブラウザが開いている限り続き、再読み込みや復元をしても残る。新しいタブやウィンドウでページを開くと、新しいセッションが作られる。この点はセッション Cookie の動作とは異なる。

## 例

```js
sessionStorage.setItem("key", "value")
let data = sessionStorage.getItem("key")
sessionStorage.removeItem("key")
sessionStorage.clear()
```

## 注意点

オリジンが `file:` や `data:` のように有効なスキーム、ホスト名、ポート番号の組でないときや、ユーザがそのオリジンでのデータの永続化を拒否しているときは、`SecurityError` が発生する。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[local-storage|Local Storage]]
- [[cookie|Cookie]]

## 出典

- [HTML Standard - The sessionStorage getter](https://html.spec.whatwg.org/multipage/webstorage.html#dom-sessionstorage-dev)
- [Window: sessionStorage プロパティ - MDN](https://developer.mozilla.org/ja/docs/Web/API/Window/sessionStorage)

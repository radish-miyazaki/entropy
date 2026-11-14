---
title: Local Storage
aliases: []
description: ブラウザにキーと値の組でデータを保存し、ブラウザを閉じても保持し続ける Web Storage API の一種
tags: [word, web]
date: 2024-11-13
---

## TL;DR

[[web-storage-api|Web Storage API]] の一種。[[web-browser|ブラウザ]]にキーと値の組でデータを保存し、ブラウザを閉じてもデータを保持し続ける。

## 仕組み

データは[[origin|オリジン]]ごとに保存され、同じオリジンのページで共有される。オリジンは[[url-scheme|スキーム]]、[[host|ホスト]]、[[port-number|ポート番号]]の組で決まるので、たとえば `http://example.com` と `https://example.com` では別の領域になる。保存したデータに期限はない。キーと値は常に UTF-16 の文字列として保存される。

## 例

```javascript
// 保存（既存のキーがあれば更新）
localStorage.setItem("myCat", "Tom")

// 読み込み
const cat = localStorage.getItem("myCat")

// 削除
localStorage.removeItem("myCat")

// 全削除
localStorage.clear()
```

## 注意点

プライベートブラウジングで読み込んだページの Local Storage は、最後のプライベートタブを閉じたときに消える。また、ユーザがデータの永続化を拒否している場合は `SecurityError` が発生する。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[session-storage|Session Storage]]
- [[cookie|Cookie]]
- [[same-origin-policy|同一生成元ポリシー]]

## 出典

- [HTML Standard - The localStorage getter](https://html.spec.whatwg.org/multipage/webstorage.html#dom-localstorage-dev)
- [Window: localStorage プロパティ - MDN Web Docs](https://developer.mozilla.org/ja/docs/Web/API/Window/localStorage)

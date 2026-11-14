---
title: jsdom
aliases: []
description: Node.js 上で WHATWG の DOM と HTML の標準を実装し、ブラウザの一部を模倣する JavaScript ライブラリ
tags: [word, javascript, テスト]
date: 2026-11-14
---

## TL;DR

[[whatwg|WHATWG]] の DOM と HTML の標準など、多くの Web 標準を純粋な JavaScript で実装したライブラリ。Node.js 上でブラウザの一部を模倣できる。

## なぜ必要か

Node.js にはブラウザの DOM API がないので、そのままでは DOM を操作するコードをテストできない。公式の README によると、jsdom は実際の Web アプリケーションをテストしたりスクレイピングしたりできる程度に、ブラウザの一部を模倣することを目指している。[[jest|Jest]] でフロントエンドのコードをテストするときにも使われる。

## 仕組み

HTML をブラウザと同じようにパースし、`window` や `document` を持つ環境を作る。URL や Cookie、コンソール出力の扱いもオプションで設定できる。ページ内のスクリプトの実行は、既定では無効になっている。

## 例

```js
const { JSDOM } = require("jsdom")
const { document } = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`).window
console.log(document.querySelector("p").textContent) // "Hello world"
```

## 注意点

画面の描画はできず、レイアウトも計算しないので、レイアウトに関わるプロパティはダミーの値を返す。ページ遷移にも対応していない。README は jsdom のサンドボックスが完全ではないとしているので、`runScripts: "dangerously"` は信頼できるコードにだけ使う。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[jest|Jest]]
- [[testing-library|Testing Library]]
- [[whatwg|WHATWG]]

## 出典

- [jsdom/jsdom - GitHub](https://github.com/jsdom/jsdom)

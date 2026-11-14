---
title: JSX
aliases: []
description: Meta が開発した、JavaScript の中に HTML のようなマークアップを書けるようにする構文拡張
tags: [word, javascript, react]
date: 2024-08-30
---

## TL;DR

Meta が開発した [[javascript|JavaScript]] の構文拡張。[[html|HTML]] のようなマークアップを JavaScript の中に書ける。

## なぜ必要か

UI の構造を、それを描画するロジックと同じ場所に、HTML に近い見た目で書ける。当初は [[react|React]] だけで使われていたが、今では他のフレームワークでも使われることが多い。

## 仕組み

JSX のコードは、ビルド時に素の JavaScript にコンパイルされる。このとき各 JSX タグは、どの種類の要素を作るかを React に伝える関数呼び出しに変換される。

## 例

次の JSX は、

```jsx
const helloJSX = <h1 className="super-big">Hello, JSX!</h1>
```

次の JavaScript にコンパイルされる。

```javascript
const helloJSX = React.createElement("h1", { className: "super-big" }, "Hello, JSX!")
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[tsx|TSX]]
- [[react|React]]

## 出典

- [JSX でマークアップを記述する – React](https://ja.react.dev/learn/writing-markup-with-jsx)

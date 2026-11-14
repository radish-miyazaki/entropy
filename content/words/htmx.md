---
title: HTMX
aliases: []
description: HTML の属性だけで AJAX や WebSocket などを使えるようにする、依存のない小さな JavaScript ライブラリ
tags: [word]
date: 2024-02-02
---

## TL;DR

HTML の属性を使って、AJAX、CSS Transitions、WebSocket、Server Sent Events を HTML から直接扱えるようにする JavaScript ライブラリ。依存ライブラリがなく、minify と gzip 後で約 16KB と小さい。

## なぜ必要か

素の HTML では、HTTP リクエストを送れるのは `<a>` と `<form>` だけで、きっかけになるイベントも `click` と `submit` だけである。htmx はこの制約を取り除き、どの要素からでもリクエストを送れるようにする。公式サイトは、これによって htmx が「ハイパーテキストとしての HTML を完成させる」としている。

## 例

ボタンをクリックすると `/clicked` に AJAX で POST し、返ってきた HTML でボタン全体を置き換える例。

```html
<button hx-post="/clicked" hx-swap="outerHTML">Click Me</button>
```

`hx-post` はリクエストの送り先、`hx-swap` はレスポンスで既存の内容をどう置き換えるかを指定する。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 出典

- [htmx](https://htmx.org/)

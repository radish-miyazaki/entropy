---
title: ARIA ロール
aliases: []
description: 要素がどんな種類のものかを支援技術に伝えるための、WAI-ARIA で定められた意味づけ
tags: [word, アクセシビリティ, html]
date: 2026-11-14
---

## TL;DR

コンテンツに意味を与え、スクリーンリーダーなどの支援技術が、その種類のものとして利用者に提示できるようにする仕組み。WAI-ARIA の仕様で定められ、HTML 要素の `role` 属性で指定する。

## なぜ必要か

ロールを与えると、HTML にない要素や、ブラウザの対応が十分でない要素も、支援技術に正しく伝えられる。タブやスライダーのように JavaScript で作る部品も、何の部品かを伝えられる。

## 仕組み

多くの意味を持つ HTML 要素には、最初から暗黙のロールがある。たとえば `<input type="radio">` は radio、`<nav>` は navigation のロールを持つ。`<div>` や `<span>` のような意味を持たない要素には、ロールがない。

ロールは `role="<ロール名>"` の形で付ける。ロールは、文書構造、ウィジェット、ランドマーク、ライブリージョン、ウィンドウなどに分類される。ロールによっては、関連する ARIA のステートやプロパティが必要になる。

## 例

```html
<!-- 意味を持たない要素に意味を足す -->
<div role="navigation">...</div>

<!-- 同じ意味のネイティブの要素。こちらを優先する -->
<nav>...</nav>
```

[[testing-library|Testing Library]] で要素を取得するときは、ロールを使うことが推奨されている（[[Test-Driven React, Second Edition 第3章 Testing React with Testing Library|Test-Driven React 第3章]]）。ロールで探すようにすると、自然とアクセシビリティを守ったマークアップになる。

## 注意点

- ロールは支援技術への伝え方を変えるだけで、振る舞いは足さない。`role="button"` を付けても、クリックやキーボードの操作は自分で実装する必要があるので、普通は `<button>` を使う。
- 誤ったロールはアクセシビリティを損なう。タブを持たない `<ul role="tabpanel">` は、タブパネルと読み上げられてしまう。
- ランドマークのロールを付けすぎると、スクリーンリーダーで全体の構造が分かりにくくなる。
- `<figcaption>` のように暗黙のロールを持たない要素もある（[[Test-Driven React, Second Edition 第3章 入れ子になった React Component を TDD で実装する|入れ子になった React Component を TDD で実装する]]）。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[testing-library|Testing Library]]

## 出典

- [WAI-ARIA Roles - MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles)
- [[Test-Driven React, Second Edition 第3章 Testing React with Testing Library]]

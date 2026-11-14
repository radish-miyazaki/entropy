---
title: Progressive Enhancement
aliases: []
description: すべてのユーザに不可欠なコンテンツと機能を提供し、対応する環境ではより良い体験を加えていく設計思想
tags: [word, web]
date: 2024-08-23
---

## TL;DR

できるだけ多くのユーザに、不可欠なコンテンツと機能を基本として提供する設計思想。そのうえで、必要なコードをすべて実行できる新しいブラウザのユーザにだけ、最高の体験を提供する。

## 仕組み

MDN では次のように説明している。

> 古いブラウザーや機能の限られた端末のユーザーには、よりシンプルでありながら良い使い勝手を実現
> 新しいブラウザーや機能が豊富な端末のユーザーには、より魅力的で充実したものへ使い勝手を進化させる

## 例

[[react|React]]（[[nextjs|Next.js]]）の [[server-actions|Server Actions]] や、[[sveltekit|SvelteKit]] の Form actions がこの考え方で作られている。どちらも、[[javascript|JavaScript]] を使わない（または無効な）状態でも `<form>` の本質的な機能を損なわない。具体的には、`action` 属性を渡すことで、[[hydration|ハイドレーション]]の前でもフォームを送信できる。必要に応じて、ハイドレーションの後にクライアント側のバリデーションのような、より豊かな操作を加えられる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[server-actions|Server Actions]]
- [[hydration|ハイドレーション]]

## 出典

- [Progressive Enhancement - MDN Web Docs 用語集](https://developer.mozilla.org/ja/docs/Glossary/Progressive_Enhancement)

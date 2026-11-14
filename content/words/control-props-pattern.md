---
title: Control Props Pattern
aliases: []
description: Props が渡されれば Controlled Component、渡されなければ Uncontrolled Component として振る舞わせるパターン
tags: [word, react]
date: 2024-09-05
---

## TL;DR

[[controlled-component|Controlled Component]] と [[uncontrolled-component|Uncontrolled Component]] のいいとこ取りをするパターン。

## 仕組み

[[props|Props]] を省略可能にし、次のように振る舞わせる。

- Props が渡された場合は、Controlled Component として振る舞う。
- Props が渡されない場合は、Uncontrolled Component として振る舞う。

## 例

HTML の `<input>` も、このパターンで作られている。

## 自分の理解

[[Test-Driven React, Second Edition]] で初めて見たパターンである。本では Controllable Pattern という名前だったが、おそらく同じものだと思う。

## 関連

- [[controlled-component|Controlled Component]]
- [[uncontrolled-component|Uncontrolled Component]]

## 出典

- [[Test-Driven React, Second Edition]]
- [Advanced React Patterns](https://advanced-react-patterns.netlify.app/6)
- [Zenn の記事](https://zenn.dev/53able/articles/9130de5990badb)

---
title: Controlled Component
aliases: []
description: 渡された Props によって振る舞いが決まり、親コンポーネントが振る舞いを完全に指定できるコンポーネント
tags: [word, react]
date: 2024-09-05
---

## TL;DR

制御されたコンポーネント。[[uncontrolled-component|Uncontrolled Component]] とは異なり、渡された [[props|Props]] によって振る舞いが決まる。親コンポーネントがその振る舞いを完全に指定できる。

## 注意点

柔軟だが、親コンポーネントが Props をすべて指定する手間がかかる。

実際には、コンポーネントはローカルな state と Props を混在して持つことが多い。それでも、コンポーネントを設計するときにはこの考え方が役に立つ。どの情報を Props で制御し、どの情報をローカルな state に持たせて制御しないのかを決める手がかりになる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[uncontrolled-component|Uncontrolled Component]]
- [[control-props-pattern|Control Props Pattern]]
- [[react|React]]

## 出典

- [コンポーネント間で state を共有する](https://ja.react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components)

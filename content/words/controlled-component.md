---
title: Controlled Component
aliases: []
description: 渡された Props によって振る舞いが決まり、親コンポーネントが振る舞いを完全に指定できるコンポーネント
tags: [word, react]
date: 2024-09-05
---

## TL;DR

制御されたコンポーネント。[[uncontrolled-component|Uncontrolled Component]] とは異なり、渡された [[props|Props]] によって振る舞いが決まる。親コンポーネントがその振る舞いを完全に指定できる。

## 例

[[react|React]] の公式ドキュメントでは、アコーディオンの例で説明している。最初の `Panel` は、開いているかどうかを表す `isActive` をローカルな state として持つので、親は表示を変えられない。これは [[uncontrolled-component|Uncontrolled Component]] である。`isActive` を Props で受け取るように変えると、親の `Accordion` が `Panel` を制御できるようになり、Controlled Component になる。

## 注意点

柔軟だが、親コンポーネントが Props をすべて指定する手間がかかる。

実際には、コンポーネントはローカルな state と Props を混在して持つことが多い。それでも、コンポーネントを設計するときにはこの考え方が役に立つ。どの情報を Props で制御し、どの情報をローカルな state に持たせて制御しないのかを決める手がかりになる。

また、公式ドキュメントでは「制御された」「非制御」は厳密な技術用語ではないとしている。どちらにするかは後から変えてリファクタリングしてもよい。

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

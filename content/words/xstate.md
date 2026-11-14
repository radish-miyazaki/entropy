---
title: XState
aliases: [xState]
description: ステートマシンやアクターモデルを使って、JavaScript / TypeScript で状態を管理するライブラリ
tags: [word, javascript, ステートマシン, アクターモデル, イベント駆動型プログラミング]
date: 2025-04-02
---

## TL;DR

[[javascript|JavaScript]] / [[typescript|TypeScript]] で[[state-machine|ステートマシン]]を実現する状態管理ライブラリ。[[event-driven-programming|イベント駆動型プログラミング]]、ステートマシン、ステートチャート、[[actor-model|アクターモデル]]を使って、複雑なロジックを予測しやすい形で扱う。

## なぜ必要か

一言でいうと、ありえない状態とイベントの組み合わせを防ぐためである。状態と遷移をマシンとして定義しておけば、定義にない遷移は起こらない。

## 仕組み

`createMachine` でマシンを定義し、`createActor` でアクターとして起動する。アクターにイベントを送ると、マシンの定義に従って状態が変わる。

```js
import { createMachine, assign, createActor } from "xstate"

const countMachine = createMachine({
  context: { count: 0 },
  on: {
    INC: {
      actions: assign({
        count: ({ context }) => context.count + 1,
      }),
    },
  },
})

const countActor = createActor(countMachine).start()
countActor.subscribe((state) => console.log(state.context.count))
countActor.send({ type: "INC" }) // 1 が出力される
```

[[react|React]]、[[vue|Vue]]、[[svelte|Svelte]] などのフロントエンドフレームワークと組み合わせられるほか、バックエンドでも JavaScript が動く場所ならどこでも使える。[[nodejs|Node.js]] や [[deno|Deno]] でサーバレス関数やサーバを作ることもできる。VS Code の拡張機能を使うと、コードから状態遷移図を確認できる。

## 注意点

すべての状態を XState で管理すべきではない。ボタンを押すとモーダルが表示されるだけの遷移を XState で管理すると、かえって過剰な設計になる。状態遷移から独立していて、操作の過程で変化しない値も、状態として持つべきではない。たとえば API のレスポンスはステートマシンの遷移で変わる値ではないので、`useState` で管理する。

一休では、XState で管理する基準として次の 2 つを挙げている。

- 1 つのコンポーネントで `useState` が 3 つ以上定義されている
- 何かアクションを起こしたときの遷移先が 2 つ以上ある

## 自分の理解

コードから状態遷移図を確認できるのは凄い。[[alloy|Alloy]] を彷彿とさせる。

[入門の本](https://zenn.dev/hayato94087/books/0a206dc72782be)と公式ドキュメントを見ながら、実際に動かしてみた。本の第 2 章は Node.js を使っているが [[xstate-basics-with-deno|Deno を用いて xState の基本を学ぶ]]で Deno で、第 3 章は [[nextjs|Next.js]] を使っているが [[xstate-basics-with-svelte|Svelte を用いて xState の基本を学ぶ]]で [[sveltekit|SvelteKit]] でやってみた。

## 関連

- [[state-machine|ステートマシン]]
- [[actor-model|アクターモデル]]
- [[event-driven-programming|イベント駆動型プログラミング]]

## 出典

- [XState](https://xstate.js.org/)
- [XState - Stately](https://stately.ai/docs/xstate)
- [XState by Example](https://xstatebyexample.com/)
- [What is XState used for?](https://stately.ai/blog/2022-06-21-what-is-xstate-used-for#backend)
- [XState Docs: React](https://stately.ai/docs/xstate-react)、[Vue](https://stately.ai/docs/xstate-vue)、[Svelte](https://stately.ai/docs/xstate-svelte)
- [Stately（VS Code 拡張機能）](https://marketplace.visualstudio.com/items/?itemName=statelyai.stately-vscode)
- [XState をいつ採用すべきか](https://zenn.dev/hayato94087/books/0a206dc72782be/viewer/e040owimxcdtwm)
- [一休.com の XState の使い方](https://user-first.ikyu.co.jp/entry/2023/12/22/190342)

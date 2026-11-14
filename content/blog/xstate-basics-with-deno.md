---
title: Deno を用いて xState の基本を学ぶ
description: Zenn の XState 入門の第 2 章を Deno で動かし、setup、createMachine、Actor、Context、Actions、Input、Guards、Invoke、遅延遷移をまとめた
tags: [blog, xstate, deno]
date: 2025-04-02
draft: false
---

## TL;DR

- [Zenn の XState の本](https://zenn.dev/hayato94087/books/0a206dc72782be)の第 2 章を [[deno|Deno]] で動かし、[[xstate|XState]] の基本をまとめた。
- `setup` で型や Actions、Guards、Actors を定義し、`createMachine` で状態と遷移を書き、`createActor` で動かす。JSR には XState がまだ公開されていないので、npm から入れた。

## 背景

XState の基本を学ぶために、Zenn の本の第 2 章のコードを Deno で動かしてみた。

## 環境

- [[deno|Deno]]
- xstate 5.19.2（npm）

## 検証

### 事前準備

`deno init deno-xstate-toggle && cd deno-xstate-toggle` でプロジェクトを作った。JSR で `xstate` を検索すると [@statelyai/xstate](https://jsr.io/@statelyai/xstate) が見つかったが、「This package has not published any versions yet.」と表示されていて、追加しても見つからなかった。

```sh
$ deno add jsr:@statelyai/xstate
error: jsr:@statelyai/xstate was not found
```

仕方がないので [[npm|npm]] から入れた。

```sh
$ deno add npm:xstate
Add npm:xstate@5.19.2
```

### ステートマシンの作成

[`setup`](https://www.jsdocs.io/package/xstate#setup)（v5 から）には、[[state-machine|ステートマシン]]の設定を書く。Event、Context、Actions、Guards などの型を明示できるので、型エラーを実行前に見つけられる。Event には `{ type: 'PLAY'; value: number }` のように値を持たせることもできる。

[`createMachine`](https://www.jsdocs.io/package/xstate#createMachine) でステートマシンを作る。`id` は識別子、`initial` は初期状態、`states` は各状態で、`on` にはその状態で受け取る Event と遷移先を書く。

```ts
import { setup } from "xstate"

type ToggleEvent = { type: "toggle" }

export const toggleMachine = setup({
  types: {} as { events: ToggleEvent },
}).createMachine({
  id: "toggle",
  initial: "inactive",
  states: {
    inactive: { on: { toggle: "active" } },
    active: { on: { toggle: "inactive" } },
  },
})
```

[[eslint|ESLint]] のプラグイン（[eslint-plugin-xstate](https://github.com/rlaffers/eslint-plugin-xstate)）はあるが、メンテナンスされていないようだった。

[[visual-studio-code|Visual Studio Code]] に [Stately の拡張機能](https://marketplace.visualstudio.com/items/?itemName=statelyai.stately-vscode)を入れると、ステートマシンの定義箇所に「Open Visual Editor」が表示される。クリックすると XState Editor が開き、Edit モードでは GUI からステートマシンを編集でき、Simulate モードでは作ったステートマシンをシミュレートできる。

### Actor

[Actor](https://stately.ai/docs/actors) は[[actor-model|アクターモデル]]のアクターと同じで、実行中のステートマシンを表すインスタンスである。Event を送受信し、受け取った Event に応じて状態を変える、実行中の[[process|プロセス]]と考えればよい。

[`createActor`](https://www.jsdocs.io/package/xstate#createActor) にステートマシンを渡して作り、`start` と `stop` で開始・停止する。Event は `send` で送る。`subscribe` の `next` には状態が変わるたびに呼ぶ処理を、`error` にはエラー時の処理を書く。`snapshot` は現在の状態を表す。

```ts
const actor = createActor(toggleMachine)
actor.subscribe({
  next: (snapshot: SnapshotFrom<typeof actor>) => console.log(snapshot.value),
  error: (error) => console.error(error),
})
actor.start()
actor.send({ type: "toggle" })
```

### Context

[Context](https://stately.ai/docs/context) は、Actor にデータを持たせるときに使う。型は `setup` で定義し、初期値は `createMachine` の `context` で指定する。`snapshot.context.count` のように読める。Context は[[immutability|イミュータブル]]なので、Actions の中で `assign` を使って更新する。

### Actions

[Actions](https://stately.ai/docs/actions) は、状態遷移のときに実行される同期処理である。非同期処理には後述の Invoke を使う。Actions は `createMachine` の中にも書けるが、ステートマシンの記述が簡潔になるので `setup` の `actions` に定義することが推奨されている。

```ts
const toggleMachine = setup({
  actions: {
    incrementCount: assign({ count: ({ context }) => context.count + 1 }),
  },
})
```

定義した Actions は、`createMachine` の中の次のキーに指定する。キーによって実行のタイミングが変わる。

- `entry`: その状態に遷移したとき
- `exit`: その状態から別の状態に遷移したとき
- `on`: Event を受け取ったとき（`{ actions: 'incrementCount', target: 'active' }` のように書く）

配列を渡せば複数の処理を呼べる。`entry`、`exit`、`on` をマシンの直下に書くと、どの状態にいても発火する。

```ts
createMachine({
  states: { stopped: {}, running: {} },
  on: {
    RESET: { actions: assign({ elapsed: 0 }), target: ".stopped" },
  },
})
```

### Input

[Input](https://stately.ai/docs/input) は、ステートマシンの振る舞いを変えるために Actor に渡すデータである。型は `setup` で定義し、`createActor` の第 2 引数で渡す。渡した Input は、`context` に関数を指定すると引数で受け取れる。Invoke でも、定義の仕方は違うが使える。

```ts
const actor = createActor(toggleMachine, { input: { initialCount: 10 } })

createMachine({
  context: ({ input }) => ({ count: input.initialCount ?? 0 }),
})
```

### Guards

[Guards](https://stately.ai/docs/guards) は、ガード関数（[[predicate|述語関数]]）が `true` を返したときだけ状態遷移を許す。`setup` の `guards` に定義し、`createMachine` の `guard` で指定する。処理は `guard`、`actions`、`target` の順に実行され、ガード関数が `false` を返すと `actions` も `target` も実行されない。

```ts
createMachine({
  on: {
    feedback: [
      { guard: "isGood", target: "thanks" },
      { guard: "isBad", target: "askMore" },
      { target: "form" },
    ],
  },
})
```

### Invoke

[Invoke](https://stately.ai/docs/invoke) は、状態遷移のときに子 Actor を作って非同期処理を行う機能である。`setup` の `actors` に定義し、`createMachine` の `invoke.src` で指定する。`invoke.input` は Context を受け取って Actor に渡す値を返し、`invoke.onDone` と `invoke.onError` で成功時と失敗時の遷移先を決める。`fromPromise` は `Promise` ベースの Actor を作る。

```ts
const toggleMachine = setup({
  actors: {
    resetCount: fromPromise(async ({ input }: { input: { maxCount: number } }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      if (Math.random() < 0.5) throw new Error("リセットエラー")
      return { count: input.maxCount / 2 }
    }),
  },
}).createMachine({
  states: {
    resetting: {
      invoke: {
        input: ({ context: { maxCount } }) => ({ maxCount }),
        src: "resetCount",
        onDone: {
          target: "inactive",
          actions: assign({ count: ({ event }) => event.output.count }),
        },
        onError: "inactive",
      },
    },
  },
})
```

`fromCallback` を使うと、コールバック関数の中から `sendBack` で親 Actor に Event を送る Actor を作れる。戻り値の関数はクリーンアップ関数で、Actor が終了したときに呼ばれる。

```ts
fromCallback(({ sendBack }) => {
  const interval = setInterval(() => sendBack({ type: "TICK" }), 10)
  return () => clearInterval(interval)
})
```

### 遅延遷移

[遅延遷移](https://stately.ai/docs/delayed-transitions)は、指定した時間が経つと自動で起きる遷移である。`after` で時間を指定する。次の例では、`active` に遷移してから 2 秒後に `inactive` に戻る。

```ts
createMachine({
  states: {
    active: { on: { toggle: "inactive" }, after: { 2000: "inactive" } },
  },
})
```

## キーワード

- [[xstate|XState]]
- [[deno|Deno]]
- [[npm|npm]]
- [[state-machine|ステートマシン]]
- [[actor-model|アクターモデル]]
- [[immutability|イミュータブル]]
- [[predicate|述語関数]]
- [[eslint|ESLint]]
- [[visual-studio-code|Visual Studio Code]]

## 参考

- https://zenn.dev/hayato94087/books/0a206dc72782be
- [Actors - Stately](https://stately.ai/docs/actors)
- [Context - Stately](https://stately.ai/docs/context)
- [Actions - Stately](https://stately.ai/docs/actions)
- [Input - Stately](https://stately.ai/docs/input)
- [Guards - Stately](https://stately.ai/docs/guards)
- [Invoke - Stately](https://stately.ai/docs/invoke)
- [Delayed transitions - Stately](https://stately.ai/docs/delayed-transitions)

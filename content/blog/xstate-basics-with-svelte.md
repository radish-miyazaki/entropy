---
title: Svelte を用いて xState の基本を学ぶ
description: Zenn の XState 入門の第 3 章を Svelte で動かし、React の書き方と異なる点をまとめた
tags: [blog, svelte, xstate]
date: 2025-04-04
draft: false
---

## TL;DR

- [Zenn の XState の本](https://zenn.dev/hayato94087/books/0a206dc72782be)の第 3 章を、React ではなく [[svelte|Svelte]] で動かした。
- `@xstate/svelte` の `useMachine` が返す `snapshot` は Svelte の Store なので、`$snapshot` と `$derived` を組み合わせて使う。分割代入するときも `$derived` で包まないとリアクティブでなくなる。

## 背景

[[xstate-basics-with-deno|Deno を用いて xState の基本を学ぶ]]に続いて、本の第 3 章のサンプルを Svelte で作った。コードはほとんど本と同じなので、異なる点だけを書き残す。作業リポジトリは [sveltekit-xstate-examples](https://github.com/radish-miyazaki/sveltekit-xstate-examples/tree/main) である。

## 環境

```sh
bunx sv create
bun add xstate @xstate/svelte
bun add @lucide/svelte # アイコン用
```

## 検証

### トグルボタン

[`@xstate/svelte`](https://stately.ai/docs/xstate-svelte) の `useMachine(machine, options?)` は、Svelte のコンポーネントから[[state-machine|ステートマシン]]を操作するための関数である。`machine` には [[xstate|XState]] で作ったステートマシンを、`options` には Actor のオプションを渡す。戻り値は次の 3 つである。

- `send`: 実行中の Actor に Event を送る関数
- `snapshot`: 現在の状態を表す [Svelte の Store](https://svelte.jp/docs/svelte/stores)
- `actorRef`: 生成された Actor の参照

`snapshot` は Store なので、`$` と `$derived` を使って次のように書ける。

```ts
const { snapshot, send } = useMachine(toggleMachine)
const isActive = $derived($snapshot.value === "active")
```

### カウンター

React の `useEffect` は `$effect` で置き換えた。

```ts
let accentColor = $state("bg-gray-400")
$effect(() => {
  const colors = ["bg-gray-400", "bg-gray-300", "bg-gray-200", "bg-gray-100"]
  accentColor = colors[$snapshot.context.count % colors.length]
})
```

増減とリセットのボタンは、[[Advanced Svelte (Svelte Tutorial)|Advanced Svelte (Svelte Tutorial) を読む]]で読んだ `{#snippet}` で書いてみた。

```svelte
{#snippet button({ type, color, label, icon: Icon }: CounterButtonConfig)}
  <button class={`p-3 rounded-full ${color}`} onclick={() => send({ type } as CounterEvent)} aria-label={label}>
    <Icon class="h-6 w-6" />
  </button>
{/snippet}

{#each buttonItems as item (item.type)}
  {@render button(item)}
{/each}
```

### 温度変換器

入力のハンドラは次のように定義した。

```ts
const handleCelsiusChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  send({ type: "celsius", value: target.value })
}
```

### ストップウォッチ

[[xstate-basics-with-deno|前回]]まとめた `fromCallback` は、親 Actor に継続的に Event を送ったり、後処理が必要だったりする場合に使う。マシン直下の `on` に書いたイベントハンドラは、どの状態でも動く。ただし `target` は[階層構造で指定する](https://stately.ai/docs/finite-states#targets)必要があり、`on` から見ると `stopped` は子の階層にあるので `.stopped` と書く。現在の状態が指定した状態かどうかは `$snapshot.matches('running')` で調べる。

本のコードには `useActor` が出てくる。`@xstate/svelte` のドキュメントには載っていないが、存在はするようである。[React 版のドキュメント](https://stately.ai/docs/xstate-react#useactoractorlogic-options)によると、`useActor(actorLogic, options?)` は `actorLogic` から Actor を作り、コンポーネントが生きている間動かす。`actorLogic` には `createMachine(...)` や `fromPromise(...)` の戻り値を渡せる。`useMachine` も `machine` から同じように Actor を作るので、どちらを使っても結果は同じである。

### Tic-Tac-Toe

React のチュートリアルでおなじみの [Tic-Tac-Toe](https://ja.react.dev/learn/tutorial-tic-tac-toe) を作った。ここで `always` と `tags` が出てきた。

```ts
createMachine({
  initial: "playing",
  states: {
    playing: {
      always: [
        { target: "gameOver.winner", guard: "checkWin" },
        { target: "gameOver.draw", guard: "checkDraw" },
      ],
    },
    gameOver: {
      initial: "winner",
      states: {
        winner: { tags: "winner", entry: "setWinner" },
        draw: { tags: "draw" },
      },
    },
  },
})
```

[`always`](https://stately.ai/docs/eventless-transitions)（Eventless transitions）は、状態に入った直後と、その状態にいる間に Event を処理した後に毎回評価される遷移である。上のコードでは、`playing` に入った直後と `PLAY` を処理した後に評価され、`checkWin` が `true` なら `gameOver.winner` へ、そうでなく `checkDraw` が `true` なら `gameOver.draw` へ遷移する。

[`tags`](https://stately.ai/docs/tags) は、状態を識別するためのタグ（メタデータ）を付ける。主に状態をグループにまとめるのに使い、`$snapshot.hasTag('winner')` で確かめられる。

React で `&&` を使って表示を切り替えている箇所は `{#if}` に、スタイルの切り替えは `style:color={...}` に置き換えた。また、Store を次のように分割代入するとリアクティブでなくなるので、`$derived` で包む。

```ts
// リアクティブでなくなる
const { board, player, winner } = $snapshot.context

// リアクティブのまま
const { board, player, winner } = $derived($snapshot.context)
```

### Todo アプリ

`activeTodos`、`filteredTodos`、`completedTodos` は、リアクティブにするために `$derived` で包んだ。

```ts
const activeTodos = $derived(todos.filter((todo) => !todo.completed))
const completedTodos = $derived(todos.filter((todo) => todo.completed))
```

編集中に `input` が空になると勝手にリストから消えて使いづらかったので、確定したときに消えるように[ステートマシン](https://github.com/radish-miyazaki/sveltekit-xstate-examples/blob/2c82eabda654c887398fc9b14f875765352ca75e/src/machines/todos-machine.ts#L61-L80)と[イベントハンドラ](https://github.com/radish-miyazaki/sveltekit-xstate-examples/blob/2c82eabda654c887398fc9b14f875765352ca75e/src/components/Todos.svelte#L35-L45)を変えた。

## 結果

トグルボタン、カウンター、温度変換器、ストップウォッチ、Tic-Tac-Toe が動いた。

## 考察

ボタンを `{#snippet}` で書いたのは、XState とはまったく関係ないところである。Todo アプリで本のコードは `input` に `onChange` を指定しているが、おそらく `oninput` が正しいと思う。

## キーワード

- [[xstate|XState]]
- [[svelte|Svelte]]
- [[state-machine|ステートマシン]]

## 参考

- https://zenn.dev/hayato94087/books/0a206dc72782be
- [@xstate/svelte - Stately](https://stately.ai/docs/xstate-svelte)
- [@xstate/react - Stately](https://stately.ai/docs/xstate-react)
- [Eventless (always) transitions - Stately](https://stately.ai/docs/eventless-transitions)
- [Tags - Stately](https://stately.ai/docs/tags)
- [Stores - Svelte](https://svelte.jp/docs/svelte/stores)

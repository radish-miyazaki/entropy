---
title: Electrobun
aliases: []
description: メインプロセスも UI も TypeScript で書ける、Bun ベースのデスクトップアプリフレームワーク
tags: [word, typescript, zig]
date: 2026-02-22
---

## TL;DR

[[typescript|TypeScript]] だけでメインプロセスも UI も書けるデスクトップアプリのフレームワーク。[[bun|Bun]] と OS ネイティブの WebView を使い、バンドルサイズと起動時間を小さく抑えている。

## なぜ必要か

既存の選択肢にはそれぞれ問題がある。Electron はバンドルサイズが 150MB ほどあり、起動が遅い。Tauri では、学習コストの高い [[rust|Rust]] を学ばなければならない。ネイティブで書くと、プラットフォームごとにコードが分かれて複雑になる。

Electrobun のバンドルサイズは約 14MB で、Electron より 90% 小さい。起動時間は 50ms 未満（Electron は 2〜5 秒）で、アプリを更新するときにユーザがダウンロードするサイズは 14KB ほどで済む。

## 仕組み

ウィンドウ管理やシステムトレイ（macOS のメニューバーに出るアイコンなど）は、C++ と Objective-C によるネイティブバインディングで実装されている。TypeScript は Bun ランタイムで動くので、Node.js や V8 のオーバーヘッドがない。

UI の描画には OS ネイティブの WebView（Windows では Edge WebView2、macOS では WebKit）を使う。Chromium（CEF）を同梱することもできる。[[react|React]]、Vue、Svelte などの Web フレームワークにも対応している。

アップデートの差分パッチは、[[zig|Zig]] で [[simd|SIMD]] 最適化した [[bsdiff|BSDIFF]] で作るので、KB 単位で配布できる。

公式は、開発に [Co(lab)](https://blackboard.sh/colab/) という独自の IDE を勧めているようだ。

## 例

`bunx electrobun init` を実行すると、テンプレートを選べる。

```sh
🚀 Welcome to Electrobun!

Available templates:
  1. photo-booth
  2. svelte
  3. hello-world
  4. multitab-browser
  5. react-tailwind-vite
```

Svelte を選ぶと、次のディレクトリ構成になる。

```
.
├── bun.lock
├── electrobun.config.ts
├── llms.txt
├── package.json
├── README.md
├── src
│   ├── bun
│   │   └── index.ts
│   └── mainview
│       ├── app.css
│       ├── App.svelte
│       ├── index.html
│       └── main.ts
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts
```

`src/bun/` にメインプロセスを、`src/mainview/` に UI を置く。メインプロセスからは [Bun API](https://blackboard.sh/electrobun/docs/apis/bun/) を呼び出す。Electrobun の設定は [`electrobun.config.ts`](https://blackboard.sh/electrobun/docs/apis/cli/build-configuration/) に書く。LLM 向けのテキストファイル `llms.txt` も入っている。

開発サーバは `bun dev` で立ち上げ、[[hmr|HMR]] を使うなら `bun run dev:hmr` を使う。ビルドは `bun run build` か `bun run build:prod` で行う。

`src/mainview/App.svelte` を書き直して、簡単な Web ブラウザを作った（[electrobun-simple-browser](https://github.com/radish-miyazaki/electrobun-simple-browser)）。`<electrobun-webview>` は、WebView を配置するための [Custom Element](https://blackboard.sh/electrobun/docs/guides/architecture/webview-tag/) である。

```svelte
<script lang="ts">
  import type { WebviewTagElement } from "electrobun/view";
  import { onMount } from "svelte";

  const initialUrl = "https://electrobun.dev";
  let inputUrl = $state(initialUrl);
  let electroBunWebViewElement: WebviewTagElement;

  const loadPage = () => {
    electroBunWebViewElement.loadURL(inputUrl);
  };

  const goBack = () => {
    electroBunWebViewElement.goBack();
  };

  const goForward = () => {
    electroBunWebViewElement.goForward();
  };

  onMount(() => {
    electroBunWebViewElement.loadURL(inputUrl);
  });
</script>

<main>
  <h1>My Web Browser</h1>
  <input type="text" placeholder="Enter URL" bind:value={inputUrl} />
  <button onclick={loadPage}>Go</button>
  <button onclick={goBack}>Back</button>
  <button onclick={goForward}>Forward</button>

  <electrobun-webview
    bind:this={electroBunWebViewElement}
    class="webview"
    width="100%"
    height="100%"
  ></electrobun-webview>
</main>
```

## 自分の理解

テンプレートに Svelte があるのはうれしい。HMR の有無で別のコマンドが割り当てられているのも面白い。

## 関連

- Electron
- Tauri
- [[bun|Bun]]
- [[bsdiff|BSDIFF]]

## 出典

- [Electrobun](https://blackboard.sh/electrobun)
- [What is Electrobun?](https://blackboard.sh/electrobun/docs/guides/what-is-electrobun/)
- [Hello World](https://blackboard.sh/electrobun/docs/guides/hello-world/)
- [Creating UI](https://blackboard.sh/electrobun/docs/guides/creating-ui/)

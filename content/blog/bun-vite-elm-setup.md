---
title: bun + Vite + Elm で環境構築
description: bun で Vite のプロジェクトを作り、vite-plugin-elm を入れて Elm を動かすまでの手順
tags: [blog, elm]
date: 2024-08-08
draft: false
---

## TL;DR

- [[bun|Bun]] で [[vite|Vite]] のプロジェクトを作り、vite-plugin-elm を入れると、[[elm|Elm]] の開発環境を作れる。
- `./Main.elm` の import で型エラーになるので、即席の型定義ファイルを置く。

## 検証

1. Bun の公式ドキュメントに沿って、`bun create vite my-app --template vanilla-ts` を実行する。`vanilla` でもよいが、すべて型付きで統一したいので [[typescript|TypeScript]] を選んだ
2. `cd my-app && bun i && bun run dev` を実行し、サーバが立ち上がることを確かめる
3. `bun i -d vite-plugin-elm` で Elm 用のプラグインを追加する
4. vite.config.ts を作る
5. src の中の main.ts 以外のファイルをすべて消し、main.ts を書き換える（必要なら取っておいてもよい）
6. src/Main.elm を作る
7. Node.js の代わりに Bun でコマンドを実行するように明示するため、package.json の scripts にある `vite` コマンドを `bunx --bun vite` に置き換える
8. `bun run dev`、`bun run build`、`bun run preview` がそれぞれ動くかを確かめる

4 の vite.config.ts は次のとおり。

```typescript
import { defineConfig } from "vite";
import elm from "vite-plugin-elm";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [elm()],
});
```

5 の main.ts は次のとおり。

```typescript
import { Elm } from "./Main.elm";

Elm.Main.init({
  node: document.getElementById("app"),
});
```

このままだと、IDE で `from "./Main.elm"` が見つからないというエラーになり、ビルドもできない。そこで、即席の型定義ファイル Main.elm.d.ts を用意する。

```typescript
export var Elm: any;
```

6 の Main.elm は、必要最低限の内容にした。

```elm
module Main exposing (main)

import Html

main = Html.text "Hello, World!"
```

## 結果

型定義ファイルを置くとビルドできるようになった。ただし、IDE ではエラーが出たままである。

## 考察

ほかにも、次のような選択肢がある。

- テンプレートの vite-elm-template を使う。`bunx tiged lindsaykwardell/vite-elm-template my-elm-app` で取ってこられる。[[tiged]] は Git リポジトリの一部だけをコピーするコマンドである
- テストランナーには、`elm-test` コマンドの node-test-runner と、`elm-test-rs` コマンドの elm-test-rs がある
- 開発用サーバに elm-live を使う

## キーワード

- [[bun|Bun]]
- [[vite|Vite]]
- [[elm|Elm]]
- [[typescript|TypeScript]]
- [[tiged]]

## 参考

- [Build a frontend using Vite and Bun](https://bun.sh/guides/ecosystem/vite)
- [Vite ガイド](https://ja.vitejs.dev/guide/)
- [vite-plugin-elm](https://github.com/hmsk/vite-plugin-elm)
- [vite-elm-template](https://github.com/lindsaykwardell/vite-elm-template)
- [node-test-runner](https://github.com/rtfeldman/node-test-runner)
- [elm-test-rs](https://github.com/mpizenberg/elm-test-rs)
- [elm-live](https://www.elm-live.com/)
- https://arc.net/l/quote/dvkmmddy
- https://zenn.dev/y047aka/articles/install-elm-2021
- https://dev.to/lindsaykwardell/setting-up-an-elm-project-in-2022-lj4
- https://zenn.dev/ababup1192/articles/a51c8e2ddcde77#elmが型エラー

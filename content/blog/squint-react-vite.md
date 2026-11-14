---
title: Squint + React + Vite のプロジェクトを作成する
description: Squint の公式リポジトリにある例をもとに、pnpm で Squint + React + Vite のプロジェクトを作成した手順
tags: [blog, squint, react, vite]
date: 2026-02-07
draft: false
---

## TL;DR

- [[squint|Squint]] + [[react|React]] + [[vite|Vite]] のプロジェクトを作成した。
- 中身は[公式リポジトリの例](https://github.com/squint-cljs/squint/tree/main/examples/vite-react)とほぼ同じだが、手順が書かれていないので残しておく。ファイル構成は少し変えている。

## 背景

Squint の公式リポジトリには React と Vite を組み合わせた例があるが、作成の手順はない。パッケージマネージャには [[pnpm|pnpm]] を選んだ。

## 環境

```
"react": "^19.2.4"
"react-dom": "^19.2.4"
"squint-cljs": "^0.10.185"
"@vitejs/plugin-react": "^5.1.3"
"vite": "^7.3.1"
```

## 検証

### Squint のセットアップ

Squint を追加する。

```sh
$ pnpm init & pnpm add squint-cljs
```

`squint.edn` を作成する。生成した [[jsx|JSX]] ファイルの出力先を `public/js` にする。

```clojure
{:paths ["src"]
 :output-dir "public/js"
 :extension "jsx"}
```

### React のセットアップ

React と Vite を追加する。

```sh
$ pnpm add react react-dom
$ pnpm add -D vite @vitejs/plugin-react
```

`vite.config.js` を作成する。通常 `public/` は静的ディレクトリとして扱われるが、Squint が生成する JS ファイルの出力先を `public/js` にしたいので、`publicDir` に `false` を指定する。

```javascript
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: false,
})
```

プロジェクト直下に `index.html` を作成する。

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf8" />
  </head>
  <body>
    <div id="app"></div>
    <script src="/public/js/index.jsx" type="module"></script>
  </body>
</html>
```

Squint の watch と Vite の開発サーバを並列に動かすために、[[babashka|Babashka]] の `bb.edn` を作成する。

```clojure
{:tasks
 {dev:squint (shell "pnpm exec squint watch --repl true")
  dev:vite (shell "pnpm exec vite --config vite.config.js")
  -dev {:depends [dev:squint dev:vite]}
  dev (run '-dev {:parallel true})

  build:squint (shell "pnpm exec squint compile")
  build:vite (shell "pnpm exec vite --config vite.config.js build")
  build {:depends [build:squint build:vite]}}}
```

`src/index.cljs` を作成する。

```clojure
(ns index
  (:require ["react-dom/client" :refer [createRoot]]))

(->
 (createRoot (js/document.getElementById "app"))
 (.render #jsx [:div "Hello World!"]))
```

### 動作確認

```sh
$ bb dev
```

## キーワード

- [[squint|Squint]]
- [[react|React]]
- [[vite|Vite]]
- [[pnpm|pnpm]]
- [[babashka|Babashka]]
- [[jsx|JSX]]

## 参考

- https://github.com/squint-cljs/squint/tree/main/examples/vite-react

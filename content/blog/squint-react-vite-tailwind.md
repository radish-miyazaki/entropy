---
title: Squint + React + Vite のプロジェクトに Tailwind CSS を導入する
description: Squint + React + Vite のプロジェクトに、公式ドキュメントの Vite 向けの手順で Tailwind CSS を導入した
tags: [blog, squint, react, vite, tailwind-css]
date: 2026-02-07
draft: false
---

## TL;DR

- [[squint-react-vite|Squint + React + Vite のプロジェクトを作成する]] で作ったプロジェクトに、[[tailwind-css|Tailwind CSS]] を導入した。
- 手順は [Tailwind CSS の公式ドキュメント](https://tailwindcss.com/docs/installation/using-vite)の Vite 向けの手順とほぼ同じである。

## 背景

[[squint|Squint]] + [[react|React]] + [[vite|Vite]] のプロジェクトを作ったので、せっかくなら Tailwind CSS も入れたくなった。パッケージマネージャは引き続き [[pnpm|pnpm]] を使う。

## 環境

```
"@tailwindcss/vite": "^4.1.18"
"tailwindcss": "^4.1.18"
```

## 検証

### 手順

Tailwind CSS と Vite のプラグインを追加する。

```sh
$ pnpm add tailwindcss @tailwindcss/vite
```

`index.html` に CSS を読み込む `link` 要素を追加する。

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf8" />
    <!-- 以下を追加 -->
    <link href="/src/index.css" rel="stylesheet" />
  </head>
  ...
</html>
```

`src/index.css` を作成する。

```css
@import "tailwindcss";
```

`vite.config.js` に `tailwindcss()` を追加する。

```javascript
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()], // tailwindcss() 追加
  publicDir: false,
})
```

### 確認

`src/index.cljs` でクラスを指定する。

```clojure
(ns index
  (:require ["react-dom/client" :refer [createRoot]]))

(->
 (createRoot (js/document.getElementById "app"))
 (.render #jsx [:div {:className "bg-red-500 text-white p-4"} "Hello Tailwind!"]))
```

```sh
$ bb dev
```

## キーワード

- [[tailwind-css|Tailwind CSS]]
- [[squint|Squint]]
- [[react|React]]
- [[vite|Vite]]
- [[pnpm|pnpm]]

## 参考

- https://tailwindcss.com/docs/installation/using-vite

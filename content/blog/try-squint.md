---
title: Squint を触ってみる
description: Squint で ClojureScript 風のコードを Node.js で実行し、Vite と組み合わせて React の Hello, World を表示するところまで試した
tags: [blog, clojure, squint]
date: 2025-08-01
draft: false
---

## TL;DR

- [[squint|Squint]] のプロジェクトを pnpm で作り、`.cljs` ファイルを `squint-cljs run` で実行できた。
- Vite と組み合わせ、[[react|React]] の Hello, World を表示するところまで試した。続きは [[squint-react-vite|Squint + React + Vite のプロジェクトを作成する]] にまとめた。

## 背景

[[clojure|Clojure]] まわりのツールである [Squint](https://github.com/squint-cljs/squint) を触ってみたかった。題材として、[React のチュートリアル](https://ja.react.dev/learn/tutorial-tic-tac-toe)を Squint と Vite でやってみることにした。

## 検証

### プロジェクトをセットアップする

```sh
$ pnpm init
$ pnpm i squint-cljs@latest
```

### サンプルコードを実行する

次のコードを `example.cljs` に書いた。

```clojure
(ns example
  (:require ["fs" :as fs]
            ["url" :refer [fileURLToPath]]))

(println (fs/existsSync (fileURLToPath js/import.meta.url)))

(defn foo [{:keys [a b c]}]
  (+ a b c))

(println (foo {:a 1 :b 2 :c 3}))
```

```sh
$ pnpm dlx squint-cljs run example.cljs
```

### Squint と Vite で React を動かす

Vite でプロジェクトを作り、依存関係に `squint-cljs` を追加した。

```sh
$ pnpm create vite my-vue-app --template vue
$ pnpm i squint-cljs@latest
```

動作確認のため、[[jsx|JSX]] のファイルをすべて削除し、次の `src/main.cljs` を追加した。

```clojure
(ns main
  (:require ["react-dom/client" :refer [createRoot]]))

(def root (createRoot (js/document.getElementById "root")))

(.render root #jsx [:h1 "Hello, World!"])
```

`index.html` を `public` に移動し、`<body>` 内を書き換えた。

```html
<body>
  <div id="root"></div>
  <!-- ここを以下に置き換え-->
  <script type="module" src="./js/main.jsx"></script>
</body>
```

[Squint の README](https://github.com/squint-cljs/squint/tree/main?tab=readme-ov-file#squintedn) に従い、設定ファイル `squint.edn` を作った。

```clojure
{:paths ["src"]
 :output-dir "public/js"
 :extension "jsx"}
```

最後に、Squint の監視と Vite の開発サーバを立ち上げた。

```sh
$ pnpm dlx squint-cljs watch
$ pnpm dlx vite --config=vite.config.js public
```

## 結果

サンプルコードを実行すると、次のように出力された。

```sh
[squint] Running example.cljs
true
6
```

## キーワード

- [[squint|Squint]]
- [[clojure|Clojure]]
- [[clojurescript|ClojureScript]]
- [[react|React]]
- [[jsx|JSX]]

## 参考

- [squint-cljs/squint](https://github.com/squint-cljs/squint)
- [チュートリアル：三目並べ - React](https://ja.react.dev/learn/tutorial-tic-tac-toe)

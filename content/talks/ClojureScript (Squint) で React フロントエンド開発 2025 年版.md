---
title: ClojureScript (Squint) で React フロントエンド開発 2025 年版
description: ClojureScript のビルドの歴史と不満点を振り返り、JavaScript との親和性を高めた方言 Squint で React のフロントエンドを開発する方法を紹介する発表
tags: [talk, clojurescript, react]
date: 2025-05-16
speakers: [kbaba1001]
company:
event: "[[関数型まつり 2025]]"
held: 2025-06-15
slide: https://speakerdeck.com/kbaba1001/build-react-system-with-clojurescript-squint
video:
---

## TL;DR

- ClojureScript のビルドは Clojure のビルドシステムから npm 中心へと移り、現在は shadow-cljs がデファクトスタンダードである。
- [[squint|Squint]] は互換性を捨てて JavaScript との親和性を高めた方言で、`async` / `await` や JSX を使えるが、既存の資産は使えず仕様もまだ固まっていない。

## 内容

### ClojureScript のビルドの歴史

[[clojurescript|ClojureScript]] を [[npm|npm]] で使えるようになったのは最近である。それまでは [[clojure|Clojure]] のビルドシステムに乗っていて、Maven や Gradle から、[[leiningen|Leiningen]]、Boot、[[clojure-cli|Clojure CLI]] へと移ってきた。パッケージは Clojars に `cljsjs` という名前空間で登録していた。npm が成熟するにつれてこの方式は相対的に不便になり、ホットリロードもできないので REPL からリロードする必要があった。

Figwheel はホットリロードができ、cljsjs も扱える。頑張れば npm パッケージも使えるらしい。

現在のデファクトスタンダードは [[shadow-cljs]] である。npm からインストールでき、npm のライブラリも Clojars のライブラリも使える。ホットリロードもでき、webpack や [[vite|Vite]] のような感覚で使える。ただし、起動がやや遅く、CSS はビルドできない。[User's Guide](https://shadow-cljs.github.io/docs/UsersGuide.html) をしっかり読む必要もある。

### ClojureScript 自体への不満

ClojureScript の Map や Vector は JavaScript のオブジェクトや配列ではないので、相互に変換する必要がある。また、`async` / `await` をサポートしていないので、[[promise|Promise]] を扱いにくい。`core.async` を使えばほぼ同じことはできるが、Promise を返すわけではないので、組み合わせるとうまく動かない。

### Squint

[[squint|Squint]] は、既存の ClojureScript との互換性を捨てて、[[javascript|JavaScript]] との親和性を高めた ClojureScript の方言である。Map や Vector は JavaScript の普通のオブジェクトや配列になる。ビルド後のファイルサイズが小さく、[[jsx|JSX]] や HTML を書けて、`async` / `await` も使える。Vite と組み合わせて開発できる。

### 使うときの注意

仕様が固まっておらず細かい不具合もまだ多いので、本番環境で使うときは注意が必要である。既存の ClojureScript の資産も使えない。たとえば、動的な型チェックに使う [[malli|Malli]] は使えない。JavaScript で代わりになる型チェックのライブラリは、軒並み [[typescript|TypeScript]] 製に置き換わっている。かつて [[react|React]] で使われていた prop-types はあるが、メンテナンスされていなさそうである。

回避策として、[[zod|Zod]] や Valibot のようなバリデーションライブラリを、関数の入力値の動的な型チェックに使う。Clojure の関数には `pre` / `post` で事前条件と事後条件を設定できる（[[design-by-contract|契約による設計]]）ので、そこでバリデーションライブラリを使う。チェックは `NODE_ENV=development` のときだけ行う。

## キーワード

- [[clojurescript|ClojureScript]]
- [[clojure|Clojure]]
- [[squint|Squint]]
- [[shadow-cljs]]
- [[npm|npm]]
- [[vite|Vite]]
- [[promise|Promise]]
- [[jsx|JSX]]
- [[malli|Malli]]
- [[zod|Zod]]
- [[design-by-contract|契約による設計]]

## 自分の理解

shadow-cljs をキャッチアップするとき、User's Guide はめちゃくちゃ見た気がする。

## 関連

- [プロポーザル](https://fortee.jp/2025fp-matsuri/proposal/e7f30174-d4b9-40a7-9398-9f15c71009a9)
- [Squint で ClojureScript の新しい可能性を開く（登壇者のブログ）](https://www.kbaba1001.com/posts/202410130849_opening-up-new-possibilities-for-clojure-script-with-squint/)
- [サンプルコード（フロントエンド）](https://github.com/neumann-tokyo/vite-squint-react-template)
- [サンプルコード（バックエンド）](https://github.com/neumann-tokyo/vite-squint-hono-template)

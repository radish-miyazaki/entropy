---
title: asdf から mise に乗り換える
description: 言語やツールのバージョン管理を asdf から mise に移した手順と、入れたバージョンの記録
tags: [blog, asdf, mise]
date: 2025-03-20
draft: false
---

## TL;DR

- 言語やツールのバージョン管理を asdf から mise に乗り換えた。
- [[homebrew|Homebrew]] で入れ、`mise install` で各言語を入れ直し、`mise use -g` でデフォルトのバージョンを設定した。asdf の `.tool-versions` もそのまま使える。

## 背景

乗り換えた理由は 3 つある。

- タスクランナーを別に用意したくない（Makefile も使いたくない）
- 使っているプラグイン（asdf-kotlin）で mise に乗り換えようとする動きがあった
- asdf の動作がもっさりすることがたまにあった

asdf では、[[bun|Bun]]、[[clojure|Clojure]]、[[dotnet|.NET]]、[[elixir|Elixir]]、[[erlang|Erlang]]、Flutter、[[java|Java]]、[[kotlin|Kotlin]]、[[nodejs|Node.js]]、[[pnpm|pnpm]]、Poetry、[[python|Python]]、Rebar3、[[ruby|Ruby]] を管理していた。Node.js と Ruby は業務で使っているので必須である。

[[leiningen|Leiningen]] は今後 [[clojure-cli|Clojure CLI]] に乗り換えるので、移さなかった。[[php|PHP]] は依存関係を手動で管理するなどエラーの解決が面倒になったので、Homebrew で入れることにした。どうせ開発では [[docker|Docker]] を使い、趣味で触ることも少ないので妥協した。

## 環境

```sh
$ mise -v
2025.3.6 macos-arm64 (2025-03-18)
```

## 検証

Homebrew でインストールし、zsh で mise を有効にする。

```sh
brew install mise
echo 'eval "$(mise activate zsh)"' >> "${ZDOTDIR-$HOME}/.zshrc"
```

一部を除いて最新版を入れた。インストールできるバージョンは `mise ls-remote` で確認できる。Java は LTS を選んだ。

```sh
mise install node@latest
mise install java@openjdk-21.0.2
mise install bun@latest
mise install erlang@27.3
mise install ruby@3.4.2
mise install rebar@latest
mise install python@3.12.9
mise install pnpm@latest
mise install poetry@latest
mise install clojure@latest
mise install dotnet@latest
mise install elixir@1.18.3-otp-27
mise install kotlin@latest
mise install flutter@latest
```

ついでに [[deno|Deno]] と [[terraform|Terraform]] も入れた。

```sh
mise install deno@latest
mise install terraform@latest
```

デフォルトのバージョンは `mise use -g` で設定する。プロジェクトごとにバージョンを指定するときは、`-g` を付けない。

```sh
mise use -g node@latest
```

## 結果

バージョンやタスクは [`mise.toml`](https://mise.jdx.dev/configuration.html) で管理する。asdf の `.tool-versions` もそのまま使える。

## キーワード

- asdf
- mise
- [[homebrew|Homebrew]]

## 参考

- https://github.com/jdx/mise
- [Configuration - mise](https://mise.jdx.dev/configuration.html)

---
title: wa.dev
aliases: []
description: Warg を使った WebAssembly Component のレジストリサービス
tags: [word]
date: 2024-10-29
---

## TL;DR

[[warg|Warg]] を使った、[[webassembly-component|WebAssembly Component]] のレジストリサービス。Component のほかに、[[wit|WIT]] の World やインタフェースも登録できる。2024 年 10 月の時点では Public Beta として提供されている。

## 仕組み

たとえば [[wasi|WASI]] の `wasi:cli` は、[https://wa.dev/wasi:cli](https://wa.dev/wasi:cli) で公開されている。

アカウントを作るには、ヘッダの「Sign in」ボタンをクリックする。作成には [[github|GitHub]] のアカウントが必要である。ログインするとヘッダが変わり、「Setup account」から自分のネームスペースを指定できる。

wa.dev は、Warg のクライアントツールからも使える。

- [[cargo-component]]
- [warg-cli](https://github.com/bytecodealliance/registry): Warg プロトコルのクライアント。wa.dev へのログインに使う（`cargo install warg-cli`）
- [[wkg|wkg]]: WIT パッケージを操作するツール（`cargo install wkg`）
- [[wac]]: レジストリに公開されている WebAssembly Component と、ローカルの Component を合成するツール

## 注意点

wkg で wa.dev に登録されている WIT や Component を使うには、デフォルトのレジストリを設定する必要がある。

```sh
wkg config --default-registry wa.dev
```

## 自分の理解

WIT パッケージの操作には wit-cli を使うつもりだったが、wit-cli は [[wkg|wkg]] という別の CLI ツールのサブコマンドとして移植されるらしい。そのため wkg を入れることにした。

- [bytecodealliance/cargo-component#342](https://github.com/bytecodealliance/cargo-component/pull/342)
- [wit-cli - tanishiking-pub](https://scrapbox.io/tanishiking-pub/wit-cli)
- https://tanishiking24.hatenablog.com/entry/2024/10/15/212035

## 関連

- [[warg|Warg]]
- [[webassembly-component|WebAssembly Component]]
- [[wit|WIT]]

## 出典

- [wa.dev](https://wa.dev/)

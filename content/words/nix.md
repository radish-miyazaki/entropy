---
title: Nix
aliases: []
description: ビルドとデプロイを純粋関数として扱う考え方で作られた、再現性の高いパッケージマネージャ
tags: [word]
date: 2025-11-17
---

## TL;DR

ビルドとデプロイのプロセスを[[pure-function|純粋関数]]として扱うという発想で開発されたパッケージマネージャである。

## なぜ必要か

Nix には次の利点がある。

- 安全性: Nix による変更は `/nix` の中で完結し、システム環境に影響を与えない
- 即効性: CLI ツールをインストールせずに、その場で実行できる
- 再現性: 設定ファイルを共有するだけで、チームの誰でも同じ開発環境を再現できる

公式サイトによると、Nix はパッケージを互いに隔離してビルドするので、宣言されていない依存を持たない。1 つのパッケージのインストールや更新が他のパッケージを壊すこともなく、以前の状態にロールバックもできる。パッケージは Nixpkgs から 14 万以上を選べる。

## 仕組み

### nix-shell

`nix-shell` は、特定のコマンドを一時的に試すための機能である。Nix が管理するパッケージへのパスが通った特別なシェルを起動することで実現している。

```sh
$ nix-shell -p hello

[nix-shell:~]$ which hello
/nix/store/98kxcz1lljbzy8s56cra0rmjyspn6bfv-hello-2.12.2/bin/hello

[nix-shell:~]$ hello
Hello, world!
```

`-p` には複数のパッケージを指定できる。

```sh
nix-shell -p bat ripgrep fd
```

### Flakes

[Flakes](https://nix.dev/concepts/flakes.html#flakes) は、プロジェクトの依存関係を `flake.nix` と `flake.lock` に明示的に書くことで、誰が実行しても同じバージョンのパッケージが使われることを保証する仕組みである。Flakes を有効にすると、`nix-shell` より強力な `nix run` や `nix shell` などのコマンドが使える。

```sh
nix run nixpkgs#cowsay -- 'Hello, Nix Flakes!'
```

## 例

インストールは次のコマンドで行う。

```sh
sh <(curl --proto '=https' --tlsv1.2 -L https://nixos.org/nix/install)
```

## 注意点

v2.32.4 の時点で Flakes は実験的な機能である。使うには `$HOME/.config/nix/nix.conf` に次の行を追記する必要がある。

```conf
experimental-features = nix-command flakes
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 出典

- [Nix & NixOS](https://nixos.org/)
- [Flakes - nix.dev](https://nix.dev/concepts/flakes.html#flakes)
- パッケージマネージャー Nix 入門（Software Design）

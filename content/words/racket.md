---
title: Racket
aliases: []
description: Lisp 系のプログラミング言語
tags: [word, プログラミング言語, lisp]
date: 2025-05-24
---

## TL;DR

[[lisp|Lisp]] 系のプログラミング言語。型を付けられる姉妹言語として [[typed-racket|Typed Racket]] がある。

## 仕組み

### インストール

[[homebrew|Homebrew]] の cask で入れられる。

```sh
brew install --cask racket
```

### パッケージ

パッケージは [Racket Package Index](https://pkgs.racket-lang.org/) で公開されている。管理には `raco` コマンドの `raco pkg` を使う。

```sh
raco pkg install <パッケージ名>
```

### チュートリアル

- [[Quick： An Introduction to Racket with Pictures|Quick: An Introduction to Racket with Pictures]]
- [[How to Design Programs, Second Edition]]
- [[Continue： Web Applications in Racket|Continue: Web Applications in Racket]]

## 自分の理解

最初は mise のプラグイン（[mise-racket](https://github.com/mise-plugins/mise-racket)）で入れようとしたが、エラーが出たので Homebrew で入れた。

## 関連

- [[typed-racket|Typed Racket]]
- [[scheme|Scheme]]
- [[common-lisp|Common Lisp]]

## 出典

- [Racket](https://racket-lang.org/)
- [racket - Homebrew Formulae](https://formulae.brew.sh/cask/racket)
- [Getting Started with Packages - Racket](https://docs.racket-lang.org/pkg/getting-started.html)

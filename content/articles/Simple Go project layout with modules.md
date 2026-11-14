---
title: Simple Go project layout with modules
description: Go のモジュールを使った、複数のパッケージと internal パッケージ、コマンドを含む最小限のプロジェクト構成の例
tags: [article, go]
date: 2025-09-10
article-authors: [Eli Bendersky]
site: eli.thegreenplace.net
published: 2019-10-01
url: https://eli.thegreenplace.net/2019/simple-go-project-layout-with-modules/
---

## TL;DR

- Go のモジュールを使い、複数のパッケージ、internal パッケージ、インストールできるコマンドを含む最小限のプロジェクト構成を示す。
- `pkg/` ディレクトリはたいていアンチパターンで、まずはシンプルに始めるのがよい。

## 内容

### 目的

Go のコードをどう構成するかは、初心者がよく抱く疑問である。この記事は、Web で見かける古くて複雑すぎる助言ではなく、最小限で最新の例を示す。扱うのは、複数のインポートできるパッケージ、internal パッケージ、インストールできるコマンドの 3 つである。

### モジュール名

モジュール名は `go.mod` で決めるプロジェクトのパスで、GitHub のパスを使うのが一般的である。モジュール名は利用者のコードでのインポートパスの基になる。

### プロジェクトの構成

```
├── LICENSE
├── README.md
├── config.go
├── go.mod
├── go.sum
├── clientlib
│   ├── lib.go
│   └── lib_test.go
├── cmd
│   ├── modlib-client
│   │   └── main.go
│   └── modlib-server
│       └── main.go
├── internal
│   └── auth
│       ├── auth.go
│       └── auth_test.go
└── serverlib
    └── lib.go
```

`go.mod` はモジュールの定義ファイルである。最上位の `config.go` はモジュールのルートパッケージで、最上位にあるのでパッケージ名はモジュール名とみなされる。

`clientlib` や `serverlib` のようなサブディレクトリは、それぞれ別のインポートできるパッケージになる。ファイル名は何でもよく、複数のファイルからなるパッケージも多い。入れ子にしてもよく、インポートパスはディレクトリのパスに従う。

### コマンド

`cmd` ディレクトリにはコマンドラインのプログラムを置き、それぞれ `package main` にする。利用者は `go install` で入れられる。

```
$ go install github.com/eliben/modlib/cmd/modlib-client@latest
```

パッケージどうしは、モジュールのフルパスを使った絶対パスでインポートする。

### internal パッケージ

`internal` ディレクトリのパッケージは、同じモジュールの中からしかインポートできない。Go のツールが特別なパスとして扱うので、外のコードはインポートできない。後から API を公開するのは、公開した API を取り下げるよりずっと簡単なので、作者はパッケージをまず `internal` に置くことを勧めている。

### pkg/ ディレクトリ

作者は `pkg/` ディレクトリを、たいていの場合アンチパターンだとしている。ほとんどのプロジェクトには不要で、そこに置かれるコードはたいてい `internal/` に置くべきものである。

記事は「何よりも、シンプルに始めよう」という原則で締めくくられている。なお、2023 年 9 月の追記によると、同じような指針が Go の公式ドキュメントにも載るようになった。

## キーワード

- [[go|Go]]
- go.mod
- internal パッケージ
- Go モジュール

%%

## 自分の理解

同意できる点、疑問に思った点、試してみたいこと。書くときはこのコメントを外す
%%

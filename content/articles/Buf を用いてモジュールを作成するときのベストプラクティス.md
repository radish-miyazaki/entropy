---
title: Buf を用いてモジュールを作成するときのベストプラクティス
description: Buf で Protobuf のモジュールを作るときは、パッケージ名に組織・目的・バージョンを入れ、ファイルパスをパッケージ名と一致させるというドキュメントのまとめ
tags: [article, buf, bsr]
date: 2024-09-30
article-authors: []
site: Buf
published:
url: https://buf.build/docs/reference/protobuf-files-and-packages
---

## TL;DR

- [[buf|Buf]] でモジュールを作るときは、基本的に [[buf-lint|buf lint]] のルールに従えばよい。
- パッケージ名には組織、目的、バージョンの 3 つを入れ、ファイルパスはパッケージ名と一致させる。

## 内容

### パッケージ名の構成

[パッケージ名](https://buf.build/docs/reference/protobuf-files-and-packages#packages)には、組織、目的、バージョンの 3 つの要素を入れる。

- 組織: ユーザ名や組織名（例: `google`）
- 目的: システム名やプロダクト名（例: `google.bigtable`、`google.datastore`、`google.pubsub`、`google.spanner`）。関連するモジュールが複数あれば、`google.cloud.compute`、`google.cloud.kms` のようにグループにまとめてもよい
- バージョン: `v1` や `alpha1` などのバージョン番号

### ファイルパスの構成

[ファイルパス](https://buf.build/docs/reference/protobuf-files-and-packages#file-paths)はパッケージ名と一致させる必要がある。たとえば `foo.bar.v1` というパッケージなら、ディレクトリは次の構成にする。

```sh
.
└── foo
    └── bar
        └── v1
            └── example.proto
```

一致していないと、buf lint のルールに引っかかってエラーになる。

## キーワード

- [[buf|Buf]]
- [[buf-lint|buf lint]]
- [[buf-schema-registry|BSR]]
- [[protocol-buffers|Protocol Buffers]]

%%

## 自分の理解

同意できる点、疑問に思った点、試してみたいこと。書くときはこのコメントを外す
%%

## 関連

- [Zenn の本「モジュールとパッケージのベストプラクティス」の章](https://zenn.dev/jy8752/books/33743f8091c39d/viewer/9#モジュールとパッケージのベストプラクティス)

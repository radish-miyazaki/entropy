---
title: Checksum Database
aliases: []
description: 公開されている Go モジュールの go.sum の行を集めた、改ざんを検証できるグローバルなデータベース
tags: [word, go, セキュリティ]
date: 2026-11-14
---

## TL;DR

公開されている [[go|Go]] モジュールのハッシュ（`go.sum` の行）を集めた、グローバルなデータベース。Google が運営する [sum.golang.org](https://sum.golang.org/) で提供されている。

## なぜ必要か

Go Modules Reference によると、Checksum Database があれば、公開されているすべてのモジュールのバージョンについて、全体で一貫した信頼できるハッシュが得られる。プロキシが誤ったコードを配っても気づけるので、信頼できないプロキシも使える。モジュールの作者が後からリポジトリのタグを付け替えても、あるバージョンの中身が変わらないことも保証される。

[[How Go Mitigates Supply Chain Attacks]] によると、これにより特定のプロジェクトだけにバックドア入りのソースを配ることはできない。モジュールの作者が鍵を管理する必要もない。

## 仕組み

Checksum Database は、`go.sum` の行のハッシュを記録した Transparent Log（Merkle tree）で、Trillian を基盤にしている。Merkle tree なので、改ざんされていないことを第三者が独立に検証できる。

`go` コマンドは、ダウンロードしたモジュールのハッシュが `go.sum` にないとき、Checksum Database で検証する。新しい行を `go.sum` に足す前に、特定の記録がログにあることの証明（inclusion proof）と、ログが改ざんされていないことの証明（consistency proof）を確かめる。

## 例

使う Checksum Database は環境変数 `GOSUMDB` で指定し、デフォルトは `sum.golang.org` である。社内のモジュールのように公開されていないものは、`GOPRIVATE` や `GONOSUMDB` で検証の対象から外す。

```sh
GOPRIVATE=*.corp.example.com
```

## 注意点

`GOSUMDB=off` にすると Checksum Database を参照しなくなり、検証できないモジュールもすべて受け入れる。特定のモジュールだけを外したいなら、`GOPRIVATE` か `GONOSUMDB` を使うほうがよい。また [[サプライチェーン攻撃に学ぶmoduleの仕組みとセキュリティ対策]] によると、こうした仕組みもタイポスクワッティングには無力である。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[minimal-version-selection|MVS]]
- [[supply-chain-attack|サプライチェーン攻撃]]

## 出典

- [Go Modules Reference - Checksum database](https://go.dev/ref/mod#checksum-database)
- [[How Go Mitigates Supply Chain Attacks]]
- [[サプライチェーン攻撃に学ぶmoduleの仕組みとセキュリティ対策]]

---
title: Ginkgo
aliases: []
description: Go の BDD テスティングフレームワーク。マッチャライブラリの Gomega と組み合わせて使う
tags: [word, go, テスト]
date: 2023-12-17
---

## TL;DR

[[go|Go]] の [[bdd|BDD]] テスティングフレームワーク。マッチャライブラリの [[gomega|Gomega]] と組み合わせて使う。

## 仕組み

公式ドキュメントでは、表現力のあるテストを書くためのフレームワークと説明されている。BDD に限らず、さまざまな場面で使われる汎用のテスティングフレームワークでもある。

テストは、次のノードを入れ子にして書く。

- コンテナノード（`Describe`、`Context`、`When`）: スペックを階層的にまとめる。3 つの機能は同じで、読みやすさに応じて使い分ける
- セットアップノード（`BeforeEach` など）: 各スペックの前に状態を準備する
- サブジェクトノード（`It`）: 1 つのスペックのアサーションを書く

Ginkgo がテストの構造を担い、Gomega がアサーションを担う。`RegisterFailHandler(Fail)` で 2 つをつなぐと、Gomega の失敗が Ginkgo を通して報告される。

`ginkgo` コマンドも提供されている。内部では `go test` を呼び出しているだけである。`ginkgo bootstrap` でスイートのファイルを生成し、`ginkgo` でスイートを実行する。

## 注意点

公式ドキュメントによると、`ginkgo` コマンドのバージョンは `go.mod` にある Ginkgo のバージョンと合わせる必要がある。

## 自分の理解

かなり大きいフレームワークなので、チーム開発で採用するかは相談が必要だと思う。

## 関連

- [[gomega|Gomega]]
- [[bdd|BDD]]
- [[rspec|RSpec]]

## 出典

- [Ginkgo](https://onsi.github.io/ginkgo/)

---
title: Gomega
aliases: []
description: Go のマッチャ・アサーションライブラリ。Ginkgo と同じ開発者が作っている
tags: [word, go, テスト]
date: 2023-12-17
---

## TL;DR

[[go|Go]] のマッチャ・アサーションライブラリ。[[ginkgo|Ginkgo]] と同じエンジニアが開発している。

## 仕組み

公式ドキュメントでは、Ginkgo と組み合わせるのが最もよいとされているが、Go 標準の `testing` パッケージでも使える。

`Expect` は同期的なアサーションを行う。`Expect(ACTUAL).To(Equal(EXPECTED))` のように、実際の値とマッチャを渡す。`Eventually` は非同期の処理を確かめるためのもので、アサーションが通るかタイムアウトするまで繰り返し確認する。

マッチャ（`Equal`、`BeTrue`、`HaveOccurred` など）はただの関数である。`And`、`Or`、`Not` で組み合わせたり、自分で作ったりできる。

## 例

`testing` パッケージと使うときは、`NewWithT(t)` でラップする。

```go
func TestFarmHasCow(t *testing.T) {
    g := NewWithT(t)

    f := farm.New([]string{"Cow", "Horse"})
    g.Expect(f.HasCow()).To(BeTrue(), "Farm should have cow")
}
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[ginkgo|Ginkgo]]
- [[bdd|BDD]]

## 出典

- [Gomega](https://onsi.github.io/gomega/)

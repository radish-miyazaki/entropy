---
title: Idiomatic Go
aliases: []
description: Go のコードレビューでよく指摘される小さなスタイルの決まりを、Dmitri Shuralyov がまとめたページ
tags: [word, go]
date: 2024-09-28
---

## TL;DR

[[go|Go]] のコードレビューでよく指摘される、小さなスタイルやベストプラクティスの決まりを Dmitri Shuralyov がまとめたページ。公式のスタイルガイド（[go.dev/s/style](https://go.dev/s/style)）を補うものである。

## なぜ必要か

レビューのたびに同じ指摘を説明し直さずに済むよう、項目ごとに理由を書き、リンクで示せるようにしている。

## 例

- `marshaling` や `canceled` など、Go プロジェクトと同じ綴りを使う
- エラー変数は `err`、公開するパッケージレベルのエラーは `ErrSomething` と名付ける
- 非公開の名前では、`oauthEnabled` や `githubToken` のように略語やブランド名をすべて小文字にする
- 人が読むコメントは `//` の後に空白を 1 つ入れる。`//go:generate` のような空白なしの形はディレクティブに使う
- 使わないレシーバには名前を付けず、`func (foo) method()` と書く
- 空文字列の判定は `len(s) == 0` ではなく `s == ""` と書く
- mutex は、守るフィールドの直前に置き、関係のないフィールドとは空行で分ける

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[when-in-go|Go に入っては Go に従え]]

## 出典

- [Idiomatic Go](https://dmitri.shuralyov.com/idiomatic-go)

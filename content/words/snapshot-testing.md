---
title: スナップショットテスト
aliases: [Golden Test]
description: レンダリング結果を、以前のテスト実行時に保存したスナップショットと比べるテスト
tags: [word, テスト]
date: 2024-09-04
---

## TL;DR

JSON や HTML などのレンダリング結果を、以前のテスト実行時に保存したスナップショットと比べるテスト。Golden Test とも呼ぶ。

## なぜ必要か

アプリケーションの出力が変わったときに、その変更を人間が目で確かめられるようにする手軽な方法である。

## 仕組み

テストを実行すると、出力を保存済みのスナップショットと比べる。一致しなければ差分を表示し、新しい内容でスナップショットを更新するかを尋ねるツールが多い。

Golden Test と呼ぶ場合は、保存したファイルを Golden File と呼ぶ。

## 例

- [[vitest|Vitest]] はスナップショットテストの機能を持っている。
- [[visual-regression-test|Visual Regression Test]] でよく使われる。

## 自分の理解

Flutter や [[go|Go]] の文脈では Golden Test という言葉が使われ、[[javascript|JavaScript]] ではスナップショットテストと呼ぶことが多い気がする。

## 関連

- [[visual-regression-test|Visual Regression Test]]
- [[arrange-act-assert|AAA パターン]]
- [[vitest|Vitest]]

## 出典

- [Testing with golden files in Go](https://medium.com/soon-london/testing-with-golden-files-in-go-7fccc71c43d3)

---
title: テストサイズ
aliases: [Test Sizes]
description: テストを Small、Medium、Large の 3 つに分ける、Google が提唱したテストの分類
tags: [word, google, テスト]
date: 2025-02-02
---

## TL;DR

Google が提唱したテストの分類。テストがカバーする範囲によって、Small、Medium、Large の 3 つに分ける。

## 仕組み

### Small Tests

単一の関数や[[module|モジュール]]の中のコードをテストする。自動で実行し、「コードが意図どおりに動作しているか」を確かめる。

### Medium Tests

2 つ以上の機能の間の相互作用をテストする。手動または自動で実行し、「隣り合う機能どうしが正しく連携しているか」を確かめる。

### Large Tests

3 つ以上の機能をカバーし、できるだけ実際のユーザシナリオを再現する。自動での実行や探索的テストなど、さまざまな方法を使う。「製品がユーザの期待どおりに動作しているか」を確かめる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[Googleのソフトウェアエンジニアリング ―持続可能なプログラミングを支える技術、文化、プロセス]]

## 出典

- [Test Sizes - Google Testing Blog](https://testing.googleblog.com/2010/12/test-sizes.html)
- [How Google Tests Software - Part Five - Google Testing Blog](https://testing.googleblog.com/2011/03/how-google-tests-software-part-five.html)

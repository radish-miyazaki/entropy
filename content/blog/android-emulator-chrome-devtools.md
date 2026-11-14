---
title: Android エミュレータから Chrome DevTools に接続する
description: エミュレータで開発者オプションと USB デバッグを有効にし、PC の chrome://inspect から Chrome のページを検証する手順
tags: [blog, android, devtools]
date: 2025-08-21
draft: false
---

## TL;DR

- Android エミュレータで開発者オプションと USB デバッグを有効にし、PC の Chrome で `chrome://inspect` を開くと、エミュレータの Chrome で開いたページを DevTools で検証できる。
- 一度接続を解除した後に「inspect」ボタンが出なくなったときは、エミュレータの電源を入れ直すと直った。

## 背景

Android エミュレータの Google Chrome で開いたサイトを、PC の [[chrome-devtools|Chrome DevTools]] で確認したかった。

## 検証

### エミュレータ側の操作

1. Settings アプリを開いて、「About emulated device」をタップする
2. 「Build number」を 7 回タップして、開発者オプションを有効にする
3. Settings のホーム画面に戻り、「System」→「Developer options」を開く
4. 「USB debugging」を ON にする（最初から ON になっていることが多い）
5. Google Chrome を開いて、確認したいサイトを開く

### PC 側の操作

1. Chrome で `chrome://inspect` にアクセスする
2. 「Discover USB devices」と「Discover network targets」にチェックが入っていることを確認する
3. 「inspect」ボタンをクリックする

## 結果

一度接続を解除した後に、「inspect」ボタンが表示されなくなった。自分の場合は、エミュレータの Power を一度オフにしてからオンにし直すと、再び表示された。

## キーワード

- [[chrome-devtools|Chrome DevTools]]

---
title: SSH を利用した Codeberg への接続
description: macOS で Ed25519 の鍵を作り、Codeberg に公開鍵を登録して SSH で接続するまでの手順
tags: [blog, codeberg, git]
date: 2026-02-23
draft: false
---

## TL;DR

- [[codeberg|Codeberg]] に [[ssh|SSH]] で接続するために、Ed25519 の鍵を作成して公開鍵を登録した。
- 手順はほとんど Codeberg の設定画面に書かれているとおりである。

## 背景

今さら Codeberg のアカウントを作成したので、SSH の設定を備忘録として残しておく。

## 環境

- macOS

## 検証

1. ターミナルで `ssh-keygen -t ed25519 -a 100` を実行し、[[public-key-cryptography|公開鍵と秘密鍵]]を作成する。ファイル名は好みで `codeberg` とした。
2. 公開鍵をクリップボードにコピーする。

   ```sh
   $ pbcopy < ~/.ssh/codeberg.pub
   ```

3. ブラウザで https://codeberg.org/user/settings/keys を開き、「キーを追加」をクリックする。
4. 表示されたフォームの「キー名」に任意の名前を、「内容」に 2 でコピーした公開鍵を入力して登録する。
5. ターミナルで `ssh -T git@codeberg.org` を実行し、接続できることを確かめる。

## キーワード

- [[codeberg|Codeberg]]
- [[ssh|SSH]]
- [[git|Git]]
- [[public-key-cryptography|公開鍵暗号]]

## 参考

- https://codeberg.org/user/settings/keys

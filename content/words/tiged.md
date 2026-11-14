---
title: tiged
aliases: []
description: Git リポジトリの履歴を含めずに最新のコミットだけをコピーするコマンド。degit をコミュニティがフォークしたもの
tags: [word]
date: 2024-08-12
---

## TL;DR

[[git|Git]] リポジトリの最新のコミットだけをコピーするコマンド。[[degit|degit]] をコミュニティがフォークしたもので、巨大なリポジトリから一部のディレクトリだけを取得するときなどに使う。

## なぜ必要か

`git clone` と違って Git の履歴をダウンロードしないので、速い。テンプレートからプロジェクトを作るとき、`git clone` ではテンプレートの履歴を持った `.git` が残り、作り直す必要がある。tiged ではそれが残らない。

degit は長い間リリースがなく、プルリクエストにも反応がなかった。tiged は、コントリビューションを取り込み、依存関係を更新し続けるためにフォークされた。

## 仕組み

`tiged some-user/some-repo` を実行すると、GitHub 上のそのリポジトリの最新のコミットを探し、対応する tar ファイルを `~/.degit/some-user/some-repo/<コミットハッシュ>.tar.gz` にダウンロードする。ローカルにすでにあれば、ダウンロードしない。後方互換のため、`degit` コマンドとしても動く。

## 例

```sh
# main ブランチを repo という名前のディレクトリにコピーする
tiged user/repo

# サブディレクトリだけをコピーする
tiged user/repo/subdirectory

# ブランチ、タグ、コミットを指定する
tiged user/repo#dev
tiged user/repo#v1.2.3
tiged user/repo#1234abcd
```

[[bun-vite-elm-setup|bun + Vite + Elm で環境構築]]でも使った。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[degit|degit]]
- [[git|Git]]

## 出典

- [tiged](https://github.com/tiged/tiged)
- [degit](https://github.com/Rich-Harris/degit)
- https://qiita.com/masakinihirota/items/418eec4422fd06690924

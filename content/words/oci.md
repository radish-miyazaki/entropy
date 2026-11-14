---
title: OCI
aliases: [Open Container Initiative]
description: コンテナのランタイムとイメージの標準を定めるために 2015 年に設立された団体
tags: [word, docker]
date: 2024-11-01
---

## TL;DR

[[container|コンテナ]]のランタイムとイメージに関する標準を定めるために、2015 年に [[docker|Docker]] 社をはじめとする複数の企業が設立した団体。現在は Linux Foundation の傘下にある。

## なぜ必要か

公式サイトによると、OCI の目標は、コンテナのフォーマットとランタイムに関するオープンな業界標準を作ることである。Docker や rkt のようなエンジンでは、イメージを追加の引数なしで実行できる。イメージ自体がアプリケーションの起動に必要な情報を持つので、標準に準拠したランタイムであれば、どれでも同じイメージを実行できる。

## 仕組み

OCI は次の 3 つの仕様を管理している。

- Runtime Specification（runtime-spec）: ディスク上に展開した「ファイルシステムバンドル」を実行する方法を定める
- Image Specification（image-spec）: マニフェスト、ファイルシステムのレイヤ、設定からなる OCI イメージの作り方を定める。設定には、起動時の引数や環境変数などが入る
- Distribution Specification（distribution-spec）: コンテナイメージを配布するための API を標準化する。2020 年 5 月に v1.0 になった

設立のときに、Docker 社がコンテナのフォーマットとランタイムの runC を寄贈し、これが標準の土台になった。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[docker|Docker]]
- [[container|コンテナ]]

## 出典

- [Open Container Initiative](https://opencontainers.org/)
- [About the Open Container Initiative](https://opencontainers.org/about/overview/)
- [Open Container Initiative - Wikipedia](https://ja.wikipedia.org/wiki/Open_Container_Initiative)

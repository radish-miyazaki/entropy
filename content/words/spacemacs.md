---
title: Spacemacs
aliases: []
description: Vim のキー操作（Evil）を中心にした、コミュニティ主導の Emacs ディストリビューション
tags: [word, emacs]
date: 2024-01-29
---

## TL;DR

コミュニティ主導の Emacs ディストリビューション。Vim のキー操作を再現する Evil を中心に据えており、「最高のエディタは Emacs でも Vim でもなく、Emacs と Vim だ」を掲げている。

## 仕組み

公式サイトは次の特徴を挙げている。

- ニーモニック: キーバインドは覚えやすい接頭辞でまとめられている（たとえば `b` はバッファ）
- 発見しやすい: 押せるキーバインドがリアルタイムに表示される
- 一貫性: 似た機能には、規約に沿って同じキーバインドが割り当てられる
- コミュニティによる設定: パッケージの選定と設定をコミュニティが管理している

公式ドキュメントによると、関連するパッケージは「レイヤー」にまとめられており、レイヤーを 1 つ有効にすれば、その機能を一度に使える。編集スタイルは 3 つから選べる。Evil で Vim のキー操作を再現する Vim スタイル（既定）、素の Emacs と同じように動く Emacs スタイル、Vim の挿入モードを Emacs のキーバインドに置き換えた Hybrid スタイルである。ほとんどのコマンドはリーダーキーの `SPC`（スペースキー）から始まり、これが名前の由来になっている。ユーザの設定は `~/.spacemacs` に書く。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[spacemacs-cider-run-tests|Spacemacs + CIDER でテストを走らせる]]

## 出典

- [Spacemacs](https://www.spacemacs.org/)
- [Spacemacs documentation](https://www.spacemacs.org/doc/DOCUMENTATION.html)

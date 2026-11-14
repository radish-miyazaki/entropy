---
title: GPG
aliases: [GnuPG, GNU Privacy Guard]
description: OpenPGP 標準に基づき、データやメールの暗号化と電子署名を行う OSS の暗号化ソフトウェア
tags: [word, セキュリティ]
date: 2026-07-08
---

## TL;DR

OpenPGP 標準に基づく OSS の暗号化ソフトウェア。公開鍵暗号方式と共通鍵暗号方式を組み合わせたハイブリッド暗号方式で、データやメールの暗号化と電子署名を行える。

## 仕組み

GnuPG の公式サイトによると、GnuPG は [[rfc|RFC]] 4880 で定められた OpenPGP 標準の、自由なソフトウェアによる実装である。データや通信の暗号化と署名を行い、鍵の管理の仕組みと、公開鍵のディレクトリにアクセスするためのモジュールを持つ。OpenPGP のほかに、S/MIME と [[ssh|SSH]] にも対応している。

GnuPG はコマンドラインのツールで、ほかのアプリケーションに組み込みやすいように作られている。GnuPG を使うフロントエンドのアプリケーションやライブラリも多い。1997 年に登場して以来、GNU General Public License のもとで自由に使い、変更し、再配布できる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[message-authentication-code|メッセージ認証コード]]
- [[public-key-cryptography|公開鍵暗号]]

## 出典

- [The GNU Privacy Guard](https://gnupg.org/)

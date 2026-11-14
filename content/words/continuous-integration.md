---
title: 継続的インテグレーション
aliases: [CI]
description: チームのメンバーが少なくとも毎日、変更をメインラインに統合し、統合のたびにテストを含む自動ビルドで検証するプラクティス
tags: [word, devops, テスト]
date: 2026-11-14
---

## TL;DR

チームのメンバーが少なくとも毎日、自分の変更をメインラインに統合し、統合のたびにテストを含む自動ビルドで検証するプラクティス。統合のエラーをすぐに見つけられる。Kent Beck が 1990 年代に Extreme Programming の一部として広めた。

## なぜ必要か

[[Test-Driven React, Second Edition 第6章 Continuous Integration and Collaboration|Test-Driven React 第6章]] によると、[[eslint|ESLint]] や [[stylelint|Stylelint]] などのチェックは開発者のローカル環境でしか動かない。チーム全員にこの環境を強制するのは手間がかかるので、チェックを個々の開発者の環境から切り離す CI が欠かせなくなる。

## 仕組み

Martin Fowler は、CI の主なプラクティスとして次を挙げている。

- 毎日メインラインにコミットする: Kent Beck の目安は、統合されないまま数時間を超えて残るコードがないことである
- ビルドにテストを含める: 十分なテストスイートが前提になる
- 壊れたビルドをすぐ直す: ビルドを直すことより優先度の高い作業はない。原因のコミットを戻すのが早いことが多い
- ビルドを速く保つ: XP の目安は 10 分である

## 注意点

フィーチャブランチで CI サービスを動かしても、変更がメインラインに入らないので、Fowler はそれを CI とは呼ばない。CI サービスは CI を助ける道具であって、プラクティスそのものではない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[trunk-based-development|トランクベース開発]]
- [[travis-ci|Travis CI]]
- [[gremlins|Gremlins]]

## 出典

- [[Test-Driven React, Second Edition 第6章 Continuous Integration and Collaboration|Test-Driven React 第6章]]
- [Continuous Integration - Martin Fowler](https://martinfowler.com/articles/continuousIntegration.html)

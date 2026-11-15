---
title: Test-Driven React, Second Edition › Continuous Integration and Collaboration
aliases: [Continuous Integration and Collaboration]
description: ローカルでしか動かないチェックを CI に移して自動化し、Husky や Storybook も加えてチーム開発を支える章
tags: [book-chapter]
date: 2024-09-06
book: "[[Test-Driven React, Second Edition]]"
chapter: 6
---

## TL;DR

- ESLint や Stylelint などのチェックは開発者のローカル環境でしか動かないので、チーム開発では[[continuous-integration|継続的インテグレーション]]（CI）で自動化する。
- あわせて、コミット前にチェックする [[husky|Husky]] と、[[storybook|Storybook]] によるドキュメント生成を導入する。

## 内容

これまで設定した [[eslint|ESLint]] や [[stylelint|Stylelint]] は、各開発者のローカル環境でしか動かない。チームで作業する場合や OSS プロジェクトを維持する場合、全員にこの環境を強制するのは手間がかかる。そこで、チェックを個々の開発者の環境から切り離す[[continuous-integration|継続的インテグレーション]]（CI）が欠かせなくなる。方針は「積極的に自動化する」ことである。著者は、より良いプログラマになる道は常にフィードバックを得ることだと述べている。

> the path to becoming a better programmer is constant feedback.

フィードバックを常に得るために、積極的に自動化する姿勢を持つことが大事である。

本書では、CI サービスとして [[travis-ci|Travis CI]] を使う。CI サーバでは、次のことを確かめられる。

- テストがパスしたか
- テストカバレッジがどれだけ変わったか
- アセットのサイズがどれだけ変わったか

このほか、コードがコミットされる前にチェックして問題を早く見つけるために [[husky|Husky]] を導入する。また、[[storybook|Storybook]] でインタラクティブなドキュメントを生成する。

## キーワード

- [[continuous-integration|継続的インテグレーション]]
- [[travis-ci|Travis CI]]
- [[husky|Husky]]
- [[storybook|Storybook]]
- [[eslint|ESLint]]
- [[stylelint|Stylelint]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

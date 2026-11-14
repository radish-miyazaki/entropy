---
title: Laravel の中間テーブル名は単数形
description: Laravel の中間テーブル名はモデル名を単数形にしてアルファベット順に結合し、Ruby on Rails は複数形のまま結合する
tags: [blog, laravel, ruby-on-rails]
date: 2025-01-14
draft: false
---

## TL;DR

- [[laravel|Laravel]] の中間テーブル名は、テーブル名を単数形にしてアルファベット順に結合する。[[ruby-on-rails|Ruby on Rails]] は単数形にせず、そのままアルファベット順に結合する。

## 背景

Ruby on Rails とは命名の規約が異なり、少し混乱した。

## 検証

`users` と `posts` の中間テーブルを例に比べる。

| フレームワーク | 中間テーブル名 |
| -------------- | -------------- |
| Laravel        | `post_user`    |
| Ruby on Rails  | `posts_users`  |

## キーワード

- [[laravel|Laravel]]
- [[ruby-on-rails|Ruby on Rails]]

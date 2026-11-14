---
title: データ指向プログラミング
aliases: [DOP]
description: Data Oriented Programming の日本語名。同名の書籍で解説されている
tags: [word]
date: 2024-07-29
---

## TL;DR

Data Oriented Programming（DOP）。書籍『データ指向プログラミング』で解説されている。

提唱者の Yehonathan Sharvit によると、DOP はソフトウェアの設計と実装を単純にすることを目指すプログラミングパラダイムで、データを第一級の存在として扱う。

## 仕組み

Sharvit は DOP の原則として、次の 4 つを挙げている。

1. コード（振る舞い）とデータを分ける
2. データを汎用的なデータ構造（マップや配列）で表す
3. データを[[immutability|イミュータブル]]として扱う。変更するときは、元のデータを書き換えずに新しいバージョンを作る
4. データのスキーマを、データの表現と分ける。データがどんな形であるべきかは、データとは別の場所に書く

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[immutability|イミュータブル]]

## 出典

- データ指向プログラミング
- [Principles of Data-Oriented Programming - Yehonathan Sharvit](https://blog.klipse.tech/dop/2022/06/22/principles-of-dop.html)

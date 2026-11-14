---
title: メッセージ認証コード
aliases: [MAC, Message Authentication Code]
description: メッセージと共有鍵から固定長の値を計算し、メッセージの正真性を確かめて認証する技術
tags: [word, セキュリティ]
date: 2024-09-25
---

## TL;DR

メッセージの正真性を確かめ、メッセージを認証する技術。英語では Message Authentication Code といい、MAC と略す。

## 仕組み

任意の長さのメッセージと、送信者と受信者が共有する鍵（共有鍵）の 2 つを入力にとり、固定ビット長の値を出力する関数である。この出力を MAC 値と呼ぶ。

NIST の用語集では、MAC を、共通鍵を使ってデータの偶発的な変更と意図的な改ざんの両方を検出する、データの暗号学的チェックサムと定義している（NIST SP 800-152 など）。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[hmac|HMAC]]

## 出典

- [message authentication code (MAC) - NIST CSRC Glossary](https://csrc.nist.gov/glossary/term/message_authentication_code)

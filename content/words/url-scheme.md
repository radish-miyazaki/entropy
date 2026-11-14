---
title: スキーム
aliases: [Scheme]
description: URL の最初の部分で、リソースにアクセスするために使うプロトコルを示す
tags: [word, web]
date: 2024-11-13
---

## TL;DR

[[url|URL]] の最初の部分で、リソースにアクセスするために使うプロトコルを示す。後ろに `://` が続く。

## 仕組み

[[rfc|RFC]] 3986 によると、スキームは英字で始まり、その後に英字、数字、`+`、`-`、`.` を任意に組み合わせたものである。スキームの後には `:` が続く。スキームは大文字と小文字を区別せず、正規の形は小文字である。実装は大文字の入力も受け付けるべきだが、出力するときは小文字にする。

## 例

よく使われるスキームには、`http`、`https`、`ftp`、`file`、`data` がある。

## 注意点

スキームを省略したときの扱いは仕様書で定義されていないので、ブラウザの実装によって異なる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[url|URL]]
- [[host|ホスト]]
- [[port-number|ポート番号]]
- [[same-origin-policy|同一生成元ポリシー]]

## 出典

- [URI - MDN Web Docs](https://developer.mozilla.org/ja/docs/Web/URI)
- [RFC 3986 Section 3.1 Scheme](https://datatracker.ietf.org/doc/html/rfc3986#section-3.1)

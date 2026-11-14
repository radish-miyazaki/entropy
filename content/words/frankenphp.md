---
title: FrankenPHP
aliases: []
description: Caddy の上に Go で作られた PHP のアプリケーションサーバ
tags: [word, php]
date: 2024-12-22
---

## TL;DR

[[go|Go]] で書かれ、[[caddy|Caddy]] の上に作られた [[php|PHP]] のアプリケーションサーバ。Caddy の中で公式の PHP を実行するので、PHP-FPM を必要としない。

## 仕組み

ワーカーモードでは、アプリケーションを一度だけ起動してメモリに載せたまま、リクエストを処理する。HTTP/1.1、HTTP/2、[[http-3|HTTP/3]] と 103 Early Hints に対応し、Let's Encrypt などによる HTTPS の証明書の取得と更新も自動で行う。単体のバイナリや Docker イメージとして配布されている。

## 例

ディレクトリを公開するには、次のように実行する。

```sh
$ frankenphp php-server -r public/
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[caddy|Caddy]]

## 出典

- [FrankenPHP](https://frankenphp.dev/)
- [スライド（Docswell）](https://www.docswell.com/s/1313108/ZP2QQ1-2025-03-21-123847/40)

---
title: 表現ヘッダ
aliases: []
description: HTTP メッセージで送る表現（リソースの状態）についてのメタデータを伝えるヘッダフィールド
tags: [word, http]
date: 2026-11-14
---

## TL;DR

[[http|HTTP]] メッセージで送る「表現」についてのメタデータを伝える[[header-field|ヘッダフィールド]]。[[content-type|Content-Type]] や [[content-encoding|Content-Encoding]] がこれにあたる。

## なぜ必要か

受け取ったデータをどう解釈すればよいかは、データ自体だけでは分からない。表現ヘッダがあると、受け手はデータの種類や圧縮形式を知って正しく処理できる。

## 仕組み

[RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html) では、表現（representation）は、表現のメタデータと、表現のデータの流れでできている。表現ヘッダはこのうちメタデータを伝える（8.2 節）。リクエストでもレスポンスでも、表現のメタデータを送るヘッダフィールドを含められる（3.4 節）。

## 例

- [[content-type|Content-Type]]: 表現の[[mime-type|メディアタイプ]]を示す（8.3 節）
- [[content-encoding|Content-Encoding]]: 表現にどのコンテンツコーディング（圧縮など）を施したかを示す（8.4 節）

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[header-field|ヘッダフィールド]]
- [[request-header|リクエストヘッダ]]
- [[content-length|Content-Length]]

## 出典

- [RFC 9110: HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html)

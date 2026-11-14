---
title: ステータスコード
aliases: [HTTP ステータスコード]
description: HTTP のレスポンスで、リクエストの結果を示す 3 桁の数字
tags: [word, http]
date: 2026-11-14
---

## TL;DR

[[http|HTTP]] のレスポンスで、リクエストを理解して満たそうとした結果を示す 3 桁の数字。100〜599 の範囲で、最初の桁がクラスを表す。

## 仕組み

[RFC 9110 15 節](https://www.rfc-editor.org/rfc/rfc9110#section-15)では、ステータスコードを最初の桁で 5 つのクラスに分けている。

- 1xx（Informational）: リクエストを受け取り、処理を続けている
- 2xx（Successful）: リクエストを受け取り、理解し、受け入れた
- 3xx（Redirection）: リクエストを完了するには、クライアントが別の URI をたどるなどの追加の動作をする必要がある
- 4xx（Client Error）: リクエストの構文が誤っているか、そのままでは満たせない
- 5xx（Server Error）: 妥当に見えるリクエストの処理にサーバが失敗した

クライアントは、個々のコードを知らなくても、そのクラスは理解しなければならない。知らないコードは、同じクラスの x00 として扱う。たとえば未知の 471 は 400 として扱う。

## 例

[[http-message|HTTP メッセージ]]のステータスラインには、HTTP のバージョン、ステータスコード、理由フレーズ（`OK` や `Not Found` など）が並ぶ。[[sveltekit|SvelteKit]] の Form actions では、`fail` にステータスコードとデータを渡してバリデーションエラーを返す。

## 注意点

RFC 9110 によると、理由フレーズは推奨にすぎず、文言を変えたり省いたりしてもプロトコルには影響しない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[http|HTTP]]
- [[http-message|HTTP メッセージ]]

## 出典

- [RFC 9110: HTTP Semantics, 15. Status Codes](https://www.rfc-editor.org/rfc/rfc9110#section-15)

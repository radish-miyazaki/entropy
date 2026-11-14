---
title: CORS
aliases: [Cross-Origin Resource Sharing]
description: 同一生成元ポリシーで制限される異なるオリジンへのリクエストを、HTTP ヘッダで明示的に許可する仕組み
tags: [word, web, セキュリティ, http]
date: 2024-11-13
---

## TL;DR

[[web-browser|ブラウザ]]が、異なる[[origin|オリジン]]の間でリソースを共有するための仕組み。[[same-origin-policy|同一生成元ポリシー]]で制限される Cross-origin へのリクエストを、許可リスト形式で許可する。

## 仕組み

サーバは [[header-field|HTTP ヘッダ]]を使って、どのオリジンからのリクエストを許可するかを指定する。レスポンスで使うヘッダには、次のものがある。

- `Access-Control-Allow-Origin`: リクエストを許可するオリジンを、特定のオリジンか `*` で示す。
- `Access-Control-Allow-Methods`: 許可する HTTP メソッドを指定する。
- `Access-Control-Allow-Headers`: 許可するカスタム HTTP ヘッダを指定する。
- `Access-Control-Allow-Credentials`: [[cookie|Cookie]] などの認証情報を含むリクエストを許可するかを示す。

一方、リクエストでは `Origin` ヘッダでリクエスト元のオリジンを示す。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[same-origin-policy|同一生成元ポリシー]]
- [[content-security-policy|コンテンツセキュリティポリシー]]
- [[http|HTTP]]

## 出典

- [オリジン間リソース共有 (CORS) - MDN Web Docs](https://developer.mozilla.org/ja/docs/Web/HTTP/CORS)

---
title: ActionController::API は暗黙的に 204 を返す
description: API モードの Rails アプリケーションでは、アクションで render や redirect_to を呼ばないと 204 No Content が返る
tags: [blog, ruby-on-rails, ruby]
date: 2023-12-28
draft: false
---

## TL;DR

- API モードで構築した [[ruby-on-rails|Rails]] アプリケーションでは、アクションで `render` か `redirect_to` を呼ばないと、204 No Content が返る。

## 検証

API モードで構築した Rails アプリケーションでは、`ApplicationController` が `ActionController::API` を継承する。Rails のガイドには、次のように書かれている。

> Keep in mind that templates are not going to be rendered, so you need to ensure your controller is calling either render or redirect_to in all actions, otherwise it will return 204 No Content.

API モードではテンプレートが描画されないので、すべてのアクションで `render` か `redirect_to` を呼ばないと、[[http|HTTP]] のステータスコード 204 No Content が返る。

## キーワード

- [[ruby|Ruby]]
- [[ruby-on-rails|Ruby on Rails]]
- [[http|HTTP]]

## 参考

- https://arc.net/l/quote/exnhzvgp
- https://qiita.com/WisteriaWave/items/8c3eebfe8e57d2426c2c

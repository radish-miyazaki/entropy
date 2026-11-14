---
title: AHA Stack
aliases: []
description: Astro、htmx、Alpine.js を組み合わせ、ブラウザに HTML を送って Web アプリを作る技術スタック
tags: [word]
date: 2026-05-29
---

## TL;DR

[[astro|Astro]]、[[htmx|htmx]]、[[alpinejs|Alpine.js]] を組み合わせた技術スタック。重い JavaScript のアプリをブラウザで動かす代わりに、サーバから HTML を送って Web アプリを作る。

## 仕組み

バックエンドを Astro が担い、軽量なフロントエンドを htmx と Alpine.js で作る。クライアントは薄く保ち、JSON ではなく HTML をやり取りするハイパーメディアの考え方に立つ。UI の更新は HTML の断片（パーシャル）を送って行い、インタラクションには最小限の JavaScript だけを足す。依存も JavaScript も少なくし、宣言的に書くことを重視している。

## 出典

- [AHA Stack](https://ahastack.dev/)

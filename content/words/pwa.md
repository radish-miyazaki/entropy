---
title: PWA
aliases: [Progressive Web App]
description: HTML、CSS、JavaScript などの Web 技術で、モバイルアプリのような体験を提供する仕組み
tags: [word, web]
date: 2024-11-13
---

## TL;DR

[[html|HTML]]、[[css|CSS]]、[[javascript|JavaScript]] などの Web の技術を使って、Android や iOS のモバイルアプリのような体験を提供する仕組み。

## なぜ必要か

MDN によると、PWA は Web サイトと同じく 1 つのコードベースで複数のプラットフォームやデバイスで動きながら、プラットフォーム固有のアプリと同じように端末にインストールでき、オフラインやバックグラウンドで動き、端末や他のアプリと連携できる。

## 仕組み

PWA は、モバイルアプリと同じようにスマートフォンのホーム画面に追加できる。オフラインでも動かせるようにするには、[[service-worker|Service Worker]] を使う。

MDN によると、Web アプリマニフェストの `name`、`icons`、`display`、`start_url` などの項目で、PWA の名前や見た目、OS との統合のしかたを記述する。オフラインでは Cache API に保存したアセットを Service Worker が返す。Background Synchronization や Background Fetch を使うと、アプリが起動していなくても Service Worker で処理を続けられる。Push API や Notifications API で通知も出せる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[service-worker|Service Worker]]

## 出典

- [プログレッシブウェブアプリ - MDN Web Docs](https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps)
- [Progressive web apps - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)

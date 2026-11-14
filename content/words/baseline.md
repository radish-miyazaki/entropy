---
title: Baseline
aliases: []
description: Web の機能が主要ブラウザでどの程度使えるかを、3 つのステージで表す指標
tags: [word, web, ブラウザ]
date: 2025-02-06
---

## TL;DR

Web の機能を 3 つのステージに分類し、主要な[[web-browser|ブラウザ]]での互換性の状況を表す指標。[[mdn|MDN]] や [[can-i-use|Can I Use]] で確認できる。

## 仕組み

機能は次の 3 つのステージに分類される。

- Limited availability（利用可能性は限定的）: Baseline の基準を満たしておらず、まだすべてのブラウザで使えない
- Newly available（最近利用可能）: 対象ブラウザすべての最新の安定版で使える。古いブラウザや端末では動かないことがある
- Widely available（広く利用可能）: 対象ブラウザすべてで、少なくとも 30 か月（2.5 年）一貫して使える

対象ブラウザ（コアブラウザセット）は、Chrome（デスクトップ、Android）、Microsoft Edge（デスクトップ）、Firefox（デスクトップ、Android）、Safari（macOS、iOS）である。

Baseline の対象となる機能とそのステータスは、[web-features](https://web-platform-dx.github.io/web-features/web-features/) で管理されている。

## 注意点

Baseline はブラウザの対応状況の概要にすぎない。アクセシビリティ、パフォーマンス、セキュリティの検査の代わりにはならない。古い端末やブラウザのバージョン、OS の WebView、スクリーンリーダーなどの支援技術での動作は判断できないことがある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[can-i-use|Can I Use]]
- [[mdn|MDN]]

## 出典

- [Baseline（互換性） - MDN Web Docs 用語集](https://developer.mozilla.org/ja/docs/Glossary/Baseline/Compatibility)
- [Baseline の概要と、Baseline の情報を確認できるサイト - Qiita](https://qiita.com/debiru/items/1f4bfdfb5bbb0b9c5a3a)
- [Baseline は良いぞ - Speaker Deck](https://speakerdeck.com/mugi_uno/baseline-ha-iizo)
- [web-features](https://web-platform-dx.github.io/web-features/web-features/)

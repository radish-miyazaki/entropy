---
title: ECMAScript
aliases: [ES]
description: Ecma International の TC39 が策定する、JavaScript の標準規格（ECMA-262）
tags: [word, javascript]
date: 2026-11-14
---

## TL;DR

Ecma International が ECMA-262 として定める汎用プログラミング言語の標準規格。JavaScript の標準規格にあたる。技術委員会 TC39 が策定している。

## 仕組み

ECMA-262 の第 6 版（ECMAScript 2015）以降、毎年 6 月に新しい版が出ており、2026 年 6 月の第 17 版が ECMAScript 2026 である。正式な版は HTML 版で、次の版の草案は tc39.es/ecma262 で公開されている。なお、ECMA-262 の第 4 版は予約されたものの出版されなかった。

## 例

- [[babel|Babel]] は、最新の ECMAScript で書いたコードを、古いブラウザで動くコードに変換するために使われていた。
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目72 TypeScriptの独自機能の使用を避け、ECMAScriptの機能を使う|Effective TypeScript]] によると、現在の [[typescript|TypeScript]] は ECMAScript の機能をベースに型の機能を足す方針を取っている。ES2015 で入った標準のモジュールシステム（`import` / `export`）や、ES2022 で入ったプライベートフィールド（`#field`）のように、TypeScript 独自の機能より ECMAScript の機能を使うほうがよい。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[typescript|TypeScript]]
- [[babel|Babel]]

## 出典

- [ECMA-262 - Ecma International](https://ecma-international.org/publications-and-standards/standards/ecma-262/)
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目72 TypeScriptの独自機能の使用を避け、ECMAScriptの機能を使う]]

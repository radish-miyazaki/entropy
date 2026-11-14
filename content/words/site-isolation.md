---
title: サイト分離
aliases: [Site Isolation]
description: ブラウザが異なる Web サイトを別々のプロセスで実行し、サイト間の攻撃を防ぐセキュリティの仕組み
tags: [word, web, セキュリティ]
date: 2024-11-13
---

## TL;DR

[[web-browser|ブラウザ]]が、異なる Web サイトのリソースを別々の[[process|プロセス]]で実行することで、サイト間の攻撃を防ぐセキュリティの仕組み。

## なぜ必要か

2018 年に [[spectre|Spectre]] と [[meltdown|Meltdown]] の脆弱性が発表されてから、サイト分離の重要性は急に高まった。

Spectre は、CPU の[[speculative-execution|投機的実行]]を悪用し、[[side-channel-attack|サイドチャネル攻撃]]で機密データを漏らす攻撃である。投機的実行とは、CPU がプログラムの命令を実行するときに、この先の命令を予測して前もって実行する機能である。攻撃者は、あるプロセスの投機的実行で機密データを CPU のキャッシュメモリに読み込ませ、別のプロセスからキャッシュの情報を参照して、その機密データを読み取る。

Meltdown は、CPU の保護機構をすり抜けて、カーネルメモリにアクセスできる脆弱性である。通常、アプリケーションは OS のカーネルメモリにアクセスできないように保護されている。

## 仕組み

異なるプロセスはそれぞれ独立したメモリ空間を持つので、異なるサイトで動くプログラムが互いに干渉することはない。現在のブラウザはマルチプロセスアーキテクチャを採用しており、サイトの単位でプロセスを分けることが多い。

**[[url-scheme|スキーム]]と、有効なトップレベルドメインとその 1 つ上のドメイン（eTLD+1）が同じであれば、同じサイト（Same-site）とみなし、同じプロセスで実行する。** 異なるサイトのことを Cross-site と呼ぶ。

## 例

| URL 1                         | URL 2                         | 同じサイトか                      |
| ----------------------------- | ----------------------------- | --------------------------------- |
| `https://www.example.com:443` | `https://www.evil.com:443`    | Cross-site（eTLD+1 が異なる）     |
| `https://www.example.com:443` | `https://abc.example.com:443` | Same-site                         |
| `https://www.example.com:443` | `http://www.example.com:443`  | Cross-site（スキームが異なる）    |
| `https://www.example.com:443` | `https://www.example.com:80`  | Same-site（ポート番号は関係ない） |

## 注意点

サイトはオリジンとは判定の基準が違う。[[same-origin-policy|同一生成元ポリシー]]のオリジンは[[port-number|ポート番号]]やサブドメインの違いも区別するが、サイトはそれらを区別しない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[same-origin-policy|同一生成元ポリシー]]
- [[process|プロセス]]
- [[how-browsers-work|ブラウザの仕組み]]

## 出典

- [Site Isolation - Chrome for Developers](https://developer.chrome.com/blog/site-isolation?hl=ja)
- [Mitigating Spectre with Site Isolation in Chrome - Google Online Security Blog](https://security.googleblog.com/2018/07/mitigating-spectre-with-site-isolation.html)
- [Spectre と Meltdown についての富士通のコラム](https://www.fujitsu.com/jp/solutions/business-technology/security/secure/column/201802-1/)

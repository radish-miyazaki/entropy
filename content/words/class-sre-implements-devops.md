---
title: class SRE implements DevOps
aliases: []
description: DevOps を実現する方法の 1 つが SRE である、という Google の考え方
tags: [word, sre, devops]
date: 2024-11-06
---

## TL;DR

Google が [[sre|SRE]] について述べた考え方。「[[devops|DevOps]] を実現する方法の 1 つが SRE である」という意味である。

## 仕組み

直訳すると「SRE クラスは DevOps（インタフェース）を実装する」となる。プログラミングのクラスとインタフェースの関係になぞらえて、SRE が DevOps を実現する具体的な方法の 1 つであることを表している。

The Site Reliability Workbook の「How SRE Relates to DevOps」では、DevOps をサイロを壊すための緩やかな実践・指針・文化の集まりとし、SRE をその中で特定の実践を定めた職務の役割だとしている。そのうえで「class SRE implements interface DevOps」と表現している。同書は DevOps の柱を CALMS（Culture、Automation、Lean、Measurement、Sharing）の 5 つにまとめ、SRE がそれぞれをどう実現するかを示している。たとえば、自動化については運用をソフトウェアの問題として扱い、手作業（トイル）を減らす。計測については、100% の可用性を目指さず、[[slo|SLO]] で目標を決めて管理する。

書籍 Site Reliability Engineering の序章でも、SRE を「いくつかの独自の拡張を持つ、DevOps の具体的な実装」と見ることができると述べている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[sre|SRE]]
- [[devops|DevOps]]

## 出典

- [How SRE Relates to DevOps - The Site Reliability Workbook](https://sre.google/workbook/how-sre-relates/)
- [Introduction - Site Reliability Engineering](https://sre.google/sre-book/introduction/)

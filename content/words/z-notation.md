---
title: Z 言語
aliases: [Z notation]
description: ソフトウェアの仕様を書くための形式的な仕様記述言語
tags: [word, 形式手法]
date: 2025-01-17
---

## TL;DR

ソフトウェアの仕様を書くための、形式的な仕様記述言語である。[[formal-methods|形式手法]]の代表的な技法の 1 つである。

## 仕組み

Wikipedia によると、Z 言語はコンピュータシステムの記述とモデリングに使う。プログラムの仕様を簡明に書くことと、意図した振る舞いの証明を形式化することに焦点を当てている。

公理的集合論、[[lambda-calculus|ラムダ計算]]、一階述語論理の標準的な数学の記法にもとづく。すべての式に型が付いているので、素朴集合論のパラドックスのいくつかを避けられる。よく使う数学的な関数と述語は、「数学的ツールキット」として標準のカタログにまとめられている。

1977 年に Jean-Raymond Abrial が、Steve Schuman と Bertrand Meyer の助けを得て開発した。その後、オックスフォード大学のプログラミング研究グループで開発が続いた。2002 年に ISO/IEC 13568:2002 として標準化された。

## 例

IBM の CICS プロジェクトで使われた。ツールには、Community Z Tools（CZT）、オープンソースの ZETA、Mike Spivey の型検査器 Fuzz などがある。

## 注意点

多くの非 ASCII 記号を使う。ISO の規格には、ASCII や LaTeX で書く方法の提案も含まれている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[formal-methods|形式手法]]
- [[alloy|Alloy]]
- [[tla-plus|TLA+]]

## 出典

- [Z言語 - Wikipedia](https://ja.wikipedia.org/wiki/Z言語)

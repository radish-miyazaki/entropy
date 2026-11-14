---
title: 偶有的複雑性
aliases: [Accidental Complexity]
description: 本質的複雑性と対になる複雑さ
tags: [word, 複雑さ]
date: 2025-06-14
---

## TL;DR

[[essential-complexity|本質的複雑性]]と対になる[[complexity|複雑さ]]。Fred Brooks は論文「No Silver Bullet」で、ソフトウェアの難しさを本質と偶有に分け、偶有を「今の作り方に伴うが、ソフトウェアに本来備わってはいない難しさ」とした。

## なぜ必要か

Brooks によると、ソフトウェア開発のこれまでの大きな進歩は、偶有的な難しさを取り除いたものだった。本質と偶有を分けて考えると、ある技術がどちらの難しさを減らすのかを見極められる。

## 例

Brooks は偶有的な難しさを取り除いた進歩として次の 3 つを挙げている。

- 高水準言語: プログラムの論理には含まれない、機械語レベルの細部からプログラムを解放した
- タイムシェアリング: バッチ処理で結果を待つ時間の長さを減らした
- 統合されたプログラミング環境（Unix、Interlisp）: 共通のライブラリ、ファイル形式、パイプで、個々のプログラムを組み合わせて使うときの難しさを減らした

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[essential-complexity|本質的複雑性]]
- [[complexity|複雑さ]]

## 出典

- [[ドメインモデリングにおける抽象の役割、tagless-finalによるDSL構築、そして型安全な最適化]]
- Frederick P. Brooks, Jr., "No Silver Bullet: Essence and Accidents of Software Engineering", IEEE Computer, Vol. 20, No. 4, 1987（[本文](https://www.cgl.ucsf.edu/Outreach/pc204/NoSilverBullet.html)）

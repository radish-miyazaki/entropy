---
title: コンウェイの法則
aliases: []
description: システムを設計する組織は、組織のコミュニケーション構造をコピーした設計を生み出すという法則
tags: [word, アーキテクチャ, 組織]
date: 2023-12-07
---

## TL;DR

システムを設計する組織は、その組織のコミュニケーション構造をコピーした構造の設計を生み出す、という法則。Mel Conway が 1968 年に Datamation 誌の論文「How Do Committees Invent?」で示した。

## なぜ必要か

組織の形がアーキテクチャに表れることを知っていると、チームの分け方とシステムの分け方を一緒に考えられる。[[Clean Architecture（書籍）|Clean Architecture]] では、チームや利害関係者の多い組織では、開発中にチームが互いに干渉しないよう、各チームの作業を独立させられるアーキテクチャが必要だとしている。

## 仕組み

チームが独立して動くには、システムを単独で開発できるコンポーネントに分割し、それぞれをチームに割り当てる必要がある。結果として、システムの構造はチームの構造、つまり組織のコミュニケーション構造をなぞることになる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[inverse-conway-maneuver|逆コンウェイの法則]]: この法則を逆手に取り、目指すアーキテクチャに合わせて先に組織を設計する
- [[single-responsibility-principle|単一責任の原則]]: コンウェイの法則から導かれる当然の帰結である。「変更の理由」とは人間である。

## 出典

- [[Clean Architecture（書籍）|Clean Architecture]]
- [Conway's Law - Mel Conway](http://www.melconway.com/Home/Conways_Law.html)
- [「変更の理由」とは人間である](https://ky-yk-d.hatenablog.com/entry/2019/03/14/080002)

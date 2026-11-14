---
title: 設定より規約
aliases: [CoC]
description: フレームワークが決めた規約に従うことで、ありふれた決めごとを毎回設定しなくて済むようにする考え方
tags: [word, 設計, ruby]
date: 2026-11-14
---

## TL;DR

フレームワークが決めた既定の規約に従うことで、ありふれた決めごとを毎回自分で決めたり設定したりしなくて済むようにする考え方。[[ruby-on-rails|Ruby on Rails]] の設計思想（Rails Doctrine）の 1 つである。

## なぜ必要か

Rails Doctrine によると、主キーの名前を `id` にするか `postId` にするかといった決めごとは、プロジェクトのたびに考え直す必要がない。規約に任せれば、繰り返しの判断にかかる時間を本当に大事なことに回せる。規約を共有していると、より深い抽象化も作りやすい。初心者も、すべての理由を知らないまま動くアプリケーションを作れる。

## 例

Rails では、`Person` クラスは語形変化の規則によって `people` テーブルに対応づけられるので、この対応を設定する必要がない。`has_many :people` と書けば、同じ規則で `Person` クラスが探される。

## 注意点

規約は絶対ではない。Rails Doctrine も、難しいのは規約から外れるべきときを見極めることだと述べている。

[[ash-framework|Ash Framework]] は逆に「規約より設定」に立ち、ファイル名や置き場所から意味を決める暗黙のルールに頼らず、すべてを明示的に設定する。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[ruby-on-rails|Ruby on Rails]]
- [[ash-framework|Ash Framework]]

## 出典

- [The Rails Doctrine](https://rubyonrails.org/doctrine)

---
title: BDD
aliases: [Behavior Driven Development]
description: Behavior Driven Development（振る舞い駆動開発）の略
tags: [word, テスト]
date: 2023-12-17
---

## TL;DR

Behavior Driven Development（振る舞い駆動開発）の略。Dan North が、テスト駆動開発（TDD）を「テスト」ではなく「振る舞い」の言葉で捉え直して広めた開発手法である。

## なぜ必要か

Dan North の記事「Introducing BDD」によると、TDD を学び始めた開発者は、どこから始めるか、何をテストするか、テストにどう名前を付けるかで迷うことが多かった。North は、TDD への誤解の多くが「テスト」という言葉から来ていると考え、「振る舞い」に置き換えて迷いを減らそうとした。

## 仕組み

テストメソッドの名前は、「（このクラスは）〜すべき（should）」で始まる文として書く。名前が文にならなければ、その振る舞いは別のクラスに属するのかもしれない。次に書く振る舞いは、「システムがまだできないことのうち、最も重要なことは何か」という問いから決める。

North と Chris Matts は、同じ考え方を要件にも広げた。ストーリーの振る舞いは受け入れ基準であり、Given（前提となる状況）、When（起きるイベント）、Then（期待する結果）の形のシナリオで書く。たとえば「口座が黒字のとき、顧客が現金を引き出すと、現金が支払われる」のように書く。シナリオの語彙には[[domain-driven-design|ドメイン駆動設計]]の[[ubiquitous-language|ユビキタス言語]]の考え方を取り入れ、ビジネスの言葉がコードまで届くようにしている。

## 例

BDD のためのテスティングフレームワークに、[[rspec|RSpec]]、[[go|Go]] の [[ginkgo|Ginkgo]]、[[shellspec|ShellSpec]] がある。

North 自身も、テストの語彙の代わりに「should」で始まる振る舞いを書く、JUnit に似たフレームワーク JBehave を作った。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[rspec|RSpec]]
- [[ginkgo|Ginkgo]]
- [[shellspec|ShellSpec]]
- [[ubiquitous-language|ユビキタス言語]]

## 出典

- [Introducing BDD - Dan North & Associates](https://dannorth.net/blog/introducing-bdd/)

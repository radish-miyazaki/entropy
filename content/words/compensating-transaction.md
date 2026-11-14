---
title: 補償トランザクション
aliases: [補償アクション]
description: 結果整合性で進める処理の途中で失敗したとき、完了済みのステップの効果を打ち消す操作
tags: [word, アーキテクチャ, 分散システム]
date: 2026-11-14
---

## TL;DR

[[eventual-consistency|結果整合性]]で進める一連の処理の途中でステップが失敗したとき、完了済みのステップの効果を打ち消す操作。データストアのトランザクションでロールバックできない場面で使う。

## なぜ必要か

Microsoft の Azure Architecture Center によると、分散した環境では、競合を避けて性能を上げるために、強いトランザクション整合性ではなく結果整合性を採ることが多い。この場合、業務の処理は別々のステップの連なりになり、途中で失敗したら完了済みのステップを取り消す必要がある。しかし、ほかの処理が同時にデータを変えているかもしれないので、単純にロールバックできるとは限らない。

[[Domain Modeling Made Functional 第12章 トランザクションを扱う|Domain Modeling Made Functional 第12章]] によると、異なる RDBMS や外部サービスをまたぐ場合は、データストアのトランザクションを使えない。そこで、大抵の処理はうまくいくと想定したうえで、不整合を見つける調整プロセスと、エラーを打ち消す補償アクションを用意する。

## 仕組み

元の処理の各ステップを実行しながら、そのステップの情報と取り消し方を記録しておく。失敗したら、記録をもとに完了済みのステップを取り消していく。取り消しは元の処理と逆の順番である必要はなく、並列に実行できることもある。

## 例

[[Domain Modeling Made Functional 第6章 異なるコンテキスト間での整合性|Domain Modeling Made Functional 第6章]] では、注文をキャンセルして商品の返送を求めたり、返金したりする例を挙げている。Azure Architecture Center の例では、旅行サイトで航空券を予約したあとにホテルの予約に失敗した場合、航空券をすべて取り消すより、別のホテルを勧めるほうがよい場合もある。

## 注意点

Azure Architecture Center によると、補償トランザクションはアプリケーションに固有で、一般化しにくい。元の状態に戻すのではなく、失敗するまでに完了した作業を打ち消すものである。補償トランザクション自体も失敗しうるので、各ステップを冪等なコマンドとして定義し、繰り返し実行できるようにする。航空券の取り消しでも全額が返金されるとは限らないように、業務に固有のルールが必要になることもある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[saga|サーガ]]
- [[eventual-consistency|結果整合性]]
- [[acid|ACID]]

## 出典

- [Compensating Transaction pattern - Azure Architecture Center](https://learn.microsoft.com/en-us/azure/architecture/patterns/compensating-transaction)
- [[Domain Modeling Made Functional 第6章 異なるコンテキスト間での整合性|Domain Modeling Made Functional 第6章 異なるコンテキスト間での整合性]]
- [[Domain Modeling Made Functional 第12章 トランザクションを扱う|Domain Modeling Made Functional 第12章 トランザクションを扱う]]

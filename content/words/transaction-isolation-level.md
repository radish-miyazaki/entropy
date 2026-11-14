---
title: トランザクション分離レベル
aliases: [Transaction Isolation Level]
description: 同時に実行されるトランザクションどうしが、互いの変更をどこまで見えるかを決める設定
tags: [word, トランザクション]
date: 2024-10-10
---

## TL;DR

同時に実行される[[transaction|トランザクション]]どうしが、互いの変更をどこまで見えるかを決める設定。SQL 標準は Read Uncommitted、Read Committed、Repeatable Read、Serializable の 4 つを定めており、後ろほど厳しい。

## なぜ必要か

トランザクションを並行して実行すると、次のような現象が起こりうる。分離レベルを上げるほど、これらが起きなくなる。

- ダーティリード: コミットされていない他のトランザクションが書いたデータを読む
- 反復不能読み取り: 一度読んだデータを読み直すと、その間にコミットされた他のトランザクションによって変わっている
- ファントムリード: 同じ条件で検索し直すと、他のトランザクションのコミットによって、条件に合う行の集合が変わっている
- 直列化異常: 複数のトランザクションをコミットした結果が、それらを 1 つずつ順に実行したどの場合とも一致しない

Serializable は、並行に実行しても、何らかの順で 1 つずつ実行したのと同じ結果になることを保証する。

## 仕組み

[[postgresql|PostgreSQL]] で各レベルに起こりうる現象は次のとおり。

| 分離レベル       | ダーティリード | 反復不能読み取り | ファントムリード | 直列化異常 |
| ---------------- | -------------- | ---------------- | ---------------- | ---------- |
| Read Uncommitted | 起きない※      | 起こりうる       | 起こりうる       | 起こりうる |
| Read Committed   | 起きない       | 起こりうる       | 起こりうる       | 起こりうる |
| Repeatable Read  | 起きない       | 起きない         | 起きない※        | 起こりうる |
| Serializable     | 起きない       | 起きない         | 起きない         | 起きない   |

※ SQL 標準では許されているが、PostgreSQL では起きない。

PostgreSQL のデフォルトは Read Committed である。Read Uncommitted を指定しても、Read Committed として扱われる。

## 注意点

PostgreSQL の Repeatable Read と Serializable では、直列化の失敗でトランザクションがエラーになることがある。アプリケーションは、そのトランザクションをやり直せるようにしておく必要がある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[transaction|トランザクション]]
- [[acid|ACID]]
- [[postgresql|PostgreSQL]]

## 出典

- [PostgreSQL Documentation: Transaction Isolation](https://www.postgresql.org/docs/current/transaction-iso.html)
- [PostgreSQL 9.1 文書: トランザクションの分離](https://www.postgresql.jp/document/9.1/html/transaction-iso.html)
- [トランザクション分離レベルの解説（Qiita）](https://qiita.com/song_ss/items/38e514b05e9dabae3bdb)
- [PostgreSQL のトランザクション分離レベルの解説（Zenn）](https://zenn.dev/bellwood4486/articles/postgresql-trans-iso-level)
- [トランザクション分離レベルの解説（Zenn）](https://zenn.dev/inaki/articles/3b17e38cb8ff34)

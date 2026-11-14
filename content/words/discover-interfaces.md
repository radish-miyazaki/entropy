---
title: インタフェースは発見するのではなく、見つけ出せ
aliases: []
description: インタフェースは前もって設計するのではなく、必要になったときに見つけ出すべきだという Rob Pike の言葉
tags: [word, 設計]
date: 2024-09-03
---

## TL;DR

[[interface|インタフェース]]は前もって設計するのではなく、実際に必要になったときに見つけ出すべきだ、という Rob Pike の言葉。

> Don’t design with interfaces, discover them.

## なぜ必要か

[[go|Go]] の文脈で出てきた言葉だが、他の言語にも当てはまる。次のように言い換えられることもある。

> abstractions should be discovered, not created
> （[[abstraction|抽象化]]は作成するものではなく、発見するものである）

必要もないのに前もってインタフェースを作ると、[[interface-pollution|インタフェース汚染]]につながる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[interface-pollution|インタフェース汚染]]
- [[abstraction|抽象化]]

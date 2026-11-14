---
title: Typed Racket を REPL から利用する
description: racket -I typed/racket で起動すると、REPL で Typed Racket を使える
tags: [blog, racket, repl, typed-racket]
date: 2025-05-24
draft: false
---

## TL;DR

- `racket -I typed/racket` で起動すると、[[racket|Racket]] の REPL で [[typed-racket|Typed Racket]] を使える。

## 検証

[Typed Racket のガイド](<https://docs.racket-lang.org/ts-guide/quick.html#(part._.Using_.Typed_.Racket_from_the_.Racket_.R.E.P.L)>)にあるように、`-I` オプションで言語を指定して REPL を起動する。

```sh
$ racket -I typed/racket
```

## キーワード

- [[racket|Racket]]
- [[typed-racket|Typed Racket]]

## 参考

- <https://docs.racket-lang.org/ts-guide/quick.html#(part._.Using_.Typed_.Racket_from_the_.Racket_.R.E.P.L)>

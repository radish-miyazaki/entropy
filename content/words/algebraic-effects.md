---
title: Algebraic Effects
aliases: [代数的エフェクト]
description: 例外、状態、入出力などの副作用を、それを起こす操作と、操作に意味を与えるハンドラに分けて扱う考え方
tags: [word, 関数型プログラミング]
date: 2026-11-14
---

## TL;DR

例外、状態、非決定性、入出力などの計算上の作用（エフェクト）を、それを起こす操作の集まりとして扱う考え方。操作に意味を与える側をハンドラ（Algebraic Effect Handlers）と呼ぶ。Gordon Plotkin と Matija Pretnar が、例外ハンドラを任意の Algebraic Effects に一般化した。

## なぜ必要か

Plotkin と Pretnar の論文「Handling Algebraic Effects」によると、例外、状態、非決定性、対話的な入出力、時間などは Algebraic Effects として表せるが、例外の処理だけはそれまで代数的に扱われていなかった。ハンドラを一般化すると、タイムアウト、ロールバック、ストリームのリダイレクトなども同じ仕組みで書ける。

## 仕組み

[[ocaml|OCaml]] 5 のエフェクトハンドラでは、ユーザが定義した操作を `perform` で起こし、それを囲むハンドラが意味を与える。例外ハンドラと違い、ハンドラは中断した計算を[[continuation|継続]] `k` として受け取る。`continue k v` で、`perform` した地点に値 `v` を返して計算を再開できる。

## 例

```ocaml
type _ Effect.t += Xchg: int -> int t
let comp1 () = perform (Xchg 0) + perform (Xchg 1)

try comp1 () with
| effect (Xchg n), k -> continue k (n+1)
(* 結果は 1 + 2 = 3 *)
```

OCaml ではこの仕組みで軽量スレッドのスケジューラやジェネレータを OCaml 自身で書ける。[[unison|Unison]] は、Ability と呼ぶ Algebraic Effects で副作用を書く。

## 注意点

OCaml のエフェクトハンドラは、Eff や Koka と違い、すべてのエフェクトが処理されることをコンパイラが静的に確かめない。継続は必ずちょうど 1 回再開する必要があり、2 回再開すると例外になる。再開しない継続はメモリや資源を漏らす。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[continuation|継続]]
- [[monad|モナド]]
- [[ocaml|OCaml]]
- [[unison|Unison]]

## 出典

- [Handling Algebraic Effects - arXiv](https://arxiv.org/abs/1312.1399)
- [Effect handlers - OCaml Manual](https://ocaml.org/manual/5.3/effects.html)
- [[unison-language|プログラミング言語 Unison を知る]]

---
title: 驚き最小の原則
aliases: [POLA, 驚き最小の法則]
description: システムの構成要素は、ほとんどの利用者が期待するとおりに振る舞うべきだという設計原則
tags: [word, 設計]
date: 2026-11-14
---

## TL;DR

システムの構成要素は、ほとんどの利用者が期待するとおりに振る舞い、利用者を驚かせるべきではない、という UI とソフトウェアの設計原則。驚き最小の法則（Law of Least Astonishment）として、1967 年の PL/I Bulletin で初めて言及された。

## なぜ必要か

利用者がすでに持っている知識を生かせるので、学ぶ手間が減る。Wikipedia によると、1972 年の文献では「システムのすべての構文は、その構文が示すとおりに振る舞うべきだ」と書かれている。

## 仕組み

インタフェースの要素どうしが矛盾したり曖昧だったりするときは、プログラムの内部を知っている人にとって自然な振る舞いではなく、利用者が最も驚かない振る舞いを選ぶ。どうしても必要な機能が利用者を大きく驚かせるなら、その機能を設計し直すことも考える。API では、関数やメソッドの名前をその振る舞いと一致させる。

本の中では、この原則が次のように使われている。

- [[A Philosophy of Software Design 第18章 Code Should Be Obvious|A Philosophy of Software Design 第18章]] では、読み手が期待しない振る舞い（コンストラクタが別のスレッドで動き続けるなど）をするなら、インタフェースか呼び出しの直前にコメントで書くとしている
- [[Effective Rust 項目28 宣言的マクロを利用する上で注意すべきこと|Effective Rust 項目28]] では、マクロの中の `return` などで呼び出し側の関数から意図せず抜けるのはこの原則に反するので、マクロの挙動を通常の [[rust|Rust]] と一致させるよう勧めている

## 例

多くのデスクトップ環境では、F1 キーでヘルプが開く。利用者はこれを期待しているので、F1 を別の機能に割り当てると驚かせることになる。また、JavaScript はかつて `0` で始まる文字列を 8 進数として解釈していたので、混乱やバグを生んだ。この挙動は ECMAScript 3 で非推奨になり、ECMAScript 5 で削除された。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[interface|インタフェース]]
- [[macro|マクロ]]

## 出典

- [Principle of least astonishment - Wikipedia](https://en.wikipedia.org/wiki/Principle_of_least_astonishment)
- [[A Philosophy of Software Design 第18章 Code Should Be Obvious|A Philosophy of Software Design 第18章 Code Should Be Obvious]]
- [[Effective Rust 項目28 宣言的マクロを利用する上で注意すべきこと|Effective Rust 項目28 宣言的マクロを利用する上で注意すべきこと]]

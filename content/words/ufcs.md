---
title: UFCS
aliases: [Uniform Function Call Syntax, 統一関数呼び出し構文]
description: 関数呼び出しをメソッド呼び出しのように書ける構文
tags: [word, プログラミング言語]
date: 2025-01-22
---

## TL;DR

Uniform Function Call Syntax（統一関数呼び出し構文）の略。関数呼び出しをメソッド呼び出しのように書ける構文で、たとえば `foo(bar(a))` は `a.bar().foo()` と同じ意味になる。

## なぜ必要か

入れ子になった関数呼び出しを、処理の流れに沿って左から右へ読める連鎖として書ける。[[dlang|D]] では、複数のアルゴリズムを組み合わせてレンジを処理するときに特に役立ち、コードが読みやすくなる。

## 仕組み

D のコンパイラは `a.bar()` という記述を見つけると、まず `bar` というメンバ関数（メソッド）を探す。なければ、最初の引数が `a` の型に合うグローバル関数を探す。

## 例

[[dlang|D]] や [[nim|Nim]] が UFCS を採用している。D では、引数のない関数呼び出しの括弧を省略することもできる。

```d
import std.uni : toLower;
"D rocks".toLower; // "d rocks"

import std.algorithm : group;
import std.range : chain, retro, front, dropOne;
[1, 2].chain([3, 4]).retro; // 4, 3, 2, 1
[1, 1, 2, 2, 2].group.dropOne.front; // tuple(2, 3u)
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[dlang-tour|DLang Tour]]
- [Uniform Function Call Syntax - mrsekut-p](https://scrapbox.io/mrsekut-p/Uniform_Function_Call_Syntax)

## 出典

- [Uniform Function Call Syntax - Wikipedia](https://ja.wikipedia.org/wiki/Uniform_Function_Call_Syntax)
- [Uniform Function Call Syntax (UFCS) - DLang Tour](https://tour.dlang.org/tour/ja/gems/uniform-function-call-syntax-ufcs)

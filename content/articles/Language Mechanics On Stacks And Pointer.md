---
title: Language Mechanics On Stacks And Pointer
description: Go のフレーム、スタック、値渡し、ポインタによる値の共有を解説した、ポインタとメモリに関する連載の第 1 回
tags: [article, go]
date: 2025-08-29
article-authors: [William Kennedy]
site: Ardan Labs
published: 2017-05-18
url: https://www.ardanlabs.com/blog/2017/05/language-mechanics-on-stacks-and-pointers.html
---

## TL;DR

- [[go|Go]] の関数はスタック上の自分のフレームしか直接触れず、引数は値渡しでコピーされる。
- ポインタの目的はフレームの外にある値を関数と共有し、読み書きできるようにすることだけである。

## 内容

ポインタ、スタック、ヒープ、エスケープ解析、値とポインタのセマンティクスを扱う 4 回連載の第 1 回で、スタックとポインタを扱う。

### フレームの境界

関数はそれぞれ自分のフレームの中で動き、フレームが関数専用のメモリ空間になる。関数が直接触れるのは自分のフレームだけで、外のメモリに触れるには、そのメモリを共有してもらう必要がある。引数は値渡しなので、呼び出し側で書いた値がそのまま受け取られ、コードが読みやすくなる。

プログラムが起動すると、ランタイムはメインの [[goroutine|goroutine]] を作る。Go 1.8 の時点では、各 goroutine は 2,048 バイトの連続したメモリを最初のスタックとして持ち、このスタックがフレームの物理的なメモリになる。

### 関数の呼び出しと戻り

`increment(count)` を呼ぶと、`count` の値が新しいフレームの引数 `inc` にコピーされる。`inc` を増やしても `main` の `count` は変わらない。

関数から戻っても、スタックのメモリは片付けられない。戻った関数のフレームは無効になり、呼び出し元のフレームが有効になるだけである。スタックのメモリは、フレームを解放するときではなく、新しいフレームを作るときにゼロ値で初期化される。

> All stack memory below the active frame is invalid but memory from the active frame and above is valid.

### 値の共有とポインタ

> Pointers serve one purpose, to share a value with a function so the function can read and write to that value even though the value does not exist directly inside its own frame.

著者はコードを読むときに `&` を「共有」と読むよう勧めている。すべての型には対応するポインタ型（`int` なら `*int`）があり、どのポインタ型も同じ大きさ（32 ビットで 4 バイト、64 ビットで 8 バイト）である。

`increment(&count)` のようにアドレスを渡し、`*inc++` で参照先を書き換えると、`main` のフレームにある値が変わる。ポインタ変数は特別なものではなく、アドレスを値として持つ普通の変数である。`*` には、ポインタ型の宣言と参照先へのアクセスという 2 つの役割がある。

## キーワード

- [[go|Go]]
- [[goroutine|goroutine]]
- スタック
- ポインタ
- 値渡し

%%

## 自分の理解

同意できる点、疑問に思った点、試してみたいこと。書くときはこのコメントを外す
%%

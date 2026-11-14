---
title: async/await
aliases: [async, await]
description: 非同期処理を、同期処理のような見た目で書くための構文。JavaScript や Rust などにある
tags: [word, 非同期処理]
date: 2026-11-14
---

## TL;DR

非同期処理を、同期処理のような見た目で書くための構文。`async` を付けた関数の中で `await` を使うと、結果が出るまでその場で処理を中断し、結果が出たら続きから再開する。JavaScript や [[rust|Rust]] などにある。

## なぜ必要か

JavaScript では、Promise のチェーンを明示的に組まずに、Promise に基づく非同期の振る舞いをすっきり書ける。非同期のコードを普通の `try` / `catch` で囲んでエラーを扱える。[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目27 コールバックの代わりにasync関数を使用して型の流れを改善する|Effective TypeScript 項目27]] でも、Promise を直接使うより async/await を使うよう勧めている。

## 仕組み

JavaScript の async 関数は、常に Promise を返す。戻り値が Promise でなければ、暗黙に Promise で包まれる。`await` は、Promise が履行または拒否されるまで実行を中断し、解決された値を式の値にする。最初の `await` までは同期的に実行される。

Rust では、`async fn` を呼んでも本体は実行されず、本体と引数を包んだ Future が返る。Future は `.await` されるまで何もしない。結果がまだ出ていなければ、`.await` はスケジューラに制御を渡し、別のタスクを進めさせる。Future を動かすランタイムは言語に組み込まれておらず、Tokio などから選ぶ。[[Async Rust ―高いパフォーマンスと安全性を両立するRustによる非同期処理|Async Rust]] によると、コンパイラは async/await の記述を状態遷移マシンに書き換えるので、スタックを使わない低コストな非同期実行ができる。

## 例

```js
async function getProcessedData(url) {
  let v
  try {
    v = await downloadData(url)
  } catch (e) {
    v = await downloadFallbackData(url)
  }
  return processDataInWorker(v)
}
```

## 注意点

[[Async Rust ―高いパフォーマンスと安全性を両立するRustによる非同期処理 第1章 非同期プログラミング入門|Async Rust 第1章]] によると、[[thread|スレッド]]と async/await の違いは、スケジューリングの方式、スケジュールする主体、スタックの有無にある。async/await は[[non-preemptive|ノンプリエンプティブ]]で、OS を介さず[[user-space|ユーザ空間]]で切り替える。多くのアプリケーションはスレッドで十分である。Rust で `.await` を順に並べるだけでは並行にならないので、並行に動かすには `tokio::spawn` などでタスクを作る。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[thread|スレッド]]
- [[non-preemptive|ノンプリエンプティブ]]
- [[green-thread|グリーンスレッド]]

## 出典

- [async function - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [Async and await - Asynchronous Programming in Rust](https://rust-lang.github.io/async-book/part-guide/async-await.html)
- [[Async Rust ―高いパフォーマンスと安全性を両立するRustによる非同期処理|Async Rust ―高いパフォーマンスと安全性を両立するRustによる非同期処理]]
- [[Async Rust ―高いパフォーマンスと安全性を両立するRustによる非同期処理 第1章 非同期プログラミング入門|Async Rust 第1章 非同期プログラミング入門]]

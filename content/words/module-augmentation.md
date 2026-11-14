---
title: モジュールオーグメンテーション
aliases: []
description: 既存のモジュールの型宣言に、宣言を追加してパッチを当てる TypeScript の機能
tags: [word, typescript]
date: 2026-11-14
---

## TL;DR

既存のモジュールの型宣言に、あとから宣言を追加してパッチを当てる [[typescript|TypeScript]] の機能。`declare module "<モジュール名>"` の中に書いた宣言が、元の宣言とマージされる。

## なぜ必要か

TypeScript Handbook によると、JavaScript のモジュールは宣言のマージに対応していないが、モジュールを import してから既存のオブジェクトを書き換えることはできる。ただし、そうして足したメソッドをコンパイラは知らない。モジュールオーグメンテーションを使うと、追加したものをコンパイラに伝えられる。

## 仕組み

モジュール名は、`import` や `export` のモジュール指定子と同じ方法で解決される。オーグメンテーションの中の宣言は、元のファイルで宣言されたかのように[[declaration-merging|宣言のマージ]]が行われる。モジュールの中から `declare global` を使うと、グローバルスコープにも宣言を足せる。

## 例

TypeScript Handbook の例では、`Observable` クラスに `map` メソッドを足し、その型を `declare module` で伝えている。

```ts
// map.ts
import { Observable } from "./observable"

declare module "./observable" {
  interface Observable<T> {
    map<U>(f: (x: T) => U): Observable<U>
  }
}
Observable.prototype.map = function (f) {
  // ...
}
```

[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目66 型宣言の依存関係に関わる3つのバージョンを理解する|Effective TypeScript]] では、ライブラリを更新したのに [[definitely-typed|DefinitelyTyped]] の `@types` にまだ変更が反映されていないとき、モジュールオーグメンテーションで新しい関数やメソッドを足す方法を紹介している。

## 注意点

TypeScript Handbook によると、オーグメンテーションでは新しいトップレベルの宣言は作れず、既存の宣言へのパッチだけを書ける。default export も拡張できず、名前付きの export だけが対象になる。

[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目71 モジュールオーグメンテーションを使って型を改善する|Effective TypeScript]] によると、モジュールオーグメンテーションは実行時の動作に影響しない。実行時の挙動を反映しない型を足すと読み手が混乱するおそれがあるので、なるべく使わない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[declaration-merging|宣言のマージ]]
- [[declaration-file|型宣言ファイル]]
- [[definitely-typed|DefinitelyTyped]]

## 出典

- [Declaration Merging - TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/declaration-merging.html)
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目71 モジュールオーグメンテーションを使って型を改善する|Effective TypeScript 第2版 項目71 モジュールオーグメンテーションを使って型を改善する]]

---
title: なぜ多くの言語はHigher Kinded Typesをサポートしないのか
description: 型コンストラクタを引数に取る Higher Kinded Types を多くの言語がサポートしない理由を、実装の複雑さと実用上の必要性から説明する発表
tags: [talk]
date: 2026-07-10
speakers: []
company:
event: "[[関数型まつり 2026]]"
held: 2026-07-12
slide: https://drive.google.com/file/d/1KT197ocDzdOqMba87QZG3cP68jT3rMEi/view
video:
---

## TL;DR

- [[higher-kinded-types|Higher Kinded Types]]（HKTs）は型コンストラクタを引数に取る型で、実装が複雑になりコンパイルも遅くなるので、多くの言語はサポートしていない。
- 多くの実用アプリケーションは HKTs なしで困っておらず、増えるボイラープレートも今は AI が書ける。

## 内容

[[higher-kinded-types|Higher Kinded Types]]（HKTs）とは、`Functor[F[_]]` のように型コンストラクタを引数に取る型である。

実装自体が複雑になり、コンパイルも遅くなるので、ほとんどの言語は HKTs をサポートしていない。具体的には、高階単一化が必要になることや、暗黙の解決（型クラスの解決）が複雑になることが挙げられた。実装するなら、パターン単一化を使う、ヒューリスティックに頼る、ユーザに型注釈を求めるといった方法がある。ランタイムの負荷も問題になる。

一方で、HKTs がなくても回る。多くの実用アプリケーションは HKTs なしで困っていない。ボイラープレートは増えるが、今は AI がコードを書くので、この点は問題になりにくい。それでも型で保証したい場面は残る。

## キーワード

- [[higher-kinded-types|Higher Kinded Types]]

%%

## 自分の理解

自社に持ち帰れそうな点、疑問に思った点。書くときはこのコメントを外す
%%

## 関連

- [プロポーザル](https://fortee.jp/2026fp-matsuri/proposal/a7a9001c-b880-49ac-b2c5-1a9fedbccc12)

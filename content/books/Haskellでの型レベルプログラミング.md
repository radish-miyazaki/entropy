---
title: Haskellでの型レベルプログラミング
aliases: [Haskell での型レベルプログラミング]
description: 型とカインドの基本から、シングルトンパターンによる依存型の模倣と定理証明までを扱う Haskell の型レベルプログラミングの解説書
tags: [book, haskell]
date: 2025-01-22
book-authors: []
publisher: だめぽラボ
isbn:
---

## TL;DR

- [[haskell|Haskell]] での型レベルプログラミングの解説書である。型とカインドの基本から入り、依存型を模倣するシングルトンパターンを目指す。[[theorem-proving|定理証明]]も扱う。
- Zenn で公開している同名の本に加筆したもので、「型レベルリスト」「定理証明の代償」「Dependent Haskellへの展望」の章が加わっている。

## 目次

1. はじめに
2. 第1章 型とカインド
3. 第2章 幽霊型と`Proxy`
4. 第3章 発展：カインド多相
5. 第4章 データ型の昇格（`DataKinds`拡張）
6. 第5章 型レベル関数と型族、型演算子
7. 第6章 型レベル計算の結果を実行時に利用する：型クラス
8. 第7章 一般化された代数的データ型 (GADT)
9. 第8章 復習・小まとめ
10. 第9章 シングルトン型と依存型の模倣
11. 第10章 定理証明
12. 第11章 応用：`Constraint`カインド
13. 第12章 応用：GHCの型レベル自然数（`Nat`カインド）
14. 第13章 応用：GHCの型レベル文字列（`Symbol`カインド）
15. 第14章 応用：`GHC.Generics`
16. 第15章 応用：型レベルリスト
17. 第16章 応用：実行時型情報（`Typeable`）
18. 第17章 定理証明の代償
19. 第18章 Dependent Haskellへの展望
20. あとがき

%%

## 感想

全体を通しての評価や気づき。書くときはこのコメントを外す
%%

## 関連

- [[haskell|Haskell]]
- [Web 版](https://lab.miz-ar.info/haskell-type-level/)
- [技術書典の販売ページ](https://techbookfest.org/product/pSkKL5JZYBeUXZDQ3Y0f4M?productVariantID=hTDDFsnU92DjiQ71tp5q03)

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
2. 型とカインド
3. 幽霊型と`Proxy`
4. 発展：カインド多相
5. データ型の昇格（`DataKinds`拡張）
6. 型レベル関数と型族、型演算子
7. 型レベル計算の結果を実行時に利用する：型クラス
8. 一般化された代数的データ型 (GADT)
9. 復習・小まとめ
10. シングルトン型と依存型の模倣
11. 定理証明
12. 応用：`Constraint`カインド
13. 応用：GHCの型レベル自然数（`Nat`カインド）
14. 応用：GHCの型レベル文字列（`Symbol`カインド）
15. 応用：`GHC.Generics`
16. 応用：型レベルリスト
17. 応用：実行時型情報（`Typeable`）
18. 定理証明の代償
19. Dependent Haskellへの展望
20. あとがき

%%

## 感想

全体を通しての評価や気づき。書くときはこのコメントを外す
%%

## 関連

- [[haskell|Haskell]]
- [Web 版](https://lab.miz-ar.info/haskell-type-level/)
- [技術書典の販売ページ](https://techbookfest.org/product/pSkKL5JZYBeUXZDQ3Y0f4M?productVariantID=hTDDFsnU92DjiQ71tp5q03)

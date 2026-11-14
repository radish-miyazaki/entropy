---
title: Effective Rust
aliases: ["Effective Rust ―Rustコードを改善し、エコシステムを最大限に活用するための35項目"]
description: Rust の入門書を読み終えた人に向けて、型・トレイト・所有権・依存ライブラリ・ツールなどの 35 項目で Rust らしい書き方を解説する本
tags: [book, rust]
date: 2024-12-10
book-authors: []
publisher: オライリー・ジャパン
isbn: 9784814400942
---

## TL;DR

- Google で Rust の実装に携わってきた著者が、[[rust|Rust]] らしいプログラミングの方法を 35 項目にまとめた本である。
- 所有、借用、生存期間、トレイトといった Rust 特有の概念を具体例で説明し、Cargo による依存ライブラリの管理や [[clippy|Clippy]] などのエコシステムの使い方も扱う。

## 対象読者

Rust の入門書を読み終えた読者向けの本である。

https://www.oreilly.co.jp/books/9784814400942/

原書は Web でも公開されている: https://www.lurklurk.org/effective-rust/title-page.html

## 目次

### 1章 型

1. [[Effective Rust 項目1 データ構造を表現するために型システムを用いよう|項目1 データ構造を表現するために型システムを用いよう]]
2. [[Effective Rust 項目2 型システムを用いて共通の挙動を表現しよう|項目2 型システムを用いて共通の挙動を表現しよう]]
3. [[Effective Rust 項目3 OptionとResultに対してはmatchを用いずに変換しよう|項目3 OptionとResultに対してはmatchを用いずに変換しよう]]
4. [[Effective Rust 項目4 標準のError型を使おう|項目4 標準のError型を使おう]]
5. [[Effective Rust 項目5 型変換を理解しよう|項目5 型変換を理解しよう]]
6. [[Effective Rust 項目6 newtypeパターンを活用しよう|項目6 newtypeパターンを活用しよう]]
7. [[Effective Rust 項目7 複雑な型にはビルダを使おう|項目7 複雑な型にはビルダを使おう]]
8. [[Effective Rust 項目8 参照型とポインタ型に慣れよう|項目8 参照型とポインタ型に慣れよう]]
9. [[Effective Rust 項目9 明示的なループの代わりにイテレータ変換を使用することを検討しよう|項目9 明示的なループの代わりにイテレータ変換を使用することを検討しよう]]

### 2章 トレイト

10. [[Effective Rust 項目10 標準トレイトに習熟しよう|項目10 標準トレイトに習熟しよう]]
11. [[Effective Rust 項目11 RAIIパターンにはDropトレイトを実装しよう|項目11 RAIIパターンにはDropトレイトを実装しよう]]
12. [[Effective Rust 項目12 ジェネリクスとトレイトオブジェクトのトレードオフを理解しよう|項目12 ジェネリクスとトレイトオブジェクトのトレードオフを理解しよう]]
13. [[Effective Rust 項目13 デフォルト実装を用いて、実装しなければならないトレイトメソッドを最小限にしよう|項目13 デフォルト実装を用いて、実装しなければならないトレイトメソッドを最小限にしよう]]

### 3章 さまざまなコンセプト

14. [[Effective Rust 項目14 生存期間を理解しよう|項目14 生存期間を理解しよう]]
    - [[Effective Rust 項目14 単一 ／ 複数ライフタイム注釈を持つ構造体の違い|単一 / 複数ライフタイム注釈を持つ構造体の違い]]
    - [[Effective Rust 項目14 無名の生存期間（'_）|無名の生存期間（'_）]]
    - [[Effective Rust 項目14 データ構造の生存期間|データ構造の生存期間]]
    - [[Effective Rust 項目14 生存期間とヒープ|生存期間とヒープ]]
    - [[Effective Rust 項目14 'static ライフタイム|'static ライフタイム]]
    - [[Effective Rust 項目14 生存期間 のスコープ|生存期間 のスコープ]]
    - [[Effective Rust 項目14 生存期間の代数（ライフタイム注釈）|生存期間の代数（ライフタイム注釈）]]
15. [[Effective Rust 項目15 借用チェッカを理解しよう|項目15 借用チェッカを理解しよう]]
    - [[Effective Rust 項目15 借用チェッカのエラーを解消するにはまずエラーメッセージを読もう|借用チェッカのエラーを解消するにはまずエラーメッセージを読もう]]
    - [[Effective Rust 項目15 借用チェッカを念頭に置いてデータ構造を設計しよう|借用チェッカを念頭に置いてデータ構造を設計しよう]]
    - [[Effective Rust 項目15 スマートポインタを活用しよう|スマートポインタを活用しよう]]
    - [[Effective Rust 項目15 自己参照データ構造を避けよう|自己参照データ構造を避けよう]]
16. [[Effective Rust 項目16 unsafeコードを書かないようにしよう|項目16 unsafeコードを書かないようにしよう]]
17. [[Effective Rust 項目17 状態共有並列実行には気を付けよう|項目17 状態共有並列実行には気を付けよう]]
    - [[Effective Rust 項目17 データ競合 と Rust|データ競合 と Rust]]
    - [[Effective Rust 項目17 Send トレイトと Sync トレイト|Send トレイトと Sync トレイト]]
    - [[Effective Rust 項目17 デッドロック と Rust|デッドロック と Rust]]
18. [[Effective Rust 項目18 Don't panic|項目18 Don't panic]]
19. [[Effective Rust 項目19 リフレクションを避けよう|項目19 リフレクションを避けよう]]
20. [[Effective Rust 項目20 過剰な最適化の誘惑を退けよう|項目20 過剰な最適化の誘惑を退けよう]]

### 4章 依存ライブラリ

21. [[Effective Rust 項目21 セマンティックバージョン（SemVer）を理解しよう|項目21 セマンティックバージョン（SemVer）を理解しよう]]
22. [[Effective Rust 項目22 可視範囲を最小化しよう|項目22 可視範囲を最小化しよう]]
23. [[Effective Rust 項目23 ワイルドカードインポートを避けよう|項目23 ワイルドカードインポートを避けよう]]
24. [[Effective Rust 項目24 APIに型が登場する依存ライブラリは再エクスポートしよう|項目24 APIに型が登場する依存ライブラリは再エクスポートしよう]]
25. [[Effective Rust 項目25 依存グラフを管理しよう|項目25 依存グラフを管理しよう]]
26. [[Effective Rust 項目26 忍び寄るフィーチャに注意しよう|項目26 忍び寄るフィーチャに注意しよう]]

### 5章 ツール

27. [[Effective Rust 項目27 パブリックインターフェイスのドキュメントを書こう|項目27 パブリックインターフェイスのドキュメントを書こう]]
28. [[Effective Rust 項目28 分別をもってマクロを使おう|項目28 分別をもってマクロを使おう]]
    - [[Effective Rust 項目28 宣言的マクロを利用する上で注意すべきこと|宣言的マクロを利用する上で注意すべきこと]]
    - [[Effective Rust 項目28 マクロはコードを抽象化する 1 つの方法と考える|マクロはコードを抽象化する 1 つの方法と考える]]
    - [[Effective Rust 項目28 Rust におけるマクロ|Rust におけるマクロ]]
    - [[Effective Rust 項目28 derive マクロを利用する上で注意すべきこと|derive マクロを利用する上で注意すべきこと]]
    - [[Effective Rust 項目28 マクロを使うべきケース|マクロを使うべきケース]]
    - [[Effective Rust 項目28 マクロのデメリット|マクロのデメリット]]
    - [[Effective Rust 項目28 マクロを使う上でのアドバイス|マクロを使う上でのアドバイス]]
29. [[Effective Rust 項目29 Clippyに耳を傾けよう|項目29 Clippyに耳を傾けよう]]
30. [[Effective Rust 項目30 ユニットテスト以上のものを書こう|項目30 ユニットテスト以上のものを書こう]]
31. [[Effective Rust 項目31 ツールのエコシステムを活用しよう|項目31 ツールのエコシステムを活用しよう]]
32. [[Effective Rust 項目32 CIシステムを設定しよう|項目32 CIシステムを設定しよう]]

### 6章 標準Rustの向こうへ

33. [[Effective Rust 項目33 ライブラリコードをno_std互換にすることを検討しよう|項目33 ライブラリコードをno_std互換にすることを検討しよう]]
34. [[Effective Rust 項目34 FFI境界を通過するものを制御しよう|項目34 FFI境界を通過するものを制御しよう]]
    - [[Effective Rust 項目34 Rust から C の関数を呼び出す|Rust から C の関数を呼び出す]]
    - [[Effective Rust 項目34 Rust から C のライブラリを呼び出す|Rust から C のライブラリを呼び出す]]
    - [[Effective Rust 項目34 Rust から C のデータにアクセスする|Rust から C のデータにアクセスする]]
    - [[Effective Rust 項目34 Rust と C の FFI で生じるメモリ安全性の問題|Rust と C の FFI で生じるメモリ安全性の問題]]
    - [[Effective Rust 項目34 C から Rust のコードを呼び出す|C から Rust のコードを呼び出す]]
35. [[Effective Rust 項目35 手動でFFIマッピングを書かずにbindgenを用いよう|項目35 手動でFFIマッピングを書かずにbindgenを用いよう]]

%%

## 感想

全体を通しての評価や気づき。書くときはこのコメントを外す
%%

## 関連

- [[rust|Rust]]
- [[clippy|Clippy]]

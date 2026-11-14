---
title: パラメータ化テスト
aliases: [Parameterized Test]
description: 1 つのテスト関数に複数のパラメータを渡して、入力ごとにテストを行う手法
tags: [word, テスト]
date: 2024-10-11
---

## TL;DR

1 つのテスト関数に複数のパラメータを渡して、入力ごとにテストを行う手法。

## 仕組み

JUnit のユーザガイドによると、パラメータ化テストは、1 つのテストメソッドを異なる引数で何度も実行する仕組みである。JUnit では `@Test` の代わりに `@ParameterizedTest` を付け、各実行に引数を渡すソースを少なくとも 1 つ宣言する。ソースには、値の配列を渡す `@ValueSource`、CSV 形式で書く `@CsvSource`、引数を返すファクトリメソッドを指定する `@MethodSource` などがある。

## 例

JUnit で、回文かどうかを 3 つの文字列で確かめる例。値ごとに別の実行として扱われる。

```java
@ParameterizedTest
@ValueSource(strings = { "racecar", "radar", "able was I ere I saw elba" })
void palindromes(String candidate) {
    assertTrue(StringUtils.isPalindrome(candidate));
}
```

多くの言語のテスティングフレームワークが対応している。

- JUnit（[[java|Java]]）
- [[rstest]]（[[rust|Rust]]）
- [[jest|Jest]]（[[javascript|JavaScript]] / [[typescript|TypeScript]]）

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[rstest]]
- [[property-based-testing|プロパティベーステスト]]

## 出典

- [JUnit 5 User Guide: Parameterized Tests](https://junit.org/junit5/docs/current/user-guide/#writing-tests-parameterized-tests)
- [Parameterized Classes and Tests - JUnit User Guide](https://docs.junit.org/6.1.3/writing-tests/parameterized-classes-and-tests.html)
- [JUnit 5 のパラメータ化テストの解説（Qiita）](https://qiita.com/oohira/items/5030182af29a30166868)
- [rstest: Parametrize](https://github.com/la10736/rstest?tab=readme-ov-file#parametrize)
- [Rust のパラメータ化テストの解説（BioErrorLog Tech Blog）](https://www.bioerrorlog.work/entry/rust-parameterized-tests)
- [Jest: test.each](https://jestjs.io/ja/docs/api#testeachtablename-fn-timeout)
- [Jest の test.each の解説（Zenn）](https://zenn.dev/suzukalight/articles/jest-test-each)

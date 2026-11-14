---
title: Test-Driven React, Second Edition 第4章 Styling in JavaScript with Styled-Components
aliases: [Styling in JavaScript with Styled-Components]
description: CSS-in-JS ならスタイルも単体テストできるが、スタイルは目で見るのが一番のフィードバックなので、テストを後から書くのも手だとする章
tags: [book-chapter]
date: 2024-09-02
book: "[[Test-Driven React, Second Edition]]"
chapter: 4
---

## TL;DR

- [[css-in-js|CSS-in-JS]] を使うと、スタイルのルールも単体テストの対象にできる。
- ただし TDD の目的は有益なフィードバックを得ることで、テストはその手段の 1 つにすぎない。スタイルは実際に見るのが最も役に立つので、テストを後から書いてもよい。

## 内容

この章では、[[styled-components]] を使って JavaScript でスタイルを書く。[[css-in-js|CSS-in-JS]] を使うと、スタイルのルールを[[unit-test|単体テスト]]の対象にできる。

### テストはフィードバックの手段の 1 つ

[[test-driven-development|TDD]] の目的は、コードに対してできるだけ早く、有益なフィードバックを積極的に求めることである。具体的には、建設的なフィードバックループを自分で用意し、潜在的な問題を素早く見つけ、改善のために自由に試せる環境を作ることを指す。

テストはその手段の 1 つでしかない。ときには、テスト以外のフィードバック源に目を向けるべきである。スタイルがその例で、実際に見た目を確かめることが最も役に立つフィードバックになることが多い。そのため、スタイルについてはテストを後から書くのも手である。行き詰まったときは、求めているフィードバックの種類が間違っているのかもしれない。

### スタイルのテスト

本書では、スタイルのテストとして次の 2 つを扱う。

- styled-components が生成したスタイルのテスト
- [[vitest|Vitest]] の[[snapshot-testing|スナップショットテスト]]

## キーワード

- [[styled-components]]
- [[css-in-js|CSS-in-JS]]
- [[snapshot-testing|スナップショットテスト]]
- [[test-driven-development|テスト駆動開発]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

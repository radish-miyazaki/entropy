---
title: Test-Driven React, Second Edition 第5章 Refactoring with Hooks
aliases: [Refactoring with Hooks]
description: 1 つのコンポーネントに 1 つの仕事だけを持たせるため、React Hooks を使って複雑なコンポーネントをリファクタリングする章
tags: [book-chapter]
date: 2024-09-04
book: "[[Test-Driven React, Second Edition]]"
chapter: 5
---

## TL;DR

- React コンポーネントは、1 つの仕事だけを行う小さな単位に保つのがよい。
- 複雑なコンポーネントの分割に、初版では [[hoc-pattern|HOC Pattern]] を使っていたが、第 2 版では [[react-hooks|React Hooks]] を使う。

## 内容

### コンポーネントの責任

[[react|React]] の強みは、Web アプリケーションをコンポーネントという個々の単位で表現できることである。ただし、どのロジックをどのコンポーネントに割り当てるべきかについて、明確なルールはない。

一般には、各コンポーネントが 1 つの仕事だけを行うように設計し、小さな単位に保つのがよいとされる（[[single-responsibility-principle|単一責任の原則]]）。何が「1 つの仕事」かは人間の直感に頼るので、自動では判断できない。それでも、コンポーネントは責任が増えて複雑になるほど管理が大変になるので、この考え方を持つとコードを管理しやすくなる。

### Hooks によるリファクタリング

複雑なコンポーネントを分割する方法として、初版では [[hoc-pattern|HOC Pattern]] を使っていた。その後、代わりの手段として [[react-hooks|React Hooks]] が登場したので、第 2 版では Hooks を使って[[refactoring|リファクタリング]]する。具体例は次の 3 つである。

- [[Test-Driven React, Second Edition 第5章 カスタムフックを用いたリファクタリング|カスタムフックを用いたリファクタリング]]
- [[Test-Driven React, Second Edition 第5章 カスタムフックを使った機能拡張|カスタムフックを使った機能拡張]]
- [[Test-Driven React, Second Edition 第5章 useCallback と useRef を使用して不要な更新を防ぐ|useCallback と useRef を使用して不要な更新を防ぐ]]

### React DevTools を使ったデバッグ

[[react-devtools|React DevTools]] を使うときは、次の手順でデバッグするとよい。

1. 予期しない出力を描画しているコンポーネントから調べる。
2. 原因は Props の値にあるので、その Props を渡している親コンポーネントに移り、問題を起こしている箇所を探す。
3. そのコンポーネントの[[unit-test|単体テスト]]を書きながら問題を特定し、直す。

## キーワード

- [[react-hooks|React Hooks]]
- [[hoc-pattern|HOC Pattern]]
- [[single-responsibility-principle|単一責任の原則]]
- [[refactoring|リファクタリング]]
- [[react-devtools|React DevTools]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

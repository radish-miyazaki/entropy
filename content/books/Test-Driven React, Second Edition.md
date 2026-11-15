---
title: Test-Driven React, Second Edition
aliases: []
description: React と TDD を組み合わせ、テストやリンター、型チェックからのフィードバックを素早く得ながらコンポーネントを開発する方法を解説する本
tags: [book, react]
date: 2024-08-29
book-authors: [Trevor Burnham]
publisher: The Pragmatic Bookshelf
isbn: 9798888650653
---

## TL;DR

- [[react|React]] と[[test-driven-development|テスト駆動開発]]（TDD）を組み合わせてアプリケーションを開発する本である。
- React プロジェクトの要件をテストに変換し、テスト・リンター・型チェックを開発環境に組み込むことで、コンポーネントを素早く安心して作り直せるようにする。

## 対象読者

React プロジェクトで TDD を実践したい開発者向けの本である。出版社のページによると、JavaScript か [[typescript|TypeScript]] の実用的な知識が前提になる。

書籍内では次のライブラリやツールを使う。

- [[react|React]] / [[typescript|TypeScript]]
- [[vitest|Vitest]] / [[testing-library|Testing Library]]: 素早く理解しやすいテストを書く
- [[eslint|ESLint]] / [[prettier|Prettier]]: コードを整える
- [[styled-components]]: テストしやすい方法でコンポーネントにスタイルを当てる
- [[storybook|Storybook]]: ドキュメントを作り、GitHub Actions で更新する

## 目次

1. [[Test-Driven React, Second Edition 第1章 Test-Driven Development with Jest|Test-Driven Development with Jest]]
2. [[Test-Driven React, Second Edition 第2章 Integrated Tooling with VS Code|Integrated Tooling with VS Code]]
3. [[Test-Driven React, Second Edition 第3章 Testing React with Testing Library|Testing React with Testing Library]]
   - [[Test-Driven React, Second Edition 第3章 シンプルな React Component を TDD で実装する|シンプルな React Component を TDD で実装する]]
   - [[Test-Driven React, Second Edition 第3章 入れ子になった React Component を TDD で実装する|入れ子になった React Component を TDD で実装する]]
   - [[Test-Driven React, Second Edition 第3章 状態を持つ React Component を TDD で実装する|状態を持つ React Component を TDD で実装する]]
4. [[Test-Driven React, Second Edition 第4章 Styling in JavaScript with Styled-Components|Styling in JavaScript with Styled-Components]]
5. [[Test-Driven React, Second Edition 第5章 Refactoring with Hooks|Refactoring with Hooks]]
   - [[Test-Driven React, Second Edition 第5章 カスタムフックを用いたリファクタリング|カスタムフックを用いたリファクタリング]]
   - [[Test-Driven React, Second Edition 第5章 カスタムフックを使った機能拡張|カスタムフックを使った機能拡張]]
   - [[Test-Driven React, Second Edition 第5章 useCallback と useRef を使用して不要な更新を防ぐ|useCallback と useRef を使用して不要な更新を防ぐ]]
6. [[Test-Driven React, Second Edition 第6章 Continuous Integration and Collaboration|Continuous Integration and Collaboration]]

## 感想

めちゃくちゃ良い本なので、翻訳本が出て日本でも広まってほしい。

ただ、スタイリングにだけ旧世代的な [[runtime-css-in-js|Runtime CSS-in-JS]] の styled-components を使っているのは、なぜなのかと思った。

本書に沿って書いたコードは [radish-miyazaki/Test-Driven-Carousel](https://github.com/radish-miyazaki/Test-Driven-Carousel) に置き、Storybook を [GitHub Pages](https://radish-miyazaki.github.io/Test-Driven-Carousel) で公開している。

## 関連

- [[test-driven-development|テスト駆動開発]]
- [[react|React]]
- [[testing-library|Testing Library]]
- [Test-Driven React, Second Edition（The Pragmatic Bookshelf）](https://pragprog.com/titles/tbreact2/test-driven-react-second-edition/)

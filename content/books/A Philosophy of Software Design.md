---
title: A Philosophy of Software Design
aliases: []
description: ソフトウェア設計の目標を「複雑さの軽減」に置き、複雑さの見分け方と抑え方を解説する本
tags: [book, 設計]
date: 2023-12-13
book-authors: [John Ousterhout]
publisher:
isbn:
---

## TL;DR

- 優れたプログラマと平凡なプログラマを分けるのは設計スキルであり、設計の目標はソフトウェアの[[complexity|複雑さ]]を軽減することである。
- 複雑さとは何か、不要な複雑さをどう見分けるか、どう最小限に抑えるかを順に扱う。

## 対象読者

設計スキルを伸ばしたいプログラマ向けの本である。説明用のコードが少なく抽象的な議論が多いので、コードレビューと併せて読むのがよい。自分のコードより他人のコードのほうが設計上の問題を見つけやすく、本書の内容に照らして「どう改善できるか」「それが複雑さとどう関係するか」を考えられる。

設計スキルを上げるには、[[red-flag|レッドフラグ]]を見分ける方法を学ぶことが近道である。本書は主要な設計上の問題ごとにレッドフラグを紹介している。ただし、どんなルールにも例外があり、極端に追求すると悪い方向に進む。各章の「Taking it too far」の節では、やりすぎを見極める方法を示している。

## 目次

1. [[A Philosophy of Software Design 第1章 It's All About Complexity|第1章 It's All About Complexity]]
2. [[A Philosophy of Software Design 第2章 The Nature of Complexity|第2章 The Nature of Complexity]]
3. [[A Philosophy of Software Design 第3章 Working Code Isn't Enough|第3章 Working Code Isn't Enough]]
4. [[A Philosophy of Software Design 第4章 Modules Should Be Deep|第4章 Modules Should Be Deep]]
5. [[A Philosophy of Software Design 第5章 Information Hiding (and Leakage)|第5章 Information Hiding (and Leakage)]]
6. [[A Philosophy of Software Design 第6章 General-Purpose Modules are Deeper|第6章 General-Purpose Modules are Deeper]]
7. [[A Philosophy of Software Design 第7章 Different Layer, Different Abstraction|第7章 Different Layer, Different Abstraction]]
8. [[A Philosophy of Software Design 第8章 Pull Complexity Downwards|第8章 Pull Complexity Downwards]]
9. [[A Philosophy of Software Design 第9章 Better Together Or Better Apart？|第9章 Better Together Or Better Apart?]]
10. [[A Philosophy of Software Design 第10章 Define Errors Out Of Existence|第10章 Define Errors Out Of Existence]]
11. [[A Philosophy of Software Design 第11章 Design it Twice|第11章 Design it Twice]]
12. [[A Philosophy of Software Design 第12章 Why Write Comments？ The Four Excuses|第12章 Why Write Comments? The Four Excuses]]
13. [[A Philosophy of Software Design 第13章 Comments Should Describe Things that Aren't Obvious from the Code|第13章 Comments Should Describe Things that Aren't Obvious from the Code]]
14. [[A Philosophy of Software Design 第14章 Choosing Names|第14章 Choosing Names]]
15. [[A Philosophy of Software Design 第15章 Write The Comments First|第15章 Write The Comments First]]
16. [[A Philosophy of Software Design 第16章 Modifying Existing Code|第16章 Modifying Existing Code]]
17. [[A Philosophy of Software Design 第17章 Consistency|第17章 Consistency]]
18. [[A Philosophy of Software Design 第18章 Code Should Be Obvious|第18章 Code Should Be Obvious]]
19. [[A Philosophy of Software Design 第19章 Software Trends|第19章 Software Trends]]
20. [[A Philosophy of Software Design 第20章 Designing for Performance|第20章 Designing for Performance]]
21. [[A Philosophy of Software Design 第21章 Decide What Matters|第21章 Decide What Matters]]

## 感想

AI 時代の今だからこそ、この本の内容を Skills や Agents、Rules に落とし込んで、複雑さの軽減に努める必要があるのかもしれない。

なお、各章のまとめは英語の原文を自分で日本語にしたものなので、原文と離れているところもある。

## 関連

- [[complexity|複雑さ]]
- [[red-flag|レッドフラグ]]
- [[module|モジュール]]

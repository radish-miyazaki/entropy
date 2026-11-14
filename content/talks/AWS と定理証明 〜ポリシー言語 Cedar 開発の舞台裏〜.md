---
title: AWS と定理証明 〜ポリシー言語 Cedar 開発の舞台裏〜
description: 認可のポリシー言語 Cedar の設計方針と、その正しさを Lean による定理証明で保証する方法を紹介する発表
tags: [talk, 認可, 定理証明]
date: 2025-05-16
speakers: [ytaka23]
company:
event: "[[関数型まつり 2025]]"
held: 2025-06-15
slide: https://speakerdeck.com/ytaka23/fp-matsuri-2025
video:
---

## TL;DR

- [[cedar|Cedar]] は、組織を横断する認可の課題を解決するポリシー言語で、表現力、安全性、応答速度、解析可能性を設計方針とする。
- 実装は Rust だが、評価規則や型システム、最適化などの正しさを [[lean|Lean]] で証明し、両者をランダムテストで橋渡ししている。

## 内容

### 組織を横断する認可の課題

認可の課題は立場によって異なる。アプリケーションの開発チームでは、似たような判定を各チームが再発明してしまう。実装は別々でも、概念としては一致させる必要がある。一方、セキュリティや CCoE のチームはセキュリティ統制としてガードレールを敷きたい。しかし実装がチームごとに別なので、統一したチェックが難しい。

こうした課題を解決する考え方が [[pdp|PDP]]（Policy Decision Point）と [[policy-enforcement-point|PEP]]（Policy Enforcement Point）であり、両方を併せ持つ例が Cedar である。

### Lean による定理証明

Cedar の実装は [[rust|Rust]] だが、[[theorem-proving|定理証明]]には Lean を使っている。Rust の実装と Lean のモデルは、Differential Random Testing（DRT）で橋渡しする。両者に同じランダムな値を入力し、結果を比べる手法である。

### Cedar の設計方針

**表現力**: 典型的なポリシー設計のユースケースをカバーする。[[rbac|RBAC]] は Principal の所属関係に基づく認可で、Cedar では Resource もグループにでき、ポリシーでは `in` で表す。[[abac|ABAC]] は[[entity|エンティティ]]の属性に基づく認可で、属性はユーザが自由に定義でき、`when` の条件に書く。評価規則の正しさは Lean で保証されている。

**安全性**: 認可処理を正確に行い、ポリシー定義のミスを防ぐ。汎用的な記述言語はバグの温床になるので、バリデーションが欠かせない。Cedar では、ポリシーとは別に JSON 形式のスキーマを渡してバリデーションでき、違反したポリシーは登録時にはじかれる。バリデーションは型チェックで行い、型システムの正しさは Lean で保証されている。

**応答速度**: ポリシーの数が増えても性能が落ちにくい。Policy Slice は、判定に関わる `(Principal, Resource)` の組をキーとする辞書を持ち、リクエストに関係ないポリシーを除外する。Level-based Entity Slice は、属性をたどる必要のある深さをあらかじめ調べ、ポリシーに関係ないエンティティを除外する。Rego や OpenFGA と比べても速く、特にエンティティ数が増えても速度が落ちにくい。最適化の正しさも Lean で保証されている。

**解析可能性**: 人間だけでなく機械も解析しやすい。実装中の Symbolic Compiler（[論文](https://arxiv.org/pdf/2403.04651)）は、allow / deny の判定とは別に、2 つのポリシーが等価か、あるポリシーがデッドコードかといった、ポリシー自体の性質をチェックする。ポリシーを SMT ソルバが扱える形式にエンコードしてチェックする。たとえば「2 つのポリシーが異なる結果を返す」ことが[[satisfiability|充足可能]]であれば、2 つのポリシーは等価ではない。エンコードの正しさも Lean で保証されている。SMT ソルバと SAT については、同じ登壇者の[登壇記事](https://logmi.jp/main/technology/326121)が参考になる。

## キーワード

- [[cedar|Cedar]]
- 認可
- [[pdp|PDP]]
- [[policy-enforcement-point|PEP]]
- [[lean|Lean]]
- [[theorem-proving|定理証明]]
- [[rust|Rust]]
- [[rbac|RBAC]]
- [[abac|ABAC]]
- [[entity|エンティティ]]
- SMT ソルバ
- [[satisfiability|充足可能性]]

## 自分の理解

DRT で Rust と Lean を橋渡しする考え方は、目から鱗だった。実装コードと Lean を橋渡しするときの参考になる。

## 関連

- [プロポーザル](https://fortee.jp/2025fp-matsuri/proposal/8bb407b5-5df3-48bb-a934-0ca6ca628c9a)
- [[aws|AWS]]

---
title: 関数型の考えをTypeScriptに持ち込んで、テストしやすい純粋関数を増やす—Functional Core, Imperative Shellの実践
description: TypeScript の言語思想に逆らわず、Functional Core, Imperative Shell で純粋関数と副作用を分け、ディレクトリ構造と依存の制限で守る実践の紹介
tags: [talk, typescript]
date: 2026-07-10
speakers: []
company:
event: "[[関数型まつり 2026]]"
held:
slide:
video:
---

## TL;DR

- TypeScript では純粋関数と副作用を型で区別できないので、Functional Core, Imperative Shell の考え方で両者を分ける。
- `Result` でエラーを値として扱って純粋関数を増やし、副作用は処理の端に置く。分離はディレクトリ構造と dependency-cruiser で守る。

## 内容

### 副作用との付き合い方

[[side-effect|副作用]]をゼロにすることは不可能なので、[[pure-function|純粋関数]]を増やすことと、副作用を分離することの 2 つに取り組む。

### TypeScript の型の限界

[[typescript|TypeScript]] の型は表現力が高いが、限界もある。純粋関数と副作用を持つ関数を、型のレベルで区別できない（`Int -> IO Int` のような表現ができない）。Java の `package` のように、モジュールの境界を言語レベルで強制する仕組みもない。

### Functional Core, Imperative Shell

そこで、**言語の思想には逆らわず、副作用と純粋関数を分離する。** そのための考え方が Functional Core, Imperative Shell（FCIS）である。純粋関数（Functional Core）を中心に置き、副作用（Imperative Shell）を外側に置く。[[Domain Modeling Made Functional 第12章 永続化を端に追いやる|永続化を端に追いやる]]のと同じ考え方である。

### 実例

1つ目は `Result` でエラーを値として扱い、純粋関数を増やすことである。

```ts
type Result<T, E> = { isOK: true; value: T } | { isOK: false; value: E }
```

これにより、バリデーションのロジックが純粋関数になり、エラーが型に現れる。

2つ目は副作用を処理の端（最初か最後）に置くことである。たとえば「入力 → バリデーション → エラーの集約 → ディスパッチ → 出力」という流れでは、副作用であるディスパッチを後ろに置く。

その結果、テストしやすくなり、副作用の処理が一か所に集まり、バリデーションを足しやすくなった。

### ディレクトリ構造で FCIS を守る

TypeScript には IO 型も `package` の機能もないので、ディレクトリ構造で FCIS を実現する。ディレクトリの配置を決め、依存関係は dependency-cruiser で機械的に制限する。そのチェックは Lefthook で強制する。

## キーワード

- [[functional-programming|関数型プログラミング]]
- [[typescript|TypeScript]]
- [[side-effect|副作用]]
- [[pure-function|純粋関数]]
- Functional Core, Imperative Shell
- dependency-cruiser
- Lefthook

%%

## 自分の理解

自社に持ち帰れそうな点、疑問に思った点。書くときはこのコメントを外す
%%

## 関連

- [発表のページ](https://fortee.jp/2026fp-matsuri/proposal/2040db10-f825-4378-a854-a953c01e14ff)
- 元になったブログ記事
  - [you-might-not-need-dedicated-architecture-for-ai](https://kaminashi-developer.hatenablog.jp/entry/you-might-not-need-dedicated-architecture-for-ai)
  - [typescript-rop-result-validation-design](https://kaminashi-developer.hatenablog.jp/entry/typescript-rop-result-validation-design)

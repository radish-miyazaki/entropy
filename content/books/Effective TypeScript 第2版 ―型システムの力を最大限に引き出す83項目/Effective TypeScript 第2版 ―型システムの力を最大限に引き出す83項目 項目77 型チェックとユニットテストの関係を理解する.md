---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目77 型チェックとユニットテストの関係を理解する
description: 型チェックと単体テストは補い合う関係にあり、できるだけ型チェックに任せつつ、型で表せない振る舞いには単体テストを書くべきだとする項目
tags: [book-chapter, typescript]
date: 2025-06-06
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 77
---

## TL;DR

- [[unit-test|単体テスト]]と型チェックは補い合う関係にある。
- できるだけ型チェックに任せ、型でチェックできない振る舞いには単体テストを書く。

## 内容

### 単体テストと型チェックの役割

単体テストは、特定の入力に対して動作が正しいことを示す。つまり、正しさの下限を保証する。一方、型チェックは、誤った型を返すといった、ある種の不正確な動作をすべて排除する。つまり、不正確さの上限を保証する。

### できるだけ型チェックに任せる

品質保証の主な目標の 1 つは、問題をできるだけ早く、修正のコストが低いうちに見つけることである。型チェックは単体テストや[[integration-test|統合テスト]]よりも早く結果が出るので、最も理想的である。そのため、できるだけ型チェックに任せたほうがよい。

### 型でチェックできない振る舞いはテストする

ただし、型でチェックできない振る舞いには単体テストを書く必要がある。たとえば、ユーザを更新する次の関数を考える。

```ts
interface User {
  id: string
  name: string
  memberSince: string
}
declare function updateUserById(
  id: string,
  update: Partial<Omit<User, "id">> & { id?: never },
): Promise<User>
```

この型は ID を変更できないことを表そうとしているが、実行時には強制できない。[[javascript|JavaScript]] からなら `id` を渡して呼べてしまう。そこで、関数が例外を投げるようにして、単体テストを書いたほうがよい。

```ts
test("invalid update", () => {
  // @ts-expect-error updateUserById で ID は更新できない
  expect(() => updateUserById("123", { id: "234" })).toReject()
})
```

また、型がロジックを持つ場合は、型そのもののテストが必要になる（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目55 型のテストを書く|項目55]]）。型のテストは単体テストとは別物である。

## キーワード

- [[typescript|TypeScript]]
- [[unit-test|単体テスト]]
- [[integration-test|統合テスト]]
- [[javascript|JavaScript]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

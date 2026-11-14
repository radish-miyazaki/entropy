---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目39 差異のモデリングより型の統一を優先する
description: 型の小さな違いをモデリングするより、違いをなくして 1 つの型に統一したほうが認知的負荷と変換コードを減らせると説く項目
tags: [book-chapter, typescript]
date: 2025-05-09
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 39
---

## TL;DR

- 型の小さな違いをモデリングするより、違いをなくして 1 つの型に統一したほうがよい。
- ただし、管理外のデータベースや API の型や、実際には別物を表す型は統一しない。

## 内容

### 型を統一する

型の小さな違いを別々の型で表すより、違いをなくして 1 つの型にまとめたほうがよい。[[cognitive-load|認知的負荷]]が減り、型どうしを変換する定型的なコードを書かずに済む。

```ts
// 🙅 Bad
interface StudentTable {
  first_name: string
  last_name: string
  birth_date: string
}
interface Student {
  firstName: string
  lastName: string
  birthDate: string
}

// 🙆 Good
type Student = ObjectToCamel<StudentTable>
```

型を統一するには、ランタイムのコードも直す必要がある。

```ts
async function writeStudentToDB(student: Student) {
  await writeRowToDB(db, "students", objectToSnake(student))
}
```

### 統一してはいけない場合

1 つ目は、データベースや API が自分の管理下にない場合である。このときは違いをモデリングする必要がある。2 つ目は、実際には同じものを表していない型である。たとえば、同じ[[discriminated-union|タグ付きユニオン]]に属する異なる型は統一してはいけない。

## キーワード

- [[typescript|TypeScript]]
- [[cognitive-load|認知的負荷]]
- [[discriminated-union|タグ付きユニオン]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

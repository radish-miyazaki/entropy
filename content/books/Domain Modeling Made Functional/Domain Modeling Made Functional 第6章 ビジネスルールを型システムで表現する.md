---
title: Domain Modeling Made Functional 第6章 ビジネスルールを型システムで表現する
description: メールアドレスの検証状態や連絡手段の組み合わせのようなビジネスルールを選択型で表し、不正な状態を表現できないようにする
tags: [book-chapter, ddd, fsharp]
date: 2024-07-19
book: "[[Domain Modeling Made Functional]]"
chapter: 6
---

## TL;DR

- ビジネスルールを[[type-system|型システム]]だけで文書化すれば、ルールが守られていることをコンパイラが確かめてくれる。
- フラグではなく選択型で状態を分け、プライベートなコンストラクタと組み合わせて、不正な状態を表現できないようにする。

## 内容

ビジネスルールを型システムだけで文書化すると、ルールが守られていることをコンパイラが確かめられる。コンパイル時に明らかになるので、そのための[[unit-test|単体テスト]]がいらなくなる。

### 検証済みのメールアドレス

顧客のメールアドレスが有効かどうかを、型システムで表す例を考える。メールアドレスには、検証済み（顧客が検証メールの確認リンクをクリックした）と未検証の 2 つの状態がある。そして、次のビジネスルールがある。

- 検証メールは、未検証のメールアドレスにだけ送る
- パスワードリセットのメールは、検証済みのメールアドレスにだけ送る

フラグで表すと、次のようになる。

```fsharp
type CustomerEmail = {
    EmailAddress: EmailAddress
    IsVerified: bool
}
```

この方法では、`IsVerified` がいつ何のために設定・解除されるのかが分からない。検証されていないメールアドレスに、誤って `true` を設定してしまうおそれもある。

そこで、検証済みと未検証のメールアドレスを別々の[[domain|ドメイン]]の概念として扱い、選択型（[[discriminated-union|判別共用体]]）で表す。

```fsharp
type CustomerEmail =
    | Unverified of EmailAddress
    | Verified of VerifiedEmailAddress
```

ポイントは、`VerifiedEmailAddress` のコンストラクタをプライベートにして、検証サービスだけが作れるようにすることである。

```fsharp
type VerifiedEmailAddress = private VerifiedEmailAddress of EmailAddress
```

こうすると、不正な状態を表現できなくなる。ドメインもより正確に文書化できる。たとえば「パスワードリセットのメールは、検証済みのメールアドレスにだけ送る」というルールは、関数の型にそのまま表れる。

```fsharp
type SendPasswordResetEmail = VerifiedEmailAddress -> ...
```

### メールアドレスか住所のどちらかを持つ

「顧客はメールアドレスか住所を持っていなければならない」というルールを考える。このルールは、顧客が次のどれかを持つことを意味する。

- メールアドレスだけ
- 住所だけ
- メールアドレスと住所の両方

これは選択型で表せる。

```fsharp
type BothContactMethods = {
    Email: EmailContactInfo
    Address: PostalContactInfo
}

type ContactInfo =
    | EmailOnly of EmailContactInfo
    | AddressOnly of PostalContactInfo
    | EmailAndAddr of BothContactMethods

type Contact = {
    Name: Name
    ContactInfo: ContactInfo
}
```

## キーワード

- [[type-system|型システム]]
- [[discriminated-union|判別共用体]]
- [[unit-test|単体テスト]]
- [[domain|ドメイン]]
- [[integrity|完全性]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

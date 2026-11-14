---
title: XSS
aliases: [Cross-site scripting]
description: 悪意あるコードを Web サイトに挿入し、被害者のブラウザ上で実行させる攻撃
tags: [word, web, セキュリティ]
date: 2024-11-13
---

## TL;DR

悪意あるコードを Web サイトに挿入するセキュリティ攻撃。挿入されたコードは被害者の[[web-browser|ブラウザ]]上で実行され、アクセス制限の回避やなりすましなどにつながる。

## 仕組み

攻撃者は、対象の Web サイトにそのサイトの一部であるかのように悪意あるコードを読み込ませ、実行させる。そのコードは、Web サイト自身のコードにできることなら何でも行える。たとえば、ページのコンテンツや [[local-storage|Local Storage]] の中身を読み書きしたり、ユーザの資格情報を使って HTTP リクエストを送り、なりすましや機密データへのアクセスをしたりできる。

XSS が成り立つのは、Web サイトが次の 2 つを行っているときである。

1. 攻撃者が細工した可能性のある入力を受け付ける。
2. その入力をサニタイズせずに、つまり [[javascript|JavaScript]] として実行されないようにせずに、ページに表示する。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[csrf|CSRF]]
- [[content-security-policy|コンテンツセキュリティポリシー]]
- [[same-origin-policy|同一生成元ポリシー]]

## 出典

- [クロスサイトスクリプティング - MDN Web Docs 用語集](https://developer.mozilla.org/ja/docs/Glossary/Cross-site_scripting)

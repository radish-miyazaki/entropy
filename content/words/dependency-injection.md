---
title: 依存性の注入
aliases: [DI]
description: 依存するオブジェクトを、内部で作らずに外部から渡すこと
tags: [word, 設計]
date: 2024-09-09
---

## TL;DR

Dependency Injection（DI）。[[dependency|依存関係]]のあるオブジェクトを、内部で作らずに外部から渡すこと。

## なぜ必要か

Martin Fowler は「Inversion of Control Containers and the Dependency Injection pattern」で、アプリケーションのコードを、利用するサービスの具体的な実装から切り離す方法としてこのパターンを説明している。クラスが自分で実装を探しに行くのではなく、外部の組み立て役（assembler）が実装を渡す。[[inversion-of-control|制御の反転]]（IoC）という呼び方は一般的すぎて混乱を招くので、Fowler は IoC の支持者たちと議論し、より具体的な「Dependency Injection」という名前を選んだ。

## 仕組み

Fowler は、依存性の注入を次の 3 つの形に分けている。

- コンストラクタ注入: コンストラクタの引数で依存するオブジェクトを渡す
- セッター注入: セッターメソッドで渡す
- インタフェース注入: 注入用のインタフェースを定義し、クラスに実装させる。コンテナがそのメソッドを呼んで渡す

Fowler は、まずコンストラクタ注入を使い、コンストラクタで問題が出たらセッター注入に切り替えることを勧めている。

## 例

コンストラクタの引数でインスタンスを受け取るのが代表的な形である。渡す手間は、[[di-container|DI コンテナ]]を使うと省ける。

## 注意点

アプリケーションのコードを実装から切り離す方法には、Service Locator もある。Fowler によると、両者の大きな違いは、Service Locator ではサービスを使うすべてのクラスがロケーターに依存する点である。依存性の注入では、クラスは明示的に要求しなくてもサービスを受け取れる。Fowler は、自分のアプリケーションの中ではどちらを使ってもよいが、他人のアプリケーションで使われるコンポーネントには依存性の注入のほうが適しているとしている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[dependency|依存関係]]
- [[di-container|DI コンテナ]]
- [[inversion-of-control|制御の反転]]

## 出典

- [Inversion of Control Containers and the Dependency Injection pattern - Martin Fowler](https://martinfowler.com/articles/injection.html)

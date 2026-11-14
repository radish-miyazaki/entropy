---
title: DI コンテナ
aliases: []
description: コンポーネントの実装を組み立て、依存するオブジェクトに注入する仕組み
tags: [word, 設計]
date: 2026-11-14
---

## TL;DR

コンポーネントの実装を組み立て、それを必要とするオブジェクトに注入する仕組み。[[dependency-injection|依存性の注入]]で、依存を手で渡す手間を省ける。

## なぜ必要か

依存性の注入では、コンストラクタの引数などで依存するインスタンスを外から渡す。依存が増えると、渡す側のコードが膨らむ。DI コンテナを使うと、この組み立てをコンテナに任せられる。

## 仕組み

Martin Fowler の記事によると、Java の世界では、別々のプロジェクトのコンポーネントを 1 つのアプリケーションに組み立てる軽量コンテナが広まった。これらは [[inversion-of-control|制御の反転]]（IoC）のコンテナと呼ばれていたが、Fowler は IoC が一般的すぎて紛らわしいとして、より具体的な Dependency Injection という名前を選んだ。

DI では、組み立て役（assembler）という別のオブジェクトが、インタフェースの実装を依存するクラスに入れる。組み立てをアプリケーションの他の部分から分けておくと、デプロイ先ごとに構成を差し替えられる。注入の方法には、コンストラクタ注入（PicoContainer）、セッター注入（Spring）、インタフェース注入の 3 つがある。

## 例

[[rust|Rust]] の [[shaku|shaku]] は DI コンテナのクレートで、依存関係が正しく解決できるかをコンパイル時に確かめられる。

## 注意点

Fowler は、DI コンテナの代わりになるものとして Service Locator を挙げている。Service Locator では、クラスが自分で依存を要求するので、すべての利用者がロケータに依存する。DI ではこの依存はなくなるが、構成の後にインジェクタから別のサービスを取ることはできない。Fowler は、アプリケーションのコードには Service Locator のほうが少し単純で、複数のアプリケーションで使うコンポーネントには DI が向くとしている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[dependency-injection|依存性の注入]]
- [[inversion-of-control|制御の反転]]
- [[shaku|shaku]]

## 出典

- [Inversion of Control Containers and the Dependency Injection pattern - Martin Fowler](https://martinfowler.com/articles/injection.html)

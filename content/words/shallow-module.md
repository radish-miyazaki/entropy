---
title: 浅いモジュール
aliases: [Shallow Class, Shallow Method]
description: 提供する機能に比べて、インタフェースが複雑なモジュール
tags: [word, 設計]
date: 2023-12-19
---

## TL;DR

提供する機能に比べて、[[interface|インタフェース]]が複雑な[[module|モジュール]]。[[deep-module|深いモジュール]]の反対であり、[[red-flag|レッドフラグ]]の 1 つである。

## なぜ必要か

浅いモジュールを見分けられると、[[complexity|複雑さ]]を増やしている箇所に気づける。浅いモジュールでは、インタフェースを学んで使うコストが、モジュールがもたらす効果（内部の動作を知らなくてよいこと）を上回る。費用対効果が悪く、複雑さを管理する上で役に立たない。

## 仕組み

小さなモジュールは浅くなりがちである。実装が短いと、抽象化が隠せる詳細も少なく、インタフェースの複雑さが実装の複雑さとほとんど変わらなくなる。クラスやメソッドを細かく分けすぎて浅いクラスが大量に生まれた状態を、[[classitis|Classitis]]と呼ぶ。

## 例

連結リストを実装するクラスや、次のように 1 行の処理をラップしただけのメソッドが典型である。

```java
private void addNullValueForAttribute(String attribute) {
    data.put(attribute, null);
}
```

## 注意点

浅いモジュールが避けられない場合もある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[deep-module|深いモジュール]]
- [[classitis|Classitis]]
- [[red-flag|レッドフラグ]]

## 出典

- [[A Philosophy of Software Design 第4章 Modules Should Be Deep|A Philosophy of Software Design 第4章]]

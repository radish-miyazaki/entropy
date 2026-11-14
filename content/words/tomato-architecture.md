---
title: トマトアーキテクチャ
aliases: [Tomato Architecture]
description: 4 つの Common Sense Manifesto にもとづく、実用重視のソフトウェアアーキテクチャ
tags: [word, アーキテクチャ]
date: 2025-05-31
---

## TL;DR

4 つの「Common Sense Manifesto」にもとづくソフトウェアアーキテクチャ。流行や将来の可能性より、目の前のソフトウェアにとっての最善とシンプルさを優先する。

## なぜ必要か

Common Sense Manifesto は次の 4 つである。

1. 著名な人の提案に盲目的に従わず、自分のソフトウェアにとって最善の方法を考える
2. 次の 10 年の要件を予想して過剰に設計せず、シンプルさを追求する
3. 置き換えやすさのための抽象化を作らず、調査したうえで技術を選び、受け入れる
4. 個々の部品ではなく、システム全体として動くことを重視する

## 仕組み

### 機能ごとにパッケージを分ける

Controller や Service のようなレイヤごとの分け方は、マイクロサービスのように機能を絞ったシステムならよい。モノリスやモジュラーモノリスでは、機能ごとに分ける [[package-by-feature|Package by Feature]] の方がよい。

### Application Core を入出力から切り離す

Application Core は、Web、スケジューラのジョブ、CLI といった提供手段から独立させる。エントリポイント（`main()`）から呼べる API を公開し、その API は HTTP のライブラリや CLI の実行ロジックなど、呼び出し元の文脈に依存しない。

Web コントローラやメッセージリスナなどの入力元は、リクエストからデータを取り出すことだけを受け持つ。ビジネスロジックの実行は Application Core に任せる。Application Core は DB やメッセージブローカー、外部 API にアクセスするが、それらに依存しすぎないようにする。

### ドメインロジックはドメインオブジェクトに持たせる

状態を変えるメソッドや、状態から何かを計算するメソッドは、[[domain-object|ドメインオブジェクト]]自身に持たせる。

### 不要なインタフェースを作らない

「将来別の実装を作るかもしれない」という理由だけでインタフェースを作らない。必要になれば IDE で簡単に抽出できるし、モックもライブラリを使えばクラスから作れる。

### フレームワークの力を活かす

選んだフレームワークの機能は存分に使う。「いつか別のフレームワークに切り替えるかもしれない」と考えて抽象化や間接化をするのは、たいてい悪いアイデアである。

### 機能全体をテストする

[[unit-test|単体テスト]]だけでなく、機能全体をテストする。

## 自分の理解

フレームワークを切り替える可能性に備えた抽象化が悪いアイデアだという指摘は、耳が痛かった。

サンプルコードは [[java|Java]] で、クラスに触れている箇所も多い。[[go|Go]] や [[rust|Rust]] とは相性が悪いのだろうか。Rust ならトレイト境界をなるべく使わないようにすればよいのかもしれない。

## 関連

- [[package-by-feature|Package by Feature]]
- [[hexagonal-architecture|ヘキサゴナルアーキテクチャ]]
- [[clean-architecture|クリーンアーキテクチャ]]
- [[onion-architecture|オニオンアーキテクチャ]]
- [[layered-architecture|レイヤードアーキテクチャ]]

## 出典

- [sivaprasadreddy/tomato-architecture](https://github.com/sivaprasadreddy/tomato-architecture)
- [sivaprasadreddy/tomato-architecture-spring-boot-demo](https://github.com/sivaprasadreddy/tomato-architecture-spring-boot-demo)
- [Tomato Architecture - A Pragmatic Approach to Software Design](https://www.sivalabs.in/tomato-architecture-pragmatic-approach-to-software-design/)
- [Package by Feature](https://phauer.com/2020/package-by-feature/)
- [[Go言語で試す！トマトアーキテクチャ]]

---
title: テスティングフレームワーク
aliases: [テストフレームワーク]
description: テストケースの記述、実行、結果の報告を支える、自動テストのためのソフトウェアフレームワーク
tags: [word, テスト]
date: 2026-11-14
---

## TL;DR

自動テストを書いて実行するためのソフトウェアフレームワーク。テストケースの書き方、アサーション、テストの実行と結果の報告をまとめて提供する。

## 仕組み

Wikipedia によると、多くのテスティングフレームワークは xUnit と呼ばれる共通の構造を持つ。祖先は [[smalltalk|Smalltalk]] の SUnit で、Kent Beck と Erich Gamma が [[java|Java]] に移植した JUnit が広く普及し、各言語に移植された。xUnit の主な構成要素は次のとおりである。

- テストケース: テスト対象のコードを呼び出し、結果を確かめる、テストの最小単位
- アサーション: 期待する結果を検証する。多くはフレームワークが用意する
- テストスイート: 準備と後片付けのコードを共有する、関連するテストケースの集まり
- テストフィクスチャ: 各テストケースの前に既知の状態を用意し、後で片付ける
- テストランナー: テストを実行し、結果を報告するプログラム

## 例

[[javascript|JavaScript]] の [[jest|Jest]] や [[vitest|Vitest]]、[[dotnet|.NET]] の [[nunit|NUnit]]、[[rust|Rust]] の [[rstest|rstest]]、[[fsharp|F#]] の [[expecto|Expecto]] などがある。

## 注意点

Wikipedia によると、テストランナーはテストケースを任意の順番で実行することがあるので、テストは実行順に依存しないように書く。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[unit-test|単体テスト]]
- [[test-driven-development|テスト駆動開発]]
- [[parameterized-test|パラメータ化テスト]]
- [[property-based-testing|プロパティベーステスト]]

## 出典

- [xUnit - Wikipedia](https://en.wikipedia.org/wiki/XUnit)

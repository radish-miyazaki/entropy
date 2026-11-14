---
title: 推移的依存関係
aliases: []
description: 直接依存しているパッケージが、さらに依存しているパッケージとの関係。間接的な依存関係ともいう
tags: [word, パッケージ管理]
date: 2026-11-14
---

## TL;DR

自分のプロジェクトが直接依存しているパッケージが、さらに依存しているパッケージとの関係。自分では使っていなくても、依存をたどると必要になるパッケージである。

## なぜ必要か

依存関係は自分が書いたものだけでは終わらず、依存先の依存先へと連なっている。[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]] によると、[[npm|npm]] に公開したパッケージをインストールすると、その `dependencies` もインストールされる。自分のプロジェクトに入るコードの全体を知るには、推移的な依存までたどる必要がある。

## 仕組み

[[go|Go]] の Modules Reference では、メインモジュールの `import` 宣言に現れるパッケージを直接の依存（direct dependency）、推移的にインポートされるが `import` 宣言には現れないパッケージを間接的な依存（indirect dependency）と定義している。`go.mod` では、間接的な依存の `require` に `// indirect` のコメントが付く。モジュールどうしの要求は、メインモジュールを根とする有向グラフ（モジュールグラフ）で表される。

## 例

Effective TypeScript の例では、プロジェクトが `@types/foo` と `@types/bar` に依存し、`@types/bar` も `@types/foo` に依存している。2 つが求める `@types/foo` のバージョンに互換性がないと、npm は両方のバージョンを入れ子のフォルダにインストールする。すると宣言が重複してエラーになり、コンパイラのパフォーマンスも悪くなる。`npm ls @types/foo` で重複の原因を突き止められる。

## 注意点

Effective TypeScript は、npm にパッケージを公開するときは型の推移的依存関係を避けるよう勧めている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[dependency|依存関係]]
- [[dependency-graph|依存グラフ]]
- [[minimal-version-selection|最小バージョン選択]]
- [[supply-chain-attack|サプライチェーン攻撃]]

## 出典

- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目65 TypeScriptと@typesはdevDependenciesに追加する|Effective TypeScript 第2版 項目65]]
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目66 型宣言の依存関係に関わる3つのバージョンを理解する|Effective TypeScript 第2版 項目66]]
- [[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目70 型を部分的にコピーして依存を断ち切る|Effective TypeScript 第2版 項目70]]
- [Go Modules Reference](https://go.dev/ref/mod)

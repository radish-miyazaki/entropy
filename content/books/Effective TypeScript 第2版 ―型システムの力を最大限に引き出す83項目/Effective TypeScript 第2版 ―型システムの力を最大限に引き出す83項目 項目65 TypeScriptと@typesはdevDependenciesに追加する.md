---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目65 TypeScriptと@typesはdevDependenciesに追加する
description: npm の依存の種類を整理し、実行時に不要な TypeScript と @types は devDependencies に入れるべき理由を説明する項目
tags: [book-chapter, typescript]
date: 2025-04-19
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 65
---

## TL;DR

- [[npm|npm]] の依存には `dependencies`、`devDependencies`、`peerDependencies` などの種類がある。
- TypeScript は開発ツールで、型情報は実行時に存在しないので、TypeScript も `@types` も `devDependencies` に入れる。

## 内容

### npm の依存の種類

npm の `package.json` では、依存パッケージをいくつかの種類に分けて書く。

[dependencies](https://docs.npmjs.com/cli/v11/configuring-npm/package-json#dependencies) は、実行時に必要なパッケージである。npm に公開したパッケージをインストールすると、その `dependencies` もインストールされる（[[transitive-dependency|推移的依存関係]]）。

[devDependencies](https://docs.npmjs.com/cli/v11/configuring-npm/package-json#devdependencies) は、開発やテストでは必要だが、実行時には要らないパッケージである。`dependencies` とは違い、推移的にはインストールされない。

[peerDependencies](https://docs.npmjs.com/cli/v11/configuring-npm/package-json#peerdependencies) は、実行時に必要だが、そのバージョン管理の責任は負いたくないパッケージである。たとえば [[react|React]] のコンポーネントを公開する場合、コンポーネント側で React のバージョンを指定すると、利用者のページで複数のバージョンの React が動くおそれがある。そこで React を `peerDependencies` に入れて互換性のあるバージョンだけを指定すれば、実際に使うバージョンの選択を利用者に任せられる。

### TypeScript と @types は devDependencies に入れる

[[typescript|TypeScript]] は開発ツールであり、型情報は実行時に存在しない。そのため、TypeScript は一般に `devDependencies` に入れる。同じ理由で、`@types` も `devDependencies` に入れるべきである。

ほかにも理由がある。

- 型の推移的な依存を避けるため（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目70 型を部分的にコピーして依存を断ち切る|項目70 型を部分的にコピーして依存を断ち切る]]）
- Web アプリケーションのイメージを小さくし、起動を速くするため
- エンドユーザに直接影響する `dependencies` の更新を優先できるようにするため。[[dependabot|Dependabot]] や [[renovate|Renovate]] には、`dependencies` を優先する設定がある

## キーワード

- [[npm|npm]]
- [[transitive-dependency|推移的依存関係]]
- [[dependabot|Dependabot]]
- [[renovate|Renovate]]
- [[react|React]]
- [[typescript|TypeScript]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

---
title: Conventional Commits
aliases: []
description: 人間と機械が読みやすく、意味のあるコミットメッセージを書くための仕様
tags: [word, git]
date: 2026-02-07
---

## TL;DR

人間と機械が読みやすく、意味のあるコミットメッセージにするための仕様。`<type>[scope]: <description>` の形でコミットの種類を明示する。

## なぜ必要か

コミットの種類が決まった形で書かれていれば、ツールで扱える。公式サイトは、CHANGELOG の自動生成、[[semantic-versioning|セマンティックバージョニング]]のバージョンの自動決定、変更内容の共有、ビルドやリリースの起動、構造化された履歴による貢献のしやすさを利点に挙げている。

`fix` は SemVer の PATCH、`feat` は MINOR、破壊的変更は種類にかかわらず MAJOR に対応する。

## 仕組み

コミットメッセージは次の形で書く。

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### type（必須）

コミットの種類を表す。仕様で決まっているのは、バグ修正の `fix` と新機能追加の `feat` である。それ以外の種類も使ってよく、たとえば [Angular の規約](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)では次のものを使う。

- `build`: ビルドシステムや依存関係に関する変更
- `ci`: CI の設定ファイルやスクリプトの変更
- `docs`: ドキュメントの変更
- `style`: フォーマットなど、コードの意味に影響しない変更
- `refactor`: リファクタリング
- `perf`: パフォーマンス改善
- `test`: テストの追加や既存のテストの修正

### そのほかの要素

scope（任意）は、`api` のように変更が影響する範囲を書く。description（必須）は変更の短い要約、body（任意）は変更についての追加の情報である。

footer（任意）は、単語のトークンに `: ` か ` #` を続け、値を書いたものである。複数書ける。

```
Refs: #123
Reviewed-by: Z
```

### 破壊的変更

破壊的変更は、type に `!` を付けるか、footer に `BREAKING CHANGE` を書いて表す。両方を付けてもよい。

```
feat!: send an email to the customer when a product is shipped
```

```
feat: allow provided config object to extend other configs

BREAKING CHANGE: `extends` key in config file is now used for extending other config files
```

```
chore!: drop support for Node 6

BREAKING CHANGE: use JavaScript features not available in Node 6.
```

## 注意点

footer のトークンでは空白の代わりに `-` を使わなければならない（`Reviewed-by` など）。ただし `BREAKING CHANGE` は例外である。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[semantic-versioning|セマンティックバージョニング]]

## 出典

- [Conventional Commits](https://www.conventionalcommits.org)

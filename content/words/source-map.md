---
title: ソースマップ
aliases: [Source Map]
description: minify やトランスパイルをしたコードを、元のソースコードに対応させるためのファイル
tags: [word, javascript, フロントエンド]
date: 2025-06-07
---

## TL;DR

[[minification|minify]] や[[transpile|トランスパイル]]をした [[javascript|JavaScript]] のコードを、開発時の元のソースコードに対応させるためのファイル。

## なぜ必要か

ブラウザに届くコードは、配信を効率よくするために結合・minify されていたり、古いブラウザ向けに変換されていたり、[[typescript|TypeScript]] や Sass から生成されていたりする。ソースマップがあれば、エラーが起きたときに変換後の読みにくいコードではなく、開発時のソースコードを見ながらデバッグできる。

## 仕組み

ソースマップは JSON 形式のファイルで、変換後のコードと元のソースの対応、元のソース、ファイルの情報を持つ。ブラウザは、レスポンスの `SourceMap` ヘッダか、生成されたコードの末尾にある `sourceMappingURL` の注釈からソースマップを見つける。ソースマップを使うのはブラウザの開発者ツールで、コードの実行には影響しない。

## 例

SCSS から生成した `index.css` の末尾には、次のような注釈が付く。

```css
/*# sourceMappingURL=index.css.map */
```

`index.css.map` の中身は次のようになる。

```json
{
  "version": 3,
  "sourceRoot": "",
  "sources": ["index.scss"],
  "names": [],
  "mappings": "AAAA;EACC;;AACA;EACC",
  "file": "index.css"
}
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 出典

- [ソースマップ - MDN](https://developer.mozilla.org/ja/docs/Glossary/Source_map)

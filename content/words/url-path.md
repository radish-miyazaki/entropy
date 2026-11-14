---
title: パス
aliases: [URL のパス]
description: URL のうち、サーバ内の階層化されたリソースの位置を示す部分
tags: [word, url, next.js]
date: 2024-11-13
---

## TL;DR

[[url|URL]] のうち、[[domain-name|ドメイン名]]に続く文字列で、サーバ内の階層化されたリソースの位置を示す部分である。

## 仕組み

パスの各階層は `/` で区切られる。これによって、Web サーバ上のファイルやディレクトリの位置を示せる。

パスは省略できる。省略した場合は、サーバの設定で決められたデフォルトのファイルが返される。一般的には `index.html` や `index.php` のようなファイルである。

[[rfc|RFC]] 3986 によると、パスは階層的なデータを持ち、`/` で区切られたパスセグメントの並びからなる。パスは、最初の `?` か `#`、または URI の終わりで終わる。`.` と `..` はドットセグメントと呼ばれ、ファイルシステムの現在のディレクトリと親ディレクトリのように、階層の中の相対的な位置を表す。ドットセグメントは、相対参照を解決するときに取り除かれる。

[[nextjs|Next.js]] のドキュメントでは、URL Path を「ドメイン（または `basePath`）に続く URL 文字列」と説明している。

## 注意点

`/` や `;`、`?` は予約された文字なので、パスの名前の一部としては使えない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[url|URL]]
- [[url-segment|URL Segment]]
- [[query-parameter|クエリパラメータ]]
- [[host|ホスト]]

## 出典

- [URI - MDN](https://developer.mozilla.org/ja/docs/Web/URI#パス)
- [RFC 3986 Section 3.3 Path](https://datatracker.ietf.org/doc/html/rfc3986#section-3.3)
- [Routing: Terminology - Next.js](https://nextjs.org/docs/app/building-your-application/routing#terminology)

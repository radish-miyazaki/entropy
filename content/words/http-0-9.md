---
title: HTTP/0.9
aliases: []
description: 1990 年に公開された、HTML ドキュメントを取得するだけの最初期の HTTP
tags: [word, http]
date: 2024-09-30
---

## TL;DR

1990 年に公開された最初期の [[http|HTTP]]。HTML ドキュメントを要求して取得するだけのプロトコルで、今の HTTP とは互換性がない。後に [[http-1-0|HTTP/1.0]] が出てきたので、それ以前の仕様として /0.9 と呼ばれている。

## 仕組み

### 当初の HTTP/0.9

HTML ドキュメントを取得するほかに、フォームと検索の機能があった。HTML の中で `<isindex>` タグを使うとテキスト入力欄が表示され、検索するとアドレスの末尾に `?` と単語（`+` 区切り）を付けてリクエストを送る（例: `http://example.com/?search+word`）。サーバは結果を書いた HTML を作って返す。

一方で、次のようなことはできなかった。

- 1 つのドキュメントしか送れない
- すべての内容が HTML である前提なので、サーバがコンテンツの形式を伝えられない
- 検索以外のリクエストを送れない。新しい文書の送信、更新、削除もできない
- リクエストが正しかったか、サーバが正しく応答できたかを知る方法がない

### 1992 年版の HTTP/0.9

1992 年に、先に使われていた電子メールやニュースグループのプロトコルを取り込んで、大幅な更新が書かれた。これはまだ HTTP/1.0 ではないが、ほとんど今の HTTP と同じである。

リクエストには、シンプル版（0.9 互換）とフル機能版（1.0 とほぼ同じ）の 2 つの形式があった。フル機能版では、HTTP メソッドと HTTP バージョンを含むリクエスト行と、[[host-header|Host]]、[[user-agent|User-Agent]]、[[accept-header|Accept]] などのリクエストのフィールドが加わった。レスポンスにも、HTTP バージョンと 3 桁のステータスコードを含むステータス行と、リクエストと同じ形式のフィールドが加わった。

フィールドは電子メールと同じ `名前: 値` の形式である。フィールドとヘッダの呼び方については [[header-field|ヘッダフィールド]] を参照。

## 注意点

`<isindex>` は HTML5 で削除されたので、今は使えない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[http-1-0|HTTP/1.0]]
- [[http-message|HTTP メッセージ]]
- [[header-field|ヘッダフィールド]]

## 出典

- [[Real World HTTP 第3版 ―歴史とコードに学ぶインターネットとウェブ技術]]
- [The Original HTTP as defined in 1991](https://www.w3.org/Protocols/HTTP/AsImplemented.html)
- [HTTP as implemented in WWW（1992 年版）](https://www.w3.org/Protocols/HTTP/HTTP2.html)
- [HTTP Methods](https://www.w3.org/Protocols/HTTP/Methods.html)
- [HTTP Request Headers](https://www.w3.org/Protocols/HTTP/HTRQ_Headers.html)
- [isindex - W3C Wiki](https://www.w3.org/html/wiki/Elements/isindex)
- https://www.tohoho-web.com/html/isindex.htm

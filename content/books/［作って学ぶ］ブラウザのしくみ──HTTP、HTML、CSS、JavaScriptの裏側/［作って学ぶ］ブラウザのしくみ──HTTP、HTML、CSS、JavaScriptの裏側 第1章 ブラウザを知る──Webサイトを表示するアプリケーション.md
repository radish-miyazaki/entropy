---
title: ［作って学ぶ］ブラウザのしくみ──HTTP、HTML、CSS、JavaScriptの裏側 第1章 ブラウザを知る──Webサイトを表示するアプリケーション
description: ブラウザの 3 つのコアな役割（サーバとの通信、HTML と CSS の描画、JavaScript の実行）と、それを支える機能やマルチプロセスアーキテクチャを概観する章
tags: [book-chapter]
date: 2024-11-12
book: "[[［作って学ぶ］ブラウザのしくみ──HTTP、HTML、CSS、JavaScriptの裏側]]"
chapter: 1
---

## TL;DR

- [[web-browser|ブラウザ]]のコアとなる役割は、サーバと通信するクライアント、HTML と CSS を描画する[[rendering-engine|レンダリングエンジン]]、JavaScript を実行する[[javascript-engine|JavaScript エンジン]]の 3 つである。
- HTML、CSS、JavaScript はどれも、文字列をトークンに分け、木構造のデータに変換してから扱われる。
- 現代のブラウザは、これらの機能を複数の[[process|プロセス]]に分けて動かしている。

## 内容

### サーバと通信するクライアント

ブラウザは、インターネットを通じてサーバと通信するクライアントである。この役割の背景として、クライアント / サーバモデル、インターネットと Web、[[http|HTTP]]、通信プロトコル、[[url|URL]]、[[dns|DNS]]、[[cdn|CDN]] を扱う。

### HTML と CSS を描画するレンダリングエンジン

[[html|HTML]] のソースコードは、文字列からトークン、トークンから [[dom|DOM]] ツリーへと、データ構造を変えながら解析される。HTML のトークンは意味を持つ文字列の最小単位で、DOCTYPE、開始タグ、終了タグ、コメント、文字、EOF の 6 種類がある。

DOM は HTML 文書の構造とコンテンツを表すデータ構造で、JavaScript などのスクリプト言語から HTML を操作するために使う。DOM ツリーのノードは、[DOM Living Standard](https://dom.spec.whatwg.org/) で [[interface-description-language|IDL]] によって定義された [Node インタフェース](https://dom.spec.whatwg.org/#interface-node)を実装したオブジェクトである。そのため、どのノードも `firstChild` を持ち、`appendChild` で子ノードを追加できる。

```
[Exposed=Window]
interface Node : EventTarget {
  readonly attribute Node? firstChild;
  ...
  [CEReactions] Node appendChild(Node node);
};
```

インタフェースは継承できる。2024 年時点で `Node` を継承するインタフェースは、`Element`、`Attr`、`Text`、`Comment`、`Document` など 9 種類ある。各タグに対応するインタフェースは `Element` を継承する。たとえば `<a>` を表す `HTMLAnchorElement` は、`HTMLElement`、`Element`、`Node` の順に継承している。

[[css|CSS]] も、文字列からトークン、トークンから [[cssom|CSSOM]] へと変換される。CSS のトークンは [CSS Syntax Module Level 3](https://www.w3.org/TR/css-syntax-3/#tokenization) で 24 種類定義されており、`ident-token`、`number-token`、`{-token` などがある。CSSOM は CSS をツリーで表したデータ構造で、各ノードのスタイルや大きさ、位置を決めるのに使う。DOM ツリーのノードがすべて `Node` を実装するのに対し、CSSOM には CSS 文書のルートを表す `CSSStyleSheet` や、1 つの CSS ルールを表す `CSSStyleRule` など、さまざまな種類のノードがある。

ブラウザは DOM ツリーと CSSOM をもとに、[[render-tree|レイアウトツリー]]（レンダーツリー）を作る。名前はブラウザによって異なる。レイアウトツリーは、各要素の画面上の位置、幅と高さ、要素どうしの親子・兄弟関係などを決めるためのデータ構造である。

### JavaScript を実行する JavaScript エンジン

JavaScript エンジンは、JavaScript を解釈して実行するソフトウェアである。JavaScript の仕様は [ECMAScript Language Specification](https://262.ecma-international.org/) で定められている。JavaScript も HTML や CSS と同じく、文字列をトークンに分け、[[abstract-syntax-tree|抽象構文木]]（AST）を作って解釈する。トークンには識別子（IdentifierName）、予約語（ReservedWord）、記号（Punctuator）、数値（NumericLiteral）、文字列（StringLiteral）などがある。AST には CSSOM と同じくさまざまな種類のノードがある。たとえば足し算と引き算を表す `AdditiveExpression` は、BNF で次のように定義されている。

```
AdditiveExpression :
  MultiplicativeExpression
  AdditiveExpression + MultiplicativeExpression
  AdditiveExpression - MultiplicativeExpression
```

ブラウザ API は、DOM API や [[fetch-api|Fetch API]] など、ブラウザが提供する API の総称である。DOM API は JavaScript の言語仕様とは独立している。たとえば `document.getElementsByTagName('h1')` は、DOM Living Standard の `Document` インタフェースで定義されている。

### コアの役割を支える機能

現在のブラウザは、3 つのコアな役割に加えて、使いやすさのための機能を多く持つ。ストレージ（[[cookie|Cookie]]、[[local-storage|Local Storage]]、[[session-storage|Session Storage]]）、キャッシュ、拡張機能、タブやブックマーク、履歴、シークレットモードなどの UI の機能がその例である。

キャッシュは、HTML、CSS、JavaScript、画像などのリソースを保存しておき、再びリクエストされたときにネットワークからのダウンロードを省く。これにより Web サイトの読み込みが速くなる。キャッシュは `Cache-Control`、`Expires`、`Last-Modified` などの HTTP ヘッダで制御でき、有効期限を過ぎたデータは削除される。

### マルチプロセスアーキテクチャ

現代のブラウザは、これらの機能を複数の[[process|プロセス]]で動かすことが多い。この設計を[[multi-process-architecture|マルチプロセスアーキテクチャ]]と呼ぶ。仕様で決まっているわけではないが、主なプロセスは 2 種類ある。データの保管やネットワーク通信を扱うブラウザプロセスと、HTML、CSS、JavaScript を解釈して描画するレンダラプロセスである。ブラウザを開くとブラウザプロセスが起動し、タブを 1 つ開くごとにレンダラプロセスが 1 つ起動する。ただし `<iframe>` を別のレンダラプロセスで実行することもあり、タブとレンダラプロセスは必ずしも 1 対 1 ではない。

プロセスを分けるのは、誰が書いたか分からない HTML や CSS、JavaScript を信用できないからである。プロセスを分けるとメモリ空間も分かれるので、重要な情報を扱うブラウザプロセスへのアクセスを防げる。

[[thread|スレッド]]は、ユーザとのやりとりや画面の描画を担う UI スレッド（メインスレッド）と、ネットワーク処理などを行う複数のバックグラウンドスレッドに分かれていることが多い。ユーザが制御できる[[worker-thread|ワーカースレッド]]もある。

iOS のブラウザアプリは例外である。Apple の規約により、iOS アプリはシングルプロセスで動かす必要がある。また、レンダリングエンジンには Apple の [WebKit](https://developer.apple.com/documentation/webkit) を使い、[WKWebView](https://developer.apple.com/documentation/webkit/wkwebview) で描画しなければならない。EU では DMA の施行によってこの制限が緩和された（[Apple の説明](https://developer.apple.com/support/alternative-browser-engines/)）。ただし本書の執筆時点では日本は対象外で、日本の iOS ブラウザアプリは `WKWebView` を使う必要があった。

### ブラウザのセキュリティ対策

ブラウザのセキュリティ対策として、[[site-isolation|サイト分離]]、[[same-origin-policy|同一生成元ポリシー]]、[[content-security-policy|コンテンツセキュリティポリシー]]（CSP）を挙げている。

## キーワード

- [[web-browser|ブラウザ]]
- [[rendering-engine|レンダリングエンジン]]
- [[javascript-engine|JavaScript エンジン]]
- [[html|HTML]]
- [[css|CSS]]
- [[dom|DOM]]
- [[cssom|CSSOM]]
- [[render-tree|レイアウトツリー]]
- [[abstract-syntax-tree|抽象構文木]]
- [[interface-description-language|IDL]]
- [[http|HTTP]]
- [[url|URL]]
- [[dns|DNS]]
- [[cdn|CDN]]
- [[fetch-api|Fetch API]]
- [[cookie|Cookie]]
- [[local-storage|Local Storage]]
- [[session-storage|Session Storage]]
- [[multi-process-architecture|マルチプロセスアーキテクチャ]]
- [[process|プロセス]]
- [[thread|スレッド]]
- [[worker-thread|ワーカースレッド]]
- [[site-isolation|サイト分離]]
- [[same-origin-policy|同一生成元ポリシー]]
- [[content-security-policy|コンテンツセキュリティポリシー]]

## 自分の理解

iOS アプリをシングルプロセスで動かす必要があるという点について、[App Review ガイドライン](https://developer.apple.com/jp/app-store/review/guidelines/)を読んでも具体的な根拠は見つからなかった。経験則なのかもしれない。Stack Overflow には[同じ疑問を扱った質問](https://stackoverflow.com/questions/78999016/does-ios-support-multi-process-apps-like-android-does)がある。

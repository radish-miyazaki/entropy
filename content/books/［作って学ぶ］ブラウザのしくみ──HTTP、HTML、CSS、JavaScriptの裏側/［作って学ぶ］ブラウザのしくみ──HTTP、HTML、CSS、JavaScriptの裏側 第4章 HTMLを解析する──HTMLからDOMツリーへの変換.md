---
title: ［作って学ぶ］ブラウザのしくみ──HTTP、HTML、CSS、JavaScriptの裏側 › HTMLを解析する──HTMLからDOMツリーへの変換
description: HTML Living Standard のステートマシンに沿って HTML を字句解析・構文解析し、Rust で DOM ツリーを構築する章
tags: [book-chapter]
date: 2024-11-17
book: "[[［作って学ぶ］ブラウザのしくみ──HTTP、HTML、CSS、JavaScriptの裏側]]"
chapter: 4
---

## TL;DR

- HTML をブラウザに実装するとは、HTML の文字列を[[lexical-analysis|字句解析]]でトークンに分け、構文解析で [[dom|DOM]] ツリーを組み立て、画面に描画することである。
- どちらのアルゴリズムも、HTML Living Standard で[[state-machine|ステートマシン]]として定められている。
- [[rust|Rust]] で DOM ツリーを作るときは、[[reference-cycle|循環参照]]を避けるために `Rc` と `Weak` を使い分ける。

## 内容

### 字句解析と構文解析

[[html|HTML]] をブラウザに実装するとは、HTML で書かれた文字列を解釈し、画面に描画することである。文字列を解釈するとは、文字列を意味のある小さな単位に分割し（字句解析）、分割した要素の構造や階層関係を解析する（構文解析）ことである。この流れは HTML に限らず、プログラミング言語やほかのマークアップ言語を実装するときも同じである。

### HTML の字句解析

字句解析のアルゴリズムは、[HTML Living Standard 13.2.5 Tokenization](https://html.spec.whatwg.org/multipage/parsing.html#tokenization) でステートマシンとして定められている。文字列を 1 文字ずつ読み、現在の状態と次の 1 文字によって、状態を更新し、トークンを生成する。トークンは 6 種類あるが、本書は開始タグ、終了タグ、文字、EOF の 4 種類だけを扱う。状態は 80 種類あるが、本書が扱うのは 17 種類である。

初期状態の Data では、`<` を読むと Tag open に移り、それ以外の文字は文字トークンとして返す。Tag open では、`/` を読むと End tag open に移り、アルファベットを読むと開始タグトークンを作って Tag name に移る。Tag name では、アルファベットをタグ名に追加していき、`>` を読むとトークンを返して Data に戻る。ホワイトスペースを読むと属性の処理に入り、Before attribute name、Attribute name、After attribute name、Before attribute value を経て、値が `"` で囲まれているか、`'` で囲まれているか、囲まれていないかに応じた状態で属性値を読み取る。`/` を読むと Self-closing start tag に移り、続けて `>` を読むと、自己終了タグであることを示すフラグを立てた開始タグトークンを返す。`<script>` の中身は Script data から始まる 4 つの状態で扱い、`</script>` が来るまでの文字を文字トークンとして返す。

仕様書では 2 つの言葉が繰り返し出てくる。[reconsume](https://html.spec.whatwg.org/multipage/parsing.html#reconsume) は、状態だけを切り替えて、いま読んだ文字をもう一度処理することを指す。そのため実装では、再処理するかどうかをフラグで持っておく。[temporary buffer](https://html.spec.whatwg.org/multipage/parsing.html#temporary-buffer) は、処理の途中経過を記録する一時的なバッファである。仕様書では状態としては分類されていない。

### HTML の構文解析

構文解析では、字句解析で得たトークンから DOM ツリーを作る。DOM ツリーのノードはそれぞれ HTML のタグを表し、[Node インタフェース](https://dom.spec.whatwg.org/#interface-node)を実装する。`Node` には `appendChild` や `insertBefore` などのメソッドが定義されている。`Node` を継承するインタフェースには、DOM ツリーのルートを表す `Document`、要素を表す `Element`、要素内のテキストを表す `Text` などがある。`Document` が持つ `getElementById` は、厳密には `Document` がミックスインしている `NonElementParentNode` インタフェースで定義されている。

[Window オブジェクト](https://html.spec.whatwg.org/multipage/nav-history-apis.html#the-window-object)は、スクリプトを実行しているブラウザのウィンドウを表し、DOM ツリーのルートを持つ。1 つの Web ページに 1 つのインスタンスがあり、`iframe` は独自の `Window` を持つ。JavaScript ではグローバル変数 `window` として参照できる。

DOM ツリーを作るアルゴリズムは [HTML Living Standard 13.2.6 Tree construction](https://html.spec.whatwg.org/multipage/parsing.html#tree-construction) で定められており、これもステートマシンである。トークンを 1 つずつ処理しながら状態（insertion mode）を切り替え、DOM ツリーを広げていく。仕様では 23 種類の状態があるが、本書は 9 種類だけ実装する。開始時の DOM ツリーは `Document` オブジェクトだけで、状態は Initial である。

Before html で `<html>` の開始タグを受け取ると、`html` 要素を [stack of open elements](https://html.spec.whatwg.org/multipage/parsing.html#the-stack-of-open-elements) に積んで Before head に移る。ほかのトークンを受け取っても同じ処理をするので、`<html>` を省略した HTML も解析できる。stack of open elements は、開いている要素を追跡するためのスタックである。開始タグが現れると要素を積み、終了タグが現れると取り除くことで、要素の親子関係を管理する。

Before head も同じように `head` 要素を積んで In head に移る。In head では、`<style>` や `<script>` の開始タグを受け取ると要素を積んで Text に移り、戻り先として現在の状態を [original insertion mode](https://html.spec.whatwg.org/multipage/parsing.html#original-insertion-mode) に保存する。`</head>` を受け取ると `head` 要素を取り除いて After head に移る。それ以外のトークンは無視する。すべてのタグを実装するのは難しいので、本書は仕様と異なり、サポートしないタグがあってもパーサが動き続けるようにしている。

たとえば `<body><h1>Hello world</h1></body>` は、Initial、Before html（`html` 要素を追加）、Before head（`head` 要素を追加）、In head、After head（`body` 要素を追加）、In body（`h1` 要素とテキストを追加）、After body、After after body の順に遷移する。

### Rust での循環参照

循環参照とは、オブジェクトどうしが互いに参照し合う状態である。循環参照があると、どのオブジェクトも参照され続けるので解放されず、メモリを占有し続ける。DOM ツリーのノードは親、子、兄弟を互いに参照するので、循環参照が起きやすい。

Rust では、強い参照の [Rc](https://doc.rust-lang.org/std/rc/struct.Rc.html) と弱い参照の [Weak](https://doc.rust-lang.org/std/rc/struct.Weak.html) を使い分けて循環参照を避ける（[The Rust Programming Language 日本語版](https://doc.rust-jp.rs/book-ja/ch15-06-reference-cycles.html)）。`Weak` は `Rc::downgrade` で作るのが一般的である。本書では、データ構造の所有権に近い役割を持つ最初の子ノードと次の兄弟ノードへの参照に `Rc` を使い、それ以外の参照には `Weak` を使う。

```rust
pub struct Node {
    pub kind: NodeKind,
    window: Weak<RefCell<Window>>,
    parent: Weak<RefCell<Node>>,
    first_child: Option<Rc<RefCell<Node>>>,
    last_child: Weak<RefCell<Node>>,
    previous_sibling: Weak<RefCell<Node>>,
    next_sibling: Option<Rc<RefCell<Node>>>,
}
```

## キーワード

- [[html|HTML]]
- [[dom|DOM]]
- [[lexical-analysis|字句解析]]
- 構文解析
- [[state-machine|ステートマシン]]
- [[reference-cycle|循環参照]]
- [[rust|Rust]]

## 自分の理解

本書では Script data から始まる状態も定義しているが、ほかに扱う状態のどれからもこれらへは遷移しないので、実際には使われないのではないかと思った。

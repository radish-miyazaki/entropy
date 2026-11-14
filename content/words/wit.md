---
title: WIT
aliases: [WebAssembly Interface Type]
description: WebAssembly Component のインタフェースを定義するための IDL
tags: [word, webassembly]
date: 2024-10-18
---

## TL;DR

[[webassembly-component|WebAssembly Component]] のインタフェースを定義するための言語（[[interface-description-language|IDL]]）。

## 仕組み

### インタフェース（interface）

`interface` に続けてインタフェース名を書き、`{` と `}` の間に関数とデータ型を書く。関数は `関数名: func(引数リスト) -> 戻り値の型;` の形で書く。

```wit
interface greetable {
  name: func() -> string;
  greet: func(name: string) -> string;
}
```

### ワールド（world）

コンポーネントの定義は `world` キーワードで書き、ワールドと呼ぶ。`export` には、コンポーネントが実装して外部に提供するインタフェースを、いくつでも書ける。`import` には、コンポーネントが依存する、外部で実装されたインタフェースを書く。

```wit
world greetable-provider {
  import sayable;
  export greetable;
}
```

複数のインタフェースを export するコンポーネントは、各インタフェースを実装したコンポーネントを内部に持つ。インスタンス化すると内部のコンポーネントもインスタンス化されるので、インスタンスは他のインスタンスへの参照を持つ。

### パッケージ（package）

パッケージは、ワールドやインタフェースの識別子になる。WIT ファイルの先頭で `package ネームスペース:パッケージ ID` の形で宣言する。ネームスペースは [[wa-dev|wa.dev]] などのレジストリのユーザ名や組織名である。

```wit
package radish:greet;

interface greetable {
  name: func() -> string;
  greet: func(name: string) -> string;
}

world greetable-provider {
  export greetable;
}
```

インタフェースやワールドの識別子は `ネームスペース:パッケージ ID/名前` の形で、上の例では `radish:greet/greetable` になる。同じパッケージのインタフェースはネームスペースとパッケージ ID を省略できる。別のパッケージのものは省略できず、レジストリへの登録が必要である。

### データ型

整数型は符号なしの `u8`〜`u64` と符号ありの `s8`〜`s64` で、[[rust|Rust]] の `u8`〜`u64`、`i8`〜`i64` に対応する。ほかに `bool`、`f32`、`f64`、`char`、`string`、`list<T>`、`option<T>`、`result<T, E>`、`tuple<A, B>` がある。

型を組み合わせるには、次のキーワードを使う。

- `enum`: 値を持たない列挙型。Rust の `enum` に対応する
- `variant`: 値を持てる列挙型。Rust の `enum` に対応する
- `record`: 構造体。Rust の `struct` に対応する
- `flags`: 複数の真偽値を名前付きでまとめる
- `type`: 型エイリアスを定義する
- `resource`: ファイルなど、コンポーネントの外にあるリソースを操作するハンドル。状態を持ち、操作をメソッドとして定義できる

```wit
variant allowed-destinations {
  none,
  any,
  restricted(list<address>),
}

record customer {
  id: u64,
  name: string,
  picture: option<list<u8>>,
  account-manager: employee,
}

type buffer = list<u8>;
```

## 例

`wasi:http` の `outgoing-request` は `resource` で定義されている（抜粋）。詳しくは [[Rustで学ぶWebAssembly ―入門からコンポーネントモデルによる開発まで 第7章 Hello, wasi：http／proxy|第7章 Hello, wasi:http/proxy]] で扱っている。

```wit
resource outgoing-request {
  constructor(headers: headers);
  body: func() -> result<outgoing-body>;
  method: func() -> method;
  set-method: func(method: method) -> result;
  headers: func() -> headers;
}
```

## 自分の理解

コンポーネントは入れ子のような構造になっている、と捉えている。

## 関連

- [[webassembly-component-model|WebAssembly Component Model]]
- [[webassembly-component|WebAssembly Component]]
- [[interface-description-language|IDL]]
- [[wasi|WASI]]

## 出典

- [[Rustで学ぶWebAssembly ―入門からコンポーネントモデルによる開発まで]]
- [WIT Reference](https://component-model.bytecodealliance.org/design/wit.html)
- [wasi:http の types.wit](https://github.com/WebAssembly/WASI/blob/dbe2733c6b0ee04609d877770b549adef99daacd/wasip2/http/types.wit#L309-L387)
- [WebAssembly Interface Type 101（Zenn）](https://zenn.dev/chikoski/articles/webassembly-interface-type-101)

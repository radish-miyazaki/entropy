---
title: wasm-tools
aliases: []
description: WebAssembly のモジュールやコンポーネントを低レベルで扱うための、Bytecode Alliance の CLI と Rust ライブラリ
tags: [word, rust, webassembly]
date: 2024-10-22
---

## TL;DR

[[webassembly|WebAssembly]] のモジュールやコンポーネントを低レベルで扱うための CLI ツールと [[rust|Rust]] のライブラリ。[[bytecode-alliance|Bytecode Alliance]] が開発している。

## 仕組み

[[cargo|Cargo]] でインストールする。

```sh
$ cargo install wasm-tools
```

README に載っている主なサブコマンドは次のとおり。

| サブコマンド    | 説明                                                             |
| --------------- | ---------------------------------------------------------------- |
| `validate`      | WASM ファイルを検証する                                          |
| `parse`         | テキスト形式（[[wat                                              | WAT]]）をバイナリに変換する      |
| `print`         | バイナリをテキスト形式に変換する                                 |
| `dump`          | バイナリ形式のデバッグ情報を表示する                             |
| `objdump`       | セクションヘッダのデバッグ情報を表示する                         |
| `strip`         | カスタムセクションを取り除く                                     |
| `demangle`      | `name` セクションにある Rust や C++ のシンボル名をデマングルする |
| `component new` | コアの WASM バイナリから [[webassembly-component                 | WebAssembly Component]] を作る   |
| `component wit` | Component から [[wit                                             | WIT]] のインタフェースを取り出す |

## 例

WAT との相互変換は [[wat|WAT]] を参照。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[wat|WAT]]
- [[wac]]
- [[cargo-component]]

## 出典

- [bytecodealliance/wasm-tools](https://github.com/bytecodealliance/wasm-tools)

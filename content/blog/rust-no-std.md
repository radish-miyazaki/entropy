---
title: Rust で標準パッケージを無効にする
description: "#![no_std] で標準ライブラリを外すと、パニックハンドラ、アンワインド、エントリポイント、リンカの設定を自分で用意する必要がある"
tags: [blog, rust]
date: 2024-11-08
draft: false
---

## TL;DR

- [[rust|Rust]] で標準ライブラリを無効にするには、ソースコードに `#![no_std]` アトリビュートを書く。
- `#![no_std]` だけではビルドが通らない。パニックハンドラの定義、アンワインドの無効化、エントリポイントの定義、リンカへの指定を順に足すと、ビルドが通った。

## 背景

`#![no_std]` は、[[bare-metal|ベアメタル]]環境（組み込みシステムなど）や [[freestanding-environment|フリースタンディング環境]]（OS の実装など）を作りたいときに使う。標準ライブラリを外したときに何が必要になるかを、ビルドのエラーを一つずつ解消しながら確かめた。

## 検証

### println! が使えない

まず、次のコードをビルド（`cargo build`）する。

```rust
#![no_std]

fn main() {
    println!("Hello, world!");
}
```

`println!` は標準ライブラリに含まれるので、このコードはエラーになる。

### パニックハンドラとアンワインド

`main` 関数の本体を空にしても、次のエラーが出る。

```sh
error: `#[panic_handler]` function required, but not found
error: unwinding panics are not supported without std
```

`#[panic_handler]` は、パニックが起きたときにコンパイラが呼び出す関数を定義する。標準ライブラリには独自のパニックハンドラがあるが、`no_std` の環境では自分で実装する必要がある。

```rust
use core::panic::PanicInfo;

#[panic_handler]
fn panic(_info: &PanicInfo) -> ! {
    loop {}
}
```

`PanicInfo` は、パニックが起きたファイルと行、パニックのメッセージを持つ。戻り値の型 `!` は never 型で、この関数が値を返さない発散する関数であることを表す。

もう一つのエラーはアンワインドに関するものである。パニックが起きたとき、Rust はデフォルトでアンワインドを行い、スタックにあるすべての変数のデストラクタを実行する。これにより、使われているメモリが確実に解放され、親スレッドはパニックを検知して実行を続けられる。標準ライブラリを外した場合、アンワインドは自分で実装しなければならない。ただし、アンワインドは複雑で、OS 固有のライブラリ（Linux では [libunwind](https://www.nongnu.org/libunwind/)、Windows では [Structured Exception Handling](https://learn.microsoft.com/en-us/windows/win32/debug/structured-exception-handling)）を必要とする。そこで、代わりにアンワインドを無効にする。

```toml
[profile.dev]
panic = "abort"

[profile.release]
panic = "abort"
```

### エントリポイント

この 2 つのエラーを解消してビルドしても、次のエラーが出る。

```sh
use `#![no_main]` to bypass the Rust generated entrypoint and
declare a platform specific entrypoint yourself, usually with `#[no_mangle]`
```

`main` 関数は、プログラムを実行したときに最初に呼び出される関数ではない。ほとんどの言語にはランタイムシステムがあり、GC や [[goroutine|ゴルーチン]]のようなソフトウェアスレッドを扱う。このランタイムを初期化する処理は `main` 関数の前に呼び出され、スタック領域の作成や、正しい[[cpu-register|レジスタ]]への引数の配置も含む。

Rust の場合は、まず crt0（C runtime zero）と呼ばれる C のランタイムライブラリが実行され、C アプリケーションの環境を設定する。次に C ランタイムが、`start` の [[lang-item|language item]] で定義された Rust ランタイムのエントリポイントを呼び出す。最後に `main` 関数が呼び出される。

今回のコードは Rust ランタイムにも crt0 にもアクセスしない想定なので、エントリポイントを自分で定義する。

```rust
#![no_main]

#[no_mangle]
pub extern "C" fn _start() -> ! {
    loop {}
}
```

- `#![no_main]`: Rust コンパイラに、通常のエントリポイントを使わないことを伝える
- `#[no_mangle]`: 関数名が[[name-mangling|マングリング]]されるのを防ぐ。エントリポイントとなる関数名をリンカに伝える必要があるので、必須である
- `extern "C"`: C 言語の [[abi|ABI]] を使うように指定する。これにより、C やアセンブリなどの他の言語から関数を呼び出せる（[[ffi|FFI]]）
- `_start`: 多くのシステムでのデフォルトのエントリポイント名。この関数はどの関数からも呼び出されず、OS や[[bootloader|ブートローダ]]から直接呼び出される

### リンカ

これを実行すると、今度は[[linker|リンカ]]のエラーが出る。実行可能ファイルの形式は OS ごとに異なり、それぞれのリンカが異なるエラーを出す。リンカはデフォルトで、プログラムが C ランタイムに依存すると仮定するが、実際には依存していないのでエラーになる。

C ランタイムに依存していないことをリンカに伝える方法は 2 つある。1 つ目は、ビルドターゲットにベアメタル環境のもの（組み込みシステム向けの `thumbv7em-none-eabihf` など）を指定する方法である。

```sh
$ rustup target add thumbv7em-none-eabihf
$ cargo build --target thumbv7em-none-eabihf
```

2 つ目は、リンカに引数を渡す方法である。引数にはホスト OS ごとに異なる値を渡す必要があるので、次のファイルを作ってから `cargo build` を実行する。

```toml
# .cargo/config.toml
[target.'cfg(target_os = "linux")']
rustflags = ["-C", "link-arg=-nostartfiles"]

[target.'cfg(target_os = "windows")']
rustflags = ["-C", "link-args=/ENTRY:_start /SUBSYSTEM:console"]

[target.'cfg(target_os = "macos")']
rustflags = ["-C", "link-args=-e __start -static -nostartfiles"]
```

各引数の意味は、[Writing an OS in Rust の該当箇所](https://os.phil-opp.com/ja/freestanding-rust-binary/#rinkahenoyin-shu)に説明がある。

## 結果

ここまでの変更で、ビルドが通った。

## キーワード

- [[rust|Rust]]
- [[bare-metal|ベアメタル]]
- [[freestanding-environment|フリースタンディング環境]]
- アンワインド
- crt0
- [[lang-item|language item]]
- [[name-mangling|マングリング]]
- [[abi|ABI]]
- [[ffi|FFI]]
- [[bootloader|ブートローダ]]
- [[linker|リンカ]]
- [[cpu-register|レジスタ]]
- [[goroutine|ゴルーチン]]

## 参考

- [Writing an OS in Rust: フリースタンディングな Rust バイナリ](https://os.phil-opp.com/ja/freestanding-rust-binary/)
- https://docs.rust-embedded.org/book/intro/no-std.html
- https://doc.rust-lang.org/nomicon/panic-handler.html
- https://doc.rust-lang.org/stable/core/panic/struct.PanicInfo.html
- https://github.com/rust-lang/rust/blob/master/library/std/src/rt.rs

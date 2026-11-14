---
title: Go の interface と Generics の内部構造と進化
description: Go のランタイムとコンパイラのコードを読み、空インタフェース、インタフェース、ジェネリクスの内部実装を解説する発表
tags: [talk, go]
date: 2025-09-27
speakers: [ryokotmng]
company:
event: "[[Go Conference 2025]]"
held: 2025-09-27
slide: https://speakerdeck.com/ryokotmng/go-type-system-internals
video:
---

## TL;DR

- [[go|Go]] の[[interface|インタフェース]]は、型情報（またはメソッドの表 `itab`）とデータへのポインタの組で表され、両方が nil のときだけ nil と等しくなる。
- [[generics|ジェネリクス]]は辞書と GC Shape Stenciling で実装され、完全な単相化を避けてコードサイズを抑えている。

## 内容

### 空インタフェースの内部実装

`interface{}` / `any` は、ランタイムの `eface` で表される。

```go
// src/runtime/runtime2.go
type eface struct {
	_type *_type
	data  unsafe.Pointer
}

// src/runtime/type.go
type _type = abi.Type
```

`_type` と `data` の両方が nil のときだけ、`nil` と等しいと判定される。

### インタフェースの内部実装

メソッドを持つインタフェースは `iface` で表される。`eface` と同じく、`tab` と `data` の両方が nil のときだけ `nil` と等しい。

```go
// src/runtime/runtime2.go
type itab = abi.ITab

type iface struct {
	tab  *itab
	data unsafe.Pointer
}
```

`itab` は、具象型とインタフェースのメソッドセットを対応付けるメソッドポインタの表である。メソッドは `itab` を経由して呼び出され、実行時に[[dynamic-dispatch|動的ディスパッチ]]される。

```go
// src/internal/abi/iface.go
type ITab struct {
	Inter *InterfaceType // 実装しているインタフェース型
	Type  *Type          // 基底型となる具象型
	Hash  uint32         // Type.Hash のコピー。型スイッチで使う
	Fun   [1]uintptr     // Fun[0] == 0 なら、Type は Inter を実装していない
}

// src/internal/abi/type.go
type InterfaceType struct {
	Type
	PkgPath Name      // パッケージのインポートパス
	Methods []Imethod // ハッシュで並び替えられる
}
```

これらの型は、型情報やインタフェースの表現といった低レベルなデータ構造を扱う `internal/abi` パッケージ（[[abi|ABI]]）にある。コンパイル時の型情報でも、空インタフェースは基底型だけを持ち、メソッドを持つインタフェースは `ITab` の中に基底型とメソッドの両方を持つ。

```go
type EmptyInterface struct {
	Type *Type
	Data unsafe.Pointer
}

type NonEmptyInterface struct {
	ITab *ITab
	Data unsafe.Pointer
}
```

### ジェネリクス

ジェネリクスは、辞書と GC Shape Stenciling で実装されている。コンパイラは、具体的な型引数で呼ばれるジェネリック関数をインスタンス化する。さらに辞書を使って純粋な[[monomorphization|単相化]]を避け、1 つの関数インスタンスを複数の型で動かすことで、コードサイズを節約している。

コンパイラでは、`Instantiate` 関数がジェネリックな型や関数に具体的な型引数を適用してインスタンス化する。

```go
// src/cmd/compile/internal/types2/instantiate.go
// orig は、型エイリアス、定義型、関数型のいずれかである必要がある
func Instantiate(ctxt *Context, orig Type, targs []Type, validate bool) (Type, error) {
	// ...
	if validate {
		tparams := orig_.TypeParams().list()
		// ...
		if i, err := (*Checker)(nil).verify(nopos, tparams, targs, ctxt); err != nil {
			return nil, &ArgumentError{i, err}
		}
	}

	inst := (*Checker)(nil).instance(nopos, orig_, targs, nil, ctxt)
	return inst, nil
}
```

辞書は `src/cmd/compile/internal/noder/reader.go` の `readerDict` で表され、型引数、派生型、`itab` などの情報を持つ。

### コア型の削除

Go 1.25 で、言語仕様からコア型（core type）の概念が削除された（[Go Blog](https://go.dev/blog/coretypes)、[解説記事](https://turbofish.hatenablog.com/entry/2025/06/22/204548)）。

## キーワード

- [[go|Go]]
- [[interface|インタフェース]]
- [[generics|ジェネリクス]]
- [[dynamic-dispatch|動的ディスパッチ]]
- [[abi|ABI]]
- [[monomorphization|単相化]]
- Typed nil

## 自分の理解

`_type` と `data` の両方が nil でないと nil にならないのは、初心者が陥りがちな Typed nil の話である。

## 関連

- [セッションのページ](https://gocon.jp/2025/talks/951608/)
- [Go 1.18 Implementation of Generics via Dictionaries and Gcshape Stenciling](https://go.googlesource.com/proposal/+/HEAD/design/generics-implementation-dictionaries-go1.18.md)
- [When To Use Generics - The Go Blog](https://go.dev/blog/when-generics)

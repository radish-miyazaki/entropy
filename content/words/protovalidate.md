---
title: protovalidate
aliases: [protovalidation]
description: Buf が開発している、Protocol Buffers のスキーマにバリデーションルールを書くためのライブラリ
tags: [word, protocol-buffers]
date: 2024-09-30
---

## TL;DR

[[buf|Buf]] が開発している、[[protocol-buffers|Protocol Buffers]] のスキーマにバリデーションルールを書くためのライブラリ。[[protoc-gen-validate]]（PGV）の後継にあたる。

## なぜ必要か

PGV でサポートしていた機能はすべてサポートしている。ルールの記述に [[cel|CEL]] を採用しているため柔軟性が高く、さまざまなルールを設定できる。

対応言語は [[go|Go]]、C++、Java、[[python|Python]]、[[typescript|TypeScript]] である（TypeScript 版は 2024 年 10 月時点で未リリース）。[[connect-rpc|Connect]] を使っている場合は、[validate-go](https://github.com/connectrpc/validate-go) で、全リクエストをチェックするインターセプタを足せる。

## 仕組み

`.proto` ファイルで `buf/validate/validate.proto` を `import` し、`option` でルールを付ける。ルールは付ける場所で 3 段階に分かれる。

- Message レベル: `google.protobuf.MessageOptions` を拡張する。`disabled` を `true` にすると、そのメッセージのほかのルールが無効になる
- Oneof レベル: `google.protobuf.OneofOptions` を拡張する。`required` を `true` にすると、oneof のどれか 1 つに値があることをチェックする
- フィールドレベル: `google.protobuf.FieldOptions` を拡張し、データ型ごとのルールを付ける

フィールドレベルでは、文字列（`StringRules`）のルールが特に多い。値の一致（`const`、`in`）、長さ（`min_len`、`max_bytes`）、正規表現（`pattern`）や部分一致（`prefix`、`contains`）のほか、メールアドレス、ホスト名、IP アドレス、URI、UUID といった形式もチェックできる。

```proto
message OneofExample {
  oneof union {
    option (buf.validate.oneof).required = true;
    string val1 = 1;
    string val2 = 2;
  }
}
```

## 例

[[go|Go]] で、文字列の長さを 1 文字以上に制限する。`buf.yaml` の `deps` に `buf.build/bufbuild/protovalidate` を足して `buf dep update` を実行し、`.proto` ファイルにルールを書く。

```proto
import "buf/validate/validate.proto";

message Hello {
  string hello = 1 [(buf.validate.field).string.min_len = 1];
}
```

[[buf-generate|buf generate]] でコードを生成し、[protovalidate-go](https://github.com/bufbuild/protovalidate-go) で検証する。空文字なので失敗する。

```go
v, err := protovalidate.New()
if err != nil {
	log.Fatalln(err)
}
if err = v.Validate(&hellov1.Hello{Hello: ""}); err != nil {
	log.Println("validation failed:", err)
}
```

```sh
$ go run main.go
2024/10/01 15:25:20 validation failed: validation error:
 - hello: value length must be at least 1 characters [string.min_len]
```

## 自分の理解

フィールドレベルのルールは思ったより多い。

## 関連

- [[protoc-gen-validate]]
- [[cel|CEL]]
- [[buf|Buf]]
- [[connect-rpc|Connect]]
- [[protobuf-well-known-types|Well-Known Types]]

## 出典

- [bufbuild/protovalidate](https://github.com/bufbuild/protovalidate)
- [Standard constraints](https://github.com/bufbuild/protovalidate/blob/main/docs/standard-constraints.md)
- [buf.validate のドキュメント](https://buf.build/bufbuild/protovalidate/docs/main:buf.validate)
- [protovalidate 入門（Zenn）](https://zenn.dev/jy8752/books/84cffcdb89d109)
- [protovalidate に IP プレフィックスのチェックを追加した話](https://blog.bbsakura.net/posts/add-is-ip-prefix-to-protovalidate)

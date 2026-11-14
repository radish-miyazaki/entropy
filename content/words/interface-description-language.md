---
title: IDL
aliases: [Interface Description Language, インタフェース記述言語]
description: データ型とインタフェースを特定のプログラミング言語に依存しない形で記述する言語
tags: [word]
date: 2024-09-27
---

## TL;DR

インタフェース記述言語（Interface Description Language）。データ型と[[interface|インタフェース]]を、特定のプログラミング言語に依存しない形で記述する言語の総称である。

## なぜ必要か

Wikipedia によると、IDL を使うと、ある言語で書かれたプログラムが、別の言語で書かれたプログラムとやり取りできる。[[rpc|RPC]] では、通信の両端で OS や言語が違うことがあるので、その橋渡しとしてよく使われる。

## 例

Wikipedia には、次のような IDL が挙げられている。

- [[protocol-buffers|Protocol Buffers]]（Google）
- Apache Thrift、Avro IDL
- CORBA の OMG IDL、Microsoft の MIDL
- [[openapi|OpenAPI]] Specification（Web API 向け）
- WSDL（Web サービス向け）
- Web IDL（ブラウザが実装するインタフェース向け）

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[rpc|RPC]]
- [[protocol-buffers|Protocol Buffers]]
- [[wit|WIT]]

## 出典

- [Interface description language - Wikipedia](https://en.wikipedia.org/wiki/Interface_description_language)

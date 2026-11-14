---
title: buf format
aliases: []
description: Protocol Buffers のスキーマを整形する Buf CLI のコマンド
tags: [word, protocol-buffers]
date: 2024-09-29
---

## TL;DR

[[protocol-buffers|Protocol Buffers]] のスキーマを整形する [[buf-cli|Buf CLI]] のコマンド。

## 例

`buf format` を実行すると、整形後のファイルの内容が出力される。`-d` を付けると差分を表示する。たとえば、メッセージの間に余分な空行がある proto ファイルでは、次のような差分が出る。

```diff
$ buf format -d
--- proto/radish/weather/v1/weather.proto.orig
+++ proto/radish/weather/v1/weather.proto
@@ -8,11 +8,6 @@
   RAINY = 2;
 }

-
-
-
-
-
 message GetWeatherRequest {
   float latitude = 1;
   float longitude = 2;
```

[[visual-studio-code|Visual Studio Code]] の拡張機能を入れると、保存時に自動で整形される。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[buf-lint|buf lint]]
- [[buf-cli|Buf CLI]]

## 出典

- [Format - Style](https://buf.build/docs/format/style)
- [buf format - Reference](https://buf.build/docs/reference/cli/buf/format)
- https://zenn.dev/jy8752/books/33743f8091c39d/viewer/5

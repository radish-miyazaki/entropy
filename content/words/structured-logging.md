---
title: 構造化ログ
aliases: [structured logging]
description: ログをキーと値の組で記録し、機械で解析・検索しやすくする手法
tags: [word, go]
date: 2026-11-14
---

## TL;DR

ログをキーと値の組で記録する手法。自由な文字列でなく名前の付いたフィールドで値を持つので、プログラムで解析、絞り込み、検索、分析しやすい。

## なぜ必要か

[Go Blog の slog の記事](https://go.dev/blog/slog)によると、ログは大量になりがちで、その中から素早く探せることが重要である。構造化ログはキーと値の組を使うので、速く確実に解析、絞り込み、検索、分析できる。

## 例

Go の [[slog|log/slog]] では、メッセージの後にキーと値を並べて書く。

```go
logger.Info("hello, world", "user", os.Getenv("USER"))
```

TextHandler なら `time=... level=INFO msg="hello, world" user=jba`、JSONHandler なら `{"time":"...","level":"INFO","msg":"hello, world","user":"jba"}` のように出力される。[[rust|Rust]] では [[rust-tracing|tracing]] クレートで構造化ログを出力できる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[slog|log/slog パッケージ]]
- [[rust-tracing|tracing]]
- [[span|スパン]]
- [[observability|オブザーバビリティ]]
- [[json|JSON]]

## 出典

- [Structured Logging with slog - The Go Programming Language](https://go.dev/blog/slog)

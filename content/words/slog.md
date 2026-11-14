---
title: log/slog パッケージ
aliases: [log/slog]
description: Go 1.21 で標準ライブラリに入った、構造化ログを出力するためのパッケージ
tags: [word, go]
date: 2024-09-28
---

## TL;DR

[[go|Go]] 1.21 で標準ライブラリに入った、[[structured-logging|構造化ログ]]を出力するためのパッケージ。ログレベルを付けたログを出力できる。

## 例

JSON 形式で標準出力に出すロガーを作り、エラーをログに残す。

```go
logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))

err := Update(data)
if err != nil {
	logger.Error("更新エラー", "error", err)
}
```

出力は次のようになる。

```json
{ "time": "2009-11-10T23:00:00Z", "level": "ERROR", "msg": "更新エラー", "error": "network error" }
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[structured-logging|構造化ログ]]
- [[opentelemetry|OpenTelemetry]]

## 出典

- [log/slog](https://pkg.go.dev/log/slog)

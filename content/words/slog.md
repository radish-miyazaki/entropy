---
title: log/slog パッケージ
aliases: [log/slog]
description: Go 1.21 で標準ライブラリに入った、構造化ログを出力するためのパッケージ
tags: [word, go]
date: 2024-09-28
---

## TL;DR

[[go|Go]] 1.21 で標準ライブラリに入った、[[structured-logging|構造化ログ]]を出力するためのパッケージ。ログレベルを付けたログを出力できる。

## 仕組み

パッケージは Logger、Record、Handler の 3 つで構成される。Logger は `Info` や `Error` などのメソッドを持つ入り口で、呼ばれるたびに 1 件分のログ（時刻、レベル、メッセージ、属性）を Record にまとめて Handler に渡す。Handler は Record をどう扱うかを決めるインタフェースである。標準では、`key=value` の組を並べる `TextHandler` と、1 行に 1 つの JSON オブジェクトを書く `JSONHandler` がある。

ログレベルは整数で、値が大きいほど重大になる。`Debug`、`Info`、`Warn`、`Error` が定義されており、Handler は既定で `Info` 以上を出力する。属性はキーと値の組（Attr）で、`With` を使うと、すべての出力に同じ属性を付ける Logger を作れる。`SetDefault` でデフォルトのロガーを設定すると、従来の `log` パッケージの出力も同じ Handler を通るようになる。

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

---
title: "Goで実現するgraceful shutdown:実運用での課題と解決策"
description: Go で graceful shutdown を実現する方法と、非同期タスクマネージャでの運用例の紹介
tags: [talk, go]
date: 2025-09-28
speakers: [uhzz]
company:
event: "[[Go Conference 2025]]"
held: 2025-09-27
slide: https://speakerdeck.com/uhzz/go-conference-2025
video:
---

## TL;DR

- Go では `signal.NotifyContext` と `context.WithTimeout` を組み合わせて graceful shutdown を実現する。
- HTTP サーバは `net/http` の `Shutdown` メソッドで安全に止められる。

## 内容

### Graceful shutdown とは

Graceful shutdown は、処理中のタスクのリソースを解放してから、アプリケーション自身を終了することである。SIGTERM を受け取ってから SIGKILL で強制終了されるまでの間に、リソースを解放する。

### Go での実現

[[go|Go]] では、`signal.NotifyContext` と `context.WithTimeout` を組み合わせる。`signal.NotifyContext` を使うと、OS からの SIGTERM を `ctx.Done()` で受け取れる。`context.WithTimeout` でタイムアウトを設定したコンテキストを `Shutdown` メソッドに渡し、決めた時間内にシャットダウン処理を終えるようにする。

HTTP サーバは、`net/http` の `Shutdown` メソッドで安全に止められる。`Shutdown` はすべてのリスナーを閉じてからアイドル状態のコネクションを閉じる。アイドル状態のコネクションを閉じ終えるか、タイムアウトした時点で終了する。

### 実運用

発表者の会社では、メールの一括送信を非同期で始めた後、デプロイによる終了で送信処理が途中で止まった。そこで、非同期タスクマネージャで graceful shutdown を実装し、運用している。登録した非同期タスクが完了するまで、シャットダウンを待つ。

## キーワード

- [[go|Go]]
- Graceful shutdown

%%

## 自分の理解

自社に持ち帰れそうな点、疑問に思った点。書くときはこのコメントを外す
%%

## 関連

- [発表のページ](https://gocon.jp/2025/talks/957443/)

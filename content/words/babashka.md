---
title: Babashka
aliases: []
description: Clojure でスクリプトを手軽に書いて実行できる、ネイティブバイナリの Clojure ランタイム
tags: [word, clojure]
date: 2026-01-31
---

## TL;DR

[[clojure|Clojure]] のランタイムの 1 つ。Clojure でスクリプトを手軽に作成・実行できる。

## なぜ必要か

Babashka はネイティブバイナリなので、[[jvm|JVM]] で動かす Clojure と比べて処理時間が短く、メモリの消費も少ない。

## 仕組み

Babashka は SCI（Small Clojure Interpreter）というインタプリタを内蔵しており、[[graalvm|GraalVM]] でネイティブバイナリにコンパイルされている。

`bb.edn` には、Makefile や npm scripts のようなタスクの定義と、依存関係の追加を書ける。書式は [[edn]] である。

```clojure
{:paths ["src"]
 :tasks {:requires ([babashka.fs :as fs]
                    [journal.list :as list])
         welcome (println "ようこそ")
         clear (fs/delete-if-exists "entries.edn")
         list (list/list-entries nil)
         add (exec 'journal.add/add-entry)}}
```

依存関係は[スクリプトに直接追加する](https://book.babashka.org/#babashkadeps)こともできる。

```clojure
(require '[babashka.deps :as deps])
(deps/add-deps '{:deps {medley/medley {:mvn/version "1.3.0"}}})
```

REPL もサポートしており、[Calva](https://calva.io/babashka/) からも使える。

[Babashka Pods](https://github.com/babashka/pods) を使うと、Pods プロトコルに従って Babashka と外部のプログラムの間でデータをやり取りできる。使えるプログラムは [pod-registry](https://github.com/babashka/pod-registry?tab=readme-ov-file#registered-pods) にまとまっている。

## 例

`.clj` ファイルを直接スクリプトとして実行できる。1 ファイルで完結するなら、名前空間の宣言（`ns`）は省略できる。

```clojure
(require '[clojure.string :as str])

(prn (str "Hello from " *ns* ", inner world!"))
```

```sh
bb script.clj
```

Shebang を書けば、ファイルを直接実行できる。

```clojure
#!/usr/bin/env bb
(prn (str "Hello from " *ns* ", inner world!"))
```

式をその場で評価することもできる。

```sh
bb -e '(+ 1 2 3)'
```

CLI を作るための [cli](https://github.com/babashka/cli) や、ファイル操作のための [fs](https://github.com/babashka/fs) など、ユーティリティのライブラリも豊富である。[bbin](https://github.com/babashka/bbin) を使うと、Babashka のスクリプトやプロジェクトを `PATH` にインストールできる。

```sh
bbin install io.github.babashka/neil
bbin install https://github.com/bhauman/clojure-mcp-light.git
```

## 注意点

当然ながら、コンパイル済みのコードを実行するほどの性能は出ない。スクリプトの実行に数秒以上かかる場合や、ループが多い場合は、JVM で動かすほうが良いこともある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[clojure|Clojure]]
- [[clojure-cli|Clojure CLI]]
- [[graalvm|GraalVM]]
- [[edn]]

## 出典

- [Babashka（公式サイト）](https://babashka.org/)
- [Babashka book](https://book.babashka.org/)
- https://zenn.dev/shinseitaro/books/9270abff642f59
- https://tech.toyokumo.co.jp/entry/clj-kondo-as-bb-pods

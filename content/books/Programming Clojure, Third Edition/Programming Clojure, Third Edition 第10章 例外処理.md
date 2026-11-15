---
title: Programming Clojure, Third Edition › 例外処理
description: Clojure は検査例外の処理を強制せず、ex-info と ex-data でデータを持つ例外を扱い、with-open でリソースを解放するので、try と throw を直接使う必要はほとんどない
tags: [book-chapter, clojure]
date: 2023-09-20
book: "[[Programming Clojure, Third Edition]]"
chapter: 10
---

## TL;DR

- Java の例外処理は検査例外への対応、`finally` によるリソースの解放、問題への対応の選択のために複雑になりがちである。
- [[clojure|Clojure]] は検査例外の処理を強制せず、`with-open` でリソースを解放できるので、`try` と `throw` を直接使う必要はほとんどない。
- 独自の例外クラスを作る代わりに、`ex-info` でデータのマップを持つ例外を作り、`ex-data` でそのデータを取り出す。

## 内容

次の 3 つの理由から、Java の[[error-handling|例外処理]]は複雑になりがちである。

- **[[checked-exception|検査例外]]**（Checked Exceptions）への対応
- `finally` ブロックを使ったリソースの解放
- 問題に対する対応の選択（e.g. 例外を無視するのか、操作を再試行するのか、例外を通常の戻り値に変換するのか）

Clojure の例外処理は、概念は Java と似ているが、より簡単に書ける。`try` と `throw` の特殊形式が、Java の `try`、`catch`、`finally`、`throw` でできることをすべてカバーしている。しかし、次の理由から、これらの特殊形式を使う必要はほとんどない。

- Clojure では検査例外を扱う必要がない
- `with-open` などのマクロを使うと、リソースを解放できる

### 例外処理を簡単にする

Java のプログラムでは、抽象化の境界で、検査例外を別の例外でラップすることが行われる。たとえば、Apache の Ant は I/O 例外のような低レベルの例外を、Ant のレベルのビルド例外でラップしている。

```java
try {
		newManifest = new Manifest(r);
} catch (IOException ioe) {
    throw new BuildException(...);
}
```

Clojure は**検査例外を処理することを強制しない**。したがって、上のコードは Clojure で次のように書ける。

```java
(Manifest. r)
```

例外のラッパーを書かずに済むので、Clojure のコードは慣習的な Java のコードよりも読み書きしやすく、メンテナンスも楽である。

しかし、例外を捕捉し、ラップして再び例外を投げることを禁じているわけではない。例外に対して何らかの意味のあるアクションが必要なケースでは、例外を捕捉すべきである。

### ex-info を使った例外の再スロー

Java ではあらゆる種類の不測の事態に対応する、大量の独自の例外サブクラスを作ることが一般的である。これらのサブクラスは深くネストした階層構造で作られるが、大半は特定のクラス名以外の価値をほとんど生み出さない。

Clojure には、言語が提供する**単一の**例外クラス（`IExceptionInfo`）があり、エラーを処理するのに必要または便利な情報をセットできるデータマップを持っている。このインスタンスを作るには、`ex-info` 関数を使う。

独自例外の一般的な用途として、Web リクエストを処理するコードが挙げられる。たとえば、エラーの種類に応じて異なる HTTP ステータスコードを返す処理などが考えられる。

```clojure
(defn load-resource
  [path]
  (try
    (if (forbidden? path)
      (throw (ex-info "Forbidden resource"
                      {:status 403, :resource path}))
      (slurp path))
    (catch FileNotFoundException e
      (throw (ex-info "Missing resource"
                      {:status 404, :resource path})))
    (catch IOException e
      (throw (ex-info "Server error"
                      {:status 500, :resource path})))))
```

このコードでは `ex-info` を使ってメッセージとデータのマップを持つ独自例外のインスタンスを作り、それを throw している。

### ex-data で ex-info のデータを取得する

この関数の呼び出し元ではこの例外（`IExceptionInfo`）をキャッチし、`ex-data` を使ってデータのマップを取り出せる。

### リソースの解放

GC によってメモリ上のリソースは解放されるが、メモリの外側にあるリソース（ファイルなど）は、例外が発生した場合でも、確実に**手動で**解放する必要がある。Java では `finally` ブロックを使ってリソースを解放する。

一方、Clojure では `with-open` マクロを使う。

```clojure
(with-open [name init-form] & body)
```

内部的に、`with-open` は `try` ブロックを作り、`name` を `init-form` の結果に束縛し、`body` を実行する。そして、`finally` ブロックで `name` に束縛されたオブジェクトを `close` する。`with-open` の実装コードは次のとおり。

```clojure
(defmacro with-open
  [bindings & body]
  (assert-args
     (vector? bindings) "a vector for its binding"
     (even? (count bindings))
				"an even number of forms in binding vector")
  (cond
    (= (count bindings) 0) `(do ~@body)
    (symbol? (bindings 0)) `(let ~(subvec bindings 0 2)
                              (try
                                (with-open
															~(subvec bindings 2)
															~@body)
                                (finally
                                  (. ~(bindings 0) close))))
    :else (throw (IllegalArgumentException.
                   "with-open only allows Symbols in bindings"))))
```

`with-open` の使用例は `spit` 関数で見られる。`spit` は、渡された文字列をファイルに書き出すだけの関数である。

```clojure
(spit "hello.txt" "Hello, world!")
```

`spit` の実装コードは次のようになっている。

```clojure
(defn spit
  [f content & options]
  (with-open [^java.io.Writer w (apply jio/writer f options)]
    (.write w (str content))))
```

`spit` は `f` 上に `PrintWriter` を作る。`f` は書き込めるものなら何でもよい。そして、`content` を作った writer に書き出す。最後に、`spit` が抜ける前に writer を `close` することを保証する。

### リソースの解放以外の処理を finally で実行する

`close` 以外の後処理を `finally` ブロック中で行いたい場合は、Clojure の `try` を次のように使う。

```clojure
(try expr* catch-clause* finally-clause?)
; catch-clause   -> (catch classname name expr*)
; finally-clause -> (finally expr*)
```

たとえば、次のように使う。

```clojure
(try
	(throw (Exception. "something failed"))
	(finally
		(println "we get to clean up")))
```

`throw` は、単に渡された例外を投げるだけである。

### 例外に対応する

例外処理で注目すべきは catch ブロックでどうやって問題に対応するかである。簡単な例として、特定のクラスが実行時に使えるかどうかを調べる関数を考える。

```clojure
(defn class-available? [class-name]
  (Class/forName class-name))
```

ただし、この定義は yes か no かの答えを返すのではなく、例外を返すケースがあるので、ユーザフレンドリでない。

```clojure
(class-available? "java.lang.Thread") ; java.lang.Thread
(class-available? "borg.util.Assimilate")
;; java.lang.ClassNotFoundException: borg.util.Assimilate
```

より親切なのは、`catch` を使って `false` を返すようにすることだろう。

```clojure
(defn class-available? [class-name]
  (try
    (Class/forName class-name) true
    (catch ClassNotFoundException _ false)))
```

```clojure
(class-available? "borg.util.Assimilate") ; false
(class-available? "java.lang.Thread")     ; true
```

## キーワード

- [[error-handling|例外処理]]
- [[checked-exception|検査例外]]
- [[java-interop|Java 相互運用]]
- [[java|Java]]

## 自分の理解

Java の検査例外とはすべてのメソッドで明示的に `try ~ catch` をするか、再び `throw` しなければならない例外を指す（e.g. `IOException`、`SQLException`）。非検査例外というのもあり、そちらは `try ~ catch` をしなくてもよい（e.g. `NullPointerException`、`IllegalArgumentException`）。

検査例外は型システムを使ってエラー処理をドキュメントにでき、それをコンパイラに強制することもできる。しかし、検査例外によってコードは肥大化し、メンテナンスの手間がメリットを上回ってしまう。

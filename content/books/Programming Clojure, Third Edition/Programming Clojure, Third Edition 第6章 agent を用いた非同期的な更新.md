---
title: Programming Clojure, Third Edition › agent を用いた非同期的な更新
description: agent は send で更新関数をキューに入れて非同期に状態を更新し、エラーモードを持ち、トランザクション成功時に一度だけ副作用を起こすのにも使える
tags: [book-chapter, clojure]
date: 2023-09-05
book: "[[Programming Clojure, Third Edition]]"
chapter: 6
---

## TL;DR

- agent は、タスク同士がほとんど同期せずに独立して進むときに使う。`send` は更新関数をキューに入れてすぐに返り、`await` や `await-for` で完了を待てる。
- agent はバリデーション関数と、`:fail` と `:continue` の 2 つのエラーモードを持つ。
- トランザクション中で agent に送ったアクションは、トランザクションが成功したときに一度だけ送られるので、副作用を起こすのに使える。

## 内容

アプリケーションによっては、タスク同士がほとんど同期せずに独立して進むケースがある。この場合、[[clojure|Clojure]] では agent を使える。

### agent

agent は `agent` 関数で作る。

```clojure
(agent initial-state)
```

例として、初期値を 0 とする `counter` agent を作る。

```clojure
(def counter (agent 0))
```

### send

agent の状態を更新するには `send` 関数を使う。

```clojure
(send agent update-fn & args)
```

`send` は、スレッドプール中のスレッドが `update-fn` を**後で実行できるようにキューに入れる**。この `send` 関数は、ref の `commute` とよく似ている。

```clojure
(send counter inc)
; #object[clojure.lang.Agent 0x257530de {:status :ready, :val 1}]
```

`send` は agent の新しい値ではなく、agent そのものを返す。`send` 自身は agent の新しい値を知らないので、そうなる。`send` は `inc` を後で実行するためにキューに入れたら、直ちに返る。

### deref（@）

agent の現在の値は ref と同様に `deref` や `@` で得られる。

```clojure
@counter ; 1
```

### await / await-for

`send` で渡したアクションが完了したかを確かめるには、`await` や `await-for` を使う。

```clojure
(await & agents)
(await-for timeout-millies & agents)
```

これらの関数は、現在のスレッドもしくは agent から送られたアクションがすべて完了するまで、現在のスレッドをブロックする。

`await-for` はタイムアウト時間を指定でき、タイムアウトで返った場合は `nil` を、そうでなければ `nil` でない値を返す。一方、`await` は使うのに注意が必要である。タイムアウト時間を持たないので、処理が完了するまで永遠に待ち続ける。

### agent のバリデーションとエラー処理

`ref` と同様に、`agent` はバリデーション関数を取れる。

```clojure
(agent initial-state options*)
; 使用可能なオプション
;   :validator validate-fn
;   :meta metadata-map
;   :error-handler handler-fn
;   :error-mode mode-keyword (:continue or :fail)
```

値が数値であることを保証するバリデーション関数を付けて、`counter` を定義し直す。

```clojure
(def counter (agent 0 :validator number?))
```

渡された値を無視して文字列を返す更新関数を `send` に渡し、数値でない値が agent に渡るようにする。

```clojure
(send counter (fn [_] "boo"))
; #object[clojure.lang.Agent 0x6183581e {:status :failed, :val 0}]
```

`send` はアクションの完了を待たずに直ちに返るので、例外は発生しない。例外が発生するのは、agent がプールされたスレッド上で自分自身を更新するときである。

#### :fail エラーモード

agent には `:fail` と `:continue` の 2 つのエラーモードがある。`:error-handler` がセットされていない場合、エラーモードは `:fail` になり、アクションまたは検証中に発生した例外は agent を例外状態にする。agent がこの状態にあっても `deref` で値を取り出せ、この値は実行前の最後の値になる。

```clojure
@counter ; 0
```

agent の最後のエラーを調べるには `agent-error` を呼ぶ。この関数は、エラーがあればそのエラーを返し、なければ `nil` を返す。

```clojure
(agent-error counter)
; #error {
;  :cause "Invalid reference state"
;  :via
;  [{:type java.lang.IllegalStateException
;    :message "Invalid reference state"
;    :at [clojure.lang.ARef validate "ARef.java" 33]}]
;  :trace
;  [[clojure.lang.ARef validate "ARef.java" 33]
;  ... ]}
```

agent はエラーがあると、それ以降の agent に対するアクションはすべてエラーを返す。agent を再度アクティブにするには、`restart-agent` で agent を再起動する必要がある。

```clojure
(restart-agent counter 0) ; 0
@counter ; 0
```

#### :continue エラーモード

`:error-handler` をセットすると、エラーモードは `:continue` になる。このモードでエラーが発生すると、セットしたエラーハンドラが呼ばれ、その後 agent はエラーがなかったかのように振る舞う。

```clojure
(defn handler [_ err]
  (println "ERR!" (.getMessage err)))
(def counter2 (agent 0 :validator number? :error-handler handler))

(send counter2 (fn [_] "boo"))
; #object[clojure.lang.Agent 0x5a85b240 {:status :ready, :val 0}]
;; ERR! Invalid reference state

(send counter2 inc)
; #object[clojure.lang.Agent 0x5a85b240 {:status :ready, :val 1}]

@counter2 ; 1
```

### agent をトランザクション中で使う

Clojure はトランザクションを何回も再試行する可能性があるので、トランザクションは副作用を持ってはいけない。しかし、トランザクションが成功した時点で副作用を起こしたいケースもあり、agent を使うとそれが可能になる。トランザクション中で agent にアクションを `send` すると、そのアクションはトランザクションが成功したときにだけ、一度だけ送られることが保証される。

例として、トランザクション成功時にファイルに書き込む agent を考える。この agent は [[Programming Clojure, Third Edition 第6章 ref と STM|commute で作ったチャットアプリケーション]]と組み合わせ、メッセージを自動的にファイルにバックアップするのに使える。

はじめに、データを書き込むファイルを持つ `backup-agent` を作る。指定したディレクトリ（output）は、あらかじめ作っておく必要がある。

```clojure
(def backup-agent (agent "output/messages-backup.clj"))
```

次に、`add-message` に次の 2 つの機能を足した `add-message-with-backup` を作る。

- `commute` の戻り値（現在のメッセージのデータリソース）を `let` で束縛する
- トランザクション中で、`backup-agent` に、メッセージを `filename` で指定されるファイルに書き出すアクションをセットする（アクション関数は `filename` をそのまま返すようにし、次のバックアップアクションでも同じファイル名がアクション関数に渡されるようにする）

```clojure
(defn add-message-with-backup [msg]
  (dosync
   (let [snapshot (commute messages conj msg)]
     (send-off backup-agent (fn [filename]
                              (spit filename snapshot)
                              filename))
     snapshot)))
```

ここでは `send` の代わりに `send-off` 関数を使っている。`send-off` は、アクション関数が（ファイル書き込みのように）ブロックする可能性がある場合に、`send` の代わりに使う。`send-off` のアクションには、必要に応じて拡張される別スレッドのプールが割り当てられる。ブロックする可能性があるアクションを `send` に渡してしまうと、他の agent の動作を止めてしまう可能性があるので、注意が必要である。

実装した関数の動作を確かめる。

```clojure
(add-message-with-backup (->Message "John" "Message One"))
; (#user.Message{:sender "John", :text "Message One"})

(add-message-with-backup (->Message "Jane" "Message Two"))
; (#user.Message{:sender "Jane", :text "Message Two"}
;  #user.Message{:sender "John", :text "Message One"})
```

バックアップファイルを見ると、次のデータがあることを確かめられる。

```clojure
(#user.Message{:sender "Jane", :text "Message Two"}
 #user.Message{:sender "John", :text "Message One"})
```

### agent はデータベースの代わりにはなりえない

Clojure の STM は ACID のうち ACI を提供しており、ファイルに書き出すことで D（Durability）も実現できた。しかし、STM とバックアップ agent の組み合わせで、データベースが簡単に実現できるわけではない。

Clojure のトランザクションは、アクションを agent に送るまでは保証するが、agent がそのアクションを実行するかどうかは保証しない。たとえば、トランザクションが終了した直後、agent がファイルにバックアップを書き込む前に、電源コードを抜くかもしれない。

## キーワード

- [[clojure-agent|agent]]
- [[transaction|トランザクション]]
- [[acid|ACID]]
- [[side-effect|副作用]]
- [[error-handling|エラー処理]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

---
title: Programming Clojure, Third Edition › レコード
description: アプリケーションドメインの情報はマップでモデリングするのが推奨され、マップとして扱えてプロトコルでポリモーフィズムも使えるレコードを defrecord で作り、音符を MIDI で演奏する
tags: [book-chapter, clojure]
date: 2023-09-11
book: "[[Programming Clojure, Third Edition]]"
chapter: 7
---

## TL;DR

- ドメインの情報をクラスでモデル化すると再利用しにくいコードが増えるので、[[clojure|Clojure]] はドメイン特有の情報をなるべくマップでモデリングすることを推奨する。
- レコードは `defrecord` で作るデータ型で、マップと同じように扱え、プロトコルによるポリモーフィズムもサポートする。
- 音符の `Note` レコードに `MidiNote` プロトコルを実装し、JDK の MIDI シンセサイザで演奏する。

## 内容

OOP のクラスは、大きく 2 つのカテゴリに分類されることが多い。1 つはプログラムを組み立てるための部品（e.g. `String`、`Socket`、`InputStream`、`OutputStream`）で、もう 1 つは**アプリケーションドメインの情報を表現する**もの（e.g. `Employee`、`PurchaseOrder`）である。

### アプリケーションドメインの情報をクラスで実現することのデメリット

アプリケーションドメインの情報をクラスでモデル化するには、デメリットがある。

たとえば、ドメインの知識がクラス固有のゲッターとセッターからなる小さな言語の陰に隠れる。情報を一般化して扱うテクニックが使いにくく、必要以上にドメインに特化したコードを都度書かざるを得なくなり、再利用しにくいコードを量産することになる。

このため Clojure では、**ドメイン特有の情報はなるべくマップを使ってモデリングすることを推奨**している。これはデータ型にも当てはまる。そこでレコードが登場する。

### レコードとは

[[record-clojure|レコード]]は `deftype` で作られるデータ型だが、`PersistentMap` を実装しているので、単なるマップと同じように扱える。同時に、レコードはクラスでもあるので、プロトコルを使った[[polymorphism|ポリモーフィズム]]をサポートする。

例として、音楽を演奏するレコードを考える。音楽を演奏するには、音符のレコードが必要になる。音符は音名（`pitch`）、オクターブ（`octave`）、長さ（`duration`）のフィールドを持つ。音符ができれば、JDK の組み込みの MIDI シンセサイザを使って演奏できる。

### defrecord マクロ

まず `defrecord` マクロを使って `Note` レコードを作る。このマクロの使い方は `deftype` と同じである。

```clojure
(defrecord name [& fields] & opts+specs)
```

```clojure
(defrecord Note [pitch octave duration])
```

このレコードを使うと、第 4 オクターブの D♯ の二分音符は次のように作れる。

```clojure
(->Note :D# 4 1/2)
; #user.Note{:pitch :D#, :octave 4, :duration 1/2}
```

### レコードの振る舞い

レコードのフィールドには他のデータ型と同様にドット表記でアクセスできる。

```clojure
(.pitch (->Note :D# 4 1/2)) ; :D#
```

ただし、レコードはマップでもあるので、キーワードでもアクセスできる。

```clojure
(:pitch (->Note :D# 4 1/2)) ; :D#
```

変更したレコードを得るには、`assoc` や `update-in` を使える。どちらも返ってくるのは新しいレコードである。

```clojure
(assoc (->Note :D# 4 1/2) :pitch :Dd :duration 1/4)
; #user.Note{:pitch :Dd, :octave 4, :duration 1/4}

(update-in (->Note :D# 4 1/2) [:octave] inc)
; #user.Note{:pitch :D#, :octave 5, :duration 1/2}
```

レコードは開かれているので、後からフィールドを追加することもできる。

```clojure
(assoc (->Note :D# 4 1/2) :velocity 100)
; #user.Note{:pitch :D#, :octave 4, :duration 1/2, :velocity 100}
```

フィールドを削除するには `dissoc` を使えるが、少し注意が必要である。後から付け加えたフィールドを取り除いた場合は、新しいレコードが返される。しかし、**`defrecord` で指定したフィールドを取り除いた場合、戻り値は単なるマップになる。**

```clojure
(dissoc (->Note :D# 4 1/2) :octave)
; {:pitch :D#, :duration 1/2}
```

### レコードとマップの違い

レコードはマップと異なり、キーワードを引数に取る関数として扱えない。

```clojure
((->Note :D# 4 1/2) :pitch)
;  user.Note cannot be cast to class clojure.lang.IFn
```

レコードはマップと違って、関数のように呼び出すのを可能にする `IFn` インタフェースを実装していないので、例外が投げられる。

これにより、コードの書き方に違いが出て、可読性が上がる。つまり、次のように書き分ける。

- **コレクションにアクセスするときは、コレクションを先に置く**
- **レコードにアクセスするときは、キーワードを先に書く**

### MIDI シンセサイザに渡せるようにする

`Note` レコードの基本はできたので、メソッドを追加して、JDK の組み込みの MIDI シンセサイザに渡せるようにする。

まず、3 つのメソッドを持つ `MidiNote` プロトコルを定義する。

```clojure
(defprotocol MidiNote
  (to-msec [this tempo])
  (key-number [this])
  (play [this tempo midi-channel]))
```

MIDI シンセサイザで音を出すには、音名とオクターブを MIDI のキー番号に変換し、長さをミリ秒で表す必要がある。`MidiNote` が要求するメソッドは次のように動作する。

- `to-msec`: 音符の長さをミリ秒単位で返す
- `key-number`: 音符の MIDI キー番号を返す
- `play`: 与えられたテンポで、与えられたチャネルに対して演奏する

`Note` を拡張して、`MidiNote` プロトコルを実装する。

```clojure
(extend-type Note
  MidiNote
  (to-msec [this tempo]
    (let [duration-to-bpm {1 240, 1/2 120, 1/4 60, 1/8 30, 1/16 15}]
     (* 1000 (/ (duration-to-bpm (:duration this)) tempo)))))
```

`to-msec` は、全音符や二分音符、四分音符といった音符の長さとテンポから、ミリ秒単位の長さを計算する。テンポは 1 分あたりの拍数（bpm: beats per minute）で表す。

```clojure
(key-number [this]
    (let [scale {:C 0, :C# 1, :Db 1, :D 2,
								 :D# 3, :Eb 3, :E 4, :F 5,
								 :F# 6,  :Gb 6, :G 7, :G# 8,
								 :Ab 8, :A 9, :A# 10, :Bb 10
								 :B 11}]
      (+ (* 12 (:octave this)) (scale (:pitch this)))))
(play [this tempo midi-channel]
    (let [velocity (or (:velocity this) 64)]
      (.noteOn midi-channel (key-number this) velocity)
      (Thread/sleep (to-msec this tempo))))
```

`play` は音符、テンポ、MIDI チャネルを引数に取る。まずチャネルに `noteOn` メッセージを送り、音符の長さだけ `sleep` する。現在のスレッドが `sleep` していても、次の音符がチャネルに送られるまで音は鳴り続ける。

MIDI シンセサイザを立ち上げて、音符のシーケンスを演奏する関数は次のとおり。

```clojure
(defn perform [notes & {:keys [tempo] :or {tempo 120}}]
  (with-open [synth (doto (MidiSystem/getSynthesizer) .open)]
    (let [channel (aget (.getChannels synth) 0)]
      (doseq [note notes]
        (play note tempo channel)))))
```

この関数は音符のシーケンスと、任意でテンポを取り、MIDI シンセサイザをオープンしてチャネルを取得し、各音符を `play` メソッドで演奏する。

### 動作確認

実際に `Note` レコードのシーケンスを使って、音楽を演奏してみる。

```clojure
(def close-encounters [(->Note :D 3 1/2)
	                     (->Note :E 3 1/2)
	                     (->Note :C 3 1/2)
	                     (->Note :C 2 1/2)
	                     (->Note :G 2 1/2)])

(def jaws (for [duration [1/2 1/2 1/4 1/4 1/8 1/8 1/8 1/8]
                pitch [:E :F]]
            (->Note pitch 2 duration)))
```

```clojure
(perform close-encounters)
(perform jaws)
```

音符はレコードであり、レコードはマップのように振る舞うので、マップを扱う関数で音楽を操作できる。たとえば、`update-in` を使ってオクターブを上げたり下げたりできる。

```clojure
(perform (map #(update-in % [:octave] inc) close-encounters))
(perform (map #(update-in % [:octave] dec) close-encounters))
```

`:velocity` フィールドの値を次第に大きくすることもできる。

```clojure
(perform (for [velocity [64 80 90 100 110 120]]
	         (assoc (->Note :D 3 1/2) :velocity velocity)))
```

## キーワード

- [[record-clojure|レコード]]
- [[polymorphism|ポリモーフィズム]]
- [[protocol-clojure|プロトコル]]
- [[domain-model|ドメインモデル]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

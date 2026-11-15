---
title: Programming Clojure, Third Edition › データ型
description: deftype で暗号化された入出力を扱う CryptoVault データ型を作り、Vault プロトコルと IOFactory プロトコルを実装して gulp や spit、slurp に渡せるようにする
tags: [book-chapter, clojure]
date: 2023-09-11
book: "[[Programming Clojure, Third Edition]]"
chapter: 7
---

## TL;DR

- データ型は [[clojure|Clojure]] で新しい型を作る手段で、`deftype` で定義する。フィールドにはドット表記でアクセスし、振る舞いはプロトコルかインタフェースで指定されたメソッドだけを実装できる。
- 練習として、内容を暗号化して読み書きする `CryptoVault` を作り、`clojure.java.io/IOFactory` を実装して `spit` や `slurp` にも渡せるようにする。

## 内容

### 6 つの機能

データ型は Clojure で新しい型を作るための手段で、次の機能を持つ。

- 名前付き、または無名の**クラス**
- 明示的なフィールド、または暗黙的な[[closure|クロージャ]]を使った構造
- フィールドには**型ヒント**を付けられ、プリミティブ型でもよい
- デフォルトで**イミュータブル**
- レコードを介して、**マップと同一化**できる
- プロトコルやインタフェースで定義された**抽象メソッドを実装**することもできる

### CryptoVault データ型

ここでは練習として `CryptoVault` というデータ型を定義する。`CryptoVault` は `clojure.java.io.IOFactory` プロトコルを実装する。`CryptoVault` のインスタンスを作るときは、暗号鍵ストアへのパスとパスワードを渡す必要がある。

`CryptoVault` へ書き出される内容は `IOFactory` オブジェクトに**暗号化**して書き込まれる。逆に、`CryptoVault` から読み出される内容は**復号**される。

### deftype マクロ

`deftype` は新しいデータ型を作る。

```clojure
(deftype name [& fields] & opts+specs)
```

引数にはデータ型名と、インスタンスに含まれるフィールドを並べたベクタを渡す。データ型名は Java のクラス名の慣習を踏襲して PascalCase とする。

```clojure
(deftype CryptoVault [filename keystore password])
```

定義したら、次のようにインスタンスを作れる。

```clojure
(def vault (->CryptoVault "vault-file" "keystore" "toomanysecrets"))
```

フィールドにはドットを先頭に付けたフィールド名でアクセスできる。

```clojure
(.filename vault) ; "vault-file"
(.keystore vault) ; "keystore"
(.password vault) ; "toomanysecrets"
```

### 振る舞いを追加

データ型はプロトコルかインタフェースで**指定されたメソッドしか**実装できない。そこでまず、`Vault` プロトコルを定義する。

```clojure
(defprotocol Vault
	(init-vault [vault])
	(vault-output-stream [vault])
	(vault-input-stream [vault]))
```

データ型のメソッド実装は `deftype` の中に直接書ける。また、複数のプロトコルを同時に実装できる。

```clojure
(deftype CryptoVault [filename keystore password]
  Vault
  (init-vault [vault]
    ;; do some stuff
    )
  (vault-output-stream [vault]
    ;; do some stuff
    )
  (vault-input-stream [vault]
    ;; do some stuff
   )
  IOFactory
  (make-reader [vault]
    (make-reader (vault-input-stream vault))
    (make-writer (vault-output-stream vault))))
```

#### Vault プロトコルのメソッドの定義

`init-vault` メソッドは **AES**（Advanced Encryption Standard）の鍵を作り、それを `java.security.KeyStore` にセットする。そして、`CryptoVault` の `keystore` フィールドで指定された名前のファイルに鍵ストアを保存し、パスワードで保護する。

```clojure
(init-vault [vault]
    (let [password (.toCharArray (.password vault))
          key (.generateKey (KeyGenerator/getInstance "AES"))
          keystore (doto (KeyStore/getInstance "JCEKS")
                     (.load nil password)
                     (.setEntry "vault-key"
                          (KeyStore$SecretKeyEntry. key)
                          (KeyStore$PasswordProtection. password)))]
      (with-open [fos (FileOutputStream. (.keystore vault))]
        (.store keystore fos password))))
```

`vault-output-stream` と `vault-input-stream` は、`vault-key` 関数を使って `CryptoVault` が保存した鍵ストアをロードし、そこから AES 鍵を取り出して、データ内容を暗号化したり復号したりする。

```clojure
(defn vault-key [vault]
  (let [password (.toCharArray (.password vault))]
    (with-open [fis (FileInputStream. (.keystore vault))]
      (-> (doto (KeyStore/getInstance "JCEKS")
            (.load fis password))
          (.getKey "vault-key" password)))))
```

`vault-output-stream` は AES 暗号オブジェクトを初期化し、`Vault` のファイル名から `OutputStream` を作り、暗号オブジェクトとそのストリームから `CipherOutputStream` のインスタンスを作る。

```clojure
(vault-output-stream [vault]
    (let [cipher (doto (Cipher/getInstance "AES")
                   (.init Cipher/ENCRYPT_MODE (vault-key vault)))]
      (CipherOutputStream.
				(io/output-stream (.filename vault)) cipher)))
```

`vault-input-stream` もほとんど同じだが、`CipherInputStream` を返す。

```clojure
(vault-input-stream [vault]
    (let [cipher (doto (Cipher/getInstance "AES")
                   (.init Cipher/DECRYPT_MODE (vault-key vault)))]
      (CipherInputStream.
				(io/input-stream (.filename vault)) cipher)))
```

### 動作確認

`CryptoVault` のインスタンスを作るには、データファイル名、鍵ストアファイル名、鍵ストアを保護するパスワードが必要である。

```clojure
(def vault (->CryptoVault "vault-file" "keystore" "toomanysecrets"))
```

鍵ストアが初期化されていなければ、`init-vault` メソッドを呼ぶ必要がある。

```clojure
(init-vault vault)
```

これで `CryptoVault` を、他の入出力と同様に `gulp` や `expectorate` に渡せるようになった。

```clojure
(expectorate vault "This is a test of the CryptoVault")
(gulp vault)
```

### clojure.java.io/IOFactory プロトコルを実装する

`CryptoVault` を拡張してこのプロトコルをサポートすれば、組み込みの `spit` や `slurp` 関数にも `CryptoVault` を渡せるようになる。

この `IOFactory` は 4 つのメソッドを持つが、デフォルトのメソッド実装が `default-streams-impl` というマップに用意されている。今回は `make-input-stream` と `make-output-stream` のメソッドだけを変えればよいので、`default-streams-impl` にこの 2 つのメソッドを `assoc` で追加し、それを `extend` に渡す。

```clojure
(extend CryptoVault
  clojure.java.io/IOFactory
   (assoc clojure.java.io/default-streams-impl
          :make-input-stream (fn [x opts] (vault-input-stream x))
          :make-output-stream (fn [x opts] (vault-output-stream x))))
```

これで、`slurp` や `spit` に渡せる。

```clojure
(spit vault "This is a test of the CryptoVault using spit and slurp")
(slurp vault)
```

## キーワード

- [[protocol-clojure|プロトコル]]
- [[closure|クロージャ]]
- [[type-hint|型ヒント]]
- [[immutability|イミュータビリティ]]

## 自分の理解

`CryptoVault` が実装する `IOFactory` は `clojure.java.io.IOFactory` プロトコルで、[[Programming Clojure, Third Edition 第7章 プロトコル|プロトコルの定義（defprotocol）]] で定義したものではない。

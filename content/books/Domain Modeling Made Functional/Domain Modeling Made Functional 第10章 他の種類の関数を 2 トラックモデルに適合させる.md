---
title: Domain Modeling Made Functional › 他の種類の関数を 2 トラックモデルに適合させる
description: 例外を投げる関数と何も返さない関数を、アダプタブロックで 2 トラックモデルに組み込む
tags: [book-chapter, ddd, fsharp]
date: 2024-08-05
book: "[[Domain Modeling Made Functional]]"
chapter: 10
---

## TL;DR

- ライブラリや外部サービスが投げる例外を[[domain-error|ドメインエラー]]として扱いたいときは、例外を `Result` に変換するアダプタブロックを作り、2 トラックモデルに組み込む。
- 何も返さない関数は、入力をそのまま返す関数に変換してから `Result.map` を適用すれば、2 トラックモデルに組み込める。

## 内容

[[Domain Modeling Made Functional 第10章 Result を生成する関数の連鎖（bind と errorMap、map）]]では 1 トラック関数とスイッチ関数だけを扱ったが、ほかの「形」の関数もある。ここでは、例外を投げる関数と、何も返さない関数の 2 種類を扱う。

### 例外を投げる関数

自分たちのコードで例外を投げないようにしても、ライブラリのように自分たちが管理していないコードは例外を投げる。自分たちで投げた例外（パニック）はドメインの一部ではないので、最上位でだけ捕捉する（[[Domain Modeling Made Functional 第10章 ドメインエラーを扱う]]）。一方、ライブラリなどの例外はドメインエラーとして扱いたい場合がある。そのときは、例外を投げる関数を `Result` を返す関数に変換するアダプタブロックを作る。

[[Domain Modeling Made Functional 第10章 実際のパイプラインでの bind と map の利用]]を拡張し、外部サービスのタイムアウトを捕捉して `RemoteServiceError` に変換する例を示す。

```fsharp
type ServiceInfo = {
  Name: string
  Endpoint: Uri
}

type RemoteServiceError = {
  Service: ServiceInfo
  Exception: System.Exception
}

let serviceExceptionAdapter serviceInfo serviceFn x =
  try
    Ok (serviceFn x) // サービスを呼び出して成功を返す
  with
  | :? TimeoutException as ex ->
    Error { Service = serviceInfo; Exception = ex }
  | :? AuthorizationException as ex ->
    Error { Service = serviceInfo; Exception = ex }
```

注目すべきは、すべての例外ではなく、ドメインに関係するものだけを捕捉している点である。サービスが 2 つのパラメータを取る場合は、`serviceFn x y` を呼ぶ別の定義が必要になる。ここまでのアダプタブロックは汎用的だが、特定のサービスに絞ったものを用意したほうがよい場合もある。たとえばデータベースの例外を、「レコードが見つからない」「キーが重複している」といったドメインに合ったケースを持つ[[discriminated-union|選択型]]に変換する。

呼び出し側は次のようになる。

```fsharp
let serviceInfo = {
  Name = "AddressCheckingService"
  Endpoint = ...
}

// 例外を発生させるサービス
let checkAddressExists = ...

// val checkAddressExists: UnvalidatedAddress -> Result<CheckedAddress, RemoteServiceError>
let checkAddressExists address =
  let adaptedService =
    serviceExceptionAdapter serviceInfo checkAddressExists
  adaptedService address
```

これを 2 トラックモデルに組み込むには、まず `PlaceOrderError` に `RemoteServiceError` のケースを足す。

```fsharp
type PlaceOrderError =
  | Validation of ValidationError
  | Pricing of PricingError
  | RemoteService of RemoteServiceError
```

そして、`mapError` で共通のエラー型に変換する。

```fsharp
let checkAddressExists address =
  let adaptedService =
    serviceExceptionAdapter serviceInfo checkAddressExists
  address
  |> adaptedService
  |> Result.mapError RemoteService
```

### 何も返さない関数

次のように I/O に書き込むだけの関数は、何も返さない。

```fsharp
// val logError: msg: string -> unit
let logError msg = printfn "ERROR %s" msg
```

この関数を 2 トラックモデルに組み込むには、まず、受け取った入力で何も返さない関数を呼び出し、元の入力をそのまま返すパススルー関数を作る。ここでは `tee` と呼ぶ（[[Domain Modeling Made Functional 第9章 最初のステップの実装]]の関数アダプタと同じ考え方である）。

```fsharp
// val tee: f: ('a -> unit) -> x: 'a -> 'a
let tee f x =
  f x
  x
```

`tee` を適用した関数に `Result.map` を適用すれば、2 トラック関数に変換できる。

```fsharp
// val adaptDeadEnd: f: ('a -> unit) -> (Result<'a,'error> -> Result<'a,'error>)
let adaptDeadEnd f = Result.map (tee f)
```

## キーワード

- [[railway-oriented-programming|鉄道指向プログラミング]]
- [[domain-error|ドメインエラー]]
- [[error-handling|エラー処理]]
- [[side-effect|副作用]]
- [[discriminated-union|選択型]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

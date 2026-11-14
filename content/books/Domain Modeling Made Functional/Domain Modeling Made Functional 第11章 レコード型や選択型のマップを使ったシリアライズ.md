---
title: Domain Modeling Made Functional 第11章 レコード型や選択型のマップを使ったシリアライズ
description: レコード型や選択型の DTO を IDictionary<string,obj> で表すとコンテキスト間の契約がなくなり疎結合になるが、期待の食い違いを検知しにくくなり実装も複雑になる
tags: [book-chapter]
date: 2024-08-07
book: "[[Domain Modeling Made Functional]]"
chapter: 11
---

## TL;DR

- レコード型や[[discriminated-union|選択型]]の [[dto|DTO]] を、`IDictionary<string,obj>` で表す方法もある。JSON にシリアライズすると決まっている場合などに向く。
- 境界づけられたコンテキスト間の契約がなくなり、コンテキスト同士が[[loose-coupling|疎結合]]になる。一方で、コンシューマとプロデューサの期待の食い違いを検知しにくくなり、実装の[[complexity|複雑さ]]も増す。適度な結合が大事である。

## 内容

[[Domain Modeling Made Functional 第11章 ドメイン型を DTO に変換する方法|ドメイン型を DTO に変換する方法]]の 1 つである。

### キーと値のマップとしてシリアライズする

レコード型や選択型の別のシリアライズ方法として、すべてをキーと値のマップとしてシリアライズする方法がある。JSON にシリアライズする場合はこれが適している。具体的には、DTO を `IDictionary<string,obj>` で表す（[IDictionary\<TKey,TValue\>](https://learn.microsoft.com/ja-jp/dotnet/api/system.collections.generic.idictionary-2?view=net-8.0)）。

メリットは、[[Domain Modeling Made Functional 第3章 境界づけられたコンテキスト間の契約|境界づけられたコンテキスト間の契約]]がなく、コンテキスト間のやり取りが疎結合になることである。`IDictionary<string,obj>` には任意の値を追加できるので、契約がないのと同じになる。

デメリットは、契約がまったくないことそのものである。コンシューマとプロデューサの期待が一致していないことを検知するのが難しくなる。

### 例

[[Domain Modeling Made Functional 第11章 選択型を DTO に変換する|選択型を DTO に変換する]]と同じ題材を使う。

```fsharp
type Name =
    { First: String50
      Last: String50 }

type Example =
    | A
    | B of int
    | C of string list
    | D of Name
```

`Name` のシリアライズは次のようになる。レコード内のすべての値は、アップキャスト演算子 `:>` で `obj` にキャストする必要がある。これが「契約がまったくない」ということである。

```fsharp
let nameDtoFromDomain (name: Domain.Name) : IDictionary<string, obj> =
    let first = name.First |> String50.value :> obj
    let last = name.Last |> String50.value :> obj
    [ ("First", first); ("Last", last) ] |> dict
```

`Example` のシリアライズは次のとおり。

```fsharp
let fromDomain (domainObj: Domain.Example) : IDictionary<string, obj> =
    match domainObj with
    | A -> [ ("A", null) ] |> dict
    | B i ->
        let bdata = Nullable i :> obj
        [ ("B", bdata) ] |> dict
    | C strList ->
        let cdata = strList |> List.toArray :> obj
        [ ("C", cdata) ] |> dict
    | D name ->
        let ddata = name |> nameDtoFromDomain :> obj
        [ ("D", ddata) ] |> dict
```

デシリアライズはもっと複雑になる。フィールドごとに、次の 2 つが必要である。

1. `TryGetValue` で値が存在するかを調べる（[Dictionary.TryGetValue](https://learn.microsoft.com/ja-jp/dotnet/api/system.collections.generic.dictionary-2.trygetvalue?view=net-8.0)）
2. 値があれば、ダウンキャスト演算子 `:?>` で正しい型にキャストする

まず、これを行うヘルパ関数を作る。

```fsharp
let getValue key (dict: IDictionary<string, obj>) : Result<'a, string> =
    match dict.TryGetValue key with
    | (true, value) -> // キーが見つかった
        try
            // 'a にダウンキャストして Ok にラップ
            (value :?> 'a) |> Ok
        with :? InvalidCastException ->
            // キャストに失敗
            let typeName = typeof<'a>.Name
            let msg = sprintf "Value could not be cast to %s" typeName
            Error msg
    | (false, _) -> // キーが見つからなかった
        let msg = sprintf "Key '%s' not found" key
        Error msg
```

`Name` のデシリアライズは次のようになる。

```fsharp
let nameDtoToDomain (nameDto: IDictionary<string, obj>) : Result<Name, string> =
    result {
        let! firstStr = nameDto |> getValue "First"
        let! first = firstStr |> String50.create "First"
        let! lastStr = nameDto |> getValue "Last"
        let! last = lastStr |> String50.create "Last"
        return { First = first; Last = last }
    }
```

`Example` のデシリアライズでは、ケースごとにキーが存在するかをチェックする。

```fsharp
let toDomain (dto: IDictionary<string, obj>) : Result<Example, string> =
    if dto.ContainsKey "A" then
        Ok A
    elif dto.ContainsKey "B" then
        result {
            let! bdata = dto |> getValue "B" // 失敗する可能性がある
            return B bdata
        }
    elif dto.ContainsKey "C" then
        result {
            let! cdata = dto |> getValue "C" // 失敗する可能性がある
            return cdata |> Array.toList |> C
        }
    elif dto.ContainsKey "D" then
        result {
            let! ddata = dto |> getValue "D" // 失敗する可能性がある
            let! name = ddata |> nameDtoToDomain // ここも失敗する可能性がある
            return name |> D
        }
    else
        let msg = sprintf "Tag not found in dictionary"
        Error msg
```

## キーワード

- [[dto|DTO]]
- [[discriminated-union|選択型]]
- [[loose-coupling|疎結合]]
- [[bounded-context|境界づけられたコンテキスト]]
- [[complexity|複雑さ]]
- [[serialization|シリアライズ]]

## 自分の理解

DTO はもともと、[[bounded-context|境界づけられたコンテキスト]]同士を疎結合にするために必要最低限の契約しか設けない（[[Domain Modeling Made Functional 第11章 シリアライズコードとワークフローの連携|シリアライズコードとワークフローの連携]]）。この方法は、その最低限の契約すらない状態だと理解した。

期待の食い違いを検知しにくく、実装も複雑になる。これだけで、自分の中ではこの選択肢はなくなった。

VSCode 上では `firstStr` の型が `string` と推論されていた。`first` の式から逆向きに型が決まっているようだが、仕組みはよく分かっていない。

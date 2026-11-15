---
title: "Domain Modeling Made Functional › アイデンティティの考察: エンティティ"
description: 構成要素が変わっても同じものと見なすエンティティは、一意な識別子を持ち、識別子だけで等値性を判断し、変更はコピーで表す
tags: [book-chapter, ddd, fsharp]
date: 2024-07-18
book: "[[Domain Modeling Made Functional]]"
chapter: 5
---

## TL;DR

- 構成要素が変わっても固有のアイデンティティを持つものを[[entity|エンティティ]]と呼び、一意な識別子を与えてモデリングする。
- エンティティの等値性は識別子だけで判断し、変更はイミュータブルな値のコピーとして型シグネチャに表す。

## 内容

### エンティティとは

[[value-object|値オブジェクト]]とは違い、構成要素が変わっても固有のアイデンティティを持つものがある。これを[[entity|エンティティ]]と呼ぶ。たとえば、名前や住所が変わっても、その人が同じ人であることに変わりはない。ビジネスの世界では、注文書、見積書、請求書、顧客プロファイルのような文書がエンティティにあたる。エンティティにはライフサイクルがあり、[[business-process|ビジネスプロセス]]によってある状態から別の状態へと変わっていく。

値オブジェクトとエンティティの区別は文脈によって変わる。スマートフォンを例にとると、製造段階では各端末に固有のシリアル番号が振られるので、エンティティとしてモデリングする。販売段階では同じ仕様の端末はすべて交換可能なので、値オブジェクトとしてモデリングする。特定の顧客に販売された後は、再びアイデンティティが重要になるのでエンティティになる。

### エンティティの識別子

エンティティのアイデンティティは、ほかのフィールドが変わっても安定している必要がある。そのため、注文 ID や顧客 ID のような一意の識別子を与える。次の例では、`PhoneNumber` や `EmailAddress` が変わっても `ContactId` は変わらない。

```fsharp
type ContactId = ContactId of int

type Contact = {
    ContactId : ContactId
    PhoneNumber : ...
    EmailAddress : ...
}
```

識別子は、紙の注文書や請求書の参照番号のように実世界の[[domain|ドメイン]]が提供する場合と、UUID やデータベースの自動採番、ID 生成サービスで人工的に作る場合がある。本書ではこのテーマは扱わず、クライアントから識別子が渡されると仮定している。

### データ定義への識別子の追加

[[record-type|レコード型]]なら、フィールドを足すだけでよい。選択型（[[discriminated-union|判別共用体]]）では、識別子を各ケースの外側に置くか内側に置くかを決める必要がある。外側に置くと、1 つのケースのデータが型のあちこちに散らばり、扱いにくい。そのため、内側に置くことが多い。内側に置けば、[[pattern-matching|パターンマッチ]]で必要なデータに一度にアクセスできる。

```fsharp
type UnpaidInvoice = {
    InvoiceId : InvoiceId // 内側に持つ ID
    // 未払いのケースの情報
}

type PaidInvoice = {
    InvoiceId : InvoiceId
    // 支払い済みのケースの情報
}

type Invoice =
    | Unpaid of UnpaidInvoice
    | Paid of PaidInvoice

match invoice with
| Unpaid unpaidInvoice ->
    printfn "The unpaid invoiceId is %A" unpaidInvoice.InvoiceId
| Paid paidInvoice ->
    printfn "The paid invoiceId is %A" paidInvoice.InvoiceId
```

### エンティティの等値性の実装

エンティティの等値性は識別子だけで判断する。[[fsharp|F#]] のデフォルトの実装はすべてのフィールドを比べるので、変更が必要になる。1 つの方法は、`CustomEquality` と `NoComparison` 属性を付けて、`Equals` と `GetHashCode` をオーバーライドすることである。

```fsharp
[<CustomEquality; NoComparison>]
type Contact = {
    ContactId : ContactId
    PhoneNumber : PhoneNumber
    EmailAddress : EmailAddress
}
with
    override this.Equals(obj) =
        match obj with
        | :? Contact as c -> this.ContactId = c.ContactId
        | _ -> false
    override this.GetHashCode() =
        hash this.ContactId
```

ただし、デフォルトの等値性を暗黙に変えると混乱を招くおそれがある。そこで、`NoEquality` 属性で等値性のチェックそのものを無効にする方法もある。この場合、値どうしを比べるとコンパイルエラーになるが、フィールドどうしは比べられる。

```fsharp
[<NoEquality; NoComparison>]
type Contact = { ... }

printfn "%b" (contact1 = contact2) // コンパイルエラー
printfn "%b" (contact1.ContactId = contact2.ContactId) // OK
```

複数のフィールドで等値性を判断する場合は、それらを組み合わせた `Key` プロパティを公開して比べる。

```fsharp
[<NoEquality; NoComparison>]
type OrderLine = {
    OrderId : OrderId
    ProductId : ProductId
    Qty : int
}
with
    member this.Key =
        (this.OrderId, this.ProductId)

printfn "%b" (line1.Key = line2.Key)
```

### イミュータブルとアイデンティティ

値オブジェクトは[[immutability|イミュータブル]]であることが求められる。一方、エンティティは時間とともに変化するもので、そのためにアイデンティティを持つ。[[functional-programming|関数型プログラミング]]では値がデフォルトでイミュータブルなので、変更はコピーを作ることで表す。

```fsharp
let initialPerson = { PersonId = PersonId 42; Name = "Joseph" }
let updatedPerson = { initialPerson with Name = "Joe" }
```

こうすると、変更があることを型シグネチャで明示する必要が出てくる。

```fsharp
// Bad: 何も変わらないのか、Person が暗黙に変わるのか分からない
type UpdateName = Person -> Name -> unit

// Good
type UpdateName = Person -> Name -> Person
```

## キーワード

- [[entity|エンティティ]]
- [[value-object|値オブジェクト]]
- [[business-process|ビジネスプロセス]]
- [[record-type|レコード型]]
- [[discriminated-union|判別共用体]]
- [[pattern-matching|パターンマッチ]]
- [[immutability|イミュータブル]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

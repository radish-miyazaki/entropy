---
title: Domain Modeling Made Functional 第10章 ドメインエラーを扱う
description: エラーをドメインエラー、パニック、インフラストラクチャエラーの 3 種類に分け、ドメインエラーを選択型でモデリングする
tags: [book-chapter, ddd, fsharp]
date: 2024-08-04
book: "[[Domain Modeling Made Functional]]"
chapter: 10
---

## TL;DR

- システムのエラーは、[[domain-error|ドメインエラー]]、パニック、インフラストラクチャエラーの 3 種類に分けられる。インフラストラクチャエラーは、ドメインエラーとして扱ったほうが役に立つことが多い。
- ドメインエラーは[[domain|ドメイン]]と同じようにモデリングし、一般には[[discriminated-union|選択型]]で表す。
- 例外の代わりにエラーを返すとコードが読みにくくなるので、別の手当てが必要になる（[[Domain Modeling Made Functional 第10章 Result を生成する関数の連鎖（bind と errorMap、map）]]）。

## 内容

### システムに現れる 3 種類のエラー

1 つめは**ドメインエラー**である。[[business-process|ビジネスプロセス]]の一部として予想されるエラーで、たとえば請求の段階で却下された注文や、無効な製品コードを含む注文がこれに当たる。現場にこうした事態に対処する手順がすでにあるなら、コードにもそれを反映させるべきである。

2 つめは**パニック**である。メモリ不足、ゼロ除算、`null` 参照のように、処理しようのないシステムエラーや、プログラマの見落としによるエラーを指す。

3 つめは**インフラストラクチャエラー**である。ネットワークのタイムアウトや認証の失敗のように、アーキテクチャの一部として予想されるエラーである。ビジネスプロセスの一部ではなく、ドメインにも含まれない。

### それぞれのエラーの扱い方

ドメインエラーはドメインの一部なので、ドメインモデリングに組み込み、[[domain-expert|ドメインエキスパート]]と議論する。できれば型システムで文書化する。

パニックが起きたら、[[workflow|ワークフロー]]を放棄して例外を発生させ、適切な最上位（`main` など）で捕捉する。[[go|Go]] の `panic` を思い浮かべると分かりやすい。

```fsharp
let workflowPart2 input =
  if input = 0 then
    raise (DivideByZeroException())
  ...

let main() =
  try
    let result1 = workflowPart1()
    let result2 = workflowPart2 result1
    printfn "the result is %A" result2
  with
  | :? OutOfMemoryException ->
    printfn "exited with OutOfMemoryException"
  | :? DivideByZeroException ->
    printfn "exited with DivideByZeroException"
  | ex ->
    printfn "exited with %s" ex.Message
```

インフラストラクチャエラーは、どちらの方法でも扱える。どちらを選ぶかはシステムのアーキテクチャによる。マイクロサービスなら例外（パニック）として扱ってもよく、モノリスならドメインエラーとして扱う。ただし、ドメインとして扱えば「どんなエラーが起こりうるか」を考えざるをえなくなるので、多くの場合はドメインエラーと同じように扱ったほうが役に立つ。また、インフラストラクチャエラーの多くは、ドメインエキスパートに相談する必要がある。たとえば外部サービスを利用できないとき、ビジネスプロセスをどう変えるか、顧客にどう伝えるかは、開発チームだけでは決められない。ドメインエキスパートやプロダクトオーナーも含めて検討する。

### 型によるドメインエラーのモデリング

ドメインエラーも、ドメインと同じようにモデリングする。プリミティブ型を使わず、[[ubiquitous-language|ユビキタス言語]]でドメインに特化した型を作る（[[Domain Modeling Made Functional 第5章 Domain Modeling with Types]]）。一般には、エラーを選択型で表し、別々の対応が必要なエラーの種類ごとにケースを用意する。注文確定のワークフローなら次のようになる。

```fsharp
type PlaceOrderError =
  | ValidationError of string
  | ProductOutOfStock of ProductCode
  | RemoteServiceError of RemoteServiceError
```

`ValidationError` は長さや形式のエラーなど、プロパティのチェックに使う。`ProductOutOfStock` は、顧客が在庫切れの製品を買おうとしたときに使う。`RemoteServiceError` はインフラストラクチャエラーの例である。

選択型を使う理由は 3 つある。1 つめは、うまくいかない可能性のあるすべての事柄を、コード内の明示的なドキュメントとして示せることである。2 つめは、エラーに関する追加情報も明示的に示せることである。3 つめは、要件の変化に応じて型を簡単かつ安全に拡張（縮小）できることである。エラーのケースは前もって定義できるものではなく、開発を進めるうちに見えてくる。それがドメインエラーなら型を拡張する。コンパイラがパターンマッチの網羅性をチェックするので、拡張は安全に行える。警告が出たら、そのケースにどう対処するかをドメインエキスパートやプロダクトオーナーと相談するチャンスである。

### エラー処理はコードの見た目を悪くする

例外には、正常系のコードがきれいになるという利点がある。

```fsharp
let validateOrder unvalidatedOrder =
  try
    let orderId = ...
    let customerInfo = ...
    let shippingAddress = ...
  with
    ...
```

各ステップでエラーを返すようにすると、コードが煩雑になる。次は擬似コードである。潜在的なエラーを捕まえる `try`/`with` が組み合わさると、さらに読みにくくなる。

```fsharp
let validateOrder unvalidatedOrder =
  let orderIdResult = ...
  if orderIdResult is Error then
    return

  let customerInfoResult = ...
  if customerInfoResult is Error then
    return

  try
    let shippingAddressResult = ...
    if shippingAddressResult is Error then
      return
    ...
  with
    ...
```

解決策は[[Domain Modeling Made Functional 第10章 Result を生成する関数の連鎖（bind と errorMap、map）]]で扱う。

## キーワード

- [[domain-error|ドメインエラー]]
- [[error-handling|エラー処理]]
- [[discriminated-union|選択型]]
- [[domain-expert|ドメインエキスパート]]
- [[business-process|ビジネスプロセス]]
- [[ubiquitous-language|ユビキタス言語]]
- [[domain|ドメイン]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

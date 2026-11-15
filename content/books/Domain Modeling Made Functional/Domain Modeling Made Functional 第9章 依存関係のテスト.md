---
title: Domain Modeling Made Functional › 依存関係のテスト
description: 依存関係を明示的に渡しておくと、モックライブラリを使わずにスタブ関数へ差し替えてテストできる
tags: [book-chapter, ddd, fsharp]
date: 2024-07-31
book: "[[Domain Modeling Made Functional]]"
chapter: 9
---

## TL;DR

- [[fsharp|F#]] にはテスティングフレームワークが多く、特に [[fsunit|FsUnit]]、[[unquote|Unquote]]、[[expecto|Expecto]]、[[fscheck|FsCheck]] は F# 向けに作られている。
- テストでは、依存関係をスタブ関数に差し替えるだけでよい。
- 関数型プログラミングの考え方をテストにも取り入れると、テストが簡単になる。

## 内容

### スタブ関数への差し替え

[[Domain Modeling Made Functional 第9章 依存関係の注入]]のように依存関係をパラメータで渡すのは、テストを簡単にするためでもある。モックライブラリを使わなくても、代わりの依存関係に差し替えられる。

次は [[arrange-act-assert|AAA パターン]]で書いたテストの例である。テスティングフレームワークには [[nunit|NUnit]] を使っている。`` ` `` 2 つで囲むと空白やピリオドを含む識別子を作れるので、テスト名はこの形で囲むことが多い。

成功するケースでは、製品が存在すると答えるスタブを渡す。

```fsharp
open NUnit.Framework

[<Test>]
let ``製品が存在する場合は、検証に成功する``() =
  // 準備: サービス依存関係のスタブを設定
  let checkAddressExists address =
    CheckedAddress address
  let checkProductCodeExists productCode =
    true

  // 準備: 入力の設定
  let unvalidatedOrder = ...

  // 実行: validateOrder を呼び出す
  let result = validateOrder checkProductCodeExists checkAddressExists ...

  // 検証: 結果がエラーでなく、検証済みの注文であることを確認する
```

失敗するケースでは、製品が存在しないと答えるスタブを渡す。

```fsharp
[<Test>]
let ``製品が存在しない場合は、検証に失敗する``() =
  // 準備: サービス依存関係のスタブを設定
  let checkAddressExists address = ...
  let checkProductCodeExists productCode =
    false

  // 準備: 入力の設定
  let unvalidatedOrder = ...

  // 実行: validateOrder を呼び出す
  let result = validateOrder checkProductCodeExists checkAddressExists ...

  // 検証: 結果が失敗であることを確認する
```

### 関数型プログラミングがテストにもたらす利点

各関数はステートレスなので、同じ入力に対して常に同じ結果を返す。そのためテストが簡単である。また、すべての依存関係が明示的に渡されるので、関数がどう動くかを理解しやすい。副作用は関数の中で直接起こるのではなく、パラメータにカプセル化されている。これによりテストが簡単になり、どんな副作用が起こるかを制御するのも簡単になる。

## キーワード

- [[unit-test|単体テスト]]
- [[arrange-act-assert|AAA パターン]]
- [[nunit|NUnit]]
- [[fsunit|FsUnit]]
- [[unquote|Unquote]]
- [[expecto|Expecto]]
- [[fscheck|FsCheck]]
- [[dependency|依存関係]]
- 参照透過性

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

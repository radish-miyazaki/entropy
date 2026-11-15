---
title: Domain Modeling Made Functional › 数値に測定単位を付与する
description: F# では数値に測定単位を付けられ、単位が一致しないとコンパイルエラーになる。物理的な単位以外にも使える
tags: [book-chapter, ddd, fsharp]
date: 2024-07-19
book: "[[Domain Modeling Made Functional]]"
chapter: 6
---

## TL;DR

- [[fsharp|F#]] では数値に測定単位を付けられ、単位が一致しないとコンパイラがエラーを出す。
- コンパイラだけが使う情報なので実行時のオーバーヘッドはなく、通貨や座標軸など物理的な単位以外にも使える。

## 内容

### 測定単位

F# では、数値に測定単位を付けられる。SI 単位は `Microsoft.FSharp.Data.UnitSystems.SI.UnitSymbols` に定義されている（[FSharp.Core のリファレンス](https://fsharp.github.io/fsharp-core-docs/reference/fsharp-data-unitsystems-si-unitsymbols.html)）。

```fsharp
open Microsoft.FSharp.Data.UnitSystems.SI.UnitSymbols

let fiveKilos = 5.0<kg>
let fiveMeters = 5.0<m>
```

単位が一致しない値を比べると、コンパイラがエラーを出す。

```fsharp
fiveKilos = fiveMeters
// error FS0001: 型が一致しません。
// 'float<kg>' という指定が必要ですが、 'float<m>' が指定されました。
// 測定単位 'kg' は測定単位 'm' と一致しません
```

測定単位はコンパイラが使うだけなので、実行時のオーバーヘッドはない。

### ドメインでの使い方

[[domain|ドメイン]]の型にも、測定単位を使える。

```fsharp
type KilogramQuantity = KilogramQuantity of float<kg>
```

測定単位は、物理的な単位以外にも使える。たとえば、秒とミリ秒が混ざらないようにタイムアウト時間の単位に使ったり、x 軸と y 軸が混ざらないように空間の次元に使ったり、通貨に使ったりできる。

## キーワード

- [[fsharp|F#]]
- 測定単位
- [[domain|ドメイン]]
- [[integrity|完全性]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

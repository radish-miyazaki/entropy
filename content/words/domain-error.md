---
title: ドメインエラー
aliases: []
description: ビジネスプロセスの一部として起こることが予想されるエラー
tags: [word, ddd]
date: 2026-11-14
---

## TL;DR

[[business-process|ビジネスプロセス]]の一部として、起こることが予想されるエラー。[[Domain Modeling Made Functional]] では、システムのエラーをドメインエラー、パニック、インフラストラクチャエラーの 3 種類に分けている。

## なぜ必要か

[[Domain Modeling Made Functional]] の第 10 章によると、現場にそのエラーに対処する手順がすでにあるなら、コードにもそれを反映させるべきである。ドメインエラーは[[domain|ドメイン]]の一部なので、ドメインモデリングに組み込み、[[domain-expert|ドメインエキスパート]]と議論する。

## 仕組み

同書の第 10 章では、3 種類のエラーを次のように区別している。

- **ドメインエラー**: 請求の段階で却下された注文や、無効な製品コードを含む注文など、ビジネスプロセスの一部として予想されるエラー
- **パニック**: メモリ不足やゼロ除算のように、処理しようのないシステムエラーや、プログラマの見落としによるエラー。ワークフローを放棄して例外を投げ、最上位で捕捉する
- **インフラストラクチャエラー**: ネットワークのタイムアウトや認証の失敗のように、アーキテクチャの一部として予想されるエラー

インフラストラクチャエラーはどちらの扱いもできるが、多くの場合はドメインエラーとして扱ったほうが役に立つ。ドメインエラーとして扱うと、どんなエラーが起こりうるかを考えざるをえなくなり、外部サービスが使えないときの対応もドメインエキスパートと相談できる。

ドメインエラーは、ドメインと同じように[[ubiquitous-language|ユビキタス言語]]で型を作り、一般には[[discriminated-union|選択型]]で表す。別々の対応が必要なエラーごとにケースを用意する。ライブラリや外部サービスが投げる例外をドメインエラーとして扱いたいときは、例外を `Result` に変換するアダプタを作る。

## 例

```fsharp
type PlaceOrderError =
  | ValidationError of string
  | ProductOutOfStock of ProductCode
  | RemoteServiceError of RemoteServiceError
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[error-handling|エラー処理]]
- [[discriminated-union|選択型]]
- [[domain|ドメイン]]

## 出典

- [[Domain Modeling Made Functional 第10章 ドメインエラーを扱う|Domain Modeling Made Functional 第10章 ドメインエラーを扱う]]
- [[Domain Modeling Made Functional 第10章 他の種類の関数を 2 トラックモデルに適合させる|Domain Modeling Made Functional 第10章 他の種類の関数を 2 トラックモデルに適合させる]]

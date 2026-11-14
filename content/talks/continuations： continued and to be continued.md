---
title: "continuations: continued and to be continued"
description: call/cc と限定継続、中間表現としての継続渡しスタイル、エフェクトハンドラにおける継続を紹介する発表
tags: [talk, 関数型まつり-2025]
date: 2025-05-16
speakers: [nymphium]
company:
event: "[[関数型まつり 2025]]"
held:
slide: https://nymphium.github.io/pdf/fp_matsuri_2025.html
video:
---

## TL;DR

- `call/cc` は残りの計算すべてを捕捉してしまうので、代わりに[[delimited-continuation|限定継続]]を使うとよい。
- [[continuation-passing-style|継続渡しスタイル]]は、最適化しやすい中間表現としても使われる。エフェクトのハンドリングやモナドにも[[continuation|継続]]が現れる。

## 内容

### call/cc と限定継続

[[racket|Racket]] の `call/cc` は、呼び出したフォームの中に閉じず、残りの計算すべてを捕捉してしまう。そのため、代わりに[[delimited-continuation|限定継続]]を使うとよい。限定継続で `call/cc` や[[monad|モナド]]を実装でき、その逆もできる。

### 中間表現としての CPS

[[continuation-passing-style|継続渡しスタイル]]（CPS）を中間表現（IR）として採用する処理系もある。例えば SML/NJ、[[scheme|Scheme]]、[[ocaml|OCaml]]、[[webassembly|WebAssembly]] である。CPS は関数を第一級オブジェクトとして扱うので、関数型言語と相性がよい。また CPS では束縛が単一代入的なので、[[beta-reduction|β 簡約]]や η 簡約などで多様な最適化を実装しやすい。発表では、手続き型言語と関数型言語の制御の移譲（control transfer）の対応付けも紹介された。

### エフェクトと継続

エフェクトのハンドリングとは、どのような副作用（Effect）が起きたか、そしていつどのように再開するかを扱うことであり、いつどのように再開するかが継続にあたる。モナドにも継続は現れる。

[[algebraic-effects|Algebraic Effect Handlers]] は、副作用のある計算を扱う新しい手法で、モナド変換子よりもモジュール化や合成がしやすいらしい。

## キーワード

- [[continuation|継続]]
- [[delimited-continuation|限定継続]]
- [[continuation-passing-style|継続渡しスタイル]]
- [[monad|モナド]]
- [[beta-reduction|β 簡約]]
- [[algebraic-effects|Algebraic Effect Handlers]]
- [[racket|Racket]]
- [[scheme|Scheme]]
- [[ocaml|OCaml]]
- [[webassembly|WebAssembly]]

## 自分の理解

自分の知識では一部しか理解できなかった…。特に Algebraic Effect Handlers のあたりはよく分からなかった。

## 関連

- [プロポーザル](https://fortee.jp/2025fp-matsuri/proposal/ea9fd8fc-4ae3-40c7-8ef5-1a8041e64606)

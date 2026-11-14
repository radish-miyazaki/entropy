---
title: OCamlで作ったアプリを実運用している
description: 面談の日程調整アプリを OCaml と ReScript で作って運用した経験と、マイナー言語を採用するときの考え方の紹介
tags: [talk, ocaml, rescript]
date: 2026-07-10
speakers: []
company:
event: "[[関数型まつり 2026]]"
held:
slide:
video:
---

## TL;DR

- カジュアル面談や面接の日程調整アプリを OCaml と ReScript で作り、実運用している。OCaml だから起きた問題はない。
- AI がどの言語でもコードを書いてくれるので、言語選択の自由度が上がり、好きな言語を選んでもよい時代になっている。

## 内容

### 何を作ったか

カジュアル面談や一部の面接の日程調整アプリを、[[ocaml|OCaml]] と [[rescript|ReScript]] で作っている。

### 実際どうか

OCaml だから、マイナーだから、という問題は起きていない。ただ、ほかの言語でも起きうる問題はある。Web アプリに必要な土台は揃っており、型、小さい言語仕様、後方互換性が強みである。

一方で、ライブラリやエコシステムは貧弱である。ただ、AI が普通にコードを書いてくれるし、境界が小さければ自作もできる。HTTP、JSON、OAuth、JWT、TLS、ログのライブラリは一通り揃っている。AWS や Google、Slack などのベンダー向けのライブラリは足りないので自作しており、そのうち OSS にする予定である。

開発は一人で行っている。OCaml Meeting や日本語の Discord など、日本のコミュニティは活発で、イベントの 2 か月前に 50 人近く集まる勢いがある。

### なぜ OCaml にしたか

一番の理由は OCaml が好きなことである。ただ、それだけでは済まず、課題の要件を満たせるか、継続して運用できるかに答えられる必要がある。それに答えられるよう、普段から使っておく。

### どうやって採用したか

小さいところから始めた。普段から OCaml が好きだと発信して自身をブランディングし、周りの理解を得た。

AI の時代になったことも大きい。Spring（Java）や [[ruby-on-rails|Rails]]（[[ruby|Ruby]]）と比べても明確な差はなく、どの技術でも AI は十分に書いてくれるし、それなりに間違える。ハルシネーションの種類は少し違うかもしれない。詰まったときに捨てる判断も簡単になった。その結果、言語選択の自由度が上がり、好きな言語を選んでもよい時代が来ている。

### OCaml と ReScript の特徴

OCaml は、マルチコアとエフェクトハンドラ、パターンマッチ、強い後方互換性、強い型推論を持つ。発表者は、[[algebraic-effects|Algebraic Effects]] でコンテキストを分離し、Polymorphic variant でエラーを表現している。Polymorphic variant は [[purescript|PureScript]] にもある。

ReScript は OCaml から派生した AltJS で、型安全でパターンマッチのある TypeScript のような言語である。ただ、OCaml integration の機能がなくなっており、OCaml から離れようとしているようにも見える。

### Algebraic Effects の使いどころ

ユースケース層で Effect を起こし、アダプター層でハンドリングしている。[[repository-pattern|リポジトリパターン]]のリポジトリを Effect に置き換えたイメージである。

## キーワード

- [[ocaml|OCaml]]
- [[rescript|ReScript]]
- [[algebraic-effects|Algebraic Effects]]
- [[effect-system|エフェクトシステム]]
- Polymorphic variant
- [[purescript|PureScript]]
- [[repository-pattern|リポジトリパターン]]
- [[jwt|JWT]]

%%

## 自分の理解

自社に持ち帰れそうな点、疑問に思った点。書くときはこのコメントを外す
%%

## 関連

- [発表のページ](https://fortee.jp/2026fp-matsuri/proposal/1c388c15-55f1-4185-a620-cf2929f26cb9)
- [[結局のところ「代数的」って何なの？ 〜霧の向こうの代数的エフェクト〜]]

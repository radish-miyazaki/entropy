---
title: iOSアプリ開発で関数型プログラミングを実現するThe Composable Architectureの紹介
description: iOS アプリ開発で副作用を分離し、信頼できる部品を組み合わせるためのライブラリ The Composable Architecture（TCA）を紹介する発表
tags: [talk, 関数型まつり-2025]
date: 2025-05-16
speakers: [yimajo]
company:
event: "[[関数型まつり 2025]]"
held:
slide: https://speakerdeck.com/yimajo/iosapurikai-fa-de-guan-shu-xing-puroguraminguwoshi-xian-suru-the-composable-architecturenoshao-jie-792bb7b5-817f-4e25-adab-b071a9b94e5a
video:
---

## TL;DR

- 外部依存の多い iOS 開発では、[[side-effect|副作用]]を分離して、予測可能でテストできる部品を組み合わせたい。
- The Composable Architecture（TCA）を使うと、純粋なロジックと副作用を分けられる。ただし `Reducer` は純粋関数ではない。

## 内容

### 関数型プログラミングと iOS 開発

[[functional-programming|関数型プログラミング]]は、コードの再利用性を高め、コードを高品質な部品として再利用できるようにする手段である。

iOS 開発は外部依存だらけである。そのリスクを減らすには、自分のコードの振る舞いを予測可能にして自動で検証できるようにし、そのような信頼性の高い部品を組み合わせて作りたい。その第一歩が[[side-effect|副作用]]の分離であり、TCA を使うと副作用を分離できる。TCA では、View を State と Action の Reducer として定義する。TCA を使った例として [CopilotForXcode](https://github.com/github/CopilotForXcode) がある。

### TCA のメリット

TCA を使うと、純粋なロジックを副作用と分離できるので、可読性が上がる。`Effect.run` で分離した副作用は Swift Concurrency の上で動くので、優先順位の設定、並列実行の構造化、キャンセル処理を使える。関心を分離できるので、テストもしやすい。

[[Domain Modeling Made Functional 第12章 永続化を端に追いやる|永続化を端に追いやる]]ことも実現できる。`Reducer` は[[higher-order-function|高階関数]]であり、[[dependency-injection|依存性の注入]]ができるので、[[layered-architecture|レイヤードアーキテクチャ]]を導入する必要はなく、モジュールの分割で十分である。Reducer どうしの[[function-composition|関数合成]]もできる。

### 注意点

`Reducer` の型は `(inout State, Action) -> Effect<Action>` であり、純粋関数ではない。`inout State` はミュータブルである。パフォーマンス上の懸念があるので、State を新しく作って返すのではなく、メインスレッドの Reducer 自身が State を変更する。

## キーワード

- The Composable Architecture
- [[functional-programming|関数型プログラミング]]
- [[side-effect|副作用]]
- [[pure-function|純粋関数]]
- [[higher-order-function|高階関数]]
- [[dependency-injection|依存性の注入]]
- [[layered-architecture|レイヤードアーキテクチャ]]
- [[function-composition|関数合成]]

%%

## 自分の理解

自社に持ち帰れそうな点、疑問に思った点。書くときはこのコメントを外す
%%

## 関連

- [プロポーザル](https://fortee.jp/2025fp-matsuri/proposal/71fbd521-9dc5-458d-89f6-cbff8e84e3cc)
- [[Domain Modeling Made Functional 第12章 永続化を端に追いやる]]

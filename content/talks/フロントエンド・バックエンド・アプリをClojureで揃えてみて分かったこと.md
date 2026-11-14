---
title: フロントエンド・バックエンド・アプリをClojureで揃えてみて分かったこと
description: フロントエンド、バックエンド、モバイルアプリを Clojure 系の言語で揃えた経験から、良かった点と採用・チームの話をする発表
tags: [talk, clojure]
date: 2026-07-10
speakers: []
company:
event: "[[関数型まつり 2026]]"
held: 2026-07-12
slide:
video:
---

## TL;DR

- [[clojure|Clojure]]、[[clojurescript|ClojureScript]]、[[clojuredart|ClojureDart]] でフロントエンド、バックエンド、アプリを構築した。
- 共通処理を共有でき、言語との摩擦が少なく、AI との相性も良い。一方、採用の母集団は広くない。

## 内容

### 良かったところ

フロントエンドは re-frame を使っており、副作用を Effect として返せる。共通の処理は `.cljc` ファイルに書いて、どの環境からも使える。マクロも書きやすい。

AI との相性も良い。テスト、Malli によるスキーマ、トークン効率、REPL が理由として挙げられた。

言語に縛るものがなく、摩擦が少ないので自由に書ける。一方で、必要な制約を必要な場所に足すこともできる。

### 採用とチーム

採用の母集団は広くない。ただ、仕事で Clojure を書けることが転職の理由になっている。

## キーワード

- [[clojure|Clojure]]
- [[clojurescript|ClojureScript]]
- [[clojuredart|ClojureDart]]
- re-frame

%%

## 自分の理解

自社に持ち帰れそうな点、疑問に思った点。書くときはこのコメントを外す
%%

## 関連

- [プロポーザル](https://fortee.jp/2026fp-matsuri/proposal/4bf488b7-32f1-4544-8ea8-50e775133b65)

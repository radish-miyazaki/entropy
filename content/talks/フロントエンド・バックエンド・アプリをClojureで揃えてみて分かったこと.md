---
title: フロントエンド・バックエンド・アプリをClojureで揃えてみて分かったこと
description: フロントエンド、バックエンド、モバイルアプリを Clojure 系の言語で揃えた経験から、良かった点と採用・チームの話をする発表
tags: [talk, clojure]
date: 2026-07-10
speakers: [jyamakawa]
company: スタディスト
event: "[[関数型まつり 2026]]"
held: 2026-07-12
slide: https://speakerdeck.com/peeeaje/hurontoendobatukuendoapuriwoclojuredejian-etemitefen-katutakoto
video:
---

## TL;DR

- バックエンドを [[clojure|Clojure]]、Web のフロントエンドを [[clojurescript|ClojureScript]]、アプリを [[clojuredart|ClojureDart]] で構築した。
- 共通処理を共有でき、言語との摩擦が少なく、AI との相性も良い。一方、採用の母集団は広くない。

## 内容

### 良かったところ

re-frame では副作用を Effects として返せる。処理から Effects を返すまでの範囲をテストできる。共通の処理は `.cljc` ファイルに書けるので、フロントエンドとバックエンドで同じバリデーションのルールを使える。マクロも書きやすい。

AI との相性も良い。理由として、テスト、Malli、トークン効率、REPL が挙げられた。UI や外部 I/O を動かさずに検証できる範囲が広く、Malli ではスキーマをデータで定義して実行時に検証できる。少ないトークンで文脈を渡しやすい。

Clojure には縛るものがなく、言語との摩擦が少ないので自由に書ける。一方で、必要な制約を必要な場所に足すこともできる。

### 採用とチーム

採用の母集団は広くない。ただ、仕事で Clojure を書けることが転職の理由になる。発表者自身もその一人だった。

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

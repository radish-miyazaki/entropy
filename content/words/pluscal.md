---
title: PlusCal
aliases: []
description: Leslie Lamport が開発した、TLA+ の仕様に変換されるアルゴリズム記述言語
tags: [word, 形式手法]
date: 2025-06-23
---

## TL;DR

2009 年に Leslie Lamport が開発したアルゴリズム記述言語。[[tla-plus|TLA+]] をプログラマが使いやすくするために作られ、書いたアルゴリズムは TLA+ の仕様に変換される。

## なぜ必要か

Lamport は、プログラミング言語は細かすぎる粒度で考えることを強いるので、並行処理について考えるのに向かないと述べている。並行処理のバグはコードを書く前にアルゴリズムの段階で直すべきだという考えである。PlusCal は特にマルチスレッドで実装するアルゴリズムを書いて検証するのに向いている。

## 仕組み

PlusCal で書いたアルゴリズムは、実行可能なコードにはコンパイルされない。代わりに TLA+ の仕様に変換され、TLA+ のツール（主にモデル検査器の TLC）で検証する。証明システムの TLAPS を使えば正しさを証明することもできるが、手間がかかるため、あまり行われない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[tla-plus|TLA+]]
- [[formal-methods|形式手法]]
- [[formal-verification|形式的検証]]

## 出典

- [PlusCal のチュートリアル（Leslie Lamport）](https://lamport.azurewebsites.net/tla/tutorial/intro.html)

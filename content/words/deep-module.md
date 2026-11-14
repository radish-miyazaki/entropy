---
title: 深いモジュール
aliases: [Deep Class]
description: 強力な機能を提供しながら、シンプルなインタフェースを持つモジュール
tags: [word, 設計]
date: 2023-12-19
---

## TL;DR

強力な機能を提供しながら、シンプルな[[interface|インタフェース]]を持つ[[module|モジュール]]。[[A Philosophy of Software Design]] で、複雑さを管理する上で重要な要素とされている。

## なぜ必要か

モジュールのインタフェースは、システムの他の部分に課す[[complexity|複雑さ]]である。インタフェースが小さく単純であれば、もたらされる複雑さを抑えられる。深いモジュールは、内部の複雑さのごく一部しか利用者に見せないので、良い[[abstraction|抽象化]]になる。

## 仕組み

モジュールの効果を「提供する機能」、費用を「インタフェース」と考えると、深いモジュールは費用対効果が高い。シンプルなインタフェースの後ろに多くの機能が隠されていて、利用者はインタフェースが提供する抽象化だけを理解すればよい。

## 例

- Unix のファイル I/O は、`open`、`read`、`write`、`lseek`、`close` の 5 つだけで多くの機能を提供している。
- Go や Java の[[garbage-collection|ガベージコレクション]]。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[shallow-module|浅いモジュール]]
- [[classitis|Classitis]]
- [[information-hiding|情報隠蔽]]

## 出典

- [[A Philosophy of Software Design 第4章 Modules Should Be Deep|A Philosophy of Software Design 第4章]]

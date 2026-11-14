---
title: サンドボックス
aliases: []
description: 実行中のプログラムを他から隔離し、使えるリソースを制限するセキュリティの仕組み
tags: [word, セキュリティ]
date: 2026-11-14
---

## TL;DR

実行中のプログラムを他から隔離し、使えるリソースを制限するセキュリティの仕組み。テストされていないコードや、信頼できないコードを動かすときに使う。

## なぜ必要か

[Wikipedia](<https://en.wikipedia.org/wiki/Sandbox_(computer_security)>) によると、サンドボックスは障害やソフトウェアの脆弱性が広がるのを防ぐ。怪しいプログラムを動かしても、ホストのシステムを傷つけられないようにできる。

## 仕組み

サンドボックスの中のプログラムには、限られたリソースだけを与える。ネットワークや入力デバイスへのアクセスは、禁止されるか強く制限されることが多い。

## 例

- 仮想マシンは、ホストのコンピュータ全体をエミュレートする。ゲストの OS は、エミュレータを通してしかホストのリソースに触れられない
- Linux の seccomp の strict モードでは、使えるシステムコールが `read`、`write`、`exit`、`sigreturn` だけになる
- [[webassembly|WebAssembly]] のモジュールは、ホストから隔離されたサンドボックスで動く。[WebAssembly のドキュメント](https://webassembly.org/docs/security/)によると、適切な API を通さずにサンドボックスから出ることはできない。線形メモリへのアクセスは境界チェックされ、コンパイルされたコードは書き換えられず、実行時に観測もできない

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[webassembly|WebAssembly]]
- [[webassembly-instance|WebAssembly Instance]]
- [[site-isolation|サイト分離]]
- [[container|コンテナ]]

## 出典

- [Sandbox (computer security) - Wikipedia](<https://en.wikipedia.org/wiki/Sandbox_(computer_security)>)
- [Security - WebAssembly](https://webassembly.org/docs/security/)

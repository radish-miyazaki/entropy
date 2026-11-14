---
title: ABI
aliases: [Application Binary Interface]
description: 呼び出し規約、型のメモリ上の配置、スタックとレジスタの使い方など、機械語のレベルでプログラムどうしがやり取りするための取り決め
tags: [word]
date: 2024-11-08
---

## TL;DR

Application Binary Interface の略。呼び出し規約、型のメモリ上の配置、スタックとレジスタの使い方など、コンパイル済みのプログラムどうしが機械語のレベルでやり取りするための取り決めである。

## 仕組み

Microsoft の x64 ABI のドキュメントは、扱う範囲として呼び出し規約、型の配置、スタックとレジスタの使い方、例外処理などを挙げている。呼び出し規約は引数をどのレジスタやスタックで渡すか、戻り値をどこに置くかを決める。型の配置は各型のサイズとアラインメント、構造体の中のパディングを決める。レジスタの使い方は関数呼び出しで呼び出し側が保存すべきもの（volatile）と、呼び出された側が保存すべきもの（nonvolatile）を分ける。

## 例

Windows の x64 では `__fastcall` の呼び出し規約を使い、最初の 4 つの整数引数を `RCX`、`RDX`、`R8`、`R9` で渡し、残りをスタックで渡す。戻り値は `RAX` に入る。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[cpu-register|レジスタ]]

## 出典

- [x64 ABI conventions - Microsoft Learn](https://learn.microsoft.com/en-us/cpp/build/x64-software-conventions)

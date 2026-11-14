---
title: 仮想マシン
aliases: [VM]
description: 物理的なコンピュータの機能をソフトウェアやハードウェアで仮想化・エミュレートしたもの
tags: [word, インフラ]
date: 2026-11-14
---

## TL;DR

物理的なコンピュータの機能を提供する、仮想化またはエミュレートされたコンピュータシステム。Popek と Goldberg は「実際のコンピュータの、効率的で隔離された複製」と定義した。

## なぜ必要か

Wikipedia によると、仮想マシンはセキュリティのためにアプリケーションどうしを隔離する目的でよく使われる。1 台の物理マシンで複数の OS を動かしたり、サーバを集約したりすることもできる。

## 仕組み

仮想マシンには大きく 2 種類ある。

システム仮想マシンは実際のマシンの代わりになり、OS をまるごと動かせる。ハイパーバイザがハードウェアを共有・管理し、1 台の物理マシンの上で互いに隔離された複数の環境を動かす。VMware ESXi、Hyper-V、KVM、Xen、VirtualBox などがある。

プロセス仮想マシンは、ホスト OS の上で普通のアプリケーションとして動き、1 つのプロセスを支える。ハードウェアや OS の違いを隠し、プラットフォームに依存しない実行環境を提供する。[[java|Java]] の [[jvm|JVM]] や、.NET の Common Language Runtime がこれにあたる。

## 例

- [[compute-engine|Compute Engine]] のような [[iaas|IaaS]] は、システム仮想マシンをサービスとして提供する
- [[webassembly|WebAssembly]] は、仮想マシンとその命令セットを定めた仮想命令セットアーキテクチャである

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[jvm|JVM]]
- [[container|コンテナ]]
- [[iaas|IaaS]]
- [[instruction-set-architecture|命令セットアーキテクチャ]]

## 出典

- [Virtual machine - Wikipedia](https://en.wikipedia.org/wiki/Virtual_machine)

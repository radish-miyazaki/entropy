---
title: Compute Engine
aliases: [Google Compute Engine]
description: Google や Amazon などが提供する、セルフマネージドな仮想マシンを提供する IaaS のサービス
tags: [word]
date: 2025-04-06
---

## TL;DR

[[iaas|IaaS]] のサービスの一種で、Google や Amazon などがセルフマネージドな[[virtual-machine|仮想マシン]]を提供する。

## なぜ必要か

必要に応じてコンピューティングリソースを増やしたり減らしたりできるので、トラフィックが急に増えたときにも対応しやすい。料金は使ったリソースの分だけで、初期費用はかからない。

## 仕組み

Google Cloud の公式ドキュメントによると、Google Compute Engine は、自分で管理する[[virtual-machine|仮想マシン]]（VM）インスタンスと[[bare-metal|ベアメタル]]インスタンスを提供する。VM は KVM ハイパーバイザの上で動き、Linux と Windows を実行できる。操作には、コンソール、CLI、REST API を使う。

マシンタイプは、汎用、コンピューティング最適化、メモリ最適化、アクセラレータ最適化などのファミリーから選ぶ。標準のマシンタイプで足りなければ、一部のシリーズでは CPU とメモリの量を指定したカスタムマシンタイプを作れる。ストレージには、性能は最も高いがインスタンスを止めるとデータが消える Local SSD と、データが残る Hyperdisk や Persistent Disk がある。リソースは世界中のリージョンから選んでデプロイできる。

## 例

- [[amazon-ec2|Amazon EC2]]
- Google Compute Engine

## 注意点

セルフマネージドなので、設定、運用、管理、メンテナンスをユーザ自身で行う必要がある。

## 自分の理解

インフラが苦手な自分にとっては、極力避けたい。

## 関連

- [[aws-fargate|AWS Fargate]]
- [[aws-gcp-service-mapping|AWS と GCP のサービスの対応表]]

## 出典

- [Compute Engine のよくある質問](https://cloud.google.com/compute/docs/faq?hl=ja)
- [Compute Engine の概要](https://docs.cloud.google.com/compute/docs/overview?hl=ja)

---
title: IaaS
aliases: [Infrastructure as a Service]
description: 処理能力、ストレージ、ネットワークなどの基本的な計算資源を、利用者が必要に応じて確保できるクラウドのサービスモデル
tags: [word, クラウド]
date: 2026-11-14
---

## TL;DR

Infrastructure as a Service の略で、クラウドコンピューティングのサービスモデルの 1 つである。利用者は、処理能力、ストレージ、ネットワークなどの基本的な計算資源を確保し、OS やアプリケーションを含む任意のソフトウェアを動かせる。

## 仕組み

NIST SP 800-145 の定義では、利用者はクラウドの下回りのインフラを管理しない。一方で、OS、ストレージ、デプロイしたアプリケーションは利用者が制御し、ホストのファイアウォールのような一部のネットワーク機能も限られた範囲で制御できる。つまり、ハードウェアはクラウド事業者に任せ、その上の OS から先を利用者が受け持つ。

## 例

Google Cloud の [[compute-engine|Compute Engine]] は、仮想マシンを提供する IaaS のサービスである。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[compute-engine|Compute Engine]]
- [[idaas|IDaaS]]
- [[aws-gcp-service-mapping|AWS と GCP のサービスの対応表]]

## 出典

- [NIST SP 800-145: The NIST Definition of Cloud Computing（CSRC Glossary: Infrastructure as a Service）](https://csrc.nist.gov/glossary/term/infrastructure_as_a_service)

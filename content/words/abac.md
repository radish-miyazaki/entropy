---
title: ABAC
aliases: [Attribute-Based Access Control]
description: 主体、リソース、操作、環境の属性をポリシーと照らし合わせて、アクセスを許可するかどうかを決めるアクセス制御の方式
tags: [word]
date: 2025-06-15
---

## TL;DR

Attribute-Based Access Control の略。主体（ユーザ）、リソース、要求された操作、場合によっては環境の条件といった属性を、ポリシーやルールと照らし合わせて、アクセスを許可するかどうかを決めるアクセス制御の方式である。

## 仕組み

NIST SP 800-162 では ABAC を論理的なアクセス制御の方法論として定義している。アクセスの可否は主体の属性、対象の属性、要求された操作の属性、環境の条件を、それらの属性や条件で書かれたポリシー、ルール、関係と照らし合わせて決まる。同文書は、組織の中や組織の間で、情報の管理を保ちながら共有する手段としても ABAC を扱っている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[rbac|RBAC]]
- [[access-control-models|Access Control Model の一覧]]
- [[cedar|Cedar]]

## 出典

- [NIST SP 800-162 Guide to Attribute Based Access Control (ABAC) Definition and Considerations](https://csrc.nist.gov/pubs/sp/800/162/upd2/final)

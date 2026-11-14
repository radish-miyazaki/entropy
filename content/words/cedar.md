---
title: Cedar
aliases: [Cedar Policy Language]
description: AWS が公開したオープンソースの認可ポリシー言語
tags: [word, 認可]
date: 2025-06-15
---

## TL;DR

[[aws|AWS]] が公開した、オープンソースの認可ポリシー言語である。Principal、Action、Resource の 3 つを基本にルールを書き、アクセスを許可するか禁止するかを決める。

## なぜ必要か

認可のロジックをアプリケーションのビジネスロジックから切り離せる。ポリシーはコードを変更せずに更新でき、システムを止めずに反映される。[[rbac|RBAC]] と [[abac|ABAC]] のどちらにも対応している。

## 仕組み

ルールは次の 3 つの要素を基本に書く。

- Principal: 操作の主体
- Action: 操作の内容
- Resource: 操作の対象

ポリシーの効果は permit（許可）か forbid（禁止）のどちらかである。複数のポリシーが当てはまるときは、forbid が優先される。条件にはエンティティの属性や、リクエスト時の時刻や IP アドレスなどの情報（Context）も使える。ポリシーは作成・更新時にスキーマに照らして検証される。

AWS はマネージド版の Cedar エンジンとして Amazon Verified Permissions を提供している。AWS SDK を使って各言語から呼び出せ、認証の Amazon Cognito とも連携できる。

## 自分の理解

[[pdp|PDP]] は単一障害点になるので、自分で管理するのは大変である。基本的には Amazon Verified Permissions を使うのがよさそうだ。

## 関連

- [[pdp|PDP]]
- [[policy-enforcement-point|Policy Enforcement Point]]
- [[rbac|RBAC]]
- [[abac|ABAC]]
- [[lean|Lean]]

## 出典

- [cedar-policy/cedar - GitHub](https://github.com/cedar-policy/cedar)
- [Cedar Policy Language Reference Guide](https://docs.cedarpolicy.com/)
- [Cedar の論文（ACM Digital Library）](https://dl.acm.org/doi/10.1145/3649835)
- [Cedar の開発に関する論文（ACM Digital Library）](https://dl.acm.org/doi/10.1145/3663529.3663854)
- [[AWS と定理証明 〜ポリシー言語 Cedar 開発の舞台裏〜]]

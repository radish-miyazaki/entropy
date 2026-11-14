---
title: Zitadel の Key Concepts を理解する
description: ZITADEL のリソース階層（Instance、Organization、Project など）とロールの割り当て、Project Grant の仕組みを公式ドキュメントから整理した
tags: [article, zitadel]
date: 2026-07-02
article-authors: []
site: ZITADEL Docs
published:
url: https://zitadel.com/docs/concepts/structure/instance
---

## TL;DR

[[zitadel|ZITADEL]] のリソースは、Instance の下に Organization があり、Organization が User と Project を持つ階層になっている。ロールは Project 単位で定義し、Organization・Project・Role の組で User に割り当てる。Project Grant を使うと、ロールの割り当てを別の Organization に任せられる。

## 内容

### Instance

[Instance](https://zitadel.com/docs/concepts/structure/instance) は階層の最上位のノードで、Organization と Project を含む。仮想的なテナントとしてデータを完全に分離でき、1 つのシステムに複数の Instance を持てる。

### Organization

[Organization](https://zitadel.com/docs/guides/manage/console/organizations-overview) は Instance の中の[[multi-tenancy|テナント]]で、User や Project を管理する。Organization ごとに[ブランディング](https://zitadel.com/docs/guides/manage/customize/branding)や [[idp|IdP]] を設定でき、これらは [Policy / Setting](https://zitadel.com/docs/guides/manage/console/organizations-overview#organization-settings) で管理する。

### User

[User](https://zitadel.com/docs/guides/manage/console/users-overview) は通常のユーザ（Human User）と、M2M 用のサービスアカウントに分かれる。User は基本的に 1 つの Organization にだけ所属し、Organization の間を移動できない。

ただし、[Administrator](https://zitadel.com/docs/concepts/structure/administrators) は特別で、管理する範囲によって次の種類がある。

- IAM Administrator: Instance 全体の管理権限を持つ。最も強い権限である
- Organization Administrator: Organization の管理権限を持つ
- Project Administrator: Project の管理権限を持つ
- Project Grant Administrator: 他の Organization から付与された Project（後述する Project Grant）の管理権限を持つ

### Project と Application

[Project](https://zitadel.com/docs/guides/manage/console/projects-overview) は、Application や Role を管理する単位である。

[Application](https://zitadel.com/docs/guides/manage/console/applications-overview) は Project の中に作るクライアントで、Web、Native、User Agent（SPA）、API、[[saml|SAML]] の種類がある。基本的には [[oidc|OIDC]] や [[oauth-2|OAuth 2.0]] を使い、これらに対応していないアプリケーションでは SAML を選べる。

### Role と Role Assignment

[Role](https://zitadel.com/docs/guides/manage/console/roles) は、Project 単位で定義するアクセス権である。

[Role Assignment](https://zitadel.com/docs/guides/manage/console/roles#role-assignments) は、Role を User に割り当てることを指す。割り当ては Organization・Project・Role の組で行う。Project Grant があるので、どのテナントの文脈での割り当てかを Organization で示す。また、Role は Project の中で定義されるので、どの Project の Role かを Project で示す。

### Project Grant

[Project Grant](https://zitadel.com/docs/concepts/structure/granted_projects) は、ある Organization の Project（またはその一部の Role）の割り当ての管理を、別の Organization に任せる仕組みである。任された側（Granted Organization）は、自分の Organization の User に、その Project の Role を割り当てられる。

## キーワード

- [[zitadel|ZITADEL]]
- [[multi-tenancy|マルチテナンシー]]
- [[idp|IdP]]
- [[saml|SAML]]
- [[oidc|OIDC]]
- [[oauth-2|OAuth 2.0]]

%%

## 自分の理解

同意できる点、疑問に思った点、試してみたいこと。書くときはこのコメントを外す
%%

## 関連

- [Instance](https://zitadel.com/docs/concepts/structure/instance)
- [Organizations](https://zitadel.com/docs/guides/manage/console/organizations-overview)
- [Users](https://zitadel.com/docs/guides/manage/console/users-overview)
- [Administrators](https://zitadel.com/docs/concepts/structure/administrators)
- [Projects](https://zitadel.com/docs/guides/manage/console/projects-overview)
- [Applications](https://zitadel.com/docs/guides/manage/console/applications-overview)
- [Roles](https://zitadel.com/docs/guides/manage/console/roles)
- [Granted Projects](https://zitadel.com/docs/concepts/structure/granted_projects)

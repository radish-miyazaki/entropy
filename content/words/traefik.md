---
title: Traefik
aliases: []
description: インフラを自動で調べてルーティングの設定を動的に更新する、Go 製の OSS の L7 リバースプロキシ・ロードバランサ
tags: [word, go, proxy]
date: 2026-07-08
---

## TL;DR

OSS の Application Proxy（L7 の[[reverse-proxy|リバースプロキシ]]、ロードバランサ）。インフラを自動で調べて設定を見つけ、ルーティングする。[[go|Go]] 製のシングルバイナリで、公式の Docker イメージもある。

## なぜ必要か

再起動や接続断なしに、構成をリアルタイムで更新できるのが最大の特徴である。サービスを自動で検出して設定するので、コンテナやマイクロサービスの環境で真価を発揮する。

## 仕組み

### コアコンセプト

リクエストがサービスに届くまでの流れを 4 つの概念で説明する。

- **EntryPoints**: ネットワーク上の入口。受信ポートと [[tcp|TCP]] / [[udp|UDP]] を定義する
- **Routers**: 受信したリクエストを、処理できる Services へつなぐ。途中で Middlewares を適用する
- **Services**: 実際のサービスへの到達方法（ロードバランシング）を設定する
- **Providers**: Kubernetes、Docker、[[hashicorp|HashiCorp]] Consul、Key-Value Store などから設定を取得し、動的に更新する

設定は、起動時の「静的設定」と、実行中の「動的なルーティング設定」に分かれる。

プロトコルは [[http|HTTP]]、TCP、UDP に対応する。Let's Encrypt にネイティブで対応し、証明書の取得と更新を外部ツールなしで自動化できる。RateLimit、BasicAuth、Headers、ForwardAuth、StripPrefix などの Middlewares を組み込みで持つ（[[oidc|OIDC]] など一部は Traefik Hub 側の機能）。

### Docker のラベルによる自動ルーティング

Traefik は、ルーティングの設定をアプリケーションの側に任せる。Docker では、コンテナに付けた `traefik.*` ラベルからルーティングのルールを作り、コンテナごとに router と service を自動で生成する。ルールを指定しなければ `defaultRule` が適用される。

## 注意点

単純なスループットは nginx や HAProxy に劣る。第三者のベンチマーク（参考値）では、Traefik が約 18,000 RPS で頭打ちになり、nginx と HAProxy は 50,000 RPS を超える。アイドル時のメモリも、nginx の 5〜10 MB に対して Traefik は 50〜80 MB である。xDS やサーキットブレーカなどの高度なトラフィック制御や[[service-mesh|サービスメッシュ]]には Envoy が向いており、Traefik は Istio などの[[sidecar|サイドカー]]にはなれない。

使い分けの目安は次のとおり。

- 高トラフィックの公開 API: nginx / HAProxy
- 自動 TLS、ダッシュボード、組み込みの Middlewares がほしい: Traefik
- 高度なトラフィック管理、Gateway API: Envoy 系

## 自分の理解

Application Proxy は本来、ファイアウォールの文脈で使う Proxy Server の一種を指す。Traefik の言う「Application Proxy」は、その古典的なセキュリティ用語というより、「L7 でトラフィックを扱うリバースプロキシ」という製品の位置付けを表す呼び方と解釈するのが自然だと思う。

## 関連

- [[reverse-proxy|リバースプロキシ]]
- [[service-mesh|サービスメッシュ]]
- [[sidecar|サイドカー]]

## 出典

- [Traefik](https://traefik.io/)
- [traefik/traefik - GitHub](https://github.com/traefik/traefik)
- [Traefik 公式ドキュメント](https://doc.traefik.io/traefik/)
- [Traefik alternatives（ベンチマーク含む）](https://markaicode.com/alternatives/traefik-alternatives/)
- [Application Layer Proxy](https://networkencyclopedia.com/application-layer-proxy/)
- [Proxy Firewall vs Proxy Server - Palo Alto Networks](https://www.paloaltonetworks.com/cyberpedia/what-is-a-proxy-firewall)

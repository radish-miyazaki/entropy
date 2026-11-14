---
title: Caddy
aliases: []
description: Go で書かれた、デフォルトで HTTPS を使う Web サーバ
tags: [word, go, web-サーバ]
date: 2026-08-06
---

## TL;DR

[[go|Go]] で書かれたオープンソースの Web サーバ。[[tls|TLS]] をデフォルトで使い、証明書の取得と更新を自動で行う。

## なぜ必要か

HTTPS のサイトを立てるには、普通は証明書の取得、配置、更新を自分で管理する必要がある。Caddy は公開ドメインの証明書を Let's Encrypt や ZeroSSL から自動で取得するので、この手間がない。ローカル環境でも、内蔵の CA で証明書を作って HTTPS で配信する。

## 仕組み

Caddy は [[http-1-1|HTTP/1.1]]、[[http2|HTTP/2]]、[[http-3|HTTP/3]] にデフォルトで対応している。外部への依存がない単一のバイナリなので、どの環境でも動く。

設定は Caddyfile か JSON で書く。Caddyfile は手で書きやすい形式で、JSON はより細かく制御できる。動作中の設定は管理用の API で変更でき、公式はこの API を主な設定方法としている。YAML、TOML、NGINX の設定も、アダプタで JSON に変換して使える。

機能はモジュールの組み合わせでできていて、xcaddy でプラグインを足したバイナリをビルドできる。

## 例

`localhost` で固定の文字列を返す Caddyfile は次のとおり。

```caddyfile
localhost {
	respond "Hello, world!"
}
```

Caddyfile のあるディレクトリで `caddy start` を実行すると、`https://localhost` で配信が始まる。設定を変えたら `caddy reload`、止めるときは `caddy stop` を使う。初回はローカル CA のルート証明書をシステムの信頼ストアに追加するので、パスワードを求められる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 出典

- [caddyserver/caddy - GitHub](https://github.com/caddyserver/caddy)
- [Caddyfile quick-start - Caddy Documentation](https://caddyserver.com/docs/quick-starts/caddyfile)

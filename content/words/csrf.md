---
title: CSRF
aliases: [Cross-Site Request Forgery]
description: 信頼されたユーザになりすまし、Web サイトに不正なリクエストを送る攻撃
tags: [word, web, セキュリティ]
date: 2024-11-13
---

## TL;DR

信頼されたユーザになりすまし、Web サイトに不正なコマンドを送る攻撃。

## 仕組み

OWASP によると、CSRF はログイン中のユーザに、望んでいない操作を Web アプリケーション上で実行させる攻撃である。ブラウザは、サイトへのリクエストに [[cookie|Cookie]] などそのサイトの認証情報を自動で付けるので、ユーザがログインしていると、サーバは偽のリクエストと正規のリクエストを区別できない。攻撃者はメールやチャットで悪意のあるリンクを送るなど、ソーシャルエンジニアリングを使うことが多い。

狙われるのは、メールアドレスやパスワードの変更、購入など、状態を変えるリクエストである。攻撃者はレスポンスを見られないので、データを盗むことは目的にならない。

たとえば、[[url|URL]] に悪意のある引数を含めたリンクを、別のページに埋め込む。

```html
<img src="https://www.example.com/index.php?action=delete&id=123" />
```

この `<img>` が `https://www.example.com` の外のページにあっても、`https://www.example.com` で何らかの権限を持つユーザがそのページを開くと、気づかないうちに `https://www.example.com` への操作を実行してしまう。

## 注意点

対策には、次のようなものがある。

- RESTful な [[rest-api|API]] にする
- CSRF トークンを使う

OWASP は、効かない対策も挙げている。ブラウザはすべての Cookie をリクエストに付けるので、秘密の Cookie を使っても防げない。攻撃者は偽の POST フォームを送れるので、POST だけを受け付けるようにしても防げない。Referer ヘッダは偽装されたり欠けたりするので、チェックしても確実ではない。HTTPS にするだけでも防げない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[xss|XSS]]
- [[same-origin-policy|同一生成元ポリシー]]
- [[cookie|Cookie]]

## 出典

- [Zenn の解説記事](https://zenn.dev/kazu1/articles/ba8c7a2a2292fd)
- [Cross Site Request Forgery (CSRF) | OWASP Foundation](https://community.owasp.org/attacks/csrf)

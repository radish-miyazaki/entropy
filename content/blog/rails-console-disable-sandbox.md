---
title: Rails Console で sandbox モードを無効にする
description: config.sandbox_by_default = true のとき、rails console に --no-sandbox（または --skip-sandbox）を付けると sandbox モードを無効にできる
tags: [blog, ruby-on-rails]
date: 2024-11-27
draft: false
---

## TL;DR

- `config.sandbox_by_default = true` を設定していても、`rails console --no-sandbox` で sandbox モードを無効にして起動できる。
- オプションは CLI フレームワークの Thor が生やしているので、`--skip-sandbox` でも無効にできた。

## 背景

[[ruby-on-rails|Rails]] で [`config.sandbox_by_default = true`](https://railsguides.jp/configuring.html#config-sandbox-by-default) を設定していると、`rails console` を実行したときに自動で `--sandbox` オプションが有効になる。これを無効にして起動したかった。

## 検証

Rails ガイドには、次のように書かれている。

> sandbox モードを無効にして Rails コンソールを起動するには、`--no-sandbox` を明示的に指定しなければなりません。

```sh
$ rails console --no-sandbox
```

ヘルプにも記載があった。

```sh
$ rails console -h
Usage:
  bin/rails console

Options:
  -e, [--environment=ENVIRONMENT]
  -s, [--sandbox], [--no-sandbox]
```

実際のコードを確かめようとしたが、`no_sandbox` や `no-sandbox` で検索しても、Rails のソースコードに定義が見つからなかった。Rails は [Thor](https://github.com/rails/thor) という CLI フレームワークを使っており、このオプションは Thor が生やしているようである。Thor の README には次のように書かれている。

> All arguments can be set to nil (except required arguments), by supplying a no- or skip-variant. For example:
> `thor app name --no-attributes`

そうであれば、`--skip-sandbox` でも無効にできるはずなので、試した。

```sh
$ rails console --skip-sandbox
```

## 結果

`--skip-sandbox` でも sandbox モードを無効にできた。

## キーワード

- [[ruby-on-rails|Ruby on Rails]]

## 参考

- https://railsguides.jp/configuring.html#config-sandbox-by-default
- https://arc.net/l/quote/kfciswgl
- https://github.com/rails/thor
- https://arc.net/l/quote/svxnpngd

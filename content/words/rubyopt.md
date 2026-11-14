---
title: RUBYOPT
aliases: []
description: Ruby インタプリタにデフォルトで渡すオプションを指定する環境変数
tags: [word, ruby]
date: 2023-12-25
---

## TL;DR

[[ruby|Ruby]] インタプリタで使える環境変数の 1 つ。Ruby インタプリタにデフォルトで渡すオプションを指定する。

## 仕組み

Ruby インタプリタは起動時に環境変数を参照し、`RUBYOPT` に書かれたオプションを、コマンドラインで渡したオプションと同じように扱う。リファレンスマニュアルでは、シェルごとに次の設定例を挙げている。

```shell
# sh 系
RUBYOPT='-Ke -rkconv'
export RUBYOPT

# csh 系
setenv RUBYOPT '-Ke -rkconv'
```

## 例

[[yjit|YJIT]] を有効にする例。

```shell
$ RUBYOPT="--yjit"
```

## 注意点

指定できないオプションを指定すると、例外が発生する。たとえば `RUBYOPT=-y ruby -e ""` は、`ruby: invalid switch in RUBYOPT: -y (RuntimeError)` というエラーになる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[yjit|YJIT]]
- [[ruby|Ruby]]

## 出典

- [環境変数（Ruby リファレンスマニュアル）](https://docs.ruby-lang.org/ja/latest/doc/spec=2fenvvars.html)

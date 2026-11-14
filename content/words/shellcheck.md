---
title: ShellCheck
aliases: []
description: シェルスクリプトの問題を指摘し、より良い書き方を提案する静的解析ツール
tags: [word, shell]
date: 2024-11-30
---

## TL;DR

bash や sh で書いたシェルスクリプトのための[[static-analysis|静的解析]]ツール。文法の不備、外部コマンドの誤用、ポータビリティの問題などを指摘し、より良い書き方を提案する。[[haskell|Haskell]] で書かれている。

## なぜ必要か

シェルは文法の誤りに対して分かりにくいエラーメッセージを出す。ShellCheck は、初心者がつまずきやすい文法の誤り、スクリプトが奇妙な動きをする意味上のバグ、今は動いていても将来壊れうる細かな落とし穴を見つけることを目指している。

## 仕組み

`shellcheck yourscript` のように、ファイルを渡して実行する。Web 版（shellcheck.net）に貼り付けて試すこともでき、Vim、Emacs、VS Code などのエディタからも使える。終了コードで結果を返すので、CI に組み込んで警告があればビルドを失敗させられる。

指摘には `SC` で始まるエラー番号が付いている。番号ごとに Wiki のページがあり、修正方法が解説されている。

## 例

クォートしていない変数は、典型的な指摘の対象である。

```sh
echo $1  # クォートされていない変数
```

## 注意点

指摘は環境変数、コマンドライン、ファイル内の指定で、個別にも全体にも無視できる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[shellspec|ShellSpec]]

## 出典

- [ShellCheck](https://www.shellcheck.net/)
- [koalaman/shellcheck](https://github.com/koalaman/shellcheck)
- [ShellCheck Wiki](https://www.shellcheck.net/wiki/Home)

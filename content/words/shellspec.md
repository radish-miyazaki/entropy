---
title: ShellSpec
aliases: []
description: BDD を採用した、シェルスクリプトのためのテスティングフレームワーク
tags: [word, shell]
date: 2024-11-30
---

## TL;DR

[[bdd|BDD]] を採用した、シェルスクリプトのためのテスティングフレームワーク。bash、ksh、zsh、dash をはじめ、POSIX 準拠のシェルで動く。

## 仕組み

テストは `Describe`、`It`、`When`、`The ... should` といったブロックで書く。テストの前後に処理を差し込むフック、関数やコマンドのモック、パラメータ化テスト、`-j` オプションによる並列実行を備えている。kcov を使ったコードカバレッジも出力できる。

## 例

```sh
Describe 'calc.sh'
  Include lib/calc.sh

  It 'adds two numbers'
    When call add 2 3
    The output should eq 5
  End
End
```

`lib/calc.sh` を読み込み、`add` 関数に 2 と 3 を渡した出力が 5 になることを確かめている。

## 注意点

コードカバレッジは、`DEBUG` トラップを実装している bash、zsh、ksh でしか使えない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[shellcheck|ShellCheck]]
- [[bdd|BDD]]
- [[parameterized-test|パラメータ化テスト]]

## 出典

- [shellspec/shellspec](https://github.com/shellspec/shellspec)

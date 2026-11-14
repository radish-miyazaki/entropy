---
title: GHCi のプロンプトをカスタマイズする
description: ホームディレクトリの .ghci に :set prompt と :set prompt-cont を書くと GHCi のプロンプトを変えられる。prompt-function を使えば動的にも変えられる
tags: [blog, ghci, haskell]
date: 2025-06-15
draft: false
---

## TL;DR

- ホームディレクトリに `.ghci` を作り、`:set prompt` と `:set prompt-cont` を書くと、GHCi のプロンプトを変えられる。
- `prompt-function` と `prompt-function-cont` を使えば、プロンプトを動的に変えることもできる。

## 背景

[[haskell|Haskell]] の対話環境である GHCi のプロンプトを、好みの表示に変えたかった。

## 検証

### 固定のプロンプトを設定する

[GHC のユーザーガイド](https://downloads.haskell.org/ghc/latest/docs/users_guide/ghci.html#ghci-cmd-set-prompt)によると、1 行入力時のプロンプトは `:set prompt` で、複数行入力時のプロンプトは `:set prompt-cont` で設定できる。ホームディレクトリに `.ghci` を作成し、次のように書いた。

```haskell
-- 1 行時のプロンプト
:set prompt "λ> "

-- 複数行時のプロンプト
:set prompt-cont "λ| "
```

### 動的なプロンプトを設定する

[GHC のユーザーガイド](https://downloads.haskell.org/ghc/latest/docs/users_guide/ghci.html#ghci-cmd-set-prompt-function)によると、`prompt-function` と `prompt-function-cont` に関数を渡せば、プロンプトを動的に変えられる。渡す関数のシグネチャは `[String] -> Int -> IO String` である必要がある。第 1 引数は現在のモジュール名のリスト、第 2 引数は履歴番号である。

次の例では、履歴番号をプロンプトに表示する。

```haskell
:{
myPrompt modules hist = return $ "(" ++ show hist ++ ") λ> "
:}
:set prompt-function myPrompt
```

## 結果

`.ghci` に書いた設定で、GHCi のプロンプトが `λ> `、複数行入力時は `λ| ` に変わった。

## キーワード

- GHCi
- [[haskell|Haskell]]

## 参考

- [GHCi - :set prompt](https://downloads.haskell.org/ghc/latest/docs/users_guide/ghci.html#ghci-cmd-set-prompt)
- [GHCi - :set prompt-cont](https://downloads.haskell.org/ghc/latest/docs/users_guide/ghci.html#ghci-cmd-set-prompt-cont)
- [GHCi - :set prompt-function](https://downloads.haskell.org/ghc/latest/docs/users_guide/ghci.html#ghci-cmd-set-prompt-function)
- [GHCi - :set prompt-cont-function](https://downloads.haskell.org/ghc/latest/docs/users_guide/ghci.html#ghci-cmd-set-prompt-cont-function)

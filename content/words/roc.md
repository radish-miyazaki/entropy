---
title: Roc
aliases: []
description: 速く、親しみやすい関数型プログラミング言語
tags: [word, プログラミング言語, fp]
date: 2025-06-10
---

## TL;DR

「速く、親しみやすい、関数型」をうたう[[functional-programming|関数型]]のプログラミング言語。機械語か [[webassembly|WebAssembly]] にコンパイルされる。

## 仕組み

ビルドも実行も速くなるように設計されている。構文、意味論、付属のツールは、どれも使いやすさを重視している。言語は少数の単純な要素で構成され、関数型だけの単一パラダイムである。コンパイラ全体がブラウザ上で動くので、サーバなしでプレイグラウンドを使える。

## 例

未完了の ToDo を絞り込んで表示するコードは次のようになる。

```roc
print_remaining! = |todos|
    todos
        .keep_if(|todo| todo.status != Done)
        .for_each!(|todo| echo!("- ${todo.name}\n"))
```

Apple Silicon の Mac には、当時は次の手順で入れた（バージョンは alpha3）。

1. リリースからアーカイブを取ってきて展開する

   ```sh
   curl -OL https://github.com/roc-lang/roc/releases/download/alpha3-rolling/roc-macos_apple_silicon-alpha3-rolling.tar.gz
   tar xf roc-macos_apple_silicon-alpha3-rolling.tar.gz
   ```

2. Homebrew で zstd を入れる（`brew install zstd`）
3. `.zshrc` で展開したディレクトリを `PATH` に足す

   ```sh
   export PATH=$PATH:$HOME/roc_nightly-macos_apple_silicon-<Roc のバージョン>
   ```

4. `roc version` で動作を確かめる

エディタの拡張機能は[公式サイト](https://www.roc-lang.org/install#editor-extensions)にまとまっている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 出典

- [Roc](https://www.roc-lang.org/)
- [roc-lang/roc](https://github.com/roc-lang/roc)
- [Install Roc (macOS Apple Silicon)](https://www.roc-lang.org/install/macos_apple_silicon)

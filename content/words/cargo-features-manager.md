---
title: cargo-features-manager
aliases: []
description: 依存関係のフィーチャを TUI で管理できる Cargo の拡張ツール
tags: [word, rust]
date: 2024-10-14
---

## TL;DR

[[dependency|依存関係]]のフィーチャを管理するための、[[tui|TUI]] 風の [[cargo|Cargo]] 拡張ツール。

## 仕組み

次のコマンドでインストールする。

```sh
cargo install cargo-features-manager
```

プロジェクトのルートで `cargo features` を実行すると、依存関係ごとに使えるフィーチャの一覧が表示され、キー操作で有効・無効を切り替えられる。変更はそのまま [[cargo-toml|Cargo.toml]] に反映される。`-d <依存関係の名前>` を付けると、その依存関係のフィーチャの画面を直接開く。

`cargo features prune` を実行すると、コンパイルに不要なフィーチャをすべて削除する。

## 注意点

README によると、コンパイルが通っても実際には必要なフィーチャがあり、`Known-Features.toml` に載ったものは prune でも残される。残したいフィーチャは `Cargo.toml` の `cargo-features-manager.keep`（ワークスペース全体なら `workspace.cargo-features-manager.keep`）に書いておける。`--dry-run` を付けると、`Cargo.toml` を書き換えずに結果だけを確かめられる。`--skip-tests` を付けるとテストのコンパイルを省いて速くなるが、テストでだけ使うフィーチャが消えることがある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[feature-unification|フィーチャ統合]]
- [[cargo-machete]]

## 出典

- [tobinio/cargo-features-manager - GitHub](https://github.com/tobinio/cargo-features-manager)
- [cargo-features-manager: prune](https://github.com/tobinio/cargo-features-manager?tab=readme-ov-file#prune)

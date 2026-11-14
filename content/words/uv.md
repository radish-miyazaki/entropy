---
title: uv
aliases: []
description: Astral が Rust で開発している、高速な Python のパッケージ・プロジェクトマネージャ
tags: [word, python, ツール]
date: 2026-11-14
---

## TL;DR

Astral が [[rust|Rust]] で開発している、[[python|Python]] のパッケージ・プロジェクトマネージャ。pip、pip-tools、pipx、poetry、pyenv、twine、virtualenv などを 1 つで置き換えることを目指している。

## なぜ必要か

Python では、パッケージのインストール、仮想環境、Python 本体のバージョン、CLI ツールを別々のツールで管理することが多い。uv はこれらをまとめて扱える。公式ドキュメントでは、pip より 10〜100 倍速いとしている。

## 仕組み

公式ドキュメントによると、uv は次の機能を持つ。

- プロジェクト: ロックファイルとワークスペースで、依存関係と環境を管理する
- スクリプト: 依存関係をスクリプトの中に書き、隔離された環境で 1 ファイルのスクリプトを実行する
- Python のバージョン: 複数のバージョンを入れ、切り替える
- ツール: `uvx` で CLI ツールを一時的な環境で実行し、`uv tool install` でインストールする
- pip 互換のインタフェース: pip、pip-tools、virtualenv のよく使うコマンドをそのまま置き換える

## 例

```sh
uv init example
uv add ruff
uv run ruff check
uvx pycowsay 'hello world!'
uv python install 3.12
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[python|Python]]

## 出典

- [uv](https://docs.astral.sh/uv/)

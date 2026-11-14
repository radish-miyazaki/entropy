---
title: cargo-nextest
aliases: []
description: cargo test を置き換える、Rust の次世代テストランナー
tags: [word, rust, テスト]
date: 2024-10-06
---

## TL;DR

[[rust|Rust]] の標準のテストランナーを置き換える、次世代のテストランナー。公式サイトでは `cargo test` より最大 3 倍速いとしている。

## 仕組み

テストごとに分離して実行する方式を取る。リトライや直列実行のグループ分けをテストごとに設定でき、遅いテストの検出、フィルタ式によるテストの絞り込み、CI 向けのテストの分割、JUnit XML 形式での出力などにも対応している。

インストールしたあと、次のコマンドでテストを実行する。

```sh
cargo nextest run
```

### テストごとにプロセスを分ける理由

公式の設計文書によると、nextest はデフォルトで、テストを 1 つずつ別のプロセスで実行する。グローバルな状態（環境変数や GPU のコンテキストなど）を占有するテストでも、他のテストとの調整なしにそのまま動く。あるテストがクラッシュしたりメモリを壊したりしても、影響はそのテストにとどまる。タイムアウトしたテストは、そのプロセスにだけ終了のシグナルを送れば止められる。スレッドを安全に止めるのは難しいので、プロセスで分けるほうが扱いやすい。

## 注意点

doctest には対応していない。doctest は `cargo test --doc` で別に実行する。

テストどうしがプロセス内のメモリを共有できないので、メモリ上のセマフォやキャッシュ、プロセス内で立てたサーバを共有するテストは、作りを変える必要がある。また、Windows ではプロセスの起動が遅く、macOS でもマルウェア対策ソフトが邪魔をして遅くなることがある。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[cargo|Cargo]]
- [[rstest]]

## 出典

- [cargo-nextest](https://nexte.st/)
- [nextest-rs/nextest - GitHub](https://github.com/nextest-rs/nextest)
- [Why process-per-test? - cargo-nextest](https://nexte.st/docs/design/why-process-per-test/)

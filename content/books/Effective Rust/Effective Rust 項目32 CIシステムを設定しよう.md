---
title: Effective Rust 項目32 CIシステムを設定しよう
description: すべてのテストを CI で実行し、CI は素早く決定的で偽陽性ゼロにし、人間の時間を無駄にしないよう設計するべきだと説く項目
tags: [book-chapter, rust, ci]
date: 2025-01-22
book: "[[Effective Rust]]"
chapter: 32
---

## TL;DR

- すべてのテストを [[continuous-integration|CI]] で実行しよう。CI は素早く決定的に動き、[[false-negatives-and-false-positives|偽陽性]]がゼロでなければならない。
- チェックは実行頻度で分け、偽陽性であっても CI の失敗を許さない。プロセスの問題を直す前に、それを検出する CI のステップを足す。
- `rust-toolchain.toml` で CI の Rust のバージョンを固定する。秘密情報のチェックは CI ではなくコミット前に行う。

## 内容

### CI の基本のステップ

CI のステップは、大きくはビルドとテストの 2 つである。ビルドでは、クレートにフィーチャがあれば、有効な組み合わせをすべてビルドする（[[Effective Rust 項目26 忍び寄るフィーチャに注意しよう|項目26]]）。[[no-std|no_std]] 互換なら、`thumbv6m-none-eabi` のような明らかに no_std なビルドターゲットに[[cross-compilation|クロスコンパイル]]して確かめる（[[Effective Rust 項目33 ライブラリコードをno_std互換にすることを検討しよう|項目33]]）。[[msrv|MSRV]] を決めているなら、それも CI で確かめる（[[Effective Rust 項目22 可視範囲を最小化しよう|項目22]]）。

テストでは、すべてのテストを CI で実行する（[[Effective Rust 項目30 ユニットテスト以上のものを書こう|項目30]]）。`cargo test` で動く[[unit-test|単体テスト]]、結合テスト、ドキュメンテーションテストに加え、`examples` のサンプルプログラムのように明示的に実行が必要なものも含める。

どちらのステップも、素早く決定的に動き、偽陽性がゼロでなければならない。決定的にするには、[`rust-toolchain.toml`](https://rust-lang.github.io/rustup/overrides.html#the-toolchain-file) の `[toolchain]` テーブルの `channel` に、`1.70` のようなバージョンか、`stable`、`beta`、`nightly` のチャンネルを書いて固定する。`nightly` は `nightly-2023-09-19` のように日付も付けられる。

### 品質を上げるステップ

次のようなステップも足せる。

- [[clippy|Clippy]] による静的解析（[[Effective Rust 項目29 Clippyに耳を傾けよう|項目29]]）。`-Dwarnings` を付けて、警告があればビルドを失敗させる。
- `cargo doc` によるドキュメント生成（[[Effective Rust 項目27 パブリックインターフェイスのドキュメントを書こう|項目27]]）。生成できることと、リンク切れがないことを確かめる。
- [[cargo-deny]] や [[cargo-udeps]] による問題のあるクレートの検出（[[Effective Rust 項目25 依存グラフを管理しよう|項目25]]）。
- [[rustfmt]] による整形のチェック（[[Effective Rust 項目31 ツールのエコシステムを活用しよう|項目31]]）。`--check` を付けると問題点が分かりやすい。

`cargo tarpaulin` による[[code-coverage|コードカバレッジ]]や、`cargo bench` による[[benchmark-test|ベンチマーク]]も測れる。どちらも前回の結果と比べないと、テスト不足や性能の悪化を検出できない。そのため、Codecov や Grafana などの外部の追跡システムと連携する。ベンチマークは外部要因に左右されるので、信頼できる結果には専用の環境が要る。

プロジェクトによっては、次のステップも要る。ライブラリなら、利用者は `Cargo.lock` を使わないので、`Cargo.lock` なしでビルドする。[[protocol-buffers|Protocol Buffers]] などから自動生成するコードがあれば、CI で再生成して既存のものと一致するかを確かめる。プラットフォーム固有のコードがあれば、そのプラットフォームでビルドできるか、できれば動くかを確かめる。アクセストークンや暗号鍵などの秘密情報を扱うなら、誤ってチェックインしていないかを確かめる。ただし、これは CI ではなく [[git-hooks|Git フック]]でコミット前に行う。

CI のチェックはシェルスクリプトでもよい。panic しうる呼び出しに印を付ける、`TODO` コメントに担当者を書く、といった独自の慣習を守らせるのに向いている。公開されている Rust のプロジェクト、たとえば [Cargo の CI](https://github.com/rust-lang/cargo/blob/master/.github/workflows/main.yml) も参考になる。

### CI の原則

一番の原則は「人間の時間を無駄にするな」である。CI がエンジニアの時間を無駄にすると、エンジニアは CI を回避する方法を探し始める。よくある例は [[flaky-test|Flaky test]] と、レビューを頼んだ後も走り続ける遅い CI である。Flaky test は、原因を調べて直す時間を先行投資として取る。遅い CI には、CI のチェックを手元や IDE で手動実行できるようにし、チェックを頻度で分けて対処する。たとえば次のように分ける。

1. 開発環境に組み込むチェック（`rustfmt`）
2. PR の作成時に走り、手動でも簡単に実行できるチェック（`cargo clippy`、`cargo build`）
3. メインブランチが変わるたびに走るチェック（サポートする全環境での `cargo test`）
4. 毎日や毎週など決まった間隔で走り、後からリグレッションを見つけるチェック（統合テスト、ベンチマーク）
5. 常に走り続けるチェック（[[fuzz-testing|ファズテスト]]）

また、偽陽性であっても CI の失敗を認めてはいけない。認めると、新しいリグレッションを見つけにくくなる。プロセスの問題を直す前に、それを検出する CI のステップを足す。バグを直す前に、バグを再現するテストを書くのと同じである。

### 公開の CI システム

OSS では、GitHub Actions などの CI を無料で使えることが多い。CI の設定は、データベースや [[ffi|FFI]] のツールチェーンなど、前提となる環境の準備手順を示すガイドにもなる。スクリプトにまとめれば、利用者も CI も簡単に準備できる。

一方で、CI はマイニングへの悪用、[アクセストークンの窃取](https://web.archive.org/web/20220315064116/https://about.codecov.io/security-update/)、[[supply-chain-attack|サプライチェーン攻撃]]の標的になりうる。既知のコラボレータだけ CI を自動実行し、新しいコントリビュータの分は手動で実行する。外部スクリプトはハッシュでバージョンを固定する。リポジトリへの読み取り以上の権限が要るステップは、厳しく監視する。

## キーワード

- [[continuous-integration|CI]]
- [[false-negatives-and-false-positives|偽陽性]]
- [[flaky-test|Flaky test]]
- [[clippy|Clippy]]
- [[rustfmt]]
- [[cargo-deny]]
- [[cargo-udeps]]
- [[code-coverage|コードカバレッジ]]
- [[benchmark-test|ベンチマークテスト]]
- [[fuzz-testing|ファズテスト]]
- [[git-hooks|Git フック]]
- GitHub Actions
- [[supply-chain-attack|サプライチェーン攻撃]]
- [[msrv|MSRV]]

## 自分の理解

個人的に、API 開発の CI で必ず実行したいのは `cargo test`、`cargo clippy`、`cargo tarpaulin`、`cargo-deny` か `cargo-udeps` である。Rust は特に依存関係が肥大化しがちなので、依存のチェックは外せない。`cargo doc` と `cargo bench` は任意か、一部だけで実行する。

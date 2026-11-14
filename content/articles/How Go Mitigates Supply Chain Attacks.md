---
title: How Go Mitigates Supply Chain Attacks
description: Go のツールチェーンと設計が、サプライチェーン攻撃をどう緩和しているかを解説した Go 公式ブログの記事
tags: [article, go, セキュリティ]
date: 2026-04-07
article-authors: [Filippo Valsorda]
site: The Go Blog
published: 2022-03-31
url: https://go.dev/blog/supply-chain
---

## TL;DR

- Go では、ビルドに使う依存のバージョンと中身が固定され、明示的に更新しない限り変わらない。
- パッケージリポジトリを持たず、ビルド時にコードを実行せず、依存を小さく保つ文化があることも、[[supply-chain-attack|サプライチェーン攻撃]]への備えになっている。

## 内容

### すべてのビルドは「ロック」されている

[[go-mod|go.mod]] が、ビルドに使うすべての依存のバージョンを決める。ほかのエコシステムのように、バージョンの制約とロックファイルを別々に持つ構成ではない。Go 1.16 以降は、`go.mod` が不完全だと `go build` や `go test` が失敗する。`go.mod` を変更するのは `go get` と `go mod tidy` だけで、これらは CI で自動実行することを想定していない。そのため、依存の変更は必ず意図して行われる。

依存を追加するときも、[[minimal-version-selection|MVS]] によって最新版ではなく、依存元の `go.mod` で指定されたバージョンが使われる。`go install example.com/cmd/tool@latest` でも同じである。つまり、悪意のあるバージョンが公開されても、明示的に更新しない限り影響を受けない。

### バージョンの中身は変わらない

[[go-sum|go.sum]] が、各依存の暗号学的ハッシュを持つ。`go.sum` が不完全だとエラーになり、変更するのは `go get` と `go mod tidy` だけなので、コードレビューの機会が生まれる。

さらに [[checksum-database|Checksum Database]]（sumdb）が、追記しかできず暗号学的に検証できるグローバルなリストとしてハッシュを公開している。これにより、特定のプロジェクトだけにバックドア入りのソースを配布することはできない。モジュールの作者が鍵を管理する必要もない。

### VCS が信頼できる唯一の情報源である

ほかのエコシステムでは、[[vcs|VCS]] からパッケージリポジトリにアップロードするので、2 つのアカウントが攻撃対象になる。Go にはパッケージリポジトリのアカウントがなく、import path に VCS から直接取得するための情報が含まれている。[[go-module-mirror|Go Module Mirror]] はあくまでプロキシであり、作者が登録やアップロードをするものではない。中身が一意であることは sumdb が保証する。

VCS ツールそのものへの攻撃にも備えている。プロキシ側ではサンドボックス内で動かし、クライアント側はデフォルトで Git と Mercurial しかサポートしない。

### ビルドしてもコードは実行されない

コードを取得しても、ビルドしても、そのコードが実行されないことは、Go ツールチェーンの明示的なセキュリティ設計目標である。ほかのエコシステムにある post-install フックのような仕組みはない。こうしたフックは、過去に依存の侵害から開発者のマシンの侵害へと広がるワームの経路になってきた。

ただし、ビルドの内部にはセキュリティ境界がない。`init` 関数はどのパッケージでも定義できる。とはいえ、ビルドに含まれないモジュールはセキュリティ上の影響を持たない。たとえば macOS 向けのバイナリをビルドするとき、Windows 専用の依存は影響しない。

### 少しのコピーは少しの依存に勝る

[[go-proverbs|Go Proverbs]] の「A little copying is better than a little dependency」のとおり、Go には巨大な依存ツリーを避ける文化がある。依存がゼロであることは、高品質なモジュールの誇りとされる。豊富な[[standard-library|標準ライブラリ]]と `golang.org/x/...` のモジュール群（HTTP、TLS、JSON エンコーディングなど）がそれを支えている。どんなに優れたツールでもコードの再利用のリスクをゼロにはできず、最も強い緩和策は小さな依存ツリーそのものである。

## キーワード

- [[supply-chain-attack|サプライチェーン攻撃]]
- [[go-mod|go.mod]]
- [[go-sum|go.sum]]
- [[minimal-version-selection|MVS]]
- [[checksum-database|Checksum Database]]
- [[go-module-mirror|Go Module Mirror]]
- [[vcs|VCS]]
- [[go-proverbs|Go Proverbs]]

%%

## 自分の理解

同意できる点、疑問に思った点、試してみたいこと。書くときはこのコメントを外す
%%

## 関連

- [[サプライチェーン攻撃に学ぶmoduleの仕組みとセキュリティ対策]]

---
title: サプライチェーン攻撃に学ぶmoduleの仕組みとセキュリティ対策
description: Go Module Proxy のキャッシュを悪用したタイポスクワッティングの事例から、Go のモジュールの仕組みが防げることと防げないこと、その対策を紹介する発表
tags: [talk, go, セキュリティ]
date: 2025-09-27
speakers: [kuro_kurorrr]
company:
event: "[[Go Conference 2025]]"
held: 2025-09-27
slide: https://speakerdeck.com/kuro_kurorrr/understanding-module-through-the-lens-of-supply-chain-attacks
video:
---

## TL;DR

- 2025 年 2 月、Module Proxy のキャッシュが更新されない性質を悪用した[[typosquatting|タイポスクワッティング]]が見つかった。
- MVS、go.sum、Module Proxy はこの攻撃を防げないので、依存の名前を手で書かないといった対策が必要である。

## 内容

### 実際に起きた攻撃

2025 年 2 月、3 年以上潜んでいた悪意あるパッケージが見つかった。本物の `github.com/boltdb/bolt` に似せた `github.com/boltdb-go/bolt` という名前で公開された、タイポスクワッティングである。

攻撃は次の流れで行われた。まず、攻撃者が悪意のあるコードを [[github|GitHub]] に公開する。誰かが `go get` すると、Module Proxy（[[go-module-mirror|Go Module Mirror]]）が悪意のあるバージョンをキャッシュする。キャッシュは一度作られると更新されない（配布の不変性）。その後、攻撃者は GitHub のタグをクリーンなコードに書き換える。こうして、GitHub 上のコードはきれいに見えるのに、Module Proxy からは難読化されたバックドア入りのコードが配布され続ける。

### モジュールの仕組みでは防げない

[[minimal-version-selection|MVS]] は予期しないバージョンが入るのを防ぐ。[[go-sum|go.sum]] はモジュールの改ざんを検出し、整合性を検証する。go.sum の検証には [[checksum-database|Checksum Database]]（[sum.golang.org](https://sum.golang.org/)）が使われ、Merkle tree が採用されている。Module Proxy は、配布されたパッケージが変わらないことを保証する。しかし、どれもタイポスクワッティングには無力である。

### 対策

依存パッケージの名前は手で書かず、補完に任せる。[[gopls|gopls]] の matcher は `CaseSensitive` にしておく。Lint では、gci で import を整理して見やすくする。

`go mod verify` や `go mod tidy` は悪意のあるモジュールを検出できないので、今回のケースには効かない。govulncheck や nancy は既知の脆弱性をチェックするツールなので、これも検出できない。

## キーワード

- [[supply-chain-attack|サプライチェーン攻撃]]
- [[typosquatting|タイポスクワッティング]]
- [[go-module-mirror|Go Module Mirror]]
- [[minimal-version-selection|MVS]]
- [[go-sum|go.sum]]
- [[checksum-database|Checksum Database]]
- Merkle tree
- [[gopls|gopls]]
- govulncheck

%%

## 自分の理解

自社に持ち帰れそうな点、疑問に思った点。書くときはこのコメントを外す
%%

## 関連

- [セッションのページ](https://gocon.jp/2025/talks/939638/)
- [[How Go Mitigates Supply Chain Attacks]]
- [攻撃の詳細（Socket の記事）](https://socket.dev/blog/malicious-package-exploits-go-module-proxy-caching-for-persistence)

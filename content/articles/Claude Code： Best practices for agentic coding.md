---
title: "Claude Code: Best practices for agentic coding"
description: Anthropic 公式の Claude Code のベストプラクティス集。環境の整え方、よく使うワークフロー、ヘッドレスモード、複数セッションの並行作業を紹介する
tags: [article, claude]
date: 2025-06-17
article-authors: []
site: Anthropic
published:
url: https://www.anthropic.com/engineering/claude-code-best-practices
---

## TL;DR

- Anthropic 公式の [[claude-code|Claude Code]] のベストプラクティス集。
- `CLAUDE.md` やツールの許可で環境を整え、「探索 → 計画 → 実装 → コミット」と段階を踏ませる。
- ヘッドレスモードや [[git-worktree|git worktree]] で、自動化や複数セッションの並行作業もできる。

## 内容

### 1. 環境を整える

Claude Code はコンテキストを集めるのに時間とトークンを使うが、環境を整えればそれを減らせる。

まず `CLAUDE.md` を作る。Claude Code が自動で読み込むファイルで、`/init` で生成できる。よく使う bash コマンド、主要なファイル、コードスタイル、テストの実行手順、ブランチ名などのリポジトリのルール、開発環境の構築方法、プロジェクト固有の注意点を書く。置き場所は、リポジトリの直下、実行ディレクトリの親や子、全セッション共通ならホームディレクトリである。`CLAUDE.md` もプロンプトと同じく定期的に改善する。`#` キーで指示を与えると、`CLAUDE.md` に自動で書き込まれる。

Claude Code は、ファイルの書き込み、bash コマンド、[[model-context-protocol|MCP]] の利用のたびに許可を求める。安全と分かっている操作は、プロンプトで Always allow を選ぶ、`/allowed-tools` を使う、`.claude/settings.json` を編集する、起動時に `--allowedTools` を付ける、のいずれかで許可リストに追加できる。GitHub CLI（`gh`）を入れておくと、Issue や PR の作成もできる。

### 2. ツールを増やす

一般的でないツールは、ツール名と使用例を伝えるか、`--help` を読ませる。よく使うものは `CLAUDE.md` に書く。MCP サーバは、プロジェクトの設定、グローバルな設定、リポジトリにコミットした `.mcp.json` のいずれかで登録できる。`.claude/commands` に [[markdown|Markdown]] のテンプレートを置くと、`/` から呼べるカスタムスラッシュコマンドになり、`$ARGUMENTS` で引数を受け取れる。

### 3. よく使うワークフロー

基本は「探索 → 計画 → 実装 → コミット」で、特に最初の 2 段階が重要である。関連するファイルや URL を読ませるときは、まだコードを書かないよう明示する。プロンプトに think を入れると拡張思考モードになり、think、think hard、think harder、ultrathink の順に思考予算が増える。

ほかに、テストを先に書かせてからコードを書かせる [[test-driven-development|TDD]] や、スクリーンショットとデザインのモックを比べて 2〜3 回繰り返し実装させる方法がある。`claude --dangerously-skip-permissions` で許可を求めずに動かす Safe YOLO モードは、Lint の修正などに向くが、リスクが高いのでネットワークを遮断したコンテナで動かす。

### 4. ワークフローを最適化する

指示は具体的にし、画像や URL、対象のファイルを渡す。軌道修正は早く頻繁に行う。Esc で中断して指示を足し、Esc を 2 回押すと履歴を遡ってプロンプトを直せる。`/clear` でコンテキストを整理し、大きなタスクではチェックリストを書かせる。

### 5. ヘッドレスモードで自動化する

`-p` を付けるとヘッドレスモードになり、CI のような非対話の環境で使える。新しい Issue にラベルを付けたり、タイプミスや古いコメント、誤解を招く命名など、従来の Linter では見つけられない問題を指摘させたりできる。

### 6. 複数の Claude を使う

片方のセッションに実装させ、もう片方にレビューさせる方法がある。[[git-worktree|git worktree]] で複数のディレクトリにチェックアウトし、それぞれで別のタスクを任せてもよい。

```sh
git worktree add ../project-feature-a feature-a
cd ../project-feature-a && claude
```

ヘッドレスモードを使い、ループの中で `claude -p` を呼ぶ [[fan-out-pattern|Fan-Out pattern]] や、既存の処理にパイプでつなぐ [[pipeline-pattern|Pipeline pattern]] もある。

## キーワード

- [[claude-code|Claude Code]]
- [[model-context-protocol|MCP]]
- [[markdown|Markdown]]
- [[test-driven-development|TDD]]
- [[git-worktree|git worktree]]
- [[fan-out-pattern|Fan-Out pattern]]
- [[pipeline-pattern|Pipeline pattern]]

## 自分の理解

think、think hard といった段階に当たる日本語の言い方を知りたい。

最近は git worktree で複数の Claude Code を並行させている人が多いので、自分もやってみる。

## 関連

- [Zenn のスクラップ](https://zenn.dev/heavenosk/scraps/a1eeb84535832c)

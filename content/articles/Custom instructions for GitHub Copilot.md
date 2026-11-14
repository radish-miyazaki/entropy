---
title: Custom instructions for GitHub Copilot
description: リポジトリに置いた Markdown ファイルで、GitHub Copilot にリポジトリ固有の指示を与える方法を説明した GitHub の公式ドキュメント
tags: [article, github, github-copilot, visual-studio-code]
date: 2025-02-06
article-authors: []
site: GitHub Docs
published:
url: https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot?tool=vscode
---

## TL;DR

- `.github/copilot-instructions.md` などの Markdown ファイルに自然言語で書いた指示が、Copilot へのリクエストに自動で加わる。
- リポジトリ全体の指示、パスごとの指示、エージェント向けの `AGENTS.md` の 3 種類がある。

## 内容

現在この URL は GitHub.com での設定を説明する「Adding repository custom instructions for GitHub Copilot」に移っている。IDE での設定は別の記事に分かれている。

### カスタム指示とは

> Repository custom instructions let you provide Copilot with repository-specific guidance and preferences on GitHub.

カスタム指示があると、Copilot はプロジェクトの内容や、変更のビルド・テスト・検証のしかたを理解できる。

### 3 種類の指示

1 つ目はリポジトリ全体の指示で、`.github/copilot-instructions.md` に書き、リポジトリ内のすべてのリクエストに適用される。2 つ目はパスごとの指示で、`.github/instructions/` の下に `NAME.instructions.md` を置き、frontmatter の `applyTo` に [[glob|glob]] パターンを書いて対象のファイルを決める。全体の指示とパスごとの指示が両方当てはまるときは、両方が使われる。3 つ目はエージェント向けの指示で、`AGENTS.md` をリポジトリのどこに置いてもよく、ディレクトリツリーで最も近いものが優先される。代わりにルートに `CLAUDE.md` や `GEMINI.md` を 1 つ置く方法もある。

```markdown
---
applyTo: "**/*.ts,**/*.tsx"
---
```

frontmatter に `excludeAgent: "code-review"` または `"cloud-agent"` を書くと、その機能には指示を読ませない。

### 使われる機能と優先順位

ファイルを保存すると、指示は Copilot へのリクエストに自動で加わる。Copilot cloud agent は 3 種類すべてを使い、Copilot code review はリポジトリ全体とパスごとの指示を、プルリクエストの head ブランチから読む。GitHub.com では、パスごとの指示に対応しているのは cloud agent と code review だけである。個人、リポジトリ、組織の指示がすべて当てはまるときは、個人、リポジトリ、組織の順に優先されるので、ドキュメントは矛盾する指示を避けるよう勧めている。

## キーワード

- GitHub Copilot
- [[github|GitHub]]
- [[visual-studio-code|Visual Studio Code]]
- [[markdown|Markdown]]
- [[glob|glob]]

%%

## 自分の理解

同意できる点、疑問に思った点、試してみたいこと。書くときはこのコメントを外す
%%

## 関連

- [GitHub Copilot のカスタム指示（Qiita）](https://qiita.com/takeba/items/469f2cc3dbcf0ff15bba)

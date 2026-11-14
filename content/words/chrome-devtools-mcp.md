---
title: Chrome DevTools MCP
aliases: [Chrome Devtools MCP]
description: コーディングエージェントが Chrome を操作・検査できるようにする、Chrome DevTools の MCP サーバー
tags: [word, devtools, mcp]
date: 2025-10-08
---

## TL;DR

コーディングエージェントが、実際に動いている Chrome を操作・検査できるようにする [[model-context-protocol|MCP]] サーバー。Chrome DevTools チームが公開しており、CLI としても使える。

## なぜ必要か

コーディングエージェントは、自分が生成したコードがブラウザでどう動くかを確認できない。公式ブログはこれを「目隠しをしたままプログラミングしている」と表現している。Chrome DevTools MCP を使うと、エージェントが DevTools のデバッグ機能やパフォーマンス分析を使って、Chrome 上で直接 Web ページをデバッグできる。

## 仕組み

主な機能は次の 3 つである。

- パフォーマンス分析: DevTools でトレースを記録し、改善につながる指摘を取り出す
- ブラウザのデバッグ: ネットワークリクエストの分析、スクリーンショットの取得、コンソールメッセージの確認ができる
- 自動操作: Puppeteer で Chrome を操作し、操作の結果を自動で待つ

動かすには Node.js の LTS 版、安定版以降の Chrome、npm が必要である。

## 例

Claude Code などでは、`.mcp.json` に次のように書いて登録する。

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest"]
    }
  }
}
```

公式ブログでは、変更がブラウザで意図どおり動くかの確認、ネットワークやコンソールのエラー（[[cors|CORS]] の問題など）の診断、フォーム入力やクリックによるバグの再現、DOM と CSS の調査、LCP などのパフォーマンス監査を使いどころに挙げている。

## 注意点

MCP クライアントに渡るので、共有したくない機密情報や個人情報をブラウザで扱わないよう README で注意されている。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[model-context-protocol|Model Context Protocol]]
- [[svelte-mcp|Svelte MCP]]

## 出典

- [Chrome DevTools MCP（Chrome for Developers ブログ）](https://developer.chrome.com/blog/chrome-devtools-mcp?hl=ja)
- [ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp/)

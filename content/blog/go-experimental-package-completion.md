---
title: Go の Experimental パッケージの補完を有効にする
description: encoding/json/v2 を試すため、VS Code と Zed で gopls に GOEXPERIMENT=jsonv2 を渡し、実験的なパッケージの補完を有効にした
tags: [blog, go]
date: 2025-09-20
draft: false
---

## TL;DR

- [[go|Go]] の実験的なパッケージをエディタで補完させるには、[[gopls|gopls]] に環境変数 `GOEXPERIMENT` を渡す。
- [[visual-studio-code|Visual Studio Code]] では `go.toolsEnvVars`、[[zed|Zed]] では `lsp.gopls.initialization_options.env` に設定する。

## 背景

[encoding/json/v2](https://pkg.go.dev/encoding/json/v2) を試したかった。このパッケージは `GOEXPERIMENT=jsonv2` を指定したときだけ使えるので、エディタでも補完が効くようにしたかった。

## 検証

### Visual Studio Code

`.vscode/settings.json` に次のように書いた。

```json
{
  "go.toolsEnvVars": {
    "GOEXPERIMENT": "jsonv2"
  }
}
```

### Zed

`.zed/settings.json` に次のように書いた。

```json
{
  "lsp": {
    "gopls": {
      "initialization_options": {
        "env": {
          "GOEXPERIMENT": "jsonv2"
        }
      }
    }
  }
}
```

## キーワード

- [[go|Go]]
- [[gopls|gopls]]
- [[visual-studio-code|Visual Studio Code]]
- [[zed|Zed]]

## 参考

- [encoding/json/v2 - pkg.go.dev](https://pkg.go.dev/encoding/json/v2)

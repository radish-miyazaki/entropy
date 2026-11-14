---
title: Omarchy を触る上で知っておきたい最低限の Lua の知識
description: Omarchy の Lua の設定ファイルを読むために必要な、値、table、関数、require、条件分岐などの Lua の文法をまとめた
tags: [blog, lua, omarchy]
date: 2026-10-05
draft: false
---

## TL;DR

- Omarchy の設定ファイルを読み書きするのに必要な、最低限の Lua の文法をまとめた。
- `hl` は Hyprland の API の table、`o` は Omarchy が用意しているヘルパーの table である。

## 検証

### 値と変数

基本的な値には、文字列、数値、真偽値、値がないことを表す `nil` がある。

```lua
"chromium"      -- string
10              -- number
1.5             -- number
true            -- boolean
false           -- boolean
nil             -- 値がない
```

ローカル変数は `local` で宣言する。

```lua
local terminal = "kitty"
```

### コメント

単一行のコメントは `--`、複数行のコメントは `--[[ ~ ]]` で書く。

### table

table は、[[javascript|JavaScript]] の `Object` や `Array` に当たるデータ構造である。`Object` のようにも `Array` のようにも使える。

```lua
{ launch = "chromium" }
{ "foo", "bar", "baz" }
```

ネストもできる。

```lua
hl.config({
    general = {
        gaps_in = 5,
        gaps_out = 20,
        border_size = 2,
    },

    decoration = {
        rounding = 10,

        shadow = {
            enabled = true,
            range = 4,
        },
    },
})
```

```lua
points = { { 0.23, 1 }, { 0.32, 1 } }
```

### 関数呼び出し

`.` で table の中にアクセスする。次の例では、`hl` という table に入っている `env` 関数を呼び出している。

```lua
hl.env("XCURSOR_SIZE", "24")
```

### require 関数

[`require`](https://www.lua.org/manual/5.4/manual.html#pdf-require) は[[module|モジュール]]を読み込む関数である。

```lua
require("hypr.bindings")
```

### or

`A or B` は、A が使えれば A を、そうでなければ B を使う。たとえば `os.getenv("OMARCHY_PATH") or "/usr/share/omarchy"` は、環境変数 `OMARCHY_PATH` があればその値を、なければ `/usr/share/omarchy` を使う。

### 文字列の連結

文字列は `..` で連結する。`"foo" .. "bar"` は `foobar` になる。

### dofile 関数

[`dofile`](https://www.lua.org/manual/5.4/manual.html#pdf-dofile) は、Lua のファイルを読み込んで実行する関数である。

```lua
dofile("foo.lua")
```

### 条件分岐と否定演算子

条件分岐は `if ~ then ~ end` で書く。「等しくない」は `~=` で書く（`a ~= b`）。

```lua
if _G.omarchy_default_bindings ~= false then
    require("default.hypr.bindings.media")
    require("default.hypr.bindings.clipboard")
    require("default.hypr.bindings.tiling")
    require("default.hypr.bindings.utilities")
end
```

### 関数定義

関数は `function ~ end` で定義する。[[anonymous-function|無名関数]]も同じ書き方である。

```lua
l.on("hyprland.start", function ()
    hl.exec_cmd(terminal)
    hl.exec_cmd("nm-applet")
end)
```

### hl と o

[Omarchy のドキュメント](https://github.com/omacom/omarchy/blob/quattro/default/agents/skills/omarchy/hyprland.md)によると、`hl` と `o` は次のものである。

- `hl`: Omarchy が使っている Hyprland の API の table。Hyprland の C++ で[実装されている](https://github.com/hyprwm/Hyprland/blob/main/src/config/lua/bindings/LuaBindingsDispatchers.cpp)
- `o`: Omarchy が用意している、Hyprland の API の[ヘルパーの table](https://github.com/omacom/omarchy/blob/quattro/default/hypr/helpers.lua)

## キーワード

- Lua
- Omarchy
- Hyprland
- [[javascript|JavaScript]]
- [[module|モジュール]]
- [[anonymous-function|無名関数]]

## 参考

- [Lua 5.4 Reference Manual: require](https://www.lua.org/manual/5.4/manual.html#pdf-require)
- [Lua 5.4 Reference Manual: dofile](https://www.lua.org/manual/5.4/manual.html#pdf-dofile)
- https://github.com/omacom/omarchy/blob/quattro/default/agents/skills/omarchy/hyprland.md
- https://github.com/hyprwm/Hyprland/blob/main/src/config/lua/bindings/LuaBindingsDispatchers.cpp
- https://github.com/omacom/omarchy/blob/quattro/default/hypr/helpers.lua

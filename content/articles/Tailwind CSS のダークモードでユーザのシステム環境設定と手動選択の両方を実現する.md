---
title: Tailwind CSS のダークモードでユーザのシステム環境設定と手動選択の両方を実現する
description: Tailwind CSS の dark バリアントをクラスで切り替えるようにし、localStorage と matchMedia で OS の設定と手動の選択の両方に対応する方法
tags: [article, tailwind-css]
date: 2024-11-20
article-authors: []
site: Tailwind CSS
published:
url: https://tailwindcss.com/docs/dark-mode#supporting-system-preference-and-manual-selection
---

## TL;DR

- Tailwind CSS の `dark` バリアントを、`prefers-color-scheme` ではなく `dark` クラスで効くように上書きする。
- ページを読み込むときに、`localStorage` の選択か OS の設定から `dark` クラスを付け外しすれば、ライト・ダーク・OS に従うの 3 つを選べる。

## 内容

Tailwind CSS の公式ドキュメント「Dark mode」のうち、OS の設定と手動の選択の両方に対応する方法の節である（現在のドキュメントは v4 の書き方）。

### dark バリアントの既定の動き

Tailwind CSS には `dark:bg-gray-800` のように書く `dark` バリアントがある。既定では CSS のメディア特性 `prefers-color-scheme` を使うので、OS の設定に従って切り替わる。

### 手動で切り替える

手動で切り替えるには、CSS で `dark` バリアントをセレクタで上書きする。

```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
```

すると、祖先の要素に `dark` クラスがあるときに `dark:*` のユーティリティが効く。`<html>` にクラスを付ける方法は自由で、JavaScript でクラスを書き換え、選択を `localStorage` に保存するのが一般的である。クラスの代わりに `data-theme="dark"` のようなデータ属性を使うこともできる。

### OS の設定と手動の選択の両方に対応する

上のバリアントと `window.matchMedia()` を組み合わせると、ライト、ダーク、OS に従うの 3 つを切り替えられる。ドキュメントのスクリプトは次のとおりである。

```js
// On page load or when changing themes, best to add inline in `head` to avoid FOUC
document.documentElement.classList.toggle(
  "dark",
  localStorage.theme === "dark" ||
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
)

// Whenever the user explicitly chooses light mode
localStorage.theme = "light"

// Whenever the user explicitly chooses dark mode
localStorage.theme = "dark"

// Whenever the user explicitly chooses to respect the OS preference
localStorage.removeItem("theme")
```

読み込み時には、ユーザがダークを選んでいるか、何も選んでおらず OS がダークのときに `dark` クラスを付ける。FOUC（読み込み直後に一瞬違うテーマで表示されること）を避けるため、このスクリプトは `head` にインラインで書くのがよい。ユーザがライトかダークを選んだら `localStorage.theme` に保存し、OS に従うを選んだら `theme` を消す。選択の保存先は自由で、サーバに保存してサーバ側でクラスを付けてもよい。

## キーワード

- `prefers-color-scheme`
- `window.matchMedia()`
- [[local-storage|localStorage]]
- FOUC

%%

## 自分の理解

同意できる点、疑問に思った点、試してみたいこと。書くときはこのコメントを外す
%%

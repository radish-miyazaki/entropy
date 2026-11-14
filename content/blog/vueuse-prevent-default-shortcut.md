---
title: VueUse でショートカットキーのデフォルトの挙動を抑制する
description: VueUse の whenever と useMagicKeys では preventDefault を呼べないので、onKeyStroke を使ってショートカットキーのデフォルトの挙動を抑制する
tags: [blog, vue]
date: 2024-10-02
draft: false
---

## TL;DR

- VueUse の `whenever` と `useMagicKeys` で作ったショートカットキーでは、コールバックでイベントオブジェクトを受け取れないので、`preventDefault` を呼べない。
- `onKeyStroke` を使うと、イベントオブジェクトを受け取って `preventDefault` を呼べる。

## 背景

VueUse でショートカットキーを実装するときは、ふつう `whenever` と `useMagicKeys` の戻り値を組み合わせる。

```ts
const keys = useMagicKeys({ passive: false })
const isShortcutKeyEnabled = computed(() => activeElement.value?.tagName !== "INPUT")

whenever(logicAnd(keys["r"], isShortcutKeyEnabled), () => location.reload())
```

しかし、`whenever` のコールバック関数ではイベントオブジェクトを取得できないので、**`preventDefault` を呼び出せない**。

実際に問題になったのは、フォームを開くショートカットキーを実装したときである。

```ts
whenever(logicAnd(keys["f"], isShortcutKeyEnabled), () => openForm())
```

使いやすさを考えて、フォームを開いたら一番上の `<input>` 要素に自動でフォーカスするようにしていた。そのため、ショートカットキーの f を押すと、フォーカスした `<input>` 要素に f が入力されてしまった。

## 検証

`whenever` の代わりに `onKeyStroke` を使う。`onKeyStroke` のコールバックはイベントオブジェクトを受け取れるので、`preventDefault` を呼んでからフォームを開く。

```ts
onKeyStroke("f", (event) => {
  if (isShortcutKeyEnabled.value) {
    event.preventDefault()
    openForm()
  }
})
```

## 結果

`onKeyStroke` を使うことで、`<input>` 要素に f が入力される問題を回避できた。

## キーワード

- [[vue|Vue]]
- VueUse

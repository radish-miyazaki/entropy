---
title: react-dropzone
aliases: []
description: ローカルのファイルをドラッグアンドドロップやダイアログで選択するための React のライブラリ
tags: [word, react]
date: 2024-09-16
---

## TL;DR

ローカルのファイルを、ドラッグアンドドロップやファイル選択ダイアログで選ぶための [[react|React]] のライブラリ。[[react-hooks|React Hooks]] を中心にした API を持つ。

## 仕組み

`useDropzone` フックにオプションを渡し、返ってきた関数で要素に props を付ける。`getRootProps()` はドロップ領域となる親要素に、`getInputProps()` はクリックやキーボードでの操作を受け持つ非表示の `<input>` に展開する。`onDrop` は、受け付けたファイルを受け取るコールバックである。

## 例

```jsx
import React from "react"
import { useDropzone } from "react-dropzone"

function MyDropzone() {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      // サーバにアップロードするなど
      console.log(acceptedFiles)
    },
  })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  )
}
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 出典

- [react-dropzone](https://react-dropzone.js.org/)
- [Getting started - react-dropzone](https://react-dropzone.js.org/guide/getting-started)
- [react-dropzone の解説（Qiita）](https://qiita.com/FumioNonaka/items/4ae1ccbfe609e1a10c4d)

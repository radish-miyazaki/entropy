---
title: Uncontrolled Component
aliases: []
description: ローカルな state を持ち、親から渡す Props が少なくて済むコンポーネント
tags: [word, react]
date: 2024-09-05
---

## TL;DR

非制御コンポーネント。ローカルな state を持つコンポーネントである。[[controlled-component|Controlled Component]] と対になる。

## なぜ必要か

[[props|Props]] で設定する項目が少なくて済むので、親コンポーネントの中に入れて使いやすい。

## 例

`isActive` をローカルな state として持つパネルである。親コンポーネントは、パネルが開いているかどうかを制御できない。

```jsx
function Panel({ title, children }) {
  const [isActive, setIsActive] = useState(false)
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? <p>{children}</p> : <button onClick={() => setIsActive(true)}>Show</button>}
    </section>
  )
}
```

## 注意点

複数のコンポーネントを協調して動かしたい場合などには、柔軟性に欠ける。

また、`value` に `undefined` が渡された場合も、Uncontrolled Component として扱われる。

## 自分の理解

`value` に `undefined` が渡って Uncontrolled Component になってしまう場面には、開発中によく出くわす。

## 関連

- [[controlled-component|Controlled Component]]
- [[control-props-pattern|Control Props Pattern]]
- [[react|React]]

## 出典

- [コンポーネント間で state を共有する](https://ja.react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components)

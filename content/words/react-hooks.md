---
title: React Hooks
aliases: []
description: React のコンポーネントから呼び出したときに特別な機能を提供する関数で、常に同じ順序で呼ぶ必要がある
tags: [word, react]
date: 2024-09-04
---

## TL;DR

[[react-component|React のコンポーネント]]から呼び出したときに、特別な機能を提供する関数。コンポーネントと同じく[[pure-function|純粋関数]]であるべきで、常に同じ順序で呼ぶ必要がある。

## 仕組み

### 呼び出す順序が大事な理由

[[react|React]] は、Hook が毎回同じ場所で呼び出されることに依存している。再レンダリングで [[use-state|useState]] が再び呼ばれたとき、どの state を返すべきかを呼び出しの順序で特定しているからである。公式ドキュメントは次のように説明している。

> React はすべてのコンポーネントに対して `state` のペアの配列を保持しています。
> また、現在のペアインデックスも管理しており、レンダー前に `0` に設定されます。
> `useState` が呼び出されるたびに、React は次の状態ペアを提供し、インデックスをインクリメントします。

簡易的な `useState` の実装は次のようになる。

```js
// React 内部での useState の動作
function useState(initialState) {
  let pair = componentHooks[currentHookIndex]
  if (pair) {
    // 最初のレンダリングではないので、すでに state のペアが存在している。
    // それを返し、次のフック呼び出しに備える。
    currentHookIndex++
    return pair
  }

  // これは初めてのレンダリングなので、state のペアを作成し、それを保存する。
  pair = [initialState, setState]

  function setState(nextState) {
    // ユーザーが state の変更を要求したとき、新しい値をペアに設定する。
    pair[0] = nextState
    updateDOM()
  }

  // 今後のレンダリングのためにペアを保存し、次のフック呼び出しに備える。
  componentHooks[currentHookIndex] = pair
  currentHookIndex++
  return pair
}
```

### Hook のルール

「Hook はトップレベルでのみ呼び出す」というルールを守れば、Hook は常に同じ順序で呼ばれる。逆に、条件分岐の中で Hook を呼ぶと順序が変わってしまう。

呼び出す順序さえ一貫していれば、Hook をコンポーネントから直接呼んでも、他の関数を通して間接的に呼んでもよい。ここから「Hook は React の関数からのみ呼び出す」というルールが導ける。

### カスタムフック

他の Hook を呼び出す関数も、呼び出される順序を保つために Hook として扱う必要がある。このような Hook をカスタムフックと呼ぶ。慣例として、関数名に `use` という接頭辞を付ける。

## 例

スライドの番号を管理するカスタムフックの例である。

```tsx
import { useState } from "react"

export const useSlideIndex = () => {
  const [slideIndex, setSlideIndex] = useState(0)

  return [slideIndex, setSlideIndex] as const
}
```

`as const` は、戻り値が `readonly` なタプルであることを示す。付けないと、[[typescript|TypeScript]] はより汎用的な型に推論するので、戻り値は `(number | React.Dispatch<React.SetStateAction<number>>)[]` になってしまう。

## 注意点

[[eslint|ESLint]] の `eslint-plugin-react-hooks` プラグインを入れると、Hook のルールに違反しないように検査してくれる。

```sh
npm install --save-dev eslint-plugin-react-hooks
```

2024 年 9 月時点では、このプラグインは Flat Config 向けの共有設定を提供していない。そのため、`eslint.config.js` には次のように自分でルールを読み込む。

```js
import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import pluginReact from "eslint-plugin-react"
import eslintConfigPrettier from "eslint-config-prettier"
import eslintPluginReactHooks from "eslint-plugin-react-hooks"

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], ignores: ["dist"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    settings: { react: { version: "detect" } },
    plugins: {
      "react-hooks": eslintPluginReactHooks,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      ...eslintPluginReactHooks.configs.recommended.rules,
    },
  },
  eslintConfigPrettier,
]
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[use-state|useState]]
- [[use-ref|useRef]]
- [[react-hooks-exhaustive-deps|react-hooks/exhaustive-deps]]
- [[hoc-pattern|HOC Pattern]]

## 出典

- [組み込みの React フック](https://ja.react.dev/reference/react/hooks)
- [コンポーネントとフックを純粋に保つ](https://ja.react.dev/reference/rules/components-and-hooks-must-be-pure)
- [state：コンポーネントのメモリ](https://ja.react.dev/learn/state-a-components-memory#how-does-react-know-which-state-to-return)
- [フックのルール](https://ja.react.dev/reference/rules/rules-of-hooks)
- [カスタムフックでロジックを再利用する](https://ja.react.dev/learn/reusing-logic-with-custom-hooks)
- [React hooks: not magic, just arrays](https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e)
- [eslint-plugin-react-hooks - npm](https://www.npmjs.com/package/eslint-plugin-react-hooks)
- [eslint-plugin-react-hooks を Flat Config で設定する（Qiita）](https://qiita.com/Yasushi-Mo/items/9f98f1b79fe1544c6a59)

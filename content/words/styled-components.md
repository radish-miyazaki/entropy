---
title: styled-components
aliases: []
description: タグ付きテンプレートでスタイルを書き、スタイル付きの React コンポーネントを作る CSS-in-JS ライブラリ
tags: [word, javascript, react, css]
date: 2024-08-30
---

## TL;DR

[[css-in-js|CSS-in-JS]] のライブラリの 1 つ。[[tagged-template|タグ付きテンプレート]]でスタイルを書き、スタイル付きの [[react|React]] コンポーネントを作る。実行時にスタイルを挿入する [[runtime-css-in-js|Runtime CSS-in-JS]] に分類される。

## 仕組み

`styled` には、HTML の各タグに対応するタグ関数が用意されている。この関数にスタイルを書いたタグ付きテンプレートを渡すと、そのスタイルを持つコンポーネントが返る。

styled-components はクラス名を自動で生成して要素に付け、スタイルのルールをページの `<head>` にある `<style>` に挿入する。クラス名は、セレクタに使う安定した `sc-*` と、スタイルのハッシュから作ったランダムな文字列の 2 つである。

```html
<img src="..." class="sc-blHHSb gaBufi" />
```

関数の型パラメータに渡した型は、返されるコンポーネントの props になる。名前に `$` を付けた props は、スタイルの計算にだけ使う一時的な props で、DOM の要素には渡されない。通常の CSS は静的だが、このスタイルは props が変わると自動で更新される。

既存のスタイル付きコンポーネントを `styled` に渡すと、元のスタイルに新しいスタイルを足したコンポーネントが返る。

## 例

```tsx
import styled from "styled-components"

type ImgComponentProps = {
  $height?: string | number
}

const ScaledImg = styled.img<ImgComponentProps>`
  object-fit: cover;
  width: 100%;
  height: ${(props) => (typeof props.$height === "number" ? `${props.$height}px` : props.$height)};
`

// スタイルの拡張
const TestImg = styled(ScaledImg)`
  width: auto;
  object-fit: fill;
`
```

## 注意点

自動で付くクラス名は読みにくい。公式の [[babel|Babel]] プラグイン `babel-plugin-styled-components` を使うと、`CarouselSlide__ScaledImg-` のようにモジュール名とコンポーネント名がクラス名に入り、デバッグしやすくなる。テンプレートリテラル内のコメントや余分な空白も削除されるので、パフォーマンスも上がる。公式も使うことを推奨している。[[vite|Vite]] の React プラグインは内部で Babel を使っているので、設定に足すだけで導入できる。

```ts
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-styled-components", { displayName: true, fileName: true }]],
      },
    }),
  ],
})
```

スタイルを lint するには、[[stylelint|Stylelint]] に `postcss-styled-syntax` を組み合わせる。このパーサが [[javascript|JavaScript]] や [[typescript|TypeScript]] の中のスタイルを解析する。

```json
{
  "extends": ["stylelint-config-standard"],
  "customSyntax": "postcss-styled-syntax",
  "allowEmptyInput": true
}
```

テストでスタイルを確かめるには、`jest-styled-components` を使う。[[vitest|Vitest]] では `test.setupFiles` に指定したファイルで読み込めば、テストごとに `import` しなくてよい。`toHaveStyleRule` でスタイルをアサーションできる。

```tsx
it("has the expected static styles", () => {
  render(<CarouselSlide />)
  const img = screen.getByRole("img")
  expect(img).toHaveStyleRule("object-fit", "cover")
  expect(img).toHaveStyleRule("width", "100%")
})
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[css-in-js|CSS-in-JS]]
- [[runtime-css-in-js|Runtime CSS-in-JS]]
- [[tagged-template|タグ付きテンプレート]]
- [[stylelint|Stylelint]]

## 出典

- [styled-components](https://styled-components.com/)
- [Basics](https://styled-components.com/docs/basics#installation)
- [Adapting based on props](https://styled-components.com/docs/basics#adapting-based-on-props)
- [Extending Styles](https://styled-components.com/docs/basics#extending-styles)
- [Tooling](https://styled-components.com/docs/tooling#babel-plugin)

---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目76 ターゲットとする環境の正確なモデルを作る
description: lib の設定や型宣言でコードが動く環境（ランタイム、グローバル変数、ライブラリ、バンドラの import）を正確にモデリングし、型チェックの精度を上げる項目
tags: [book-chapter, typescript]
date: 2025-06-06
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 76
---

## TL;DR

- コードが動く環境を正確にモデリングすると、[[typescript|TypeScript]] はコードをより適切にチェックできる。
- `lib` の設定、`<script>` で読み込むグローバル変数やライブラリの型宣言、[[webpack]] で `import` するファイルの型宣言でモデリングする。

## 内容

### 環境をモデリングする

TypeScript のコードは [[javascript|JavaScript]] に変換され、特定の環境（ブラウザ、テストランナー、[[deno|Deno]]、Electron など）の特定のランタイム（V8、JavaScriptCore、SpiderMonkey など）で動く。この環境を正確にモデリングすると、TypeScript はコードをより適切にチェックするようになる。

モデリングの方法の 1 つが、`tsconfig.json` の [`lib`](https://www.typescriptlang.org/tsconfig/#lib) の設定である。たとえば `"DOM"` はブラウザ用の型宣言を含め、`"ES2021"` は 2021 年に承認された JavaScript の標準仕様の型宣言を含める。`"ES2021"` を指定した場合、それより後に追加された機能を使うと型エラーになる。ほかに、`@types/web` パッケージを使うと、Web ブラウザで使える型をモデリングできる。

### グローバル変数とライブラリ

`<script>` で読み込まれるグローバル変数もモデリングしたほうがよい（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目47 モンキーパッチではなく、より型安全なアプローチを採用する|項目47]]）。

```html
<script type="text/javascript">
  window.userInfo = { name: "Jane Doe", accountId: "123-abc" }
</script>
```

```ts
interface UserInfo {
  name: string
  accountId: string
}

declare global {
  interface Window {
    userInfo: UserInfo
  }
}
```

`<script>` で読み込むライブラリも同様である。たとえば jQuery や Google Analytics を読み込んでいるなら、それぞれの型宣言パッケージを入れる（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目66 型宣言の依存関係に関わる3つのバージョンを理解する|項目66]]）。

```sh
npm i -D @types/google.analytics @types/jquery
```

### バンドラで読み込むファイル

webpack を使って JavaScript から CSS や画像ファイルを直接 `import` する場合、そのままでは TypeScript が認識できない。

```ts
import sunrisePath from "./images/beautiful-sunrise.jpg"
// Cannot find module './images/beautiful-sunrise.jpg' or its type declarations.
```

これを避けるには、型宣言でモデリングするか、別途 npm パッケージを追加する。

```ts
// webpack-imports.d.ts
declare module "*.jpg" {
  const src: string
  export default src
}
```

### 複数の環境

クライアントとサーバのように異なる環境をモデリングするには、複数の `tsconfig.json` と[[project-references|プロジェクト参照]]を使う（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目78 コンパイラーのパフォーマンスに注意を払う|項目78]]）。

## キーワード

- [[typescript|TypeScript]]
- [[javascript|JavaScript]]
- [[deno|Deno]]
- [[webpack]]
- [[project-references|プロジェクト参照]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目47 モンキーパッチではなく、より型安全なアプローチを採用する
description: 組み込みオブジェクトへのモンキーパッチは避け、どうしても必要ならオーグメンテーションや狭い型アサーションで型安全に扱うべきだと説く項目
tags: [book-chapter, typescript]
date: 2025-05-16
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 47
---

## TL;DR

- 組み込みオブジェクトにプロパティを追加する[[monkey-patching|モンキーパッチ]]は、グローバル変数と同じなので避ける。
- 避けられないときは、`any` ではなくオーグメンテーションか狭い型アサーションを使う。

## 内容

### JavaScript のモンキーパッチ

JavaScript のモンキーパッチは、組み込みオブジェクトにプロパティを追加することを指す。

```js
RegExp.prototype.monkey = "Capuchin"
console.log(/123/.monkey) // 'Capuchin'
```

これはデータをグローバル変数に置くのと変わらない。予期しない依存関係が生まれ、関数を呼ぶたびに[[side-effect|副作用]]を気にしなければならなくなる。

TypeScript では、存在しないプロパティにアクセスすると型エラーになる。`any` を使えば回避できるが、型安全性や言語サービスのサポートが失われる。

```ts
RegExp.prototype.monkey = "Capuchin" // Property 'monkey' does not exist on type 'RegExp'.
```

### 回避策

最も良いのは、データを組み込みオブジェクトから追い出し、モンキーパッチをなくすことである。

モンキーパッチを必要とするライブラリを使うときや移行中など、それができない場合は、オーグメンテーションを使う（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目71 モジュールオーグメンテーションを使って型を改善する|項目71 モジュールオーグメンテーションを使って型を改善する]]）。

```ts
declare global {
  interface Window {
    user: User
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const resp = await fetch(`/api/users/current-user`)
  const user = (await resp.json()) as User
  window.user = user // OK
})

export function greetUser() {
  alert(`Hello ${window.user.name}`) // OK
}
```

この方法は、`any` を使うより次の点で優れている。

- 型安全性が得られる
- プロパティにドキュメントを付けられる（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目68 APIのコメントにTSDocを使う|項目68 APIのコメントにTSDocを使う]]）
- 自動補完などの言語サービスを使える
- どんなモンキーパッチをしているかの正確な記録が残る

### オーグメンテーションの問題点と回避策

オーグメンテーションには 2 つの問題がある。

1 つ目は、プロパティが追加された後だけにオーグメンテーションを適用する方法がないことである。そのため[[race-condition|競合状態]]が起こりうる。たとえば、`window.user` がセットされる前に `greetUser` を呼び出せてしまう。対策として、型定義に `undefined` を含める（`user?: User`）。または、HTML のインラインスクリプトで先にプロパティを追加し、必ず存在するようにする。

```html
<script type="text/javascript">
  window.user = { name: "Bill Withers" }
</script>
<script src="your-code.js"></script>
```

2 つ目は、型定義がグローバルに適用され、グローバルスコープを汚すことである。対策として、狭い型アサーションを使う。

```ts
type MyWindow = typeof window & { user?: User }

document.addEventListener("DOMContentLoaded", async () => {
  const resp = await fetch(`/api/users/current-user`)
  const user = (await resp.json()) as User
  ;(window as MyWindow).user = user
})

export function greetUser() {
  alert(`Hello ${(window as MyWindow).user.name}`)
}
```

ただし、追加したプロパティを参照するたびにアサーションが必要で面倒である。また、`(window as any)` と書けないように Linter で強制する必要がある。

## キーワード

- [[typescript|TypeScript]]
- [[monkey-patching|モンキーパッチ]]
- [[side-effect|副作用]]
- [[race-condition|競合状態]]
- [[type-assertion|型アサーション]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

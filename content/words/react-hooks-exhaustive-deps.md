---
title: react-hooks/exhaustive-deps
aliases: []
description: useEffect や useCallback の依存配列に漏れがあると警告する、eslint-plugin-react-hooks のルール
tags: [word, react]
date: 2024-09-05
---

## TL;DR

[[eslint|ESLint]] の `eslint-plugin-react-hooks` プラグインのルールの 1 つ。[[use-effect|useEffect]] や `useCallback` の第 2 引数に、依存関係を配列で正しく渡していないと警告を出す。

## なぜ必要か

依存関係を省略するとバグの原因になる。省略したほうがよさそうに見える場面もある。たとえば、初期の [[props|Props]] を使って初期化するなど、`useEffect` をマウント時にだけ実行したい場合である。このとき `useEffect` の第 2 引数は `[]` になる。

そのため、ルールは有効にしておき、どうしても必要な場合だけ次のようにルールを無効にするのがよい、という考え方がある。無効にするときは、なぜ省略する必要があるのかを必ずコメントに書く。

```tsx
// eslint-disable-next-line react-hooks/exhaustive-deps
```

## 注意点

このルールのエラーは 0 にすべきで、ルールは無効にしないという意見もある。[react-hooks/exhaustive-deps のエラーを 0 にする](https://tech.hello.ai/entry/2024/07/02/165549)では、次のように述べている。

> このルールはReactの最も基本的なルールの一つであり、オフにしないとコードを書けないケースはプロダクトコードを書くうえで、基本的に存在しません。

この記事によると、ルールを無効にすると次の問題が起きる。

1. Stale Closure: 含めるべき依存関係を入れ忘れ、値の変更が反映されない。非同期で更新される Props の順序が変わると壊れるなど、[[race-condition|競合状態]]も起きる。ルールを有効にしていれば起きないはずのバグが、特定のレンダリングの順序でだけ起きるので、原因の特定が非常に難しい。
2. [[react|React]] のバージョンアップなどで困る: 依存配列を空にしても、Effect が一度しか実行される保証はない。Strict Mode では、開発環境で 2 回実行される。React では、何度余分にレンダリングされても壊れないコードを書く必要がある。また、正しい依存配列を使わないと、React Compiler を有効にしにくくなる。

一度しか実行しないつもりの Effect でも、cleanup は必ず書く。開発中は Fast Refresh でコンポーネントが再レンダリングされることがあり、cleanup がないと購読などの処理が何重にも登録されてしまう。

### 回避する方法

公式ドキュメントでは、Effect から呼ぶが依存関係にしたくない処理を `useEffectEvent` で切り出す方法を紹介している。

```tsx
const onVisit = useEffectEvent((visitedUrl) => {
  logVisit(visitedUrl, numberOfItems)
})

useEffect(() => {
  onVisit(url)
}, [url])
```

## 自分の理解

依存関係を省略するのが妥当な場合もある、という説明を最初に見たときは、本当かと疑問に思った。

## 関連

- [[react-hooks|React Hooks]]
- [[use-effect|useEffect]]
- [[eslint|ESLint]]

## 出典

- [facebook/react#14920](https://github.com/facebook/react/issues/14920)
- [react-hooks/exhaustive-deps のエラーを 0 にする](https://tech.hello.ai/entry/2024/07/02/165549)
- [エフェクトからイベントを分離する](https://ja.react.dev/learn/separating-events-from-effects)

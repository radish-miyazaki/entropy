---
title: カスタムフック
aliases: []
description: 他のフックを呼び出す関数で、コンポーネントのロジックを再利用できる形に取り出したもの
tags: [word, react]
date: 2026-11-14
---

## TL;DR

他のフックを呼び出す JavaScript の関数で、[[react|React]] のコンポーネントのロジックを再利用できる形に取り出したもの。名前は `use` と大文字で始める。

## なぜ必要か

React の公式ドキュメントによると、カスタムフックを使うと、状態を持つロジックを複数のコンポーネントで共有できる。コンポーネントのコードは「どうやるか」（ブラウザのイベントを購読する）ではなく「何をしたいか」（オンライン状態を使う）を表すようになる。

## 仕組み

カスタムフックが共有するのは状態を持つロジックであり、状態そのものではない。同じフックを呼んでも、呼び出しごとに状態は独立している。状態そのものを共有したいときは、状態を親に持ち上げて props で渡す。

カスタムフックは、呼び出したコンポーネントのレンダーのたびに実行されるので、コンポーネントと同じく純粋でなければならない。名前を `use` で始めるのは、その関数が状態やエフェクトを含むかどうかを見分けられるようにするためで、フックを呼ばない関数には `use` を付けない。

## 例

```js
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true)
  useEffect(() => {
    const on = () => setIsOnline(true)
    const off = () => setIsOnline(false)
    window.addEventListener("online", on)
    window.addEventListener("offline", off)
    return () => {
      window.removeEventListener("online", on)
      window.removeEventListener("offline", off)
    }
  }, [])
  return isOnline
}
```

[[container-presentational-pattern|Container/Presentational Pattern]] では、Container の役割をカスタムフックに持たせることもできる。

## 注意点

少しの重複は許容してよく、繰り返すコードすべてをカスタムフックにする必要はない。公式ドキュメントは、エフェクトを書くときにカスタムフックで包むことを検討するよう勧めている。`useMount(fn)` のような汎用のラッパーは、リンターが依存配列を検査できないので避ける。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[react-hooks|React Hooks]]
- [[container-presentational-pattern|Container/Presentational Pattern]]
- [[svelte-runes|Rune (Svelte)]]

## 出典

- [Reusing Logic with Custom Hooks – React](https://react.dev/learn/reusing-logic-with-custom-hooks)

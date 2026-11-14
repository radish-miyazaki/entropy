---
title: useEffect
aliases: []
description: コンポーネントを外部システムと同期させるための React の Hook
tags: [word, react]
date: 2026-11-14
---

## TL;DR

コンポーネントを外部システムと同期させるための [[react|React]] の [[react-hooks|Hook]]。外部システムとは、タイマー、ネットワーク接続、ブラウザのイベントリスナなど、React が管理していないものを指す。

## なぜ必要か

チャットサーバへの接続のように、コンポーネントが表示されている間だけ保ちたいものがある。`useEffect` を使うと、接続と切断の処理をコンポーネントの表示や props の変化に合わせて実行できる。

## 仕組み

`useEffect(setup, dependencies?)` の形で呼ぶ。`setup` はエフェクトの処理を書いた関数で、クリーンアップ関数を返してよい。React は次のタイミングで関数を呼ぶ。

- コンポーネントが画面に追加されたとき、`setup` を実行する
- 依存配列の値が変わったとき、古い値でクリーンアップを実行してから、新しい値で `setup` を実行する
- コンポーネントが画面から取り除かれたとき、最後にクリーンアップを実行する

依存配列を省くと、コミットのたびに実行される。空の配列 `[]` を渡すと、最初のコミットの後だけ実行される。値を並べると、最初とその値が変わったときに実行される。値の比較には `Object.is` を使う。

## 例

```js
function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState("https://localhost:1234")

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId)
    connection.connect()
    return () => {
      connection.disconnect()
    }
  }, [serverUrl, roomId])
}
```

## 注意点

公式ドキュメントによると、依存配列は自由に選べるものではなく、エフェクトの中で使うリアクティブな値はすべて書かなければならない。[[react-hooks-exhaustive-deps|react-hooks/exhaustive-deps]] の警告を抑えると、バグを生みやすい。外部システムと同期しないなら、エフェクトはおそらく不要である。開発中の Strict Mode では、`setup` とクリーンアップがもう 1 回ずつ余分に実行される。エフェクトはクライアントでだけ実行され、サーバレンダリングでは実行されない。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[react-hooks|React Hooks]]
- [[use-state|useState]]
- [[use-ref|useRef]]
- [[custom-hook|カスタムフック]]
- [[react-hooks-exhaustive-deps|react-hooks/exhaustive-deps]]

## 出典

- [useEffect - React](https://react.dev/reference/react/useEffect)

---
title: Vitest で実装ファイルにテストコードを書く
description: Vitest の In-source testing を使うと、import.meta.vitest の中に書いたテストを実装ファイルに同居させられる
tags: [blog, vitest, typescript, javascript]
date: 2024-09-28
draft: false
---

## TL;DR

- [[vitest|Vitest]] の In-source testing を使うと、実装と同じファイルにテストを書ける。
- テストは `if (import.meta.vitest)` のブロックの中に書く。

## 検証

[Vitest のドキュメント](https://vitest.dev/guide/features.html#in-source-testing)の例では、実装の下に `if (import.meta.vitest)` のブロックを置き、その中で `import.meta.vitest` から取り出した `it` と `expect` を使ってテストを書く。

```ts
// src/index.ts
// the implementation
export function add(...args: number[]): number {
  return args.reduce((a, b) => a + b, 0)
}

// in-source test suites
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  it("add", () => {
    expect(add()).toBe(0)
    expect(add(1)).toBe(1)
    expect(add(1, 2, 3)).toBe(6)
  })
}
```

## キーワード

- [[vitest|Vitest]]
- In-source testing
- [[typescript|TypeScript]]

## 参考

- https://vitest.dev/guide/features.html#in-source-testing
- https://zenn.dev/azukiazusa/articles/vitest-same-test-file

---
title: AAA パターン
aliases: [3A パターン]
description: テストを準備（Arrange）、実行（Act）、検証（Assert）の 3 段階で書く、すべてのテストの基本パターン
tags: [word, テスト]
date: 2024-09-04
---

## TL;DR

Bill Wake が見いだした、すべてのテストの基本パターン。テストを Arrange（準備）、Act（実行）、Assert（検証）の 3 段階で書く。AAA はその頭文字である。

## 仕組み

1. **Arrange（準備）**: テストを書くときに最初に行うのは、テストするデータの準備である。システムをテストが実行できる状態にする。`setup` 関数やテスト関数の冒頭で行う。
2. **Act（実行）**: 次に、テストの対象を実行する。対象の関数の呼び出し、アクションの実行、プロシージャの呼び出しなどがこれに当たる。
3. **Assert（検証）**: 最後に、実行の出力を調べ、システムが望ましい状態になっていることを確かめる。

## 例

[[go|Go]] でボウリングのスコアを計算するテストを書くと、次のようになる。

```go
func TestScore(t *testing.T) {
	tests := []struct {
		name     string
		expected int
		setup    func(*Game)
	}{
		{
			name:     "Threw 20 times and knocked down 0 pins.",
			expected: 0,
			setup: func(g *Game) {
				rollMany(g, 20, 0)
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			g := NewGame()
			// Arrange
			tt.setup(g)

			// Act
			act := g.Score()

			// Assert
			assert.Equal(t, act, tt.expected)
		})
	}
}
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[unit-test|単体テスト]]
- [[snapshot-testing|スナップショットテスト]]

## 出典

- [3A – Arrange, Act, Assert - XP123](https://xp123.com/3a-arrange-act-assert/)

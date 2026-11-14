---
title: Improved Golang JSON unmarshaling with time and URL
description: Go で構造体の一部のフィールドだけを独自に JSON から読み込むために、メソッドを持たないクローン型を埋め込む方法を紹介した記事
tags: [article, go]
date: 2025-09-16
article-authors: [Ukiah Smith]
site:
published: 2021-05-23
url: https://ukiahsmith.com/blog/improved-golang-unmarshal-json-with-time-and-url/
---

## TL;DR

- [[go|Go]] で `UnmarshalJSON` を書くとき、元の型と同じ構造でメソッドを持たないクローン型を一時的な構造体に埋め込めば、特別な処理が必要なフィールドだけを手で扱える。

## 内容

### 問題

受け取る JSON によっては、古い日付の形式を読む、値を検証するなど、`encoding/json` だけでは扱えない処理が必要になる。`UnmarshalJSON` を一から書くと、一時的な構造体にすべてのフィールドを写す必要があり、フィールドが数十、数百ある型では手間がかかる。

### 方法

`DOB time.Time` と `Homepage url.URL` を持つ `Person` を例にする。

1. `type Doppelganger Person` で、同じ構造でメソッドを持たない型を作る。`UnmarshalJSON` を持たないので、無限に再帰しない
2. 問題のフィールドを `string` で宣言し、`*Doppelganger` を埋め込んだ一時的な構造体を作る。埋め込んだポインタはレシーバ `p` を指す
3. `json.Unmarshal(data, &tmp)` を呼ぶと、普通のフィールドは埋め込んだポインタを通して直接 `p` に入り、問題のフィールドだけが文字列として `tmp` に入る
4. 文字列の `DOB` を `time.Parse(time.RFC3339, ...)` で、`Homepage` を `url.Parse` で読み、結果を `p` に入れる

```go
func (p *Person) UnmarshalJSON(data []byte) error {
	type Doppelganger Person
	tmp := struct {
		DOB      string
		Homepage string
		*Doppelganger
	}{
		Doppelganger: (*Doppelganger)(p),
	}
	// json.Unmarshal(data, &tmp) のあと、DOB と Homepage を手で読む
	...
}
```

著者はフィールドの多い型だけでなく、一部に独自の読み込みが必要な小さな型にも使える方法だとしている。

## キーワード

- [[go|Go]]
- encoding/json
- 構造体の埋め込み

%%

## 自分の理解

同意できる点、疑問に思った点、試してみたいこと。書くときはこのコメントを外す
%%

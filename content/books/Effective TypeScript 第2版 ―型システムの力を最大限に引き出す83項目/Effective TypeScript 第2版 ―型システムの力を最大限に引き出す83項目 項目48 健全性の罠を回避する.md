---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目48 健全性の罠を回避する
description: 実行時の値が静的な型と食い違う不健全性が TypeScript のどこで生じるかを挙げ、それぞれの回避策を示す項目
tags: [book-chapter, typescript]
date: 2025-04-12
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 48
---

## TL;DR

- 不健全性とは、シンボルの実行時の値が静的な型と異なることを指す。クラッシュやバグが型エラーとして検出されなくなる。
- `any`、[[type-assertion|型アサーション]]、配列やオブジェクトへのアクセス、不正確な型定義など、不健全性を生むパターンを覚えておく。
- 関数のパラメータを変更しない。変更する必要がなければ `readonly` や `Readonly` で読み取り専用にする。

## 内容

型システムでは、表現力、[[soundness|健全性]]、利便性の 3 つが[[trade-off|トレードオフ]]の関係にある。[[typescript|TypeScript]] は健全性を設計目標にしておらず、利便性や既存の JavaScript ライブラリをモデリングできることを重視している。とはいえ、不健全性はバグやクラッシュにつながるので、できるだけ避けるべきである。

### any 型

```ts
function logNumber(x: number) {
  console.log(x.toFixed(1))
}

const num: any = "forty two"
logNumber(num) // 型エラーは起きないが、実行時エラー
```

### 型アサーション

```ts
const hour = new Date().getHours() || null
logNumber(hour as number) // 型エラーは起きないが、実行時エラー
```

### オブジェクトや配列へのアクセス

strict モードでも、TypeScript は配列の境界チェックやオブジェクトのプロパティの存在チェックをしない。

```ts
type IdToName = { [id: string]: string }
const ids: IdToName = { "007": "James Bond" }
const agent = ids["008"] // 型エラーは起きないが、実行時エラー
```

[noUncheckedIndexedAccess](https://www.typescriptlang.org/tsconfig/#noUncheckedIndexedAccess) をオンにすると、存在チェックを強制できる。ただし、問題のないコードでもエラーになる偽陽性が出るので、利便性が下がる。値の型に `undefined` を明示的に加える方法もある。そもそもこうしたアクセスを減らすために、関数にはインデックスやキーではなく、それが指すオブジェクトを渡すのも手である。

### 不正確な型定義

型定義を修正するのが回避策である。DefinitelyTyped（`@types`）の型定義なら、1 週間ほどで修正が反映される。ただし、歴史的な理由などでやむを得ず誤った型になっているものもある。

### クラス階層における双変性

TypeScript では、関数の戻り値の型は共変、パラメータの型は反変である。しかし、クラスのメソッドのパラメータは双変になる（[[variance|変性]]）。そのため、次のコードは型エラーにならないが、実行時エラーを起こす。

```ts
class Parent {
  foo(x: number | string) {}
}

class Child extends Parent {
  foo(x: number) {
    console.log(x.toFixed())
  }
}

const p: Parent = new Child()
p.foo("string") // 実行時エラー
```

通常は、子クラスと親クラスのメソッドをまったく同じシグネチャにすべきである。これを強制するのは難しいので、[strictFunctionTypes](https://www.typescriptlang.org/tsconfig/#strictFunctionTypes) を有効にしたうえで、メソッドではなく関数をプロパティとして持たせるとよい。こうすると通常の関数と同じく型チェックされる。[[typescript-eslint|typescript-eslint]] の [method-signature-style](https://typescript-eslint.io/rules/method-signature-style/) で強制できる。

```ts
class Parent {
  foo = (x: number | string) => {}
}

class Child extends Parent {
  foo = (x: number) => {} // Property 'foo' in type 'Child' is not assignable to
  // the same property in base type 'Parent'.
}
```

### 配列とオブジェクトの変性

```ts
function addFoxOrHen(animals: Animal[]) {
  animals.push(Math.random() > 0.5 ? new Fox() : new Hen())
}

const henhouse: Hen[] = [new Hen()]
addFoxOrHen(henhouse)
```

この呼び出しが安全なのは、`addFoxOrHen` が配列を変更しない場合だけである。しかし、`readonly` が付いていなくても型エラーにならない。回避策は、パラメータに `readonly` を付けて読み取り専用にし、新しい配列を返すことである。

```ts
function addFoxOrHen(animals: readonly Animal[]) {
  const foxOrHen = Math.random() > 0.5 ? new Fox() : new Hen()
  return [...animals, foxOrHen]
}
```

オブジェクトでも同じ問題が起きる。オブジェクトのエイリアスを作って変更すると、関数を呼ばなくても問題が起きる（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目23 エイリアスを作成したら一貫してそれを使う|項目23 エイリアスを作成したら一貫してそれを使う]]）。

### 関数呼び出しで絞り込みが無効にならない

```ts
interface FunFact {
  fact: string
  author?: string
}

function processFact(fact: FunFact, processor: (fact: FunFact) => void) {
  if (fact.author) {
    processor(fact)
    console.log(fact.author.blink())
  }
}
```

`processor` が `fact.author` に `undefined` を代入すると、実行時エラーになる。ほとんどの関数はパラメータを変更しないので、利便性を優先しているのだと思われる。回避策は、コールバックに渡すオブジェクトを `Readonly<FunFact>` にすることである。

### 代入可能性とオプションプロパティ

TypeScript の値は、宣言したもの以外のプロパティを持つことがある（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目4 構造的型付けに慣れる|項目4 構造的型付けに慣れる]]）。これがオプションプロパティと組み合わさると、不健全性の原因になる。

```ts
interface Person {
  name: string
}
interface PossiblyAgedPerson extends Person {
  age?: number
}

const p1 = { name: "Serena", age: "42 years" }
const p2: Person = p1
const p3: PossiblyAgedPerson = p2
console.log(`${p3.name} is ${p3.age?.toFixed(1)} years old`) // 実行時エラー
```

多くの場合、プロパティ名が一般的すぎることが原因である。`ageInYears` や `ageFormatted` のように具体的な名前を付ける。

### 訳者による解説

型システムの文脈での「健全（sound）」とは、静的な型が実行時の値と互換性があることを指す。

```ts
// 健全
const x = Math.random() // x の実行時の型は number

// 健全でない
const xs = [0, 1, 2]
const x = xs[3] // x の実行時の型は undefined
```

健全性は表現力や利便性とトレードオフの関係にあるため、TypeScript はある程度の不健全性を許容している。クラス階層の双変性はその例で、親クラスと子クラスのメソッドのどちらかが他方に代入可能なら有効になる。健全性を満たすなら、子クラスのメソッドが親クラスのメソッドに代入可能な場合だけを有効にすべきである。

## キーワード

- [[typescript|TypeScript]]
- [[soundness|健全]]
- [[trade-off|トレードオフ]]
- [[type-assertion|型アサーション]]
- [[variance|変性]]
- [[typescript-eslint|typescript-eslint]]

## 自分の理解

配列の変性の問題で型エラーにならないのは、`push` が配列のメソッドであり、メソッドのパラメータが双変だからである。

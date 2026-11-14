---
title: Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目72 TypeScriptの独自機能の使用を避け、ECMAScriptの機能を使う
description: enum やパラメータプロパティ、namespace、実験的デコレータ、アクセス修飾子といった TypeScript 独自の機能を避け、ECMAScript の標準機能で置き換える項目
tags: [book-chapter, typescript]
date: 2025-06-07
book: "[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目]]"
chapter: 72
---

## TL;DR

- 現在の [[typescript|TypeScript]] は、[[ecmascript|ECMAScript]] の機能をベースに型の機能を足す方針を取っている。
- その方針が固まる前に入った独自機能（`enum`、パラメータプロパティ、`namespace`、実験的デコレータ、アクセス修飾子）は避け、ECMAScript の機能で置き換える。

## 内容

### 独自機能を避ける理由

現在の TypeScript は、[[javascript|JavaScript]] の標準規格である ECMAScript の機能をベースに、型空間の機能を拡充する方針を取っている。通常、TypeScript のコンパイルは型を消すだけである。しかし、この方針が定まる前に追加された独自機能には、コンパイル時にコードを書き足すものや、標準と挙動が異なるものがある。

### enum

`enum` はコンパイル時にコードが書き足される。また、いくつか種類があり、それぞれ挙動が異なる。

数値の enum には `number` 型の値を代入できるので、安全ではない。

```ts
enum Flavor {
  Vanilla = 0,
  Chocolate = 1,
  Strawberry = 2,
}

const printFlavor = (flavor: Flavor) => console.log(flavor)
printFlavor(0)
```

文字列の enum は、[[structural-typing|構造的型付け]]ではなく[[nominal-typing|名前的型付け]]になる。

```ts
enum Flavor {
  Vanilla = "vanilla",
  Chocolate = "chocolate",
  Strawberry = "strawberry",
}

let favoriteFlavor = Flavor.Chocolate
favoriteFlavor = "strawberry"
// ~~~~~~~~~~~ Type '"strawberry"' is not assignable to type 'Flavor'.
```

この挙動は、JavaScript の利用者と TypeScript の利用者で開発体験がずれる原因になる。ライブラリが `scoop(flavor: Flavor)` という関数を提供している場合、JavaScript からは `scoop('vanilla')` と書けるが、TypeScript では型エラーになり、`Flavor` をインポートして `scoop(Flavor.Vanilla)` と書く必要がある。

`const enum` は通常の enum と違い、実行時には消える。ただし `preserveConstEnums` を設定すると、通常の enum と同じく実行時のコードが生成される。

代わりに、[[literal-type|リテラル型]]の[[union-type|ユニオン型]]を使う（[[Effective TypeScript 第2版 ―型システムの力を最大限に引き出す83項目 項目35 stringよりもそれに代わる、より精度の高い型を選択する|項目35]]）。

```ts
type Flavor = "vanilla" | "chocolate" | "strawberry"
```

### パラメータプロパティ

パラメータプロパティは、コンストラクタの引数をプロパティに代入する処理を省略して書ける機能である。

```ts
class Person {
  constructor(public name: string) {}
}
```

これも `enum` と同じく、コンパイル時にコードが書き足される。また、引数はコンパイル後のコードでしか使われないため、元のコードでは未使用の引数があるように見える。パラメータプロパティと通常のプロパティが混ざると、クラスの設計も分かりにくくなる。

クラスがパラメータプロパティだけでできているなら、`interface Person { name: string }` とオブジェクトリテラルを使えばよい。構造的型付けにより、両者は互いに代入できる。

```ts
class PersonClass {
  constructor(public name: string) {}
}

const jed: Person = new PersonClass("Jed Bartlet") // OK
const p: PersonClass = { name: "Jed Bartlet" } // OK
```

### namespace とトリプルスラッシュインポート

`namespace` とトリプルスラッシュインポート（`/// <reference path="other.ts" />`）は、TypeScript 独自のモジュールシステムである。ES2015 より前の JavaScript には公式のモジュールシステムがなく、[[nodejs|Node.js]] は `require` と `module.exports`、ブラウザは AMD の `define` 関数というように、環境ごとに別の仕組みがあった。TypeScript も独自の `module` を持っていたが、ES2015 で標準のモジュールシステムが入ったため、混乱を避ける目的で `module` の別名として `namespace` を追加した。

代わりに、ECMAScript のモジュールシステム（`import` / `export`）を使う。

### 実験的デコレータ

[`experimentalDecorators`](https://www.typescriptlang.org/tsconfig/#experimentalDecorators) を有効にすると使える非標準の[[decorator|デコレータ]]で、2015 年に Angular をサポートするために導入された。2025 年時点で [[tc39|TC39]] のステージ 3 にある[標準のデコレータ](https://github.com/tc39/proposal-decorators)とは別物である。TypeScript は基本的にステージ 3 以降の機能をサポートしているので、標準のデコレータは追加の設定なしで使える。

```ts
function logged(originalFn: any, context: ClassMethodDecoratorContext) {
  return function (this: any, ...args: any[]) {
    console.log(`Calling ${String(context.name)}`)
    return originalFn.call(this, ...args)
  }
}

class Greeter {
  greeting: string
  constructor(message: string) {
    this.greeting = message
  }

  @logged
  greet() {
    return `Hello, ${this.greeting}`
  }
}
```

`experimentalDecorators` は `false` にする。利用しているライブラリが依存していて `false` にできない場合でも、非標準のデコレータを自分では書かない。

### アクセス修飾子

`private`、`protected`、`public` は実行時に消えるため、強制力がない。型エラーは出るが、[[type-assertion|型アサーション]]や反復処理で回避できる。プロパティ名の先頭に `_` を付ける従来の JavaScript の慣習とあまり変わらない。

`private` の代わりには、ES2022 で追加された[プライベートフィールド](https://github.com/tc39/proposal-private-methods)を使う。

```ts
class PasswordChecker {
  #passwordHash: number
  constructor(passwordHash: number) {
    this.#passwordHash = passwordHash
  }

  checkPassword(password: string) {
    return hash(password) === this.#passwordHash
  }
}

const checker = new PasswordChecker(hash("s3cret"))
checker.#passwordHash
//      ~~~~~~~~~~~~~ Property '#passwordHash' is not accessible outside class
//                    'PasswordChecker' because it has a private identifier.
```

プライベートフィールドにはクラスの外からアクセスできず、`Object.entries` などでも列挙されない。ES2022 より前を対象にする場合も、データを非公開に保つフォールバック実装がある。

`public` はデフォルトなので、明示する必要はない。`protected` については、オブジェクト指向の一般的なルールが[[composition-over-inheritance|継承より委譲]]なので、そもそも必要になる場面が少ない。

## キーワード

- [[typescript|TypeScript]]
- [[javascript|JavaScript]]
- [[ecmascript|ECMAScript]]
- [[structural-typing|構造的型付け]]
- [[nominal-typing|名前的型付け]]
- [[literal-type|リテラル型]]
- [[union-type|ユニオン型]]
- [[decorator|デコレータ]]
- [[tc39|TC39]]
- [[type-assertion|型アサーション]]
- [[composition-over-inheritance|継承より委譲]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

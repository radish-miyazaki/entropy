---
title: NUnit
aliases: []
description: .NET のすべての言語で使える単体テストのテスティングフレームワーク
tags: [word, テスト]
date: 2024-07-31
---

## TL;DR

[[dotnet|.NET]] 上で動作する[[testing-framework|テスティングフレームワーク]]。.NET のすべての言語で単体テストを書ける。

## 仕組み

もとは JUnit を移植したもので、バージョン 3 で書き直され、多くの機能が追加された。バージョン 3 以降は MIT ライセンスで公開されている。

## 例

公式ドキュメントによると、テストは `[TestFixture]` を付けたクラスの中に、`[Test]` を付けたメソッドとして書く。結果は `Assert.That` に `Is.EqualTo` などの制約を渡して確かめる。

```csharp
[TestFixture]
public sealed class BasicTests
{
    [Test]
    public void Add()
    {
        Assert.That(2 + 2, Is.EqualTo(4));
    }
}
```

テストメソッドはインスタンスメソッドでも static メソッドでもよい。`Task` を返す非同期のテストにも対応していて、NUnit は完了を待ってから結果を記録する。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[fsunit|FsUnit]]: NUnit などを [[fsharp|F#]] 向けの構文でラップしたライブラリ
- [[expecto|Expecto]]

## 出典

- [NUnit](https://nunit.org/)
- [NUnit Documentation](https://docs.nunit.org/articles/nunit/intro.html)
- [Test Attribute - NUnit Docs](https://docs.nunit.org/articles/nunit/writing-tests/attributes/test.html)

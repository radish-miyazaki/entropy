---
title: RSpec
aliases: []
description: Ruby のための振る舞い駆動開発（BDD）のテストフレームワーク
tags: [word, bdd, テスト]
date: 2023-11-30
---

## TL;DR

[[ruby|Ruby]] のための[[bdd|BDD]]（振る舞い駆動開発）のテストフレームワーク。公式サイトでは「Behaviour Driven Development for Ruby. Making TDD Productive and Fun.」とうたっている。

## 仕組み

rspec-core は、コードがどう振る舞うべきかを、実行できる例（example）として書くための構造を提供する。`describe` と `it` という言葉を使い、会話のように振る舞いを表す。rspec-core の gem を入れると `rspec` コマンドが入り、実行する例を選んだり、出力を調整したりできる。関連する gem に rspec-expectations、rspec-mocks、rspec-rails がある。

公式サイトは、`rspec --init` でプロジェクトを準備し、望む振る舞いを表す簡単な例を 1 つ書き、失敗を確かめてから実装する、という小さな手順で進めることを勧めている。

## 例

```ruby
# in spec/calculator_spec.rb
RSpec.describe Calculator do
  describe '#add' do
    it 'returns the sum of its arguments' do
      expect(Calculator.new.add(1, 2)).to eq(3)
    end
  end
end
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[bdd|BDD]]
- [[ruby|Ruby]]

## 出典

- [RSpec](https://rspec.info)
- [rspec/rspec-core](https://github.com/rspec/rspec-core)

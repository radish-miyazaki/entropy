---
title: dry-monads
aliases: [dry-monad]
description: Maybe や Result などのモナドを提供する Ruby の gem
tags: [word, ruby, 関数型プログラミング]
date: 2024-01-09
---

## TL;DR

Maybe や Result などの[[monad|モナド]]を提供する [[ruby|Ruby]] の gem。エラーや例外の処理と、関数の連結を簡潔に書ける。

## なぜ必要か

モナドを使うと、`nil` のチェックやエラー処理のために `if`/`else` を何重にも書かずに済む。

## 仕組み

主なモナドは次の 2 つである。

- **Maybe**: `nil` かもしれない値を、`Some(value)` か `None` で包む。`value_or` で安全に値を取り出せる。ただし `None` は、どこでその値が生じたかの情報を持たない
- **Result**（Either とも呼ぶ）: `Success` と `Failure` の 2 つの場合を持つ。`Failure(:user_not_found)` のように、失敗の理由を持たせられる

バージョン 1.0 からは `do` 記法に対応している。`do` 記法の中では、`yield` でモナドの値を取り出す。

## 例

どちらかの検索が `Failure` を返すと、そこで処理が止まり、その `Failure` が結果になる。

```ruby
user = yield find_user(params[:user_id])
address = yield find_address(params[:address_id])

Success(user.update(address_id: address.id))
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[monad|モナド]]
- [[functional-programming|関数型プログラミング]]

## 出典

- [dry-monads](https://dry-rb.org/gems/dry-monads/1.6/)

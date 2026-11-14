---
title: "Implementing the Repository pattern"
description: Python でリポジトリパターンを、抽象基底クラスによるインタフェースと、それを継承した実装に分けて書く方法
tags: [article, ddd, repository, python]
date: 2023-12-16
article-authors: []
site:
published:
url: https://arc.net/l/quote/utggkiza
---

## TL;DR

Python でリポジトリパターンを実装する方法。インタフェースを抽象基底クラスで定義し、実装はそれを継承し、ユースケースはインタフェースの型でリポジトリを受け取る。

## 内容

Python には言語レベルの[[interface|インタフェース]]がないので、リポジトリのインタフェースは[[abstract-base-class|抽象基底クラス]]（[abc モジュール](https://docs.python.org/ja/3/library/abc.html)）で表す。抽象メソッドとして `get_by_id` を定義し、`__getitem__` からそれを呼ぶようにしておくと、`repository[id]` の形で取り出せる。

```python
import abc
from domain.value_objects import ListingId
from domain.entities import Listing

class ListingRepository(metaclass=abc.ABCMeta):
    """
    An interface to listing repository
    """

    @abc.abstractmethod
    def get_by_id(id: ListingId) -> Listing:
        ...

    def __getitem__(self, index) -> Listing:
        return self.get_by_id(index)
```

実装はこの抽象基底クラスを継承して書く。記事では、辞書にエンティティを持つインメモリの実装を例にしている。

```python
from domain.repositories import ListingRepository
from domain.entities import Listing

class InMemoryListingRepository(ListingRepository):
    def __init__(self, items=None):
        if items is None:
            self.items = dict()
        self.items = items

    def get_by_id(self, id):
        return self.items[id]
```

ユースケースは具体的な実装ではなく抽象基底クラスの型でリポジトリを受け取る。そのため、ユースケースは保存先の詳細を知らずにエンティティを取り出して操作できる。

```python
from domain.value_objects import ListingId, BidderId, Money, Bid
from domain.repositories import ListingRepository

def place_bid_on_listing_use_case(listing_id: ListingId, bidder_id: BidderId,
                                  price: Money,
                                  listing_repository: ListingRepository):
    listing = listing_repository[listing_id]
    bid = Bid(bidder_id, price)
    listing.place_bid(bid)
```

## キーワード

- [[repository-pattern|リポジトリパターン]]
- [[interface|インタフェース]]
- [[abstract-base-class|抽象基底クラス]]
- [[python|Python]]
- [[domain-driven-design|ドメイン駆動設計]]

%%

## 自分の理解

同意できる点、疑問に思った点、試してみたいこと。書くときはこのコメントを外す
%%

## 関連

- [Implementing the Repository pattern using SqlAlchemy](https://dddinpython.com/index.php/2022/11/09/implementing-the-repository-pattern-using-sqlalchemy/)

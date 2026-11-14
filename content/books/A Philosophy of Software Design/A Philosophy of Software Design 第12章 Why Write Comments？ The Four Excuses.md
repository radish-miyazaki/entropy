---
title: A Philosophy of Software Design 第12章 Why Write Comments? The Four Excuses
description: コメントは抽象化に欠かせないものであり、コメントを書かない 4 つの言い訳にはどれも反論できると説く章
tags: [book-chapter, 設計]
date: 2023-12-25
book: "[[A Philosophy of Software Design]]"
chapter: 12
---

## TL;DR

- コメントは、コードで表現できない設計の情報を伝えるもので、[[abstraction|抽象化]]に欠かせない。
- 開発者がコメントを書かない 4 つの言い訳には、どれも反論できる。

## 内容

### コメントの役割

コードのコメントは、開発者がシステムを理解し、効率よく作業するためのドキュメントである。抽象化においても重要で、コメントがなければ[[complexity|複雑さ]]を隠すことはできない。いくら[[design|設計]]が優れていても、コメントがなければその価値は失われる。コメントを正しく書くと、システムの設計も良くなる。ただし、質の悪いコメントは逆に足かせになる。

開発者がコメントを書かない言い訳には、次の 4 つがある。

- [[self-documenting-code|良いコードは自己文書化されている]]（Good code is self-documenting.）
- コメントを書く時間がない（I don't have time to write comments.）
- コメントは古くなって誤解を招く（Comments get out of date and become misleading.）
- これまで見てきたコメントはどれも役に立たなかった（The comments I have seen are all worthless.）

### 良いコードは自己文書化されている

コードをうまく書けば、コメントは減らせる。しかし、コードで表現できない設計の情報は多い。インタフェースの非形式的な情報（[[A Philosophy of Software Design 第4章 Modules Should Be Deep|第4章 Modules Should Be Deep]]）、メソッドが何をなぜ行うのか、メソッドが意味を持つ条件、設計上の判断の理由などである。

「メソッドの振る舞いを知りたければ、実装を読めばよい」という主張もある。しかし、大規模な開発では現実的でない。実装を読むのは時間がかかり、苦痛を伴う。実装を読ませる前提に立つと、メソッドをできるだけ短くしようとして、[[shallow-module|浅いメソッド]]が大量に生まれる。結果として、トップレベルのメソッドを理解するために、何層にもネストした浅いメソッドを理解しなければならなくなる。

抽象化の目的は複雑さを隠すことであり、抽象化とは複雑なものを簡単に考えたり操作したりできるようにするものである。利用者がメソッドを使うためにそのコードを読まなければならないなら、それは抽象化とはいえない。コメントは抽象化の基本である。コメントのないメソッドの抽象化には、メソッド名と、引数や戻り値の名前と型しかなく、重要な情報が欠けている。たとえば、部分文字列を取り出すメソッドが `start` と `end` を受け取るとき、`end` の位置の文字を含むのか、`start > end` ならどうなるのかは分からない。コメントは自然言語で書くので、コードより厳密さには欠けるが、表現力は高い。

### コメントを書く時間がない

良いコメントはソフトウェアの保守性を高めるので、費やした労力はすぐに回収できる（[[continuous-investment|継続的な投資]]）。コメントを書くのに多くの時間はかからず、良いコメントを書いても開発時間が 10% 以上増えることはない。コメントを書くことを設計プロセスの一部に組み込むとよい。特に、クラスやメソッドのトップレベルのコメントは重要で、設計全体を改善する道具として働く（[[A Philosophy of Software Design 第15章 Write The Comments First|第15章 Write The Comments First]]）。

### コメントは古くなって誤解を招く

コメントを最新に保つのに、それほど労力はかからない。コメントを大きく変えるのはコードを大きく変えたときであり、コードの変更にかかる時間に比べれば、コメントの変更にかかる時間はずっと小さい。コメントを更新しやすくするには、重複を避ける、対応するコードの近くに置く、コードレビューで古いコメントを見つけるといった方法がある（[[A Philosophy of Software Design 第16章 Modifying Existing Code|第16章 Modifying Existing Code]]）。

### これまで見てきたコメントはどれも役に立たなかった

良いコメントを書くのは、方法さえ知っていれば難しくない（[[A Philosophy of Software Design 第13章 Comments Should Describe Things that Aren't Obvious from the Code|第13章 Comments Should Describe Things that Aren't Obvious from the Code]]）。

### 良いコメントの利点

コメントは、実装時に開発者の頭の中にあったが、コードで表現できなかった情報を共有するためのものである。これにより、他の開発者や将来の自分が、変更を素早く正確に行えるようになる。コメントがなければ元の開発者の意図を推測するしかなく、誤解のリスクがある。

コメントは、複雑さの 3 つの症状のうち 2 つの解決に役立つ（[[A Philosophy of Software Design 第2章 The Nature of Complexity|第2章 The Nature of Complexity]]）。変更に必要な情報を提供し、無関係な情報を無視できるようにすることで、[[cognitive-load|認知的負荷]]を減らせる。システムの構造に関する情報を提供し、変更の影響が及ぶ範囲を明らかにすることで、[[unknown-unknowns|未知の未知]]を減らせる。こうしてコメントは、複雑さの主な原因である[[dependency|依存関係]]を明確にし、[[obscurity|不明瞭さ]]をなくす。

## キーワード

- [[abstraction|抽象化]]
- [[self-documenting-code|良いコードは自己文書化されている]]
- [[shallow-module|浅いモジュール]]
- [[complexity|複雑さ]]
- [[cognitive-load|認知的負荷]]
- [[unknown-unknowns|未知の未知]]
- [[dependency|依存関係]]
- [[obscurity|不明瞭]]
- [[continuous-investment|継続的な投資]]

## 自分の理解

実装を読ませる前提でメソッドを短くするのは、[[refactoring|リファクタリング]]の基本の 1 つでもある。それが浅いメソッドを大量に生むという指摘は興味深い。

これまで見てきたコメントが役に立たなかったのは、良いコメントの書き方を知らずに書かれたコメントだったからだろう。

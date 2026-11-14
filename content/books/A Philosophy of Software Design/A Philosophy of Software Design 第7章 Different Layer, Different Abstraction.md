---
title: A Philosophy of Software Design 第7章 Different Layer, Different Abstraction
description: 隣り合うレイヤは異なる抽象化を提供するべきであり、似た抽象化は Pass-through methods や Pass-through variables として表れると説く章
tags: [book-chapter, 設計]
date: 2023-12-20
book: "[[A Philosophy of Software Design]]"
chapter: 7
---

## TL;DR

- 良い設計のシステムでは、各レイヤが上下のレイヤと異なる[[abstraction|抽象化]]を提供する。
- 隣り合うレイヤの抽象化が似ていると、[[pass-through-methods|Pass-through methods]] や Decorator、[[pass-through-variables|Pass-through variables]] として表れ、効果に見合わない複雑さを生む。

## 内容

### レイヤと抽象化

アプリケーションはレイヤで構成され、上位のレイヤは下位のレイヤが提供する機能を使う。良い設計のシステムでは、各レイヤがその上下のレイヤとは異なる抽象化を提供する。ある操作がメソッド呼び出しによってレイヤを上下に移動するのを追うと、呼び出しのたびに抽象化が変わる。似た抽象度のレイヤが隣り合っているなら、クラスの分け方に問題があるサインである。

### Pass-through methods

隣り合うレイヤの抽象化が似ていると、[[pass-through-methods|Pass-through methods]] という形で表れる。Pass-through method とは、別のメソッドを呼び出す以外にほとんど何もせず、シグネチャも呼び出し先とよく似ているメソッドである。これは[[red-flag|レッドフラグ]]の 1 つである。Pass-through method は、インタフェースの[[complexity|複雑さ]]を増やすだけで機能を増やさないので、[[shallow-module|浅いクラス]]を生む。また、クラス間で責務がきちんと分かれていないことも示している。

解決策は、[[single-responsibility-principle|単一責任の原則]]に沿うようにクラスを[[refactoring|リファクタリング]]することである。具体的には、下位のクラスを上位クラスの呼び出し元に直接公開する、クラス間で機能を分け直す、分けられないならクラスを統合する、の 3 つがある。

ただし、同じシグネチャを持つメソッドが常に悪いわけではない。重要なのは、各メソッドが機能に貢献しているかどうかである。たとえばディスパッチャは、呼び出し先と同じシグネチャを持つことが多い。しかし、複数のメソッドからどれを呼ぶかを選ぶ機能を持つので、Pass-through method ではない。OS のディスクドライバのように、1 つのインタフェースに複数の実装がある場合も問題ない。1 つの実装を使ったことがあれば他も使いやすいので、[[cognitive-load|認知的負荷]]はむしろ下がる。

### Decorator

[[decorator-pattern|Decorator パターン]]も浅いクラスを生みやすい。Decorator は既存のオブジェクトを受け取り、その機能を拡張する。Decorator は元のオブジェクトと同じか似たインタフェースを持ち、メソッドの多くは元のオブジェクトのメソッドを呼ぶだけになる。少しの機能を足すために多くの定型コードが必要になり、使いすぎると小さな機能ごとに浅いクラスが増える。Java の I/O がその例である（[[A Philosophy of Software Design 第4章 Modules Should Be Deep|第4章 Modules Should Be Deep]]）。

```java
FileInputStream fileStream = new FileInputStream(fileName);
BufferedInputStream bufferedStream = new BufferedInputStream(fileStream);
ObjectInputStream objectStream = new ObjectInputStream(bufferedStream);
```

新しい Decorator を作る前に、次の代替案を検討する。

- 元のクラスに新しい機能を直接追加できないか。機能がある程度汎用的で、元のクラスと論理的に関係し、元のクラスの利用者の大半が使う場合に有効である。Java なら、`InputStream` を作る人のほとんどは `BufferedInputStream` も作るので、統合したほうがよい
- 新しい機能が特定のユースケースに特化しているなら、そのユースケースのコードに統合できないか
- 既存の Decorator に機能を追加できないか
- 元のクラスとは独立したクラスとして実装できないか

### インタフェースと実装の抽象度

クラスのインタフェースと実装も、異なる抽象度を持つべきである。両者が似た抽象度なら、そのクラスはあまり深くない。たとえば、テキストエディタでテキストを扱うモジュールのインタフェースを行単位にすると、行の途中に文字を挿入したり選択範囲を削除したりするために、上位の UI レイヤが行の分割や結合をする必要が出てくる。インタフェースを文字単位にすれば、行の分割や結合をモジュールの中に閉じ込めて[[deep-module|深いモジュール]]にでき、UI レイヤのコードもシンプルになる。

### Pass-through variables

[[pass-through-variables|Pass-through variables]] は、長いメソッドの連鎖を通じて受け渡される変数である。途中のメソッドすべてがその存在を知る必要があるので、複雑さが増す。新しい変数を足すときに、関係するすべてのインタフェースとメソッドを変える必要が出ることもある。

解決策は 3 つある。1 つ目は、最上位と最下位のメソッドがすでに共有しているオブジェクトがないかを探すことである。2 つ目は、グローバル変数に入れることだが、アクセスが衝突するおそれがある。3 つ目は著者が勧める方法で、アプリケーションのグローバルな状態をまとめたコンテキストオブジェクトを導入することである。

ただし、コンテキストオブジェクト自体が Pass-through variable になるおそれがある。これを避けるには、システムの主要なオブジェクトに、コンテキストへの参照をインスタンス変数として持たせる。こうすると、コンテキストはどこからでも使えるが、明示的に表れるのはコンストラクタの引数だけになる。テストもしやすくなる。

コンテキストオブジェクトにも、グローバル変数と似た欠点がある。ある変数がなぜ存在し、どこで使われているのかが分かりにくい。ルールがないとコンテキストが肥大化し、見えにくい[[dependency|依存関係]]を生む。スレッドセーフの問題も起こりうる。欠点を抑えるために、コンテキスト内の変数はイミュータブルにするのが望ましい。

### まとめ

インタフェース、引数、関数、クラスなど、システムの要素はどれも開発者が学ぶ必要があるので、複雑さを増やす。その費用に見合う効果を得るには、その要素がなかった場合に生じる複雑さを取り除けなければならない。取り除けないなら、その要素を足さずに実装したほうがよい。異なるレイヤが同じ抽象化を持つ場合や Pass-through variables は、複雑さを増やすわりに機能をほとんど増やさない。

## キーワード

- [[abstraction|抽象化]]
- [[pass-through-methods|Pass-through methods]]
- [[pass-through-variables|Pass-through variables]]
- [[decorator-pattern|Decorator パターン]]
- [[shallow-module|浅いモジュール]]
- [[deep-module|深いモジュール]]
- [[single-responsibility-principle|単一責任の原則]]
- [[refactoring|リファクタリング]]
- [[red-flag|レッドフラグ]]
- [[cognitive-load|認知的負荷]]

## 自分の理解

Pass-through method は、単に委譲しているだけのメソッドのことで、「何もしない」というのが肝だ。Pass-through methods や Decorator は、増える複雑さ（費用）が著しく高い。

Pass-through variables は、React の props drilling をイメージすると分かりやすい。コンテキストオブジェクトは、Go の `context.Context` のようなものだと思う。コンテキストの変数をテスト用の値に差し替えるだけで済むので、テストしやすいのも分かる。

---
title: PHPerのための計算量入門
description: 時間計算量と空間計算量の測り方と、計算量を下げるべき場面・下げなくてよい場面を PHP 開発者向けに解説する発表
tags: [talk, php, phpカンファレンス2024]
date: 2024-12-22
speakers: [hanhan1978]
company:
event: "PHPカンファレンス2024"
held: 2024-12-22
slide: https://speakerdeck.com/hanhan1978/complexity101-for-phper
video:
---

## TL;DR

- PHP 開発者向けに、[[computational-complexity|計算量]]の考え方と測り方を紹介する発表。
- PHP や Laravel の組み込み関数にも計算量の大きいものがあるので、よく使う処理の計算量は把握しておく。ただし、データ量が少なければ可読性を優先する。

## 内容

### 時間計算量

時間計算量は、PHP のオペコードにおける `JUMP` の数で考えられ、[[big-o-notation|ビッグオー記法]]で表す。負荷試験でデータ量と処理時間の相関を取れば、時間計算量を確かめられる。

### 空間計算量

空間計算量は、[memory_get_usage](https://www.php.net/manual/ja/function.memory-get-usage.php) や [memory_get_peak_usage](https://www.php.net/manual/ja/function.memory-get-peak-usage.php) で確認できる。

### 計算量との付き合い方

Mackerel、New Relic、Datadog などのアラートで問題になるべく早く気づける環境を作り、該当箇所のオーダーを下げる。PHP や Laravel の組み込み関数の中にも `O(n)` 以上のものがあるので、よく使う処理の計算量は把握しておく。

ただし、常に改善すればよいわけではない。データ量が少なければどんなアルゴリズムでも計算量は小さいので、その場合は可読性を重視する。また、チューニングには限界があるので、複雑な仕様を単純にするよう提案することも大事である。

## キーワード

- [[computational-complexity|計算量]]
- 時間計算量
- 空間計算量
- [[big-o-notation|ビッグオー記法]]

%%

## 自分の理解

自社に持ち帰れそうな点、疑問に思った点。書くときはこのコメントを外す
%%

## 関連

- [プロポーザル](https://fortee.jp/phpcon-2024/proposal/ec0aee68-5c85-4c64-8582-d1263fecba22)
- 発表で紹介された参考文献
  - [数学ガール 乱択アルゴリズム](https://www.hyuki.com/girl/random.html)
  - [みんなのコンピュータサイエンス](https://www.shoeisha.co.jp/book/detail/9784798154824)
  - [アルゴリズムと計算量](https://www.kyoritsu-pub.co.jp/book/b10005147.html)
  - https://qiita.com/sj-i/items/836fa5a5e246961c40b6
  - https://www.techscore.com/blog/2016/08/08/開発新卒に捧ぐ%E3%80%81基本のアルゴリズムと計算量/

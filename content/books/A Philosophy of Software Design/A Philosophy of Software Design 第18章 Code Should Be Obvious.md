---
title: A Philosophy of Software Design › Code Should Be Obvious
description: 明白なコードとは何か、どう書くか、何がコードを不明瞭にするかを扱う章
tags: [book-chapter, 設計]
date: 2023-12-16
book: "[[A Philosophy of Software Design]]"
chapter: 18
---

## TL;DR

- 明白なコードとは、読み手があまり考えずに読めて、最初の推測が正しいコードである。
- 明白かどうかはコードレビューで他人に判断してもらうのが最良で、良い名前、一貫性、空白、コメントで明白にできる。

## 内容

### 明白なコードとは

コードが明白であるとは、あまり考えずに読めて、コードの動作や意味についての最初の推測が正しいことである。明白なコードは、[[obscurity|不明瞭]]なコードより必要なコメントが少ない。逆に、[[nonobvious-code|明白でないコード]]は、必要な情報を集めるのに多くの時間と労力がかかり、作業効率が下がり、誤解やバグを招く。これは[[red-flag|レッドフラグ]]の 1 つである。

コードが明白かどうかを判断する最良の方法は、コードレビューである。自分のコードを読んだ誰かが分かりにくいと言ったら、自分には明白に見えても、そのコードは明白ではない。

### コードを明白にする技法

- **良い名前を選ぶ**（[[A Philosophy of Software Design 第14章 Choosing Names|第14章 Choosing Names]]）: コードの動作を明確にし、コメントの必要性を減らす
- **一貫性を保つ**（[[A Philosophy of Software Design 第17章 Consistency|第17章 Consistency]]）: 似たことを似た方法で行えば、読み手がパターンを認識できる
- **空白を適切に使う**: 関数の引数の説明を引数ごとに改行する、メソッド内のコードブロックを空行で区切る、文の構造を明確にする
- **コメントを書く**: 不足している情報を補う（[[A Philosophy of Software Design 第12章 Why Write Comments？ The Four Excuses|第12章 Why Write Comments? The Four Excuses]]）。ただし、何が読み手を混乱させるか、どんな情報がその混乱を解消するかを、読み手の立場で考える必要がある

### コードを不明瞭にするもの

#### イベント駆動型プログラミング

[[event-driven-programming|イベント駆動型プログラミング]]では、マウスボタンの押下やパケットの到着などのイベントが起きると、あるモジュールが他の部分に通知し、あらかじめ登録された関数が呼ばれる。イベントハンドラは直接呼ばれず、イベントモジュールが関数ポインタやインタフェースを通じて間接的に呼ぶので、制御の流れを追いにくい。対策として、ハンドラのインタフェースのコメントに、いつ呼ばれるかを書く。

```java
/**
 * This method is invoked in the dispatch thread by a transport if a
 * transport-level error prevents an RPC from completing.
 */
void Transport::RpcNotifier::failed() {
    ...
}
```

#### 汎用的なコンテナ

汎用的なコンテナとは、Java の `Pair` や C++ の `std::pair` のように、2 つ以上の要素を 1 つのオブジェクトにまとめるクラスである。

```java
return new Pair<Integer, Boolean>(currentTerm, false);
```

呼び出し側は `result.getKey()` や `result.getValue()` で値を取り出すが、それぞれの値が何を意味するのか分からない。対策として、汎用的なコンテナを使わず、用途に特化したクラスを定義して要素に意味のある名前を付ける。コメントで情報を補うこともできる。

#### 宣言と実際の型が異なるコード

```java
private List<Message> incomingMessageList;
...
incomingMessageList = new ArrayList<Message>();
```

`List` は `ArrayList` の上位の型なのでコンパイルは通る。しかし、`ArrayList` は `List` の他の実装と性能やスレッドセーフの特性が異なるので、読み手を誤解させうる。宣言と実際の型は一致させる。

#### 読み手の期待に反するコード

通常、メインプログラムが終わるとアプリケーションも終了する。しかし次のコードでは、`RaftClient` のコンストラクタが追加の[[thread|スレッド]]を作るので、メインスレッドが終わってもアプリケーションは動き続ける。

```java
public static void main(String[] args) {
    ...
    new RaftClient(myAddress, serverAddresses);
}
```

このように読み手が期待しない振る舞いをする場合は（[[principle-of-least-astonishment|驚き最小の原則]]）、`RaftClient` のコンストラクタのインタフェースか、呼び出しの直前に、別のスレッドで動き続けることをコメントで書く。

### まとめ

コードが明白であるとは、読み手が常にそのコードに関する重要な情報を持っていることである。コードを明白にする方法は 3 つある。抽象化や特殊なケースの排除などの設計の技法で、必要な情報を減らす。慣習に従い、期待どおりに振る舞うことで、読み手がすでに知っている情報を活かす。良い名前やコメントで、必要な情報をコードの中に示す。

## キーワード

- [[nonobvious-code|明白でないコード]]
- [[obscurity|不明瞭]]
- コードレビュー
- [[event-driven-programming|イベント駆動型プログラミング]]
- [[principle-of-least-astonishment|驚き最小の原則]]
- [[thread|スレッド]]
- [[red-flag|レッドフラグ]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

---
title: 健全なマクロ
aliases: [Hygienic macro]
description: マクロ展開で同じ名前の識別子が生まれても、名前の衝突による問題が起きないことが保証されたマクロ
tags: [word]
date: 2024-04-30
---

## TL;DR

[[macro|マクロ]]を展開する過程で、見かけ上同じ識別子が生まれても（名前が衝突しても）、意図しない問題が起きないことが保証されたマクロ。ハイジェニックマクロとも呼ぶ。

## なぜ必要か

健全なマクロの機能を持たない言語では、マクロ展開の中で作った変数の束縛が、すでにある変数の束縛を隠してしまうことがある。これを不健全なマクロという。

## 例

C のマクロは健全ではない。次のコードでは、`incr` の中で宣言した `a` が呼び出し側の `a` を隠すので、`incr(a)` は外側の `a` を増やさない。

```c
#define incr(X) {int a=0; ++X;}
int main (void) {
  int a=0, b=0;
  incr(a);
  incr(b);
  printf("a=%d, b=%d\n", a, b);
  return 0;
}

/* 展開後 */
int main (void) {
  int a=0, b=0;
  {int a=0; ++a;}
  {int a=0; ++b;}               /* ここで a が再宣言されている */
  printf("a=%d, b=%d\n", a, b); /* a=0, b=1 */
  return 0;
}
```

[[clojure|Clojure]] では、構文クォートの中で名前空間の修飾のない名前に `#` を付けると、アンダースコアとユニークな ID を付けた名前のシンボル（auto-gensym）が自動で作られる。これで名前の衝突を避けられる。

```clojure
(defmacro unless [test then else]
  `(let [x# ~test]
     (if (not x#)
       ~then
       ~else)))

(let [x 10]
  (unless false
    (printf "x: %s%n" x) ;; x: 10
    (println "TRUE")))

(use 'clojure.walk)
;; 展開処理
(macroexpand-all '(let [x 10]
  (unless false
    (printf "x: %s%n" x)
    (println "TRUE"))))

;; 展開結果
(let* [x 10]
  (let* [x__2__auto__ false]
    (if (clojure.core/not x__2__auto__)
      (printf "x: %s%n" x)
      (println "TRUE"))))
```

[[Effective Rust 項目28 分別をもってマクロを使おう|Effective Rust 項目28]] によると、[[rust|Rust]] では `macro_rules!` を使う[[declarative-macro|宣言的マクロ]]が健全なマクロである。

## 自分の理解

[[common-lisp|Common Lisp]] でも同じ問題が起きることがあり、そのときは `gensym` を使って回避した記憶がある。Clojure については、ちょうど探していた内容の記事があった。

## 関連

- [[macro|マクロ]]
- [[declarative-macro|宣言的マクロ]]

## 出典

- [健全なマクロ - Wikipedia](https://ja.wikipedia.org/wiki/健全なマクロ)
- [On Lisp: 変数捕捉](https://www.asahi-net.or.jp/~kc7k-nd/onlispjhtml/variableCapture.html)
- [Clojure のマクロの健全性についての記事（Qiita）](https://qiita.com/lagenorhynque/items/1b4dbd82490729126e36)
- [[Effective Rust 項目28 分別をもってマクロを使おう]]

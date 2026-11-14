---
title: VSCode でも Pretty Symbols を表示したい
description: Spacemacs の Clojure レイヤーにある Pretty Symbols を Visual Studio Code でも使いたいので、Spacemacs の実装を調べた
tags: [blog]
date: 2025-05-17
draft: false
---

## TL;DR

- [[spacemacs|Spacemacs]] の Clojure レイヤーにある Pretty Symbols と同じことを [[visual-studio-code|Visual Studio Code]] でしたいが、既存の拡張が見つからなかった。
- Spacemacs の `clojure/fancify-symbols` 関数の実装を調べ、これを参考に拡張を自作することにした。

## 背景

Spacemacs の Clojure レイヤーでは、設定値 `clojure-enable-fancify-symbols` を有効にすると、一部のシンボルが記号に置き換わって表示される（[Pretty Symbols](https://www.spacemacs.org/layers/+lang/clojure/README.html#pretty-symbols)）。具体的には次のように変わる。

| 元の表記  | 表示     |
| --------- | -------- |
| `fn`      | `λ`      |
| `#(...)`  | `ƒ(...)` |
| `#{...}`  | `∈{...}` |
| `partial` | `Ƥ`      |
| `comp`    | `∘`      |

[[clojure|Clojure]] を VSCode で書くときにも同じ表示にしたくて色々と調べたが、そのような拡張はなさそうだった。そこで、自分で拡張を作ることにした。

## 検証

Spacemacs では、[layers/+lang/clojure/funcs.el の `clojure/fancify-symbols`](https://github.com/syl20bnr/spacemacs/blob/72dbf0c45b36096a896a37cead05a8238352f816/layers/%2Blang/clojure/funcs.el#L28-L52) 関数でシンボルを置き換えている。`font-lock-add-keywords` で正規表現にマッチした範囲を、`compose-region` で記号に合成して表示している。

```elisp
(defun clojure/fancify-symbols (mode)
  "Pretty symbols for Clojure's anonymous functions and sets,
   like (λ [a] (+ a 5)), ƒ(+ % 5), and ∈{2 4 6}."
  (font-lock-add-keywords mode
                          `(("(\\(fn\\)[[[:space:]]"
                             (0 (progn (compose-region (match-beginning 1)
                                                       (match-end 1) "λ")
                                       nil)))
                            ("(\\(partial\\)[[[:space:]]"
                             (0 (progn (compose-region (match-beginning 1)
                                                       (match-end 1) "Ƥ")
                                       nil)))
                            ("(\\(comp\\)[[[:space:]]"
                             (0 (progn (compose-region (match-beginning 1)
                                                       (match-end 1) "∘")
                                       nil)))
                            ("\\(#\\)("
                             (0 (progn (compose-region (match-beginning 1)
                                                       (match-end 1) "ƒ")
                                       nil)))
                            ("\\(#\\){"
                             (0 (progn (compose-region (match-beginning 1)
                                                       (match-end 1) "∈")
                                       nil))))))
```

これを参考に、VSCode の拡張を作る。

## キーワード

- [[spacemacs|Spacemacs]]
- [[visual-studio-code|Visual Studio Code]]
- [[clojure|Clojure]]

## 参考

- https://www.spacemacs.org/layers/+lang/clojure/README.html#pretty-symbols
- https://github.com/syl20bnr/spacemacs/blob/72dbf0c45b36096a896a37cead05a8238352f816/layers/%2Blang/clojure/funcs.el#L28-L52

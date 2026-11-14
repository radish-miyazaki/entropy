---
title: RayCast から DevDocs を開くようにする
description: Dash がサブスクリプションになったので、代わりに Raycast のプラグインから DevDocs を開くようにした
tags: [blog]
date: 2024-08-06
draft: false
---

## TL;DR

- [[dash|Dash]] が v7 からサブスクリプションになったようなので、代わりに [[raycast|Raycast]] のプラグインから [[devdocs|DevDocs]] を開くようにした。
- ただ、IDE との連携を考えると Dash のほうが便利である。

## 背景

久しぶりに Dash を入れようとしたところ、v7 から買い切りではなくサブスクリプションになったようだった。そこで、ブラウザで使える代わりのサービスである DevDocs を、Raycast から開くようにした。

## 検証

Raycast に DevDocs のプラグインを入れた。ショートカットに `Command + Shift + D` を割り当てると使いやすい。ドキュメントのデータをブラウザに保存しておけば、オフラインでも読めるようである。

## 考察

IDE との相性を考えると、Dash に軍配が上がる。ネイティブアプリは強い。DevDocs で不便を感じたときにだけ、Dash の導入を検討する。

## キーワード

- [[dash|Dash]]
- [[raycast|Raycast]]
- [[devdocs|DevDocs]]

## 参考

- [Dash 7](https://blog.kapeli.com/dash-7)
- [DevDocs - Raycast Store](https://www.raycast.com/djpowers/devdocs)

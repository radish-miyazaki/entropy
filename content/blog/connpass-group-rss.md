---
title: Connpass の特定のグループのイベントを RSS Reader で受け取る
description: Connpass のグループページにある Atom フィードの URL を RSS リーダーに登録すると、新しいイベントを受け取れる
tags: [blog, rss, connpass]
date: 2025-05-16
draft: false
---

## TL;DR

- Connpass のグループのページには、`rel="alternate"` の `<link>` タグで Atom フィードの URL が書かれている。
- その URL を RSS リーダーに登録すると、グループの新しいイベントを受け取れる。

## 背景

Connpass の特定のグループで新しいイベントが公開されたら、プッシュ通知で知りたかった。ところが、Connpass のアプリはいつの間にか消えていた。

## 検証

1. 対象のグループのページで、ブラウザの DevTools を開く
2. `rel` 属性が `"alternate"` の `<link>` タグを探す

```html
<link
  rel="alternate"
  title="グループイベント Atom"
  type="application/atom+xml"
  href="https://xxx.connpass.com/ja.atom"
/>
```

3. `href` 属性の URL（この例では `https://xxx.connpass.com/ja.atom`）を、自分の RSS リーダーに登録する

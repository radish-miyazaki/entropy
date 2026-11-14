---
title: the Svelte philosophy
description: Svelte のメンテナである Rich Harris が、Svelte の設計を導く 10 の考え方をまとめた GitHub Discussions の投稿
tags: [article, svelte]
date: 2025-01-31
article-authors: [Rich Harris]
site: GitHub Discussions
published: 2024-01-04
url: https://github.com/sveltejs/svelte/discussions/10085
---

## TL;DR

- Rich Harris が、[[svelte|Svelte]] の設計を導く 10 の考え方をまとめた投稿である。
- 速さや採用数よりも使い心地を大切にし、HTML を土台に、少ない API で直感的に使えることを目指している。

## 内容

1. The web matters: Web はとても大切だが、生き残る保証はない。Svelte の仕事は Web を守りたいという動機に基づいている。
2. Optimise for vibes: 人が Svelte を選ぶのは、その美学が好きだからである。速さや小ささを追うより、使い心地が最もよいフレームワークを目指す。
3. Don't optimise for adoption: 人気は目標ではない。Web 開発の流行に逆らうことになっても、最もよいフレームワークを目指す。
4. HTML, The Mother Language: HTML は UI を表す強力な手段である。HTML を JavaScript の後ろに隠すより、HTML を中心にするほうが自然なので、Svelte は対話的な UI のために HTML を拡張する。
5. Embrace progress: バンドラや TypeScript がなかった時代を美化しない。技術に楽観的でいて、ほかのフレームワークの新しいアイデアから学ぶ。
6. Numbers lie: Lighthouse のような指標は診断の道具であって、目標ではない。設計は質的な判断で決め、数字はその材料の一つにする。
7. Magical, not magic: Svelte は中身の見えない魔法ではなく、力を与えてくれるものと感じられるべきである。Svelte 3 は説明のない挙動に寄りすぎたので、Svelte 5 でそれを直す。
8. Dream big: 「適切な道具を選べ」で妥協せず、どんなアプリでも [[sveltekit|SvelteKit]] が最良の選択になるにはどうすればよいかを考える。
9. No-one cares: ほとんどの人はフレームワークに関心がない。だから Svelte は直感的で、覚える API が少なく、メモ化のような手動の最適化が要らず、ドキュメントを見つけやすくあるべきである。
10. Design by consensus: Svelte はコミュニティが動かす。計画は公開して共有し、全員の合意が得られなくても、反対意見を聞いて検討する。

## キーワード

- [[svelte|Svelte]]
- [[sveltekit|SvelteKit]]

%%

## 自分の理解

同意できる点、疑問に思った点、試してみたいこと。書くときはこのコメントを外す
%%

---
title: useRef
aliases: []
description: レンダー時に不要な値を参照するための React の Hook で、値を変えても再レンダリングは起きない
tags: [word, react]
date: 2024-09-06
---

## TL;DR

レンダー時には不要な値を参照するための [[react-hooks|React の Hook]]。

> レンダー時には不要な値を参照するための React フックです。

## 仕組み

`useRef` は初期値を受け取り、それを `current` プロパティに持つオブジェクトを返す。初回のレンダリング以降、初期値は無視され、常に同じオブジェクトが返される。

## 注意点

`current` の値を変更しても、再レンダリングは起き**ない**。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[react-hooks|React Hooks]]
- [[use-state|useState]]

## 出典

- [useRef – React](https://ja.react.dev/reference/react/useRef)

---
title: React Native
aliases: []
description: React とプラットフォームのネイティブ機能を使って、Android と iOS のアプリケーションを作るオープンソースのフレームワーク
tags: [word, react, モバイル]
date: 2026-11-14
---

## TL;DR

[[react|React]] とプラットフォームのネイティブ機能を使って、Android と iOS のアプリケーションを作るオープンソースのフレームワーク。

## 仕組み

Android と iOS の開発では、ビュー（view）が UI の基本的な部品である。テキストやボタンのような小さな要素もビューで、Android では [[kotlin|Kotlin]] や [[java|Java]]、iOS では Swift や Objective-C で書く。

React Native では、これらのビューを JavaScript から React のコンポーネントとして呼び出せる。実行時に、React Native がコンポーネントに対応する Android と iOS のビューを作る。同じネイティブのビューを使うので、作ったアプリケーションは、ほかのアプリケーションと同じ見た目、操作感、性能になる。

React Native には、すぐに使えるネイティブのコンポーネントがコアコンポーネントとして用意されている。

| React Native   | Android        | iOS              | Web                      |
| -------------- | -------------- | ---------------- | ------------------------ |
| `<View>`       | `<ViewGroup>`  | `<UIView>`       | スクロールしない `<div>` |
| `<Text>`       | `<TextView>`   | `<UITextView>`   | `<p>`                    |
| `<Image>`      | `<ImageView>`  | `<UIImageView>`  | `<img>`                  |
| `<ScrollView>` | `<ScrollView>` | `<UIScrollView>` | `<div>`                  |
| `<TextInput>`  | `<EditText>`   | `<UITextField>`  | `<input type="text">`    |

コアコンポーネントのほかに、自分でネイティブのコンポーネントを作ったり、コミュニティのものを使ったりもできる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[react|React]]
- [[expo|Expo]]
- [[nativewind|NativeWind]]
- [[tamagui|Tamagui]]
- [[expo-ui|Expo UI]]

## 出典

- [Core Components and Native Components · React Native](https://reactnative.dev/docs/intro-react-native-components)

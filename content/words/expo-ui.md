---
title: Expo UI
aliases: []
description: SwiftUI や Jetpack Compose を使って、React Native からネイティブな UI を組み立てるためのコンポーネント群
tags: [word, react-native, expo]
date: 2025-08-08
---

## TL;DR

[[swiftui|SwiftUI]] や [[jetpack-compose|Jetpack Compose]] を使って、ネイティブな UI を構築するための [[expo|Expo]] のコンポーネント群（`@expo/ui`）。

> a set of native input components that allows you to build fully native interfaces with Jetpack Compose and SwiftUI.

## 仕組み

公式ドキュメントによると、Android 向けには Jetpack Compose のコンポーネント（Button、Card、Switch、TextField、LazyColumn など）、iOS 向けには SwiftUI のコンポーネント（Button、List、Form、Toggle、NavigationStack など）を提供する。Android、iOS、Web で動く共通のコンポーネントもある。

## 注意点

2025 年 8 月 8 日の時点ではアルファ版で、破壊的変更が頻繁に入るとされていた。また、Expo Go では使えず、開発ビルドで試す必要があった。

> This library is currently in alpha and will frequently experience breaking changes.
> It is not available in the Expo Go app – use development builds to try it out.

その後の公式ドキュメントでは、SDK 56 以降で本番利用できるパッケージとして紹介され、Expo Go にも含まれている。

## 自分の理解

（アルファ版の当時）Expo Go が使えないのは痛いと感じた。

## 関連

- [[expo|Expo]]
- [[react-native|React Native]]
- [[react-native-expo-first-try|React Native + Expo を触ってみる]]

## 出典

- [Expo UI（公式ドキュメント）](https://docs.expo.dev/versions/latest/sdk/ui/)
- https://zenn.dev/gemcook/articles/fa0a5831bccf90
- https://www.issoh.co.jp/tech/details/8060/

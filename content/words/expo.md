---
title: Expo
aliases: []
description: Android、iOS、Web で動くアプリを 1 つの JavaScript / TypeScript のプロジェクトで作るための React Native のフレームワーク
tags: [word, react-native, モバイル]
date: 2026-11-14
---

## TL;DR

Android と iOS のアプリ開発を簡単にする React Native のフレームワーク。1 つの JavaScript / TypeScript のプロジェクトから、Android、iOS、Web で動くアプリを作れる。オープンソースで開発されている。

## 仕組み

公式ドキュメントによると、Expo はファイルベースのルーティング（Expo Router）と、カメラや通知などの端末の機能を使うネイティブモジュールの標準ライブラリ（Expo SDK）を提供する。SDK のモジュールは自分で作ることもできる。プロジェクトは `create-expo-app` で作る。

開発の各段階を補うサービスとして、Expo Services（EAS）もある。ビルドやリリースの自動化、Web へのデプロイなどを行える。ローカルの準備なしにブラウザで試せる Snack もある。

## 例

- [[expo-ui|Expo UI]] は、SwiftUI や Jetpack Compose を使ってネイティブな UI を作るための Expo のコンポーネント群である。
- [[react-native-expo-first-try|React Native + Expo を触ってみる]]では、公式チュートリアルを読みながら Expo でアプリを作った。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[expo-ui|Expo UI]]
- [[react|React]]

## 出典

- [Expo Documentation](https://docs.expo.dev/)
- [Introduction - Expo Documentation](https://docs.expo.dev/get-started/introduction/)

---
title: React Native + Expo を触ってみる
description: Expo の公式チュートリアルを進めながら、React Native と Expo のライブラリで出てきた基本的な API をまとめた
tags: [blog, react, expo]
date: 2025-04-04
draft: false
---

## TL;DR

- [[react-native|React Native]] を触ったことがなかったので、[Expo のチュートリアル](https://docs.expo.dev/tutorial/introduction/)を読みながらキャッチアップした。
- React Native の基本コンポーネントと、ジェスチャー、アニメーション、ナビゲーション、画像、メディアライブラリを扱うライブラリの API をまとめた。

## 背景

React Native を触ったことがなかったので、Expo の公式チュートリアルと [Zenn の解説](https://zenn.dev/hayato94087/books/9ba8aa1f337dd5)を読みながら、[[expo|Expo]] でアプリを作った。

## 検証

### React Native

[View](https://reactnative.dev/docs/view) は UI のレイアウトを組むためのコンテナで、子要素を Flexbox で配置したりスタイルを当てたりできる。[[dom|DOM]] の `<div>` に近い。[Text](https://reactnative.dev/docs/text) は文字列を表示するコンポーネントで、フォントサイズや色などを指定でき、ネストすれば部分的にスタイルを変えられる。スタイルは [`StyleSheet.create()`](https://reactnative.dev/docs/stylesheet#create) で [[css|CSS]] のように定義する。

[Pressable](https://reactnative.dev/docs/pressable) は、タップや長押しなどのプレス操作を検出する汎用的なコンポーネントで、押している間のスタイル変更など、操作に応じた見た目を細かく制御できる。[Button](https://reactnative.dev/docs/button) より柔軟である。[Modal](https://reactnative.dev/docs/modal) は、ダイアログのように現在の画面の上に一時的にコンテンツを表示する。表示・非表示は `visible`、アニメーションは `animationType` で指定する。

[FlatList](https://reactnative.dev/docs/flatlist) は、大量のデータをスクロールで効率よく表示するコンポーネントである。画面に見えている要素だけを描画する仮想化（virtualization）で、メモリ使用量とパフォーマンスを最適化する。ヘッダ、フッタ、区切り線、Pull to Refresh にも対応している。[Platform](https://reactnative.dev/docs/platform) は、`Platform.OS` のように実行中のプラットフォームを調べるモジュールである。

### React Native Gesture Handler

[React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/) はタッチジェスチャーを扱うライブラリである。ジェスチャーを認識させるには、アプリの最上位かジェスチャーを扱う View の階層のルートに [GestureHandlerRootView](https://docs.swmansion.com/react-native-gesture-handler/docs/fundamentals/installation/#2-wrap-your-app-with-gesturehandlerrootview-component) を置き、対象を [GestureDetector](https://docs.swmansion.com/react-native-gesture-handler/docs/gestures/gesture-detector) で包む。

`Gesture.Tap()` はタップを定義するビルダ関数で、[`numberOfTaps()`](https://docs.swmansion.com/react-native-gesture-handler/docs/gestures/tap-gesture#numberoftapsvalue-number) で必要なタップ回数を、[`onStart()`](https://docs.swmansion.com/react-native-gesture-handler/docs/gestures/tap-gesture#onstartcallback) で認識されたときの処理を指定する。`Gesture.Pan()` はドラッグやスワイプを定義し、[`onChange()`](https://docs.swmansion.com/react-native-gesture-handler/docs/gestures/pan-gesture#onchangecallback) のコールバックは指が動くたびに、移動量などを含むイベントを受け取って呼ばれる。

### React Native Reanimated

[React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) はアニメーションのライブラリである。[`useSharedValue`](https://docs.swmansion.com/react-native-reanimated/docs/core/useSharedValue) は、アニメーションの状態を持ち、JavaScript スレッドと UI スレッドで共有できる値を作るフックである。この値の変更はリアクティブで、参照しているスタイルの再計算を自動で引き起こす。

[`useAnimatedStyle`](https://docs.swmansion.com/react-native-reanimated/docs/core/useAnimatedStyle) は、共有値の変化に応じてスタイルを計算するフックである。処理は UI スレッドで実行されるので、アニメーションが速い。返したスタイルを [`<Animated.View>` や `<Animated.Image>`](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/glossary/#animated-component) の `style` に渡すと、アニメーションが適用される。[`withSpring`](https://docs.swmansion.com/react-native-reanimated/docs/animations/withSpring) は、`sharedValue.value = withSpring(目標値)` のように書き、共有値をばねのような動きで変化させる。

### 画像のキャプチャ

[react-native-view-shot](https://github.com/gre/react-native-view-shot) の [`captureRef()`](https://github.com/gre/react-native-view-shot?tab=readme-ov-file#capturerefview-options-lower-level-imperative-api) は、[[use-ref|useRef]] で取った `<View>` とその子要素を、画像として非同期でキャプチャする。

[dom-to-image](https://github.com/tsayen/dom-to-image#readme) は React Native 固有のライブラリではなく、ブラウザ環境で動く。`toJpeg()` は DOM ノードを受け取り、その見た目を JPEG に変換して、Base64 でエンコードしたデータ URI を返す。

### Expo のライブラリ

[Expo Router](https://docs.expo.dev/versions/latest/sdk/router/) は、[React Navigation](https://reactnavigation.org/) をもとに Expo 向けに拡張したモジュールである。[Tabs](https://docs.expo.dev/router/advanced/tabs/) は React Navigation の [Bottom Tabs Navigator](https://reactnavigation.org/docs/bottom-tab-navigator/) を包んだもので、下部のタブをタップして画面を切り替える。各タブの画面は `Tabs.Screen` で指定する。[Stack](https://docs.expo.dev/router/advanced/stack/) は [Native Stack Navigator](https://reactnavigation.org/docs/native-stack-navigator/) を包んだもので、画面を積み重ねて遷移するので、ユーザは画面を進んだり戻ったりできる。各画面は `Stack.Screen` で定義する。[Link](https://docs.expo.dev/versions/latest/sdk/router/#link) は画面間をリンクで移動するコンポーネントで、DOM の `<a>` にあたる。

[Expo Image](https://docs.expo.dev/versions/latest/sdk/image/) の `Image` は画像を表示するコンポーネントで、[React Native の同名のコンポーネント](https://reactnative.dev/docs/image)より速い。`source` に渡すデータの型は `ImageSource` である。[Expo Vector Icons](https://docs.expo.dev/guides/icons/) は [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) をもとにしていて、同じ API を持つ。`Ionicons` や `MaterialIcons` で、[Ionicons](https://ionic.io/ionicons) や [Material Icons](https://fonts.google.com/icons?icon.set=Material+Icons) のアイコンを使える。

[Expo ImagePicker](https://docs.expo.dev/versions/latest/sdk/imagepicker/) の `launchImageLibraryAsync(options)` は、端末のメディアライブラリを開いて画像や動画を選ばせ、選ばれたファイルのローカル URI や幅、高さなどを返す。[Expo MediaLibrary](https://docs.expo.dev/versions/latest/sdk/media-library/) の `usePermissions()` は、メディアライブラリへのアクセス許可の状態と、許可を求める関数を返す [[react-hooks|React Hooks]] である。`saveToLibraryAsync()` は、ローカルファイルの URI を受け取ってメディアライブラリに保存する。

[Expo StatusBar](https://docs.expo.dev/versions/latest/sdk/status-bar/) の `StatusBar` は、画面上端のステータスバーの文字色、背景色、表示・非表示、半透明などを設定する。[Expo SplashScreen](https://docs.expo.dev/versions/latest/sdk/splash-screen/) は、明示的に隠すまで[[splash-screen|スプラッシュスクリーン]]を表示し続けるためのモジュールである。

## 考察

Expo Router は使ったことがない。React Navigation のドキュメントを見る限り宣言的ではないので、扱いやすく包んでいるのだろうか。

## キーワード

- [[react-native|React Native]]
- [[expo|Expo]]
- [[dom|DOM]]
- [[css|CSS]]
- [[use-ref|useRef]]
- [[react-hooks|React Hooks]]
- [[splash-screen|スプラッシュスクリーン]]

## 参考

- https://docs.expo.dev/tutorial/introduction/
- https://zenn.dev/hayato94087/books/9ba8aa1f337dd5

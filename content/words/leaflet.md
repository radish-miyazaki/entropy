---
title: Leaflet
aliases: []
description: インタラクティブな地図を作るためのオープンソースの JavaScript ライブラリ
tags: [word, javascript, 地図]
date: 2025-05-12
---

## TL;DR

インタラクティブな地図を作るための、オープンソースの [[javascript|JavaScript]] ライブラリ。[[react|React]] から使うための [React Leaflet](https://react-leaflet.js.org/) もある。

## 仕組み

Leaflet の JavaScript は約 40 KB と軽く、依存するライブラリがない。主要なデスクトップとモバイルのプラットフォームで動き、多くのプラグインで機能を足せる。[[typescript|TypeScript]] の型定義も含まれている。

地図を表示する要素を用意し、初期表示の位置とズームを指定して地図を作る。そこに [[openstreetmap|OpenStreetMap]] などのタイルレイヤーを追加し、マーカーやポップアップを重ねていく。

## 例

公式の Quick Start Guide（Leaflet 2.0 のベータ版）では、高さを指定した `div` に地図を作り、OpenStreetMap のタイルとマーカーを置く。地図を表示する要素には高さが必要である。

```html
<div id="map" style="height: 400px"></div>
<script type="module">
  import { LeafletMap, TileLayer, Marker } from "leaflet"

  const map = new LeafletMap("map").setView([51.505, -0.09], 13)

  new TileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map)

  const marker = new Marker([51.5, -0.09]).addTo(map)
  marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup()
</script>
```

## 注意点

OpenStreetMap のタイルを使うときは、帰属表示（attribution）が必要である。公式ガイドは、本番で使う前に OpenStreetMap のタイル利用ポリシーを読むよう勧めている。Leaflet 2.0 のガイドは `LeafletMap` などのクラスを import して使う。`L.map` のようなグローバルの `L` は、従来形式のスクリプトを読み込んだときだけ使える。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[openstreetmap|OpenStreetMap]]
- [[geojson|GeoJSON]]
- [[gpx|GPX]]

## 出典

- [Leaflet](https://leafletjs.com/)
- [Quick Start Guide - Leaflet](https://leafletjs.com/examples/quick-start/)
- [React Leaflet](https://react-leaflet.js.org/)

---
title: OpenLayers
aliases: []
description: Web ページに動的な地図を表示するための、オープンソースの JavaScript ライブラリ
tags: [word, javascript, 地図]
date: 2025-05-30
---

## TL;DR

Web ページに動的な地図を表示するための [[javascript|JavaScript]] ライブラリ。さまざまな配信元の地図タイル、ベクタデータ、マーカーを表示できる。2-clause BSD License のオープンソースである。

## 仕組み

タイルレイヤでは、OpenStreetMap、Bing、Mapbox などや、任意の XYZ 形式の配信元からタイルを読み込める。OGC の地図サービスにも対応している。ベクタレイヤでは、GeoJSON、TopoJSON、KML、GML、Mapbox Vector Tiles などの形式を描画できる。

描画には Canvas 2D と WebGL を使い、モバイルにも標準で対応している。必要なコンポーネントだけを含めた軽量なビルドも作れる。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[leaflet|Leaflet]]

## 出典

- [OpenLayers](https://openlayers.org/)

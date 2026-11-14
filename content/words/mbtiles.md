---
title: MBTiles
aliases: []
description: マップタイルを SQLite データベースに保存して配布するためのフォーマット
tags: [word, 地図]
date: 2025-05-13
---

## TL;DR

マップタイルを SQLite のデータベース形式で保存・配布するためのフォーマット。Mapbox 社が考案した。拡張子は `.mbtiles`。

## 仕組み

MBTiles の仕様によると、MBTiles は任意のタイル化した地図データを SQLite のデータベースに保存し、すぐに使えて効率よく転送できるようにするための仕様である。保存するのは描画済みのタイルで、生の地理データではない。生のデータを保存する [[geojson|GeoJSON]] や Spatialite などとはここが違う。画像（ラスタ）のタイルとベクタのタイルを扱える。

仕様はデータの取り出し方だけを最小限に定めているので、実装の内部では圧縮や最適化をしてよい。

## 注意点

1 つの MBTiles ファイルは 1 つのタイルセットを表す。複数のレイヤや地図を扱うには、ファイルを分ける。表示に使える投影法は球面メルカトルだけで、範囲や中心などのメタデータは緯度経度で書く。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[openstreetmap|OpenStreetMap]]
- [[qgis|QGIS]]
- [[geojson|GeoJSON]]

## 出典

- [mapbox/mbtiles-spec](https://github.com/mapbox/mbtiles-spec)
- [MBTilesの内容](https://takamoto.biz/2020/11/mbtilesの内容/)
- [Qiita の解説記事](https://qiita.com/tohka383/items/b5388911baa912e8a974)

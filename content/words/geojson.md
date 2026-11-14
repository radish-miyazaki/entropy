---
title: GeoJSON
aliases: []
description: 地理空間データを表現するための JSON ベースのフォーマット。RFC 7946 で定められている
tags: [word, rfc, 地図]
date: 2025-05-16
---

## TL;DR

地理空間データを表現するための、[[json|JSON]] 形式のフォーマット。[[rfc|RFC]] 7946 で定められている。

## 仕組み

点、線、ポリゴンといった地理的な特徴と、それに関連する属性情報を構造化して表現できる。`geometry` に形と座標を、`properties` に属性を書く。

[[rfc|RFC]] 7946 によると、`geometry` の型は Point、MultiPoint、LineString、MultiLineString、Polygon、MultiPolygon、GeometryCollection の 7 つで、大文字と小文字を区別する。形と属性をまとめたものが Feature で、複数の Feature を並べたものが FeatureCollection である。どのオブジェクトにも、範囲を表す `bbox` を任意で付けられる。

## 例

```json
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [139.7671, 35.6812]
  },
  "properties": {
    "name": "東京",
    "country": "日本",
    "population": 13960000
  }
}
```

[[typescript|TypeScript]] では、型定義が [@types/geojson](https://www.npmjs.com/package/@types/geojson) として提供されている。

## 注意点

RFC 7946 では、座標は経度、緯度の順に書く。3 つ目の要素を付けると高度になる。座標参照系は WGS 84 で、経度と緯度は十進の度で表す。メディアタイプは `application/geo+json` で、拡張子は `.json` か `.geojson` を使う。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[gpx|GPX]]: 地図に表示するときは GeoJSON に変換することが多い
- [[leaflet|Leaflet]]

## 出典

- [GeoJSON](https://geojson.org/)
- [RFC 7946 - The GeoJSON Format](https://datatracker.ietf.org/doc/html/rfc7946)
- [GeoJSON - Wikipedia](https://ja.wikipedia.org/wiki/GeoJSON)

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

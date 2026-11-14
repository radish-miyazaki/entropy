---
title: GPX
aliases: [GPX 1.1, GPS eXchange Format]
description: GPS デバイスとソフトウェアの間やアプリケーション間で位置データをやり取りするための XML ベースのフォーマット
tags: [word, 地図]
date: 2025-05-12
---

## TL;DR

[[gps|GPS]] / GNSS デバイスとソフトウェアの間や、アプリケーションどうしで位置データをやり取りするためのデータフォーマット。[[xml|XML]] をベースにしている。

## 仕組み

GPX は次の 3 種類のデータを持てる。

- **ウェイポイント**（Waypoint）: 特定の地点の座標
- **トラック**（Track、軌跡）: 実際に記録された移動経路
- **ルート**（Route）: 目的地までの経路

### 主要な要素

ルート要素は `<gpx>` で、名前空間、バージョン、スキーマの情報を書く。この中に、ウェイポイント（`<wpt>`）、トラック（`<trk>`）、ルート（`<rte>`）を入れる。

`<wpt>` はウェイポイントを表す要素で、型は `wptType` である。緯度と経度を属性として持ち、要素の中に高度（`<ele>`）や時刻（`<time>`）を持つ。後述する `<trkpt>` と `<rtept>` も同じ `wptType` である。

```xml
<wpt lat="42.439227" lon="-71.119689">...</wpt>
```

`<trk>` はトラックを表す要素である。`<trkseg>` が 0 個以上のトラックポイント（`<trkpt>`）を順序付きで持ち、`<trkpt>` が 1 つのトラックポイントを表す。

`<rte>` はルートを表す要素で、複数のルートポイント（`<rtept>`）を順序付きで持つ。

`<extensions>` には独自の XML 要素を入れられる。Garmin などの GPS メーカーは、ここに住所、電話番号、温度、心拍といったデバイス独自の情報を記録している。

## 例

地図上に GPX のデータを表示するときは、[[geojson|GeoJSON]] に変換することが多い。[[typescript|TypeScript]] では次のライブラリが使える。

- [toGeoJSON](https://github.com/placemark/togeojson)
- [GPX builder](https://github.com/fabulator/gpx-builder)
- [GPX JS](https://github.com/We-Gold/gpxjs)

## 自分の理解

`<extensions>` は、Google Calendar API の Extended Props のようなものだと理解している。

いろいろなサイトが出力している GPX ファイルを見ると、経路は `<trk>` で表しているようだ（例: [Google マップから GPX を作成](https://www.330k.info/software/create_gpx_with_google_maps/)）。

## 関連

- [[geojson|GeoJSON]]
- [[leaflet|Leaflet]]
- [[xml|XML]]

## 出典

- [GPX: the GPS Exchange Format](https://www.topografix.com/gpx.asp)
- [GPX 1.1 Schema Documentation](https://www.topografix.com/GPX/1/1/)
- [GPX - Wikipedia](https://ja.wikipedia.org/wiki/GPX)
- [GPS Exchange Format - Wikipedia](https://en.wikipedia.org/wiki/GPS_Exchange_Format)

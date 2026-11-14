---
title: GeoIP
aliases: []
description: IP アドレスから地域を推定する技術やサービス。狭義には MaxMind 社のサービスを指す
tags: [word]
date: 2024-10-01
---

## TL;DR

IP アドレスから地域を推定する技術やサービスのこと。狭義には MaxMind 社のサービスを指し、広義には IP アドレスから地域を推定する技術やサービス全般を指す。

## 仕組み

MaxMind の無償版は、[[ip-address|IP アドレス]]に対応する国を返す Country、市や郵便番号まで返す City、自律システム番号（ASN）と組織を返す ASN の 3 種類のデータを提供している。提供形態は、ダウンロードして使うデータベースと Web サービスの 2 つである。データベースには、Web アプリケーションで大量に高速に引くためのバイナリ形式（`.mmdb`）と、MySQL や PostgreSQL などの既存のデータベースに取り込むための CSV がある。ダウンロードや Web サービスの利用には、MaxMind のアカウントとライセンスキーが必要になる。

## 例

MaxMind 社は、無償版の [GeoLite2](https://dev.maxmind.com/geoip/geolite2-free-geolocation-data) と、有償版の [GeoIP2](https://www.maxmind.com/en/solutions/ip-geolocation-databases-api-services) を提供している。

## 注意点

MaxMind 自身が、IP アドレスによる位置の推定は本質的に不正確だとしている。結果は点ではなく範囲で、数 km から 1,000 km までの精度半径を持つので、アプリケーション側でこれを考慮する必要がある。国までしか分からない IP アドレスもあり、郵便番号がないものも多い。特定の住所や世帯を割り出す目的には使ってはいけない。無償版の City のデータは、有償版よりかなり精度が低い。

ライセンス上、新しいリリースが出たら 30 日以内に古いデータベースを消す必要があるので、ダウンロードは自動化しておくのがよい。

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 出典

- [GeoIP2 and GeoLite2 - MaxMind Support](https://support.maxmind.com/hc/en-us/categories/1260801446650-GeoIP2-and-GeoLite2)
- [GeoIP の基礎知識 - TechRacho](https://techracho.bpsinc.jp/morimorihoge/2019_08_31/80111)
- [GeoLite Free Geolocation Data - MaxMind Developer Portal](https://dev.maxmind.com/geoip/geolite2-free-geolocation-data)

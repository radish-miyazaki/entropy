---
title: MinIO
aliases: []
description: Amazon S3 と互換性のあるストレージサーバ
tags: [word, ストレージ]
date: 2024-08-23
---

## TL;DR

[[amazon-s3|Amazon S3]] と互換性のあるストレージサーバ。

## 例

[[docker|Docker]] Compose では、次のように立ち上げる。ローカル環境用なので、ユーザ名とパスワードは仮の値にしている。

```yaml
services:
  minio:
    image: minio/minio:latest
    environment:
      MINIO_ROOT_USER: root
      MINIO_ROOT_PASSWORD: password
    volumes:
      - .minio:/data
    command: server --console-address ":9001" /data
    ports:
      - 9000:9000
      - 9001:9001
```

立ち上げた後、管理画面からファイルをアップロードする手順は次のとおり。

1. 管理画面にログインする
2. 「Create a Bucket.」をクリックして、バケットを作る
3. メニューの「Buckets」から、作ったバケットを選ぶ
4. アプリケーションからアクセスできるように、アクセスポリシーを Private から Public に変える
5. メニューの「Object Browser」から、作ったバケットを選ぶ
6. 「Upload」ボタンをクリックして、ファイルを選ぶ

## 注意点

ローカル環境なので、手順 4 ではアクセスポリシーを Public にしている。本来はアクセスポリシーを厳密に設定する。

## 自分の理解

ローカルでの動作確認によく使われている印象がある。上の手順は、Docker で立ち上げて実際に試した。

## 関連

- [[amazon-s3|Amazon S3]]

## 出典

- [MinIO](https://min.io/)
- [Policy-Based Access Control - MinIO](https://min.io/docs/minio/linux/administration/identity-access-management/policy-based-access-control.html)

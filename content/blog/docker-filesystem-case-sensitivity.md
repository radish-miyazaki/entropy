---
title: Docker のファイルシステムは OS 依存
description: macOS 上の Docker でホストのディレクトリをマウントすると、Virtiofs 経由で APFS がファイルを扱うので、Linux コンテナでも大文字と小文字が区別されない
tags: [blog, docker]
date: 2025-01-08
draft: false
---

## TL;DR

- macOS 上の [[docker|Docker]] でホストのディレクトリをマウントすると、GNU/Linux のコンテナの中でも、ファイル名の大文字と小文字が区別されなかった。
- マウントしたディレクトリは Virtiofs で共有されており、実際のファイル操作はホストの APFS が行っているので、APFS の挙動になると解釈した。

## 背景

GNU/Linux のコンテナを立ち上げたところ、ファイル名の大文字と小文字が区別されなかった（case-insensitive）。具体的には、`touch a.txt` と `touch A.txt` を実行しても、`a.txt` しかできなかった。GNU/Linux であれば、本来は大文字と小文字が区別される（case-sensitive）はずである。

## 環境

- ホスト OS: macOS
- Docker: 27.4.1
- コンテナ: Debian GNU/Linux 12 (bookworm)

```sh
$ cat /etc/os-release
PRETTY_NAME="Debian GNU/Linux 12 (bookworm)"
NAME="Debian GNU/Linux"
VERSION_ID="12"
VERSION="12 (bookworm)"
VERSION_CODENAME=bookworm
ID=debian
HOME_URL="https://www.debian.org/"
SUPPORT_URL="https://www.debian.org/support"
BUG_REPORT_URL="https://bugs.debian.org/"
```

## 検証

コンテナの中で `df` コマンドを実行し、ファイルシステムを確かめた。

```sh
$ df -T
Filesystem     Type     1K-blocks      Used Available Use% Mounted on
overlay        overlay  555453432  14710880 540742552   3% /
tmpfs          tmpfs        65536         0     65536   0% /dev
shm            tmpfs      8208384         0   8208384   0% /dev/shm
mac            virtiofs 971350180 402002032 569348148  42% /app
/dev/vdb1      btrfs    555453432  14710880 540742552   3% /etc/hosts
tmpfs          tmpfs      8208696         0   8208696   0% /sys/firmware
```

## 結果

ホスト側からマウントしているディレクトリ（`/app`）は、ファイルシステムとして [Virtiofs](https://virtio-fs.gitlab.io/) を使っていた。

## 考察

Virtiofs の [Design Document](https://virtio-fs.gitlab.io/design.html) の Architecture の節には、次のように書かれている。

> File I/O is performed on behalf of the VM by virtiofsd using system calls. An underlying file system on the hypervisor performs the file I/O. The underlying file system can be a local file system or a remote file system.

ファイル I/O は、VM の代わりに virtiofsd がシステムコールで実行し、実際のファイル I/O はハイパーバイザ上にある下層のファイルシステムが担当する。

この「ハイパーバイザ上にある下層のファイルシステム」は、今回の場合は macOS のファイルシステムである APFS だと解釈した。実際のファイル操作は APFS 自身が行っているので、コンテナの中でも大文字と小文字が区別されない挙動になる。コンテナが物理ストレージを直接見られるわけでも、その権限があるわけでもないので、納得のいく結末だった。より詳しく知るには [virtiofsd](https://gitlab.com/virtio-fs/virtiofsd) のソースコードを読めばよさそうだが、今回はそこまでは調べていない。

## キーワード

- [[docker|Docker]]
- Virtiofs
- APFS

## 参考

- https://virtio-fs.gitlab.io/
- https://virtio-fs.gitlab.io/design.html
- https://gitlab.com/virtio-fs
- https://qiita.com/tmsn/items/120c6c2fb07cf32d2147

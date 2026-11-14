---
title: PHP
aliases: []
description: Web 開発に向いた、HTML に埋め込んで使えるオープンソースの汎用スクリプト言語
tags: [word, php, プログラミング言語]
date: 2026-11-14
---

## TL;DR

Web 開発に特に向いた、オープンソースの汎用スクリプト言語。HTML に埋め込んで使える。名前は「PHP: Hypertext Preprocessor」の再帰的な頭字語である。

## 仕組み

PHP のページは、HTML の中に処理をするコードを埋め込んだ形で書く。PHP のコードは `<?php` と `?>` で囲み、この区切りで PHP のモードに出入りする。

クライアントサイドの JavaScript と違い、コードはサーバで実行される。サーバは実行結果の HTML をクライアントに送るので、クライアントは結果だけを受け取り、元のコードは分からない。

## 例

公式マニュアルの例では、HTML の本文で文字列を出力している。

```php
<!DOCTYPE html>
<html>
    <head>
        <title>Example</title>
    </head>
    <body>
        <?php
            echo "Hi, I'm a PHP script!";
        ?>
    </body>
</html>
```

%%

## 自分の理解

つまずいた点、腑に落ちたきっかけ。書くときはこのコメントを外す
%%

## 関連

- [[laravel|Laravel]]
- [[frankenphp|FrankenPHP]]
- [[hhvm|HHVM]]
- [[phluxor|Phluxor]]

## 出典

- [PHP: Introduction - Manual](https://www.php.net/manual/en/introduction.php)

---
title: Effective Rust 項目17 デッドロック と Rust
description: Rust でもロックの取得順が逆になるとデッドロックが起こる。ロックの範囲を狭めると競合状態が生まれるので、互いに整合が必要な状態は 1 つの同期プリミティブでまとめて守る
tags: [book-chapter, rust]
date: 2025-01-31
book: "[[Effective Rust]]"
chapter: 17
---

## TL;DR

- Rust でも、ロックを取る順番がスレッドによって逆になると[[deadlock|デッドロック]]が起こりうる。
- ロックの範囲を狭めるとデッドロックは避けられるが、[[race-condition|競合状態]]が生まれる。互いに整合が必要な状態は、1 つの[[synchronization-primitive|同期プリミティブ]]でまとめて守る。

## 内容

[[Effective Rust 項目17 状態共有並列実行には気を付けよう|項目17 状態共有並列実行には気を付けよう]]のうち、デッドロックについての話である。

### ロックの順番が逆になるとデッドロックが起こる

一方のスレッドは状態 A → B の順でロックを取り、もう一方は B → A の順で取るとき、デッドロックが起こりうる。複数のプレイヤーがいるゲームサーバを簡略化した例で考える。

```rust
struct GameServer {
    players: Mutex<HashMap<String, Player>>,
    games: Mutex<HashMap<GameId, Game>>,
}

impl GameServer {
    fn add_and_join(&self, username: &str, info: Player) -> Option<GameId> {
        let mut players = self.players.lock().unwrap();
        players.insert(username.to_owned(), info);

        let mut games = self.games.lock().unwrap();
        for (id, game) in games.iter_mut() {
            if game.add_player(username) {
                return Some(id.clone());
            }
        }
        None
    }

    fn ban_player(&self, username: &str) {
        let mut games = self.games.lock().unwrap();
        games
            .iter_mut()
            .filter(|(_id, g)| g.has_player(username))
            .for_each(|(_id, g)| g.remove_player(username));

        let mut players = self.players.lock().unwrap();
        players.remove(username);
    }
}
```

2 つの[[thread|スレッド]]が `add_and_join` と `ban_player` を同時に呼ぶと、次の順で実行されてデッドロックになることがある。

| スレッド 1                                                              | スレッド 2                                                                |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `add_and_join` に入り、すぐに `players` のロックを取る                  |                                                                           |
|                                                                         | `ban_player` に入り、すぐに `games` のロックを取る                        |
| `games` のロックを取ろうとするが、スレッド 2 が持っているので待たされる |                                                                           |
|                                                                         | `players` のロックを取ろうとするが、スレッド 1 が持っているので待たされる |

### 解決策 1: ロックの範囲を狭める

ロックの範囲を狭めて、2 つのロックを同時に持たないようにする。

```rust
fn add_and_join(&self, username: &str, info: Player) -> Option<GameId> {
    {
        let mut players = self.players.lock().unwrap();
        players.insert(username.to_owned(), info);
    }
    {
        let mut games = self.games.lock().unwrap();
        for (id, game) in games.iter_mut() {
            if game.add_player(username) {
                return Some(id.clone());
            }
        }
    }
    None
}

fn ban_player(&self, username: &str) {
    {
        let mut games = self.games.lock().unwrap();
        games
            .iter_mut()
            .filter(|(_id, g)| g.has_player(username))
            .for_each(|(_id, g)| g.remove_player(username));
    }
    {
        let mut players = self.players.lock().unwrap();
        players.remove(username);
    }
}
```

さらに、`players` の操作をヘルパメソッド `add_player()` と `remove_player()` にカプセル化すれば、スコープを閉じ忘れることもなくなる。

ただし、この方法では競合状態という別の問題が起きる。

| スレッド 1                                                                    | スレッド 2                                                                          |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `add_and_join("Alice")` に入り、Alice を `players` に追加してロックを解除する |                                                                                     |
|                                                                               | `ban_player("Alice")` に入り、Alice をすべての `games` から削除してロックを解除する |
|                                                                               | Alice を `players` から削除する（スレッド 1 はロックを解除済みなので待たされない）  |
| Alice を実行中のゲームに追加する                                              |                                                                                     |

結果として、BAN されたはずの Alice がゲームに参加してしまう。

### 解決策 2: 1 つの同期プリミティブで両方を守る

問題の根本は、互いに整合している必要がある 2 つのデータ構造を、別々のロックで守っていることにある。そこで、両方の状態を 1 つの同期プリミティブでまとめて守る。

```rust
struct GameState {
    players: HashMap<String, Player>,
    games: HashMap<GameId, Game>,
}

struct GameServer {
    state: Mutex<GameState>,
}
```

## キーワード

- [[deadlock|デッドロック]]
- [[race-condition|競合状態]]
- [[synchronization-primitive|同期プリミティブ]]
- [[mutex|Mutex]]
- [[thread|スレッド]]
- [[rust|Rust]]

%%

## 自分の理解

つまずいた点、気づき。書くときはこのコメントを外す
%%

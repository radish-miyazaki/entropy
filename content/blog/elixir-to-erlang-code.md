---
title: Elixir のコードから生成される Erlang のコードを確認する
description: Elixir のコードをコンパイルした beam ファイルから AST を取り出し、Erlang のコードに変換して表示する
tags: [blog, erlang, elixir]
date: 2024-08-30
draft: false
---

## TL;DR

- [[elixir|Elixir]] のコードをコンパイルした beam ファイルから、`:beam_lib.chunks` で[[abstract-syntax-tree|抽象構文木]]（AST）を取り出し、`:erl_prettypr.format` で [[erlang|Erlang]] のコードに変換すると、Elixir のコードがどんな Erlang のコードになるかを確認できる。

## 検証

### 1. Elixir のファイルを beam ファイルに変換する

`elixirc` で、Elixir のファイルを [[beam|BEAM]] 向けの中間コードである beam ファイルにコンパイルする。

```elixir
# hello.ex
defmodule Hello do
  def elixir_is_cool do
    "Elixir is cool!"
    |> String.trim_trailing("!")
    |> String.split()
    |> List.first()
    |> dbg()
  end
end
```

```sh
$ elixirc hello.ex
```

### 2. iex を起動する

```sh
$ iex
```

### 3. 抽象構文木を取得する

[`:beam_lib` モジュールの `chunks` 関数](https://www.erlang.org/doc/apps/stdlib/beam_lib.html#chunks/2)を呼び出す。

```elixir
{:ok, {_, [abstract_code: {:raw_abstract_v1, erlang_ast}]}} =
  :beam_lib.chunks('Elixir.Hello.beam', [:abstract_code])
```

### 4. Erlang のコードに変換する

[`:erl_prettypr` モジュールの `format` 関数](https://www.erlang.org/doc/apps/syntax_tools/erl_prettypr.html#format/2)を呼び出す。

```elixir
erlang_code = :erl_prettypr.format(:erl_syntax.form_list(erlang_ast))
```

### 5. 標準出力に出して確認する

`format` の戻り値は文字コードのリストなので、`IO.puts` で出力する。

```elixir
IO.puts erlang_code
```

## 結果

手順 3 では、次の AST が得られた。

```elixir
{:ok,
 {Hello,
  [
    abstract_code: {:raw_abstract_v1,
     [
       {:attribute, 1, :file, {~c"Hello.ex", 1}},
       {:attribute, 1, :module, Hello},
       {:attribute, 1, :compile, [:no_auto_import]},
       {:attribute, 1, :export, [__info__: 1, elixir_is_cool: 0]},
       {:attribute, 1, :spec,
        {{:__info__, 1},
         [
           {:type, 1, :fun,
            [
              {:type, 1, :product,
               [
                 {:type, 1, :union,
                  [
                    {:atom, 1, :attributes},
                    {:atom, 1, :compile},
                    {:atom, 1, :functions},
                    {:atom, 1, :macros},
                    {:atom, 1, :md5},
                    {:atom, 1, :exports_md5},
                    {:atom, 1, :module},
                    {:atom, 1, :deprecated},
                    {:atom, 1, :struct}
                  ]}
               ]},
              {:type, 1, :any, []}
            ]}
         ]}},
       {:function, 0, :__info__, 1,
        [
          {:clause, 0, [{:atom, 0, :module}], [], [{:atom, 0, Hello}]},
          {:clause, 0, [{:atom, 0, :functions}], [],
           [
             {:cons, 0,
              {:tuple, 0, [{:atom, 0, :elixir_is_cool}, {:integer, 0, 0}]},
              {nil, 0}}
           ]},
          {:clause, 0, [{:atom, 0, :macros}], [], [nil: 0]},
          {:clause, 0, [{:atom, 0, :struct}], [], [{:atom, 0, nil}]},
          {:clause, 0, [{:atom, 0, :exports_md5}], [],
           [
             {:bin, 0,
              [
                {:bin_element, 0,
                 {:string, 0,
                  [94, 216, 53, 60, 230, 80, 48, 90, 196, 253, 124, ...]},
                 :default, :default}
              ]}
           ]},
          {:clause, 0, [{:match, 0, {:var, 0, :Key}, {:atom, 0, :attributes}}],
           [],
           [
             {:call, 0,
              {:remote, 0, {:atom, 0, :erlang}, {:atom, 0, :get_module_info}},
              [{:atom, 0, Hello}, {:var, 0, :Key}]}
           ]},
          {:clause, 0, [{:match, 0, {:var, 0, :Key}, {:atom, 0, :compile}}], [],
           [
             {:call, 0,
              {:remote, 0, {:atom, 0, :erlang}, {:atom, 0, :get_module_info}},
              [{:atom, 0, Hello}, {:var, 0, :Key}]}
           ]},
          {:clause, 0, [{:match, 0, {:var, 0, :Key}, {:atom, 0, :md5}}], [],
           [
             {:call, 0,
              {:remote, 0, {:atom, 0, :erlang}, {:atom, 0, :get_module_info}},
              [{:atom, 0, Hello}, {:var, 0, :Key}]}
           ]},
          {:clause, 0, [{:atom, 0, :deprecated}], [], [nil: 0]}
        ]},
       {:function, 2, :elixir_is_cool, 0,
        [
          {:clause, 2, [], [],
           [
             {:match, 7, {:var, 7, :_@9},
              {:block, 7,
               [
                 {:match, 7, {:var, 7, :_@1},
                  {:bin, 7,
                   [
                     {:bin_element, 7, {:string, 7, ~c"Elixir is cool!"},
                      :default, :default}
                   ]}},
                 {:match, 7, {:var, 7, :_@2},
                  {:cons, 7, {:var, 7, :_@1}, {nil, 7}}},
                 {:match, 7, {:var, 7, :_@3},
                  {:call, 4,
                   {:remote, 4, {:atom, 4, String}, {:atom, 4, :trim_trailing}},
                   [{:var, 7, :_@1}, {:bin, 4, [{...}]}]}},
                 {:match, 7, {:var, 7, :_@4},
                  {:cons, 7, {:var, 7, :_@3}, {:var, 7, :_@2}}},
                 {:match, 7, {:var, 7, :_@5},
                  {:call, 5, {:remote, 5, {:atom, 5, ...}, {:atom, ...}},
                   [{:var, 7, :_@3}]}},
                 {:match, 7, {:var, 7, :_@6},
                  {:cons, 7, {:var, 7, :_@5}, {:var, 7, :_@4}}},
                 {:match, 7, {:var, 7, :_@7},
                  {:call, 6, {:remote, 6, {...}, ...}, [{:var, ...}]}},
                 {:match, 7, {:var, 7, :_@8},
                  {:cons, 7, {:var, 7, ...}, {:var, ...}}},
                 {:tuple, 7,
                  [{:atom, 7, :pipe}, {:cons, 7, {...}, ...}, {:call, 7, ...}]}
               ]}},
             {:call, 7, {:remote, 7, {:atom, 7, Macro}, {:atom, 7, :__dbg__}},
              [
                {:bin, 7,
                 [
                   {:bin_element, 7,
                    {:string, 7, ~c"[Hello.ex:7: Hello.elixir_is_cool/0]"},
                    :default, :default}
                 ]},
                {:var, 7, :_@9},
                {nil, 7}
              ]}
           ]}
        ]}
     ]}
  ]}}
```

手順 4 の戻り値は、次のような文字コードのリストになった。

```elixir
[45, 102, 105, 108, 101, 40, 34, 72, 101, 108, 108, 111, 46, 101, 120, 34, 44,
 32, 49, 41, 46, 10, 10, 45, 109, 111, 100, 117, 108, 101, 40, 39, 69, 108, 105,
 120, 105, 114, 46, 72, 101, 108, 108, 111, 39, 41, 46, 10, 10, 45, ...]
```

手順 5 で出力した Erlang のコードは次のとおりである。パイプ演算子は中間の変数への代入の連続になり、`dbg` は `'Elixir.Macro':'__dbg__'` の呼び出しになっている。

```erlang
-file("Hello.ex", 1).
-module('Elixir.Hello').
-compile([no_auto_import]).
-export(['__info__'/1, elixir_is_cool/0]).
-spec '__info__'(attributes |
                 compile |
                 functions |
                 macros |
                 md5 |
                 exports_md5 |
                 module |
                 deprecated |
                 struct) -> any().

'__info__'(module) -> 'Elixir.Hello';
'__info__'(functions) -> [{elixir_is_cool, 0}];
'__info__'(macros) -> [];
'__info__'(struct) -> nil;
'__info__'(exports_md5) -> <<"^Ø5<æP0ZÄý|.\236Ð\005P">>;
'__info__'(Key = attributes) ->
    erlang:get_module_info('Elixir.Hello', Key);
'__info__'(Key = compile) ->
    erlang:get_module_info('Elixir.Hello', Key);
'__info__'(Key = md5) ->
    erlang:get_module_info('Elixir.Hello', Key);
'__info__'(deprecated) -> [].

elixir_is_cool() ->
    _@9 = begin
              _@1 = <<"Elixir is cool!">>,
              _@2 = [_@1],
              _@3 = 'Elixir.String':trim_trailing(_@1, <<"!">>),
              _@4 = [_@3 | _@2],
              _@5 = 'Elixir.String':split(_@3),
              _@6 = [_@5 | _@4],
              _@7 = 'Elixir.List':first(_@5),
              _@8 = [_@7 | _@6],
              {pipe,
               [<<"Elixir is cool!">>,
                {{'.',
                  [{line, 4}, {column, 14}],
                  [{'__aliases__',
                    [{counter, {'Elixir.Hello', 2}},
                     {line, 4},
                     {column, 8}],
                    ['String']},
                   trim_trailing]},
                 [{line, 4}, {column, 15}],
                 [<<"!">>]},
                {{'.',
                  [{line, 5}, {column, 14}],
                  [{'__aliases__',
                    [{counter, {'Elixir.Hello', 2}},
                     {line, 5},
                     {column, 8}],
                    ['String']},
                   split]},
                 [{line, 5}, {column, 15}],
                 []},
                {{'.',
                  [{line, 6}, {column, 12}],
                  [{'__aliases__',
                    [{counter, {'Elixir.Hello', 2}},
                     {line, 6},
                     {column, 8}],
                    ['List']},
                   first]},
                 [{line, 6}, {column, 13}],
                 []}],
               'Elixir.Enum':reverse(_@8)}
          end,
    'Elixir.Macro':'__dbg__'(<<"[Hello.ex:7: Hello.elixir_is_cool/0]">>,
                             _@9,
                             []).
```

## キーワード

- [[elixir|Elixir]]
- [[erlang|Erlang]]
- [[beam|BEAM]]
- [[abstract-syntax-tree|抽象構文木]]

## 参考

- https://www.erlang.org/doc/apps/stdlib/beam_lib.html#chunks/2
- https://www.erlang.org/doc/apps/syntax_tools/erl_prettypr.html#format/2

---
title: React Router
aliases: []
description: React のルーティングライブラリ。v6.4 以降は Data APIs でデータの取得と更新をルートに結び付けられる
tags: [word, react]
date: 2024-09-06
---

## TL;DR

[[react|React]] のルーティングライブラリ。[[remix|Remix]] と同じチームが開発しており、Remix の内部でも使われている。`createBrowserRouter` でルートを定義すると、データの取得と更新をルートに結び付ける Data APIs が使える。

## 仕組み

### ルートの定義

従来の `BrowserRouter` ではなく `createBrowserRouter` でルートを定義すると、Data APIs が使えるようになる。

```sh
npm install react-router react-router-dom
```

```tsx
const router = createBrowserRouter([
  { path: "/signin", element: <GuestRoute children={<SignIn />} /> },
  { path: "/signup", element: <GuestRoute children={<SignUp />} /> },
  { path: "", element: <PrivateRoute children={<Main />} /> },
  { path: "*", element: <NotFound /> },
])

function App() {
  return <RouterProvider router={router} />
}
```

### Data APIs

Data APIs は、データの取得と更新を効率よく行うための API である。ルーティングとデータ管理が密に統合される。

**Loader** は、ルートが描画される前にデータを取得する非同期関数である。ルート定義の `loader` に設定し、取得したデータは `useLoaderData` で受け取る。

```tsx
function loader() {
  return fetchFakeAlbums()
}

const router = createBrowserRouter([{ path: "/", loader: loader, element: <Albums /> }])

export function Albums() {
  const albums = useLoaderData()
  // ...
}
```

**Action** は、フォームの送信などに応じてデータを更新する非同期関数である。ルート定義の `action` に設定し、処理結果は `useActionData` で受け取る。フォームには `<Form>` コンポーネントを使う。`method` には `<form>` と違って `PUT`、`PATCH`、`DELETE` も指定できる。`useSubmit` を使うと、コードからフォームを送信できる。

```tsx
{
  path: "/users/new",
  element: <UserForm />,
  action: async ({ request }) => {
    const formData = await request.formData();
    const response = await fetch("/api/users", { method: "POST", body: formData });
    return response.json();
  },
}
```

**useFetcher** は、特定のルートに依存せずにデータの取得や更新を行うフックである。検索フォームやいいねボタンのように、ページ遷移を伴わない操作に使う。`fetcher.Form` は `<Form>` と同じように使えるが、ページ遷移が起きない。`<Form navigate={false}>` でも同じことができる。ほかに `fetcher.load`、`fetcher.submit`、リクエストの状態を表す `fetcher.state`、戻り値を持つ `fetcher.data` がある。

```tsx
function Search() {
  const fetcher = useFetcher()
  return (
    <div>
      <fetcher.Form action="/api/search" method="get">
        <input name="query" type="text" />
        <button type="submit">検索</button>
      </fetcher.Form>
      {fetcher.data && <SearchResults results={fetcher.data} />}
    </div>
  )
}
```

Loader や Action の処理の状態は、`useNavigation` の `state` で取得できる。

### エラーハンドリング

ルートの `errorElement` に [[error-boundary|Error Boundary]] を渡し、その中で `useRouteError` を使うと、ルートごとにエラーを扱える。`loader` や `action`、ルートのコンポーネントでエラーが起きたときに、指定したエラーページを表示する。

```tsx
;<Route
  path="/invoices/:id"
  loader={loadInvoice}
  action={updateInvoice}
  element={<Invoice />}
  errorElement={<ErrorBoundary />}
/>

function ErrorBoundary() {
  let error = useRouteError()
  console.error(error)
  return <div>Dang!</div>
}
```

## 自分の理解

Data APIs が使えるので、困ったら `createBrowserRouter` を使うのがよさそうだ。ただ、Data APIs は学習コストが高い。

エラーページではなく現在のページにエラーメッセージを出したいときは、Loader や Action の戻り値でエラーを返し、`useLoaderData` や `useActionData` で受け取ればよさそうだ。

## 関連

- [[react|React]]
- [[remix|Remix]]
- [[error-boundary|Error Boundary]]
- [[react-hooks|React Hooks]]

## 出典

- [React Router](https://reactrouter.com/en/main)
- [Picking a Router - React Router](https://reactrouter.com/en/main/routers/picking-a-router#data-apis)
- [useFetcher - React Router](https://reactrouter.com/en/main/hooks/use-fetcher)
- [errorElement - React Router](https://reactrouter.com/en/main/route/error-element)

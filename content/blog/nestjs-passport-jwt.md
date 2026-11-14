---
title: NestJS と Passport.js を組み合わせて JWT 認証を実現する
description: NestJS の GraphQL サーバで、Passport.js の passport-local でサインインして JWT を発行し、passport-jwt でログイン中のユーザだけが Resolver にアクセスできるようにする
tags: [blog, nestjs, passport.js, jwt]
date: 2024-09-13
draft: false
---

## TL;DR

- [[nestjs|NestJS]] の [[graphql|GraphQL]] サーバで、[[passport-js|Passport.js]] を使って [[jwt|JWT]] 認証を実装した。サインインは `passport-local`、ログイン中のユーザだけが使える Resolver の保護は `passport-jwt` で行う。
- Passport.js の `AuthGuard` は [[rest-api|REST API]] 向けなので、GraphQL で使うには `getRequest` をオーバーライドする必要がある。

## 背景

[[nestjs-graphql-server|NestJS で GraphQL サーバを実装する]]で作った GraphQL サーバに、認証を追加する。

## 環境

次のパッケージを使う。

```sh
$ npm i @nestjs/passport passport passport-local @nestjs/jwt passport-jwt
$ npm i --save-dev @types/passport-local @types/passport-jwt
```

- [`@nestjs/passport`](https://github.com/nestjs/passport): Passport.js 用の NestJS 拡張ライブラリ
- `passport`: Passport.js 本体
- `passport-local`: メールアドレスとパスワードによる認証の実装（[ドキュメント](https://docs.nestjs.com/recipes/passport)）
- [`@nestjs/jwt`](https://github.com/nestjs/jwt): JWT 認証用の NestJS 拡張ライブラリ
- `passport-jwt`: JWT 認証用の Passport.js 拡張ライブラリ（[ドキュメント](https://docs.nestjs.com/security/authentication#jwt-token)）

## 検証

### 事前準備

ファイルを生成する。

```sh
$ nest g module auth
$ nest g service auth --no-spec
$ nest g resolver auth --no-spec
```

`PassportModule` と `JwtModule` をインポートする。`JwtModule` に渡せるオプションは [README](https://github.com/nestjs/jwt?tab=readme-ov-file#secret--encryption-key-options) にある。

```ts
@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "1h" },
    }),
  ],
  providers: [AuthResolver, AuthService],
})
```

### サインインを実装する

まず Service を実装する。`validateUser` は、渡された認証データが正しいかを確かめるメソッドで、Strategy の実装で使う。

```ts
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.getUser(email)

    if (!user || !(await becrypt.compare(password, user.password))) {
      return null
    }

    return user
  }

  async signIn(user: User): Promise<SignInResponse> {
    const payload: JwtPayload = { email: user.email, sub: user.id }
    return { accessToken: this.jwtService.sign(payload), user }
  }
}
```

次に、`passport-local` を使って Strategy を実装する。`validate` は `PassportStrategy` で定義されている抽象メソッドで、認証データの検証時に呼ばれるので実装する必要がある。

```ts
import { Injectable, UnauthorizedException } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from "passport-local"
import { AuthService } from "../auth.service"
import { User } from "@prisma/client"

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: "email" })
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(email, password)
    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
```

作ったクラスは `auth` のモジュールの `providers` に加える。

```ts
@Module({
  ...
  providers: [AuthResolver, AuthService, LocalStrategy],
})
export class AuthModule {}
```

続いて Guard を実装する。`AuthGuard` は REST API 専用なので、GraphQL でも使えるように `getRequest` をオーバーライドする。

```ts
import { ExecutionContext } from "@nestjs/common"
import { GqlExecutionContext } from "@nestjs/graphql"
import { AuthGuard } from "@nestjs/passport"

export class GqlAuthGuard extends AuthGuard("local") {
  constructor() {
    super()
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    const request = ctx.getContext()
    request.body = ctx.getArgs().signInInput
    return request
  }
}
```

最後に [[graphql-resolver|Resolver]] を実装する。`@UseGuards` に `GqlAuthGuard` を渡すと、`signIn` の前に `validate` が実行され、成功したときだけ `signIn` が実行される。`@Context` を使うと、リクエストに入っているコンテキストを引数で受け取れる。この中に `User` のインスタンスが入っている。

```ts
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SignInResponse)
  @UseGuards(GqlAuthGuard)
  async signIn(@Args("signInInput") signInInput: SignInInput, @Context() context: any) {
    return await this.authService.signIn(context.user)
  }
}
```

### Resolver をログイン中のユーザだけが使えるようにする

`passport-jwt` を使って Strategy を実装する。`passport-local` のときとほとんど同じである。

```ts
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { UserService } from "src/user/user.service"
import { JwtPayload } from "../types/jwtPayload.type"
import { User } from "@prisma/client"
import { Injectable } from "@nestjs/common"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    })
  }

  async validate(payload: JwtPayload): Promise<User | null> {
    return await this.userService.getUser(payload.email)
  }
}
```

このクラスもモジュールの `providers` に加える。

```ts
@Module({
  ...
  providers: [AuthResolver, AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
```

Guard も、サインインのときとほとんど同じように `getRequest` をオーバーライドする。

```ts
import { ExecutionContext } from "@nestjs/common"
import { GqlExecutionContext } from "@nestjs/graphql"
import { AuthGuard } from "@nestjs/passport"

export class JwtAuthGuard extends AuthGuard("jwt") {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    return ctx.getContext().req
  }
}
```

保護したい Resolver の `@UseGuards` に、作った Guard を渡す。

```ts
@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserModel, { nullable: true })
  @UseGuards(JwtAuthGuard)
  async getUser(@Args() getUserArgs: GetUserArgs): Promise<User> {
    ...
  }
}
```

## 結果

実装の途中で、2 か所でつまずいた。

- Strategy のクラスに `@Injectable` を付けないと、正しく動かなかった。
- `signIn` の引数名（`signInInput`）は、`GqlAuthGuard` の `getRequest` で `ctx.getArgs().signInInput` と書いた部分と一致させないと動かなかった。

## キーワード

- [[nestjs|NestJS]]
- [[passport-js|Passport.js]]
- [[jwt|JWT]]
- [[graphql|GraphQL]]
- [[graphql-resolver|Resolver]]
- [[rest-api|REST API]]

## 参考

- https://github.com/nestjs/passport
- https://github.com/nestjs/jwt
- https://docs.nestjs.com/recipes/passport
- https://docs.nestjs.com/security/authentication#jwt-token
- [NestJS × Reactで学ぶフルスタックGraphQLアプリケーション開発](https://www.udemy.com/course/nestjs-react-graphql/)

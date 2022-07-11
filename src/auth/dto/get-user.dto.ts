export class GetUserDTO {
  id: string
  avatar: string
  username: string
  role: string
}

export class JWTUser {
  id: string
  avatar: string
  email: string
  username: string
  account_id: string
}

export class AccessTokenDTO {
  accessToken: string
  user: JWTUser
}

import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { JwtPayload } from './jwt-payload.interface'
import { UserRepository } from '../user/repository/user.repository'
import { User } from 'src/user/entity/user.entity'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(UserRepository)
    private reposiroty: UserRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topSecret'
    })
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { id } = payload

    const user = await this.reposiroty.findOneBy({ id })

    if (!user) {
      throw new UnauthorizedException('invalid credentials')
    }

    return user
  }
}

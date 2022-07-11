import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import * as jwt from 'jsonwebtoken'

@Injectable()
class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp().getRequest()

    if (!ctx.headers.authorization) {
      throw new HttpException('Token not provided', HttpStatus.UNAUTHORIZED)
    }

    ctx.user = await this.validateToken(ctx.headers.authorization)

    return true
  }

  async validateToken(auth: string): Promise<any> {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
    }

    const token = auth.split(' ')[1]
    try {
      return jwt.verify(token, 'topSecret')
    } catch (err) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
    }
  }
}

export default new AuthGuard()

import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Reflector } from '@nestjs/core'
import { User } from 'src/user/entity/user.entity'
import { RoleType } from 'src/enum/roles.enum'

@Injectable()
export class JwtAdminAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }
  canActivate(context: ExecutionContext): any {
    return super.canActivate(context)
  }

  handleRequest(
    err: any,
    user: User,
    info: any,
    context: ExecutionContext
  ): any {
    /* if (user.profile_id !== process.env.ADMINID)
      throw new HttpException(
        'Vocẽ não tem permissão! (ADMINS ONLY)',
        HttpStatus.UNAUTHORIZED
      ) */
    return user
  }
}

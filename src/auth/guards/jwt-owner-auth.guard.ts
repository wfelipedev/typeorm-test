import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Reflector } from '@nestjs/core'
import { User } from 'src/user/entity/user.entity'
import { RoleType } from 'src/enum/roles.enum'
import { Observable } from 'rxjs'

@Injectable()
export class JwtOwnerAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context)
  }

  handleRequest(
    err: any,
    user: User,
    info: any,
    context: ExecutionContext
  ): any {
    /*  if (user.profile_id !== process.env.OWNERID)
      throw new HttpException(
        'Vocẽ não tem permissão! (OWNERS ONLY)',
        HttpStatus.UNAUTHORIZED
      ) */

    return user
  }
}

import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User } from 'src/user/entity/user.entity'

export const GetUser = createParamDecorator(
  (data, context: ExecutionContext): User => {
    const req = context.switchToHttp().getRequest()
    return req.user
  }
)

export const IpAddress = createParamDecorator(
  (data, context: ExecutionContext): User => {
    const req = context.switchToHttp().getRequest()
    return req.headers.host
  }
)

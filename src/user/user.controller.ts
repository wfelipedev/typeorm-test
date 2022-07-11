import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { GetUser } from 'src/auth/get-user.decorator'
import AuthGuard from '../auth/guards/jwt-auth.guard'
import { CreateUserDTO } from './dto/create-user.dto'
import { User } from './entity/user.entity'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UseGuards(AuthGuard)
  async persistUser(
    @Body() dto: CreateUserDTO,
    @GetUser() user: User
  ): Promise<{ msg: string; user: User }> {
    return this.userService.persistUser(dto, user)
  }
}

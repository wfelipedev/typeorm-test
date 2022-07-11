import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignInDTO } from './dto/signin.dto'
import { AuthDTO } from './dto/auth.dto'
import { GetUser } from './get-user.decorator'
import { User } from '../user/entity/user.entity'
import { UpdateUserDTO } from './dto/update-user.dto'
import { Patch } from '@nestjs/common'
import { ResetPasswordDTO } from '..//user/dto/reset-password.dto'
import AuthGuard from './guards/jwt-auth.guard'
import IMyUser from './interfaces/my-user.interface'

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('signup')
  signUp(
    @Body(ValidationPipe) dto: AuthDTO
  ): Promise<{ user: User; msg: string }> {
    return this.service.signUp(dto)
  }

  @Post('signin')
  signIn(
    @Body(ValidationPipe) dto: SignInDTO
  ): Promise<{ accessToken: string }> {
    return this.service.signIn(dto)
  }

  @Patch('update')
  @UseGuards(AuthGuard)
  update(
    @Body() updateDTO: UpdateUserDTO,
    @GetUser() user: User
  ): Promise<{ msg: string; success: boolean }> {
    return this.service.update(updateDTO, user)
  }

  @Patch('update-password')
  @UseGuards(AuthGuard)
  updatePassword(
    @Body() resetDTO: ResetPasswordDTO,
    @GetUser() user: User
  ): Promise<boolean> {
    return this.service.updatePassword(resetDTO, user)
  }

  @Post('user')
  @UseGuards(AuthGuard)
  async test(@GetUser() user: User): Promise<IMyUser> {
    return this.service.myUser(user)
  }
}

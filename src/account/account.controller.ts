import { Controller, Get, UseGuards } from '@nestjs/common'
import { GetUser } from '../auth/get-user.decorator'
import AuthGuard from '../auth/guards/jwt-auth.guard'
import { User } from '../user/entity/user.entity'
import { AccountService } from './account.service'
import { Account } from './entity/account.entity'

@Controller('account')
@UseGuards(AuthGuard)
export class AccountController {
  constructor(private readonly service: AccountService) {}

  @Get('/my-account')
  async getMyAccount(@GetUser() user: User): Promise<Account> {
    return this.service.getMyAccount(user.id)
  }
}

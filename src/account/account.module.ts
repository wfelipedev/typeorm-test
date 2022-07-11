import { Module } from '@nestjs/common'
import { AccountService } from './account.service'
import { AccountController } from './account.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AccountRepository } from './repository/account.repository'

@Module({
  imports: [TypeOrmModule.forFeature([AccountRepository])],
  providers: [AccountService],
  controllers: [AccountController],
  exports: [AccountService]
})
export class AccountModule {}

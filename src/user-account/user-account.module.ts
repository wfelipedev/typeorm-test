import { Module } from '@nestjs/common'
import { UserAccountService } from './user-account.service'
import { UserAccountController } from './user-account.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserAccountReposiroty } from './repository/user-account.repository'

@Module({
  imports: [TypeOrmModule.forFeature([UserAccountReposiroty])],
  providers: [UserAccountService],
  controllers: [UserAccountController],
  exports: [UserAccountService]
})
export class UserAccountModule {}

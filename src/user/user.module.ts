import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { AuthModule } from 'src/auth/auth.module'
import { UserController } from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserRepository } from './repository/user.repository'
import { UserAccountModule } from 'src/user-account/user-account.module'
import { AccountModule } from 'src/account/account.module'

@Module({
  imports: [
    AuthModule,
    UserAccountModule,
    AccountModule,
    TypeOrmModule.forFeature([UserRepository])
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}

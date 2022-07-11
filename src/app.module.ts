import { Module } from '@nestjs/common'
import { AccountModule } from './account/account.module'
import { AuthModule } from './auth/auth.module'
import { UserAccountModule } from './user-account/user-account.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [AccountModule, AuthModule, UserModule, UserAccountModule]
})
export class AppModule {}

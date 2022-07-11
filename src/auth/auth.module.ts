import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'
import { UserRepository } from '../user/repository/user.repository'

import { AuthController } from './auth.controller'
import { AccountModule } from '../account/account.module'
import { UserAccountModule } from '../user-account/user-account.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    AccountModule,
    UserAccountModule,
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: 'topSecret',
      signOptions: {
        expiresIn: '24h'
      }
    })
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtStrategy, PassportModule]
})
export class AuthModule {}

import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthDTO } from './dto/auth.dto'
import { SignInDTO } from './dto/signin.dto'
import { JwtPayload } from './jwt-payload.interface'
import { User } from 'src/user/entity/user.entity'
import { UserRepository } from '../user/repository/user.repository'
import { UpdateUserDTO } from './dto/update-user.dto'
import { AccountService } from 'src/account/account.service'
import { AccessTokenDTO } from './dto/get-user.dto'
import { CreateAccountDTO } from 'src/account/dto/create-account.dto'
import { CreateUserAccountDTO } from 'src/user-account/dto/create-user-account.dto'
import { UserAccountService } from 'src/user-account/user-account.service'
import { ResetPasswordDTO } from 'src/user/dto/reset-password.dto'
import IMyUser from './interfaces/my-user.interface'
import fs = require('fs')

@Injectable()
export class AuthService {
  constructor(
    private repository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly accountService: AccountService,
    private readonly useraccountService: UserAccountService
  ) {}

  async signUp(dto: AuthDTO): Promise<{ user: User; msg: string }> {
    try {
      const { fullname, cpf } = dto

      if (await this.checkIfUsernameOrEmailExists(dto.username, dto.email))
        throw new HttpException(
          'Esse nome ou email já está em uso!',
          HttpStatus.BAD_REQUEST
        )

      const user = await this.repository.signUp(dto)

      const accountDTO: CreateAccountDTO = {
        fullname,
        cpf
      }

      if (await this.accountService.checkIfFullnameExists(fullname)) {
        await this.repository.delete({ id: user.id })
        throw new HttpException(
          'Já existe um cadastro com esse nome!',
          HttpStatus.BAD_REQUEST
        )
      }
      if (await this.accountService.checkIfCPFExists(cpf)) {
        await this.repository.delete({ id: user.id })
        throw new HttpException(
          'Já existe um cadastro com esse CPF!',
          HttpStatus.BAD_REQUEST
        )
      }
      const account = await this.accountService.persistAccount(accountDTO, user)

      const useraccountDTO: CreateUserAccountDTO = {
        account_id: account.id,
        user_id: user.id
      }

      await this.useraccountService.createUserAccount(useraccountDTO)

      return { user, msg: 'Usuário cadastrado com sucesso!' }
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException({ message: error.message }, error.getStatus())
      }
      throw new HttpException('Erro ao se cadastrar!', HttpStatus.UNAUTHORIZED)
    }
  }

  async signIn(dto: SignInDTO): Promise<AccessTokenDTO> {
    try {
      const user = await this.repository.validatePassword(dto)
      if (!user)
        throw new HttpException(
          'Credenciais invalidas!',
          HttpStatus.UNAUTHORIZED
        )

      const user_account = await this.useraccountService.getUserAccountByUserId(
        user.id
      )

      const account = await this.accountService.getAccountById(
        user_account.account_id
      )

      const payload: JwtPayload = {
        id: user.id,
        email: user.email,
        username: user.username,
        account_id: account.id
      }

      const accessToken = this.jwtService.sign(payload)
      const accessTokenDTO: AccessTokenDTO = {
        accessToken: accessToken,
        user: {
          id: user.id,
          avatar: user.avatar,
          email: user.email,
          username: user.username,
          account_id: account.id
        }
      }

      await this.repository.save({
        ...user,
        last_access: new Date(),
        accesses_count: user.accesses_count + 1
      })

      return accessTokenDTO
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException({ message: error.message }, error.getStatus())
      }
      throw new HttpException('Erro ao fazer login!', HttpStatus.UNAUTHORIZED)
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const users_found = await this.repository.getAllUsers()
      return users_found
    } catch (error) {
      throw new HttpException(
        'Erro ao listar usuários!',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async getUserById(user_id: string): Promise<User> {
    // TODO continuar daki
    const userFound = await this.repository.getUserById(user_id)
    if (!userFound)
      throw new HttpException(
        `Usuário com ID: ${user_id} não encontrado`,
        HttpStatus.NOT_FOUND
      )
    return userFound
  }

  async update(
    userDTO: UpdateUserDTO,
    user: User
  ): Promise<{ msg: string; success: boolean }> {
    const { success, msg } = await this.repository.updateUser(userDTO, user)
    await this.accountService.getMyAccount(user.id)
    await this.accountService.updateAccount(userDTO)

    return { msg, success }
  }

  async updatePassword(dto: ResetPasswordDTO, user: User): Promise<boolean> {
    const { password } = dto
    const userFound = await this.getUserById(user.id)

    if (!userFound)
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND)

    const user_account = await this.useraccountService.getUserAccountByUserId(
      user.id
    )

    await this.accountService.getAccountById(user_account.account_id)

    const updated = await this.repository.resetPassword(password, userFound)

    return updated
  }

  async myUser(user: User): Promise<IMyUser> {
    try {
      const myUSer: IMyUser = {
        id: user.id,
        avatar: user.avatar,
        email: user.email,
        username: user.email,
        created_at: user.created_at
      }

      return myUSer
    } catch (error) {
      throw new HttpException(
        'Erro ao buscar seus dados!',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  private async checkIfUsernameOrEmailExists(
    username: string,
    email: string
  ): Promise<boolean> {
    return this.repository.checkIfUsernameOrEmailExists(username, email)
  }
}

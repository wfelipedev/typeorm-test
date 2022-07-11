import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AccountService } from 'src/account/account.service'
import { CreateUserAccountDTO } from 'src/user-account/dto/create-user-account.dto'
import { UserAccountService } from 'src/user-account/user-account.service'
import { CreateUserDTO } from './dto/create-user.dto'
import { User } from './entity/user.entity'
import { UserRepository } from './repository/user.repository'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private readonly useraccountService: UserAccountService,
    private readonly accountService: AccountService
  ) {}

  async persistUser(
    dto: CreateUserDTO,
    current_user: User
  ): Promise<{ msg: string; user: User }> {
    try {
      const user = await this.userRepository.persistUser(dto)

      const account = await this.accountService.getMyAccount(current_user.id)

      if (user) {
        const useraccountDTO: CreateUserAccountDTO = {
          account_id: account.id,
          user_id: user.id
        }
        await this.useraccountService.createUserAccount(useraccountDTO)
      }

      return { msg: 'Usuário cadastrado com sucesso!', user }
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException({ message: error.message }, error.getStatus())
      }
      throw new HttpException(
        'Erro ao cadastrar novo usuário!',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async getUserById(user_id: string): Promise<User> {
    try {
      const user_found = await this.userRepository.getUserById(user_id)
      return user_found
    } catch (error) {
      throw new HttpException(
        'Erro ao buscar usuário!',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}

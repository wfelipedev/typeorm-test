import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateUserAccountDTO } from './dto/create-user-account.dto'
import { UserAccount } from './entity/user-account.entity'
import { UserAccountReposiroty } from './repository/user-account.repository'

@Injectable()
export class UserAccountService {
  constructor(
    @InjectRepository(UserAccountReposiroty)
    private useraccountRepository: UserAccountReposiroty
  ) {}

  async createUserAccount(dto: CreateUserAccountDTO): Promise<UserAccount> {
    try {
      const useraccount_saved =
        await this.useraccountRepository.createUserAccount(dto)
      return useraccount_saved
    } catch (error) {
      throw new HttpException(
        'Erro ao associar usuário a conta!',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async getUserAccountByUserId(user_id: string): Promise<UserAccount> {
    try {
      const useraccount_found =
        await this.useraccountRepository.getUserAccountByUserId(user_id)
      return useraccount_found
    } catch (error) {
      throw new HttpException(
        'Erro ao buscar associação de usuário e conta!',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}

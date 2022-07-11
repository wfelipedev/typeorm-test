import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/user/entity/user.entity'
import { CreateAccountDTO } from './dto/create-account.dto'
import { Account } from './entity/account.entity'
import { AccountRepository } from './repository/account.repository'
import { UpdateUserDTO } from '../auth/dto/update-user.dto'

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountRepository)
    private accountRepository: AccountRepository
  ) {}

  async persistAccount(dto: CreateAccountDTO, user: User): Promise<Account> {
    try {
      const account_saved = await this.accountRepository.persistAccount(
        dto,
        user
      )

      return account_saved
    } catch (error) {
      throw new HttpException(
        'Erro ao cadastrar conta.',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async getAccountById(accountId: string) {
    try {
      return await this.accountRepository.getAccountById(accountId)
    } catch (error) {
      throw new HttpException(
        'Erro ao buscar conta.',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async getMyAccount(user_id: string): Promise<Account> {
    try {
      const account_found = await this.accountRepository.getMyAccount(user_id)
      return account_found
    } catch (error) {
      throw new HttpException(
        'Erro ao buscar sua conta.',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async updateAccount(
    dto: UpdateUserDTO
  ): Promise<{ msg: string; success: boolean }> {
    try {
      const accountUpdated = await this.accountRepository.updateAccount(dto)
      return { msg: 'Conta atualizada com sucesso!', success: accountUpdated }
    } catch (error) {
      throw new HttpException(
        'Erro ao atualizar conta.',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async getUsersByAccount(account_id: string): Promise<Account> {
    try {
      return await this.accountRepository.getUsersByAccount(account_id)
    } catch (error) {
      throw new HttpException(
        'Erro ao buscar usuários.',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async checkIfFullnameExists(fullname: string): Promise<boolean> {
    return this.accountRepository.checkIfFullnameExists(fullname)
  }

  async checkIfCPFExists(cpf: string): Promise<boolean> {
    return this.accountRepository.checkIfCPFExists(cpf)
  }
}

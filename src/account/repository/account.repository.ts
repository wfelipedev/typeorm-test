import { User } from 'src/user/entity/user.entity'
import { EntityRepository, Repository } from 'typeorm'
import { CreateAccountDTO } from '../dto/create-account.dto'
import { Account } from '../entity/account.entity'
import { UpdateUserDTO } from '../../auth/dto/update-user.dto'

@EntityRepository(Account)
export class AccountRepository extends Repository<Account> {
  async persistAccount(dto: CreateAccountDTO, user: User): Promise<Account> {
    const { fullname, cpf } = dto
    const account = new Account()
    account.fullname = fullname
    account.cpf = cpf
    account.owner_id = user.id
    account.created_at = new Date()
    account.updated_at = new Date()
    return account.save()
  }

  async getAccountById(accountId: string): Promise<Account> {
    return await this.findOne({
      where: {
        id: accountId
      }
    })
  }

  async getMyAccount(user_id: string): Promise<Account> {
    return this.findOne({
      where: {
        owner_id: user_id
      }
    })
  }

  async getUsersByAccount(account_id: string): Promise<Account> {
    const query = this.createQueryBuilder('account')
    const account = await query
      .innerJoinAndSelect('account.account_users', 'user_account')
      .where('account.id = :id', { id: account_id })
      .getOne()
    return account
  }

  async updateAccount(dto: UpdateUserDTO): Promise<boolean> {
    const { fullname, account_id } = dto
    const accountFound = await this.getAccountById(account_id)
    if (accountFound) {
      accountFound.fullname = fullname
      accountFound.updated_at = new Date(Date.now())
      await accountFound.save()
      return true
    }
    return false
  }

  async checkIfFullnameExists(fullname: string): Promise<boolean> {
    const exists = await this.findOne({
      where: {
        fullname
      }
    })
    return exists ? true : false
  }

  async checkIfCPFExists(cpf: string): Promise<boolean> {
    const exists = await this.findOne({
      where: {
        cpf
      }
    })
    return exists ? true : false
  }
}

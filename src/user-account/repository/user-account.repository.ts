import { EntityRepository, Repository } from 'typeorm'
import { UserAccount } from '../entity/user-account.entity'
import { CreateUserAccountDTO } from '../dto/create-user-account.dto'

@EntityRepository(UserAccount)
export class UserAccountReposiroty extends Repository<UserAccount> {
  async createUserAccount(dto: CreateUserAccountDTO): Promise<UserAccount> {
    const useraccount = this.create(dto)
    return useraccount.save()
  }

  async getUserAccountByUserId(user_id: string): Promise<UserAccount> {
    return this.findOne({ where: { user_id } })
  }
}

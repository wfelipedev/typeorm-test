import { HttpException, HttpStatus } from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'
import { AuthDTO } from '../../auth/dto/auth.dto'
import { SignInDTO } from '../../auth/dto/signin.dto'
import { User } from '../entity/user.entity'
import * as bcrypt from 'bcrypt'
import { UpdateUserDTO } from 'src/auth/dto/update-user.dto'
import { CreateUserDTO } from '../dto/create-user.dto'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(dto: AuthDTO): Promise<User> {
    const { email, username, password } = dto
    const user = this.create()
    user.email = email
    user.username = username
    user.salt = await bcrypt.genSalt()
    user.password = await this.hashPassword(password, user.salt)
    await this.save(user)
    return user
  }

  async validatePassword(dto: SignInDTO): Promise<User> {
    const { username, password } = dto
    const userFound = await this.findOne({ where: { username } })

    if (userFound && (await userFound.validatePassword(password)))
      return userFound
    else return null
  }

  async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt)
  }

  async getAllUsers(): Promise<User[]> {
    return this.find()
  }

  async getUserById(user_id: string): Promise<User> {
    return this.findOne({ where: { id: user_id } })
  }

  async updateUser(
    userDTO: UpdateUserDTO,
    user: User
  ): Promise<{ msg: string; success: boolean }> {
    const userFound = await this.getUserById(user.id)
    if (!userFound)
      throw new HttpException('Usuario não encontrado', HttpStatus.NOT_FOUND)

    if (userFound) {
      userFound.email = userDTO.email
      userFound.username = userDTO.username
      userFound.updated_at = new Date(Date.now())
      await userFound.save()
      return { msg: 'Usuário atualizado com sucesso.', success: true }
    }
    return { msg: 'Erro ao atualizar usuário.', success: false }
  }

  async uploadAvatar(
    avatar: any,
    user: User
  ): Promise<{ msg: string; success: boolean }> {
    const userFound = await this.getUserById(user.id)
    const path: string = avatar.destination + '/' + avatar.filename

    if (user) {
      userFound.avatar = path.replace('./uploads', '')
      userFound.updated_at = new Date(Date.now())
      await userFound.save()
      return { msg: 'Imagem atualizada com sucesso.', success: true }
    }
    return { msg: 'Erro ao atualizar imagem.', success: false }
  }

  /*  generateOrderDisplayId(string_length: number): string {
    let random_string = ''
    let random_ascii
    for (let i = 0; i < string_length; i++) {
      random_ascii = Math.floor(Math.random() * 25 + 97)
      random_string += String.fromCharCode(random_ascii)
    }
    return Math.random().toString().substr(2, 7) + random_string.toUpperCase()
  }
 */

  generateUsernameAndPassword(length): string {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

  async persistUser(dto: CreateUserDTO): Promise<User> {
    const { email } = dto
    const user = this.create()
    user.email = email
    user.username = this.generateUsernameAndPassword(6)
    user.salt = await bcrypt.genSalt()
    const password = 'Senha123!!'
    user.password = await this.hashPassword(password, user.salt)
    await this.save(user)
    return user
  }

  async resetPassword(password: string, user: User): Promise<boolean> {
    user.salt = await bcrypt.genSalt()
    user.password = await this.hashPassword(password, user.salt)
    return user.save() ? true : false
  }

  async checkIfUsernameOrEmailExists(
    username: string,
    email: string
  ): Promise<boolean> {
    const usernameFound = await this.findOne({ where: { username } })
    const emailFound = await this.findOne({ where: { email } })
    return usernameFound || emailFound ? true : false
  }
}

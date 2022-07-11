import { IsNotEmpty, IsString } from 'class-validator'

export class CreateUserAccountDTO {
  @IsString({ message: 'O campo Id da conta deve conter apenas texto!' })
  @IsNotEmpty({ message: 'O campo Id da conta é obrigatório!' })
  account_id: string

  @IsString({ message: 'O campo Id do usuário deve conter apenas texto!' })
  @IsNotEmpty({ message: 'O campo Id do usuário é obrigatório!' })
  user_id: string
}

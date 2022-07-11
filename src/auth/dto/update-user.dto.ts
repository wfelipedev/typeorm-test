import { IsNotEmpty, MinLength, IsString, IsOptional } from 'class-validator'

export class UpdateUserDTO {
  @IsString({ message: 'O campo Id da conta deve conter apenas texto!' })
  @IsNotEmpty({ message: 'O campo Id da conta é obrigatório!' })
  account_id: string

  @IsString({ message: 'O campo email deve conter apenas texto!' })
  @IsOptional()
  email?: string

  @IsString({ message: 'O campo email deve conter apenas texto!' })
  @MinLength(3, {
    message: 'O campo nome do usuário deve conter pelo menos 3 caracteres!'
  })
  @IsOptional()
  username?: string

  @IsString({ message: 'O campo nome deve conter apenas texto!' })
  @MinLength(3, {
    message: 'O campo nome deve conter pelo menos 3 caracteres!'
  })
  @IsNotEmpty()
  fullname?: string

  @IsString({ message: 'O campo número do telefone deve conter apenas texto!' })
  @IsOptional()
  phone_number?: string
}

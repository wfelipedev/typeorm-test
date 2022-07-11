import { IsString, MinLength, IsNotEmpty } from 'class-validator'

export class CreateAccountDTO {
  @IsNotEmpty({ message: 'O campo nome completo é obrigatório' })
  @IsString({ message: 'O campo nome completo deve apenas ser texto!' })
  @MinLength(3, {
    message: 'O campo nome completo deve conter no mínimo 3 caracteres!'
  })
  fullname: string

  @IsNotEmpty({ message: 'O campo CPF é obrigatório!' })
  @IsString({ message: 'O campo CPF deve apenas ser texto!' })
  cpf: string
}

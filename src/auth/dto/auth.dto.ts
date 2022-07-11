import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength
} from 'class-validator'

export class AuthDTO {
  @IsString({ message: 'O campo email deve apenas ser texto!' })
  email: string

  @IsString({ message: 'O campo nome do usuário deve apenas ser texto!' })
  @MinLength(3, {
    message: 'O campo nome do usuário deve conter no mínimo 3 caracteres!'
  })
  username: string

  @IsString({ message: 'O campo senha deve apenas ser texto!' })
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'A senha informada não segue o padrão estabelecido para as senhas.'
  })
  password: string

  @IsNotEmpty({ message: 'O campo nome completo é obrigatório!' })
  @IsString({ message: 'O campo nome completo deve ser apenas texto!' })
  @MinLength(3, {
    message: 'O campo nome completo deve conter pelo menos 3 caracteres!'
  })
  fullname: string

  @IsNotEmpty({ message: 'O campo CPF é obrigatório!' })
  @IsString({ message: 'O campo CPF deve ser apenas texto!' })
  cpf: string

  @IsOptional()
  @IsString({ message: 'O campo telefone deve ser apenas texto!' })
  phone_number?: string

  @IsNotEmpty({ message: 'O campo data de nascimento é obrigatório!' })
  @IsString({ message: 'O campo data de nascimento deve ser apenas texto!' })
  birthdate: string

  @IsNotEmpty({ message: 'O campo nome da Escola é obrigatório!' })
  @IsString({ message: 'O campo nome da Escola deve ser apenas texto!' })
  school_name: string
}

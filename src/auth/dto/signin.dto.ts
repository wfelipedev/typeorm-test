import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class SignInDTO {
  @IsString({ message: 'O campo nome do usuário deve conter apenas texto!' })
  @IsNotEmpty({ message: 'O campo nome do usuário é obrigatório!' })
  username?: string

  @IsString({ message: 'O campo senha deve conter apenas texto!' })
  @IsNotEmpty({ message: 'O campo senha é obrigatório' })
  @MinLength(8, {
    message: 'O campo senha deve conter pelo menos 8 caracteres!'
  })
  password: string
}

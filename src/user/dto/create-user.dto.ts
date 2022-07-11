import { IsString, IsOptional } from 'class-validator'

export class CreateUserDTO {
  @IsString({ message: 'O campo email deve conter apenas texto!' })
  @IsOptional()
  email?: string

  /* @IsString({ message: 'O campo nome do usuário deve conter apenas texto!' })
  @IsNotEmpty({ message: 'O campo nome do usuário é obrigatório' })
  @MinLength(3)
  username: string */

  /* @IsString({ message: 'O campo senha deve conter apenas texto!' })
  @MinLength(8, {
    message: 'O campo senha deve conter pelo menos 8 caracteres!'
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'A senha informada não segue o padrão estabelecido para as senhas.'
  })
  password: string */
}

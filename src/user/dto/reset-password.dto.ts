import { IsString, MinLength, Matches, IsNotEmpty } from 'class-validator'

export class ResetPasswordDTO {
  /* @IsString({ message: 'O campo senha atual deve conter apenas texto!' })
  @IsNotEmpty({ message: 'O campo senha é obrigatório!' })
  @MinLength(8, {
    message: 'O campo senha deve conter pelo menos 8 caracteres!'
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'A senha informada não segue o padrão estabelecido para as senhas.'
  })
  current_password: string */
  @IsString({ message: 'O campo senha deve conter apenas texto!' })
  @IsNotEmpty({ message: 'O campo senha é obrigatório!' })
  @MinLength(8, {
    message: 'O campo senha deve conter pelo menos 8 caracteres!'
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'A senha informada não segue o padrão estabelecido para as senhas.'
  })
  password: string
}

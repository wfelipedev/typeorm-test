import { IsString, MinLength } from 'class-validator'

export class UpdateUserDTO {
  @IsString({ message: 'O campo nome do usuário deve conter apenas texto!' })
  @MinLength(3, {
    message: 'O campo nome do usuário deve conter pelo menos 3 caracteres!'
  })
  display_name: string
}

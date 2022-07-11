import { IsString } from 'class-validator'

export class UpdatePasswordDTO {
  @IsString()
  id: string

  @IsString()
  password: string
}

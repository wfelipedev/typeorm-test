import { IsNotEmpty, IsBoolean } from 'class-validator'

export class SetActiveDTO {
  @IsBoolean({ message: 'Este campo é booleano!' })
  @IsNotEmpty({ message: 'Este campo é obrigatório!' })
  is_active: boolean
}

import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique
} from 'typeorm'
import { User } from 'src/user/entity/user.entity'
import { UserAccount } from 'src/user-account/entity/user-account.entity'

@Entity('accounts')
@Unique(['fullname', 'cpf'])
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  fullname: string

  @Column({ unique: true })
  cpf: string

  @OneToOne(() => User)
  @JoinColumn({ name: 'owner_id' })
  user: User

  @Column()
  owner_id: string

  @OneToMany(() => User, user => user.account)
  users?: User[]

  @OneToMany(() => UserAccount, user_account => user_account.account)
  account_users: UserAccount[]

  @Column({ type: 'timestamp', nullable: false, default: new Date() })
  created_at: Date

  @Column({ type: 'timestamp', nullable: false, default: new Date() })
  updated_at: Date

  @Column({ type: 'timestamp', nullable: true })
  deleted_at: Date
}

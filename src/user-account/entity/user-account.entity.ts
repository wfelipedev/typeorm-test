import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Account } from 'src/account/entity/account.entity'
import { User } from 'src/user/entity/user.entity'

@Entity('user_account')
export class UserAccount extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToOne(() => Account)
  @JoinColumn({ name: 'account_id' })
  account: Account

  @Column()
  account_id: string

  @OneToMany(() => User, user => user.user_account, { eager: true })
  @JoinColumn({ name: 'user_id' })
  users: User[]

  @Column()
  user_id: string

  @Column({ type: 'timestamp', nullable: false })
  created_at: Date

  @Column({ type: 'timestamp', nullable: false })
  updated_at: Date

  @Column({ type: 'timestamp', nullable: true })
  deleted_at: Date
}

import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique
} from 'typeorm'
import * as bcrypt from 'bcrypt'
import { UserAccount } from '../../user-account/entity/user-account.entity'
import { Account } from 'src/account/entity/account.entity'
import { Exclude } from 'class-transformer'

@Entity('users')
@Unique(['username', 'email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  avatar: string

  @Column({ unique: true })
  email: string

  @Column({ unique: true })
  username: string

  @Column()
  accesses_count: number

  @Column()
  last_access: Date

  @ManyToOne(() => UserAccount, account => account.id)
  @JoinColumn({ name: 'id' })
  user_account: UserAccount

  @ManyToOne(() => Account, account => account.id)
  @JoinColumn({ name: 'id' })
  account: Account

  @Exclude()
  @Column()
  password: string

  @Exclude()
  @Column()
  salt: string

  @Column({ type: 'timestamp', nullable: false })
  created_at: Date

  @Column({ type: 'timestamp', nullable: false })
  updated_at: Date

  @Column({ type: 'timestamp', nullable: true })
  deleted_at: Date

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt)
    return hash === this.password
  }
}

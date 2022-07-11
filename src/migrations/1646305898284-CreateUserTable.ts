import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUserTable1646305898284 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'avatar',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'username',
            type: 'varchar'
          },
          {
            name: 'display_name',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'password',
            type: 'varchar',
            length: '60',
            isNullable: true
          },
          {
            name: 'salt',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'accesses_count',
            type: 'integer',
            default: 0
          },
          {
            name: 'last_access',
            type: 'timestamp',
            isNullable: true
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            default: null,
            isNullable: true
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }
}

import {MigrationInterface, QueryRunner, Table} from "typeorm"

export class CreateUserTable1697578749897 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name:'users',
            columns: [
                {
                    name:"id",
                    type:"uuid",
                    isPrimary: true,
                    generationStrategy:"uuid"
                },
                {
                    name:"name",
                    type: "varchar"
                },
                {
                    name:"email",
                    type: "varchar",
                    isUnique: true
                },
                {
                    name:"password",
                    type: "varchar"
                },
                {
                    name: "created_at",
                    type: "timestamp"
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    isNullable: true
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}

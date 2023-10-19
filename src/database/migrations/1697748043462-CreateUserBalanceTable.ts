import {MigrationInterface, QueryRunner, Table} from "typeorm"

export class CreateUserBalanceTable1697748043462 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name:'user_balances',
            columns: [
                { name:"user_id", type: "uuid", isUnique: true },
                { name:"balance", type: "float" },
                { name: 'created_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                { name: 'updated_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user_balances', true);
    }

}

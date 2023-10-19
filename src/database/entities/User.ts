import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm"
import {UserBalance} from "@entities/UserBalance";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column("varchar")
    name:string;

    @Column({type:"varchar", unique: true})
    @Index({unique: true})
    email:string;

    @Column("varchar")
    password: string;

    @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
    public created_at: Date;
    @UpdateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)"})
    public updated_at: Date

    @OneToOne(() => UserBalance, (userBalance) => userBalance.users, {onDelete: "CASCADE"})
    userBalance: UserBalance
}

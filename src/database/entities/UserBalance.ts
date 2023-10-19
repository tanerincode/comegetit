import {Column, CreateDateColumn, Entity, JoinColumn, OneToOne, UpdateDateColumn} from "typeorm"
import {User} from "@entities/User";
import "reflect-metadata";


@Entity("user_balances")
export class UserBalance {
    @Column({type: "uuid", unique: true, primary: true})
    user_id: string;

    @Column({type: "float", nullable: false, default: 0.0})
    balance: number;

    @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
    public created_at: Date;
    @UpdateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)"})
    public updated_at: Date

    @OneToOne(() => User, (user) => user.userBalance)
    @JoinColumn({name: "user_id"})
    users:User;
}

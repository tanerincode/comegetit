import { User } from "@entities/User";
import { EntitySubscriberInterface, EventSubscriber, InsertEvent, Repository } from "typeorm";
import { UserBalance } from "@entities/UserBalance";

@EventSubscriber()
export class AddBalanceDataAfterCreateUserSubscriber implements EntitySubscriberInterface<User> {

    listenTo(): Function {
        return User;
    }

    async afterInsert(event: InsertEvent<User>): Promise<void> {
        try {
            const userBalanceRepository: Repository<UserBalance> = event.manager.getRepository(UserBalance);
            const userBalance: UserBalance = userBalanceRepository.create({
                user_id: event.entity.id,
                balance: 1.0
            });

            await userBalanceRepository.save(userBalance);
        } catch (error) {
            console.error("Error while creating UserBalance after user creation:", error);
        }
    }
}

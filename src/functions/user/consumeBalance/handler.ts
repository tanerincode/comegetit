import {handleSuccessResult} from "@utils/response";
import {DataSource} from "typeorm";
import {ApplicationDataSource} from "@utils/data-source";
import {User} from "@entities/User";
import {ValidatedEventAPIGatewayProxyEvent} from "@utils/aws-gateway";
import schema from "@functions/user/consumeBalance/schema";
import {prepareUserForResponse} from "@AppTypes/UserTypes";
import * as console from "console";
import {UserNotFoundException} from "@exceptions/UserNotFoundException";
import {errorHandler} from "@utils/handleExceptions";
import {UserBalance} from "@entities/UserBalance";
import { UserBalanceNotEnoughException } from "@exceptions/UserBalanceNotEnoughException";

let dataSource: DataSource;

const consumeUserBalance: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    if ( !dataSource ){
        dataSource = await ApplicationDataSource.initialize();
    }

    const userId = event.pathParameters.id;

    // @ts-ignore
    const {cost} = JSON.parse(event.body);

    try {
       const user = await dataSource.transaction(async transactionManager => {

           const userRepository = transactionManager.getRepository(User);

            const user = await userRepository.findOne({
                where: { id: userId },
                relations: { userBalance: true }
            });

            if ( !user ){
                throw new UserNotFoundException();
            }

            const userBalance = await transactionManager.getRepository(UserBalance).findOne({
                where : {
                    user_id: userId
                },
                lock: { mode: "pessimistic_write" }
            });

            const balanceAfterConsumed = userBalance.balance - cost;
            if ( balanceAfterConsumed < 0 ){
                throw new UserBalanceNotEnoughException();
            }

            userBalance.balance = balanceAfterConsumed;
            await transactionManager.save(userBalance);

           user.userBalance.balance = balanceAfterConsumed;
            return user;
        });

        return handleSuccessResult({
            message: "user balance is consumed!",
            data: await prepareUserForResponse(user)
        });
    }catch (err) {
        console.log(`An error occurred while user balance consuming : ${err.message}`);
        return errorHandler(err);
    }
}

export const app = consumeUserBalance;
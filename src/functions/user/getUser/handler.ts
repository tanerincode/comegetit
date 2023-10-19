import {APIGatewayEvent, APIGatewayProxyHandler} from "aws-lambda";
import {handleSuccessResult} from "@utils/response";
import {DataSource} from "typeorm";
import {ApplicationDataSource} from "@utils/data-source";
import {User} from "@entities/User";
import {prepareUserForResponse} from "@AppTypes/UserTypes";
import {UserNotFoundException} from "@exceptions/UserNotFoundException";
import {errorHandler} from "@utils/handleExceptions";
import * as console from "console";

let dataSource: DataSource;
const getUserHandler: APIGatewayProxyHandler = async (event: APIGatewayEvent) => {
    const userId  = event.pathParameters.id;

    if ( !dataSource ){
        dataSource = await ApplicationDataSource.initialize();
    }

    const userRepository = dataSource.getRepository(User);
    try {
        const user = await userRepository.findOne({
            where: {
                id: userId
            },
            relations: {
                userBalance: true
            }
        });

        if ( !user ){
            return errorHandler(new UserNotFoundException())
        }

        return handleSuccessResult({
            message: "user details",
            data: await prepareUserForResponse(user)
        });
    }catch (err) {
        console.log(err)
        return errorHandler(err)
    }
}

export const app = getUserHandler;
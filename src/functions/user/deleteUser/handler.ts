import {APIGatewayEvent, APIGatewayProxyHandler} from "aws-lambda";
import {handleSuccessResult} from "@utils/response";
import {DataSource} from "typeorm";
import {ApplicationDataSource} from "@utils/data-source";
import {User} from "@entities/User";
import {errorHandler} from "@utils/handleExceptions";
import {UserNotFoundException} from "@exceptions/UserNotFoundException";

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
                id : userId
            }
        });

        if ( !user ){
            return errorHandler(new UserNotFoundException());
        }
        await userRepository.remove(user);

        return handleSuccessResult({
            message: "user deleted!"
        });
    }catch (err) {
        return errorHandler(err);
    }
}

export const app = getUserHandler;
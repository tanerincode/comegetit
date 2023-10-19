import {handleBadRequestResult, handleErrorResult, handleSuccessResult} from "@utils/response";
import {DataSource} from "typeorm";
import {ApplicationDataSource, POSTGRES_UNIQUE_ERROR_CODE} from "@utils/data-source";
import {User} from "@entities/User";
import {ValidatedEventAPIGatewayProxyEvent} from "@utils/aws-gateway";
import schema from "@functions/user/createUser/schema";
import {prepareUserForResponse, UserDTO} from "@AppTypes/UserTypes";
import * as console from "console";
import * as crypto from "crypto";

let dataSource: DataSource;

const createUserHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    if ( !dataSource ){
        dataSource = await ApplicationDataSource.initialize();
    }

    // @ts-ignore
    const payload:UserDTO = JSON.parse(event.body);

    try {
       const user = await dataSource.transaction(async transactionManager => {
            const user = transactionManager.getRepository(User).create();
            user.id = crypto.randomUUID()
            user.name = payload.name;
            user.email = payload.email;
            user.password = payload.password;
            user.created_at = new Date();
            user.updated_at = null;

            await transactionManager.save(user);
            return user;
        });

        return handleSuccessResult({
            message: "user is created!",
            data: await prepareUserForResponse(user)
        });
    }catch (err) {

        if ( err.code === POSTGRES_UNIQUE_ERROR_CODE ){
            return handleBadRequestResult({
                message: "This email already taken!"
            })
        }

        console.log(`An error occurred while user create : ${err.message}`);
        return handleErrorResult({
            message: "something went wrong!"
        })
    }
}

export const app = createUserHandler;
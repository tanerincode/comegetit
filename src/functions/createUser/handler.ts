import {handleBadRequestResult, handleErrorResult, handleSuccessResult} from "@utils/response";
import {DataSource} from "typeorm";
import {ApplicationDataSource} from "@utils/data-source";
import {User} from "@entities/User";
import * as console from "console";
import * as crypto from "crypto";
import {ValidatedEventAPIGatewayProxyEvent} from "@utils/aws-gateway";
import schema from "@functions/createUser/schema";

let dataSource: DataSource;

const createUser: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    if ( !dataSource ){
        dataSource = await ApplicationDataSource.initialize();
    }

    // @ts-ignore
    const {name, email, password} = JSON.parse(event.body);

    try {
       const user = await dataSource.transaction(async transactionManager => {
            const user = transactionManager.getRepository(User).create();
            user.id = crypto.randomUUID()
            user.name = name;
            user.email = email;
            user.password = password;
            user.created_at = new Date();
            user.updated_at = null;

            await transactionManager.save(user);
            return user;
        });

        return handleSuccessResult({
            message: "user is created!",
            data: user
        })
    }catch (err) {
        console.log(`An error occurred while user create : ${err.message}`);

        if ( err.code === "23505" ){
            return handleBadRequestResult({
                message: "This email already taken!"
            })
        }

        return handleErrorResult({
            message: "something went wrong!"
        })
    }
}

export const app = createUser;
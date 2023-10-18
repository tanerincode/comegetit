import {handleErrorResult, handleSuccessResult} from "@utils/response";
import {DataSource} from "typeorm";
import {ApplicationDataSource} from "@utils/data-source";
import {User} from "@entities/User";
import {ValidatedEventAPIGatewayProxyEvent} from "@utils/aws-gateway";
import schema from "@functions/user/updateUser/schema";
import {prepareUserForResponse, UserDTO} from "@AppTypes/UserTypes";
import * as console from "console";

let dataSource: DataSource;

const updateUser: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

    const userId = event.pathParameters.id;
    if ( !dataSource ){
        dataSource = await ApplicationDataSource.initialize();
    }

    // @ts-ignore
    const payload:UserDTO = JSON.parse(event.body);

    try {
       const user = await dataSource.transaction(async transactionManager => {
           const user = await transactionManager.getRepository(User).findOne({
               where: {
                   id: userId
               },
               lock: {
                   mode: "pessimistic_read"
               }
           });

           if( !user ) throw new Error("User not found!");

            user.name = payload.name;
            user.password = payload.password;
            user.updated_at = new Date();

            await transactionManager.save(user);
            return user;
        });

        return handleSuccessResult({
            message: "user is updated!",
            data: await prepareUserForResponse(user)
        })
    }catch (err) {
        console.log(`An error occurred while user create : ${err.message}`);
        return handleErrorResult({
            message: "something went wrong!"
        })
    }
}

export const app = updateUser;
import {handlerPath} from "@utils/handler-resolver";
import schema from "@functions/user/updateUser/schema";

export default {
    handler: `${handlerPath(__dirname)}/handler.app`,
    events:[
        {
            http: {
                method: 'post',
                path: 'users/{id}',
                request: {
                    schemas: {
                        'application/json': schema,
                    },
                },
            }
        }
    ]
};
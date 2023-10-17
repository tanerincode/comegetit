import {handlerPath} from "@utils/handler-resolver";
import schema from "@functions/createUser/schema";

export default {
    handler: `${handlerPath(__dirname)}/handler.app`,
    events:[
        {
            http: {
                method: 'post',
                path: 'users',
                request: {
                    schemas: {
                        'application/json': schema,
                    },
                },
            }
        }
    ]
};
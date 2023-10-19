import {handlerPath} from "@utils/handler-resolver";
import schema from "@functions/user/consumeBalance/schema";

export default {
    handler: `${handlerPath(__dirname)}/handler.app`,
    events:[
        {
            http: {
                method: 'patch',
                path: 'users/{id}/consume-balance',
                request: {
                    schemas: {
                        'application/json': schema,
                    },
                },
            }
        }
    ]
};
import {handlerPath} from "@utils/handler-resolver";
import schema from "@functions/user/addBalance/schema";

export default {
    handler: `${handlerPath(__dirname)}/handler.app`,
    events: [
        {
            http: {
                method: 'post',
                path: 'restaurant/create',
                request: {
                    schemas: {
                        'application/json': schema
                    }
                }
            }
        }
    ]
}
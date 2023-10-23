import {handlerPath} from "@utils/handler-resolver";
import schema from "@functions/user/addBalance/schema";

export default {
    handler: `${handlerPath(__dirname)}/handler.app`,
    events: [
        {
            http: {
                method: 'patch',
                path: 'restaurant/{id}',
                request: {
                    schemas: {
                        'application/json': schema
                    }
                }
            }
        }
    ]
}
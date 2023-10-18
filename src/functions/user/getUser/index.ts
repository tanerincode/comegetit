import {handlerPath} from "@utils/handler-resolver";

export default {
    handler: `${handlerPath(__dirname)}/handler.app`,
    events:[
        {
            http: {
                method: 'get',
                path: 'users/{id}'
            }
        }
    ]
};
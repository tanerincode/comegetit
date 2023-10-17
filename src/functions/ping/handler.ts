import {APIGatewayEvent, APIGatewayProxyHandler} from "aws-lambda";
import {handleBadRequestResult, handleSuccessResult} from "@utils/response";

const pingHandler: APIGatewayProxyHandler = async (event: APIGatewayEvent) => {
    const {who} = event.pathParameters;
    if ( who === "me" ){
        return handleSuccessResult({
            "message" : "pong"
        });
    }

    return handleBadRequestResult({
        "message": "Who are you mother f??"
    })
}

export const main = pingHandler;
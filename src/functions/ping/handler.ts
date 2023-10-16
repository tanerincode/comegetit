import {APIGatewayEvent, APIGatewayProxyHandler} from "aws-lambda";
import {handleErrorResult, handleSuccessResult} from "@utils/response";

const pingHandler: APIGatewayProxyHandler = async (event: APIGatewayEvent) => {
    const {who} = event.pathParameters;
    if ( who === "me" ){
        return handleSuccessResult({
            "message" : "pong"
        });
    }


    return handleErrorResult({
        "message": "Who are you mother f??"
    })
}

export const main = pingHandler;
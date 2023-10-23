import {handleSuccessResult} from "@utils/response";
import {APIGatewayProxyHandler} from "aws-lambda";

const getRestaurantHandler: APIGatewayProxyHandler = async (event) => {
    return handleSuccessResult(JSON.parse(event.body));
}

export const app = getRestaurantHandler;
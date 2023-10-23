import schema from "@functions/restaurant/createRestaurant/schema";
import {ValidatedEventAPIGatewayProxyEvent} from "@utils/aws-gateway";
import {handleSuccessResult} from "@utils/response";

const createRestaurantHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    return handleSuccessResult(event.body);
}

export const app = createRestaurantHandler;
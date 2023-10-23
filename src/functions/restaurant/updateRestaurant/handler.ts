import schema from "@functions/restaurant/updateRestaurant/schema";
import {ValidatedEventAPIGatewayProxyEvent} from "@utils/aws-gateway";
import {handleSuccessResult} from "@utils/response";

const updateRestaurantHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    return handleSuccessResult(event.body);
}

export const app = updateRestaurantHandler;
import {UserNotFoundException} from "@exceptions/UserNotFoundException";
import {handleGenericResults} from "@utils/response";
import {UserBalanceNotEnoughException} from "@exceptions/UserBalanceNotEnoughException";
import {StatusCodes} from "http-status-codes";

export const errorHandler = (error: Error) => {
    let responseMessage = "Internal Server Error";

    let result = {
        message: responseMessage,
        statusCode: 500
    }

    switch (error.constructor) {
        case UserNotFoundException:
            result.message = error.message;
            result.statusCode = 404;
            break;
        case UserBalanceNotEnoughException:
            result.message = error.message;
            result.statusCode = StatusCodes.NOT_ACCEPTABLE;
            break;
        default:
            result.message = "Something went wrong. Please try again later.";
            break;
    }
    console.log(error.constructor);
    return handleGenericResults(result);
}
import {APIGatewayProxyResult} from "aws-lambda";

export const handleSuccessResult = (response: Record<string, unknown>) => {
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(response)
    }
}

export const handleBadRequestResult = (response: Record<string, unknown>) => {
    return {
        statusCode: 400,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(response)
    }
}

export const handleErrorResult = (response: Record<string, unknown>) => {
    return {
        statusCode: response.statusCode ?? 500,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(response)
    }
}

export const handleGenericResults = (response: Record<string, unknown>):APIGatewayProxyResult => {
    const status:number = isNaN(Number(response.statusCode)) ? 200 : Number(response.statusCode);

    // delete status code in response
    delete response.statusCode

    return {
        statusCode: Number(status) ?? 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(response)
    }
}
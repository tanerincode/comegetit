import {APIGatewayProxyEvent, APIGatewayProxyResult, Handler} from "aws-lambda";
import {FromSchema, JSONSchema7} from "json-schema-to-ts";


type ValidatedAPIGatewayProxyEvent<S extends JSONSchema7> =
    Omit<APIGatewayProxyEvent, 'body'>
    & { body: FromSchema<S>; };

export type ValidatedEventAPIGatewayProxyEvent<S extends JSONSchema7> =
    Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>;
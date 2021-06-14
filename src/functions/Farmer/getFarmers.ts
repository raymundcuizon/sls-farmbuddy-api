import 'source-map-support/register';
import * as createError from 'http-errors';
import { DynamoDB } from 'aws-sdk';
import { middyfy } from '@libs/lambda';


// import getFarmersSchema from './schema/getFarmers';
import { formatJSONResponse } from '@libs/apiGateway';

import { APIGatewayProxyResult } from 'aws-lambda';
// APIGatewayProxyEven, 
const dynamodb = new DynamoDB.DocumentClient();

const getFarmers = async (): Promise<APIGatewayProxyResult> => {

  let response;

  try {
    const params = {
      TableName: process.env.FARM_BUDDY_FARMERS_TABLE,
    };
    const result = await dynamodb.scan(params).promise();
    response = result.Items;
  } catch (e) {
    console.error(e);
    throw new createError.InternalServerError(e);
  }
  return formatJSONResponse({
    response
  });
}

export const main = middyfy(getFarmers);
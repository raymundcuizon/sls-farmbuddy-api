import 'source-map-support/register';
import * as createError from 'http-errors';
import { DynamoDB } from 'aws-sdk';
import { middyfy } from '@libs/lambda';

import { formatJSONResponse } from '@libs/apiGateway';

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const dynamodb = new DynamoDB.DocumentClient();

const getCrop = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const { id } = event.pathParameters;
  let response;

  try {
    const result = await dynamodb.get({
        TableName: process.env.FARM_BUDDY_CROPS_TABLE,
        Key: { id }
    }).promise();
    response = result.Item;
  } catch (e) {
    console.error(e);
    throw new createError.InternalServerError(e);
  }

  if(!response) {
    return {
      statusCode: 404,
      body: `Item not found`
    }
  }

  return formatJSONResponse({
    response
  });
}

export const main = middyfy(getCrop);
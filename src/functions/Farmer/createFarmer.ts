import 'source-map-support/register';

import { DynamoDB } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import createFarmerSchema from './schema/createFarmer';
import * as createError from 'http-errors';

const dynamodb = new DynamoDB.DocumentClient();

const createFarmer: ValidatedEventAPIGatewayProxyEvent<typeof createFarmerSchema> = async (event) => {
  
  const { name } = event.body;
  const farmer = {
    id: uuid(),
    name,
  };
  try {
    await dynamodb.put({
      TableName: process.env.FARM_BUDDY_FARMERS_TABLE,
      Item: farmer
    }).promise();

  } catch(e){
    console.error(e);
    throw new createError.InternalServerError(e);
  }
  return formatJSONResponse(farmer);
}

export const main = middyfy(createFarmer);
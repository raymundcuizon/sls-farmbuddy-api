import 'source-map-support/register';

import { DynamoDB } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import createFarmerSchema from './schema/createFarmer';
import { ResponseMsg } from '@libs/responseMessage';

const dynamodb = new DynamoDB.DocumentClient();

const createFarmer: ValidatedEventAPIGatewayProxyEvent<typeof createFarmerSchema> = async (event) => {
  
  const { name } = event.body;
  const timestamp = new Date().toISOString();
  const farmer = {
    id: uuid(),
    name,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  try {
    await dynamodb.put({
      TableName: process.env.FARM_BUDDY_FARMERS_TABLE,
      Item: farmer
    }).promise();

    return formatJSONResponse(farmer);
  } catch(e){
    console.error(e);
    return ResponseMsg.error(e.code, e.message);
  }
  
}

export const main = middyfy(createFarmer);
import 'source-map-support/register';

import { DynamoDB } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import createCropSchema from './schema/createCrop';
import * as createError from 'http-errors';

const dynamodb = new DynamoDB.DocumentClient();

const createCrop: ValidatedEventAPIGatewayProxyEvent<typeof createCropSchema> = async (event) => {
  
  const { name } = event.body;
  const crop = {
    id: uuid(),
    name,
  };
  try {
    await dynamodb.put({
      TableName: process.env.FARM_BUDDY_CROPS_TABLE,
      Item: crop
    }).promise();

  } catch(e){
    console.error(e);
    throw new createError.InternalServerError(e);
  }
  return formatJSONResponse(crop);
}

export const main = middyfy(createCrop);
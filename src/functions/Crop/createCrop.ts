import 'source-map-support/register';

import { DynamoDB } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { ResponseMsg } from '@libs/responseMessage';
import { middyfy } from '@libs/lambda';
import createCropSchema from './schema/createCrop';

const dynamodb = new DynamoDB.DocumentClient();

const createCrop: ValidatedEventAPIGatewayProxyEvent<typeof createCropSchema> = async (event) => {
  
  const { name } = event.body;
  const timestamp = new Date().toISOString();
  const crop = {
    id: uuid(),
    name,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  try {
    await dynamodb.put({
      TableName: process.env.FARM_BUDDY_CROPS_TABLE,
      Item: crop
    }).promise();
    return ResponseMsg.success(crop);
  } catch(e){
    console.error(e);
    return ResponseMsg.error(e.code, e.message);
  }
}

export const main = middyfy(createCrop);
import 'source-map-support/register';
import { DynamoDB } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
// import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import validator from '@middy/validator';
import createFarmersCropSchema from './schema/createFarmersCrop';
import { ResponseMsg } from '@libs/responseMessage';


const dynamodb = new DynamoDB.DocumentClient();

async function createFarmersCrop(event) {
  const { farmerId, cropId, farmerName, cropName, landArea, plantCount, locationReg, locationProv, locationCity  } = event.body;
  const timestamp = new Date().toISOString();
  const farmersCrop = {
    id: uuid(),
    farmerId,
    cropId,
    farmerName,
    cropName,
    landArea,
    plantCount,
    locationReg,
    locationProv,
    locationCity,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  try {
    await dynamodb.put({
      TableName: process.env.FARM_BUDDY_FARMERS_CROP_TABLE,
      Item: farmersCrop
    }).promise();
    return ResponseMsg.success(farmersCrop);
  } catch(e){
    console.error(e);
    return ResponseMsg.error(e.code, e.message);
  }
}

export const main = middyfy(createFarmersCrop)
  .use(validator({
    inputSchema: createFarmersCropSchema
  }));
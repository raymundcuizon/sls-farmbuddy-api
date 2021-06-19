import 'source-map-support/register';

import { DynamoDB } from 'aws-sdk';
import { middyfy } from '@libs/lambda';
import { ResponseMsg } from '@libs/responseMessage';
import createFarmerSchema from './schema/createFarmer';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';

const dynamodb = new DynamoDB.DocumentClient();

const updateFarmer: ValidatedEventAPIGatewayProxyEvent<typeof createFarmerSchema> = async (event) => {
  
    const { id } = event.pathParameters;
    const { name } = event.body;
    const timestamp = new Date().toISOString();
    try {

      const params = {
        TableName: process.env.FARM_BUDDY_FARMERS_TABLE,
        Key: { id },
        UpdateExpression: 'set name = :name, updatedAt = :updatedAt',
        ExpressionAttributeValues: { ':name': name, ':updatedAt': timestamp },
        returnValues: "ALL_NEW"

      }    
      const result = await dynamodb.update(params).promise();

      return ResponseMsg.success(result.Attributes);

    } catch (e) {
      console.error(e);
      return ResponseMsg.error(e.code, e.message)
    }
  
  }
  
  export const main = middyfy(updateFarmer);
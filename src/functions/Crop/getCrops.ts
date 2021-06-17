import 'source-map-support/register';

import { DynamoDB } from 'aws-sdk';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyResult } from 'aws-lambda';
import { ResponseMsg } from '@libs/responseMessage';

const dynamodb = new DynamoDB.DocumentClient();

const getCrops = async (): Promise<APIGatewayProxyResult> => {
  try {
    const params = {
      TableName: process.env.FARM_BUDDY_CROPS_TABLE,
    };
    const result = await dynamodb.scan(params).promise();
    return ResponseMsg.success(result.Items);
  } catch (e) {
    console.error(e);
    return ResponseMsg.error(e.code, e.message);
  }
}

export const main = middyfy(getCrops);
import 'source-map-support/register';
import { DynamoDB } from 'aws-sdk';
import { middyfy } from '@libs/lambda';
import { ResponseMsg } from '@libs/responseMessage';

import { APIGatewayProxyResult } from 'aws-lambda';
const dynamodb = new DynamoDB.DocumentClient();

const getFarmers = async (): Promise<APIGatewayProxyResult> => {

  try {
    const params = { TableName: process.env.FARM_BUDDY_FARMERS_TABLE };
    const result = await dynamodb.scan(params).promise();
    return ResponseMsg.success(result.Items);
  } catch (e) {
    return ResponseMsg.error(e.code, e.message)
  }
}

export const main = middyfy(getFarmers);
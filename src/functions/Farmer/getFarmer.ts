import 'source-map-support/register';
import { DynamoDB } from 'aws-sdk';
import { middyfy } from '@libs/lambda';

import { ResponseMsg } from '@libs/responseMessage';

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const dynamodb = new DynamoDB.DocumentClient();

const getFarmer = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
  const { id } = event.pathParameters;
  try {
    const result = await dynamodb.get({
        TableName: process.env.FARM_BUDDY_FARMERS_TABLE,
        Key: { id }
    }).promise();

    if(!result.Item) return ResponseMsg.error(404, 'Item not found!');

    return ResponseMsg.success(result.Item);

  } catch (e) {
    console.error(e);
    return ResponseMsg.error(e.code, e.message)
  }

}

export const main = middyfy(getFarmer);
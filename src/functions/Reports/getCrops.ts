import 'source-map-support/register';
import { DynamoDB } from 'aws-sdk';
import { middyfy } from '@libs/lambda';
import { ResponseMsg } from '@libs/responseMessage';
import { APIGatewayProxyEvent } from 'aws-lambda';

const dynamodb = new DynamoDB.DocumentClient();

async function getCrops(event:APIGatewayProxyEvent) {
    // const { farmerId } = event.pathParameters;
    const params = {
        TableName: process.env.FARM_BUDDY_FARMERS_CROP_TABLE,
        indexName: "farmersCrop",
        KeyConditionExpression: 'cropId = :cropId',
        ExpressionAttributeValues: {
            ':cropId': '707ff47c-0c9f-411d-8f02-12f7dc947f5d',
        }
    }
    try {
        const result = await dynamodb.query(params).promise();
        return ResponseMsg.success(result.Items);
    } catch (e) {
        console.log(e)
        return ResponseMsg.error(e.code, e.message);
    }
}


export const main = middyfy(getCrops);
import 'source-map-support/register';
import { DynamoDB } from 'aws-sdk';
import { middyfy } from '@libs/lambda';
import { ResponseMsg } from '@libs/responseMessage';
import { APIGatewayProxyEvent } from 'aws-lambda';

const dynamodb = new DynamoDB.DocumentClient();

async function getFarmerCrops(event: APIGatewayProxyEvent) {
    const { farmerId } = event.pathParameters;
    const params = {
        TableName: process.env.FARM_BUDDY_FARMERS_CROP_TABLE,
        IndexName: 'farmersCrop',
        KeyConditionExpression: 'farmerId = :farmerId',
        ExpressionAttributeValues: {
            ':farmerId': farmerId,
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


export const main = middyfy(getFarmerCrops);
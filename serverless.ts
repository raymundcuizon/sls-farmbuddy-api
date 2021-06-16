import type { AWS } from '@serverless/typescript';
import { createFarmer, getFarmers, getFarmer } from '@functions/Farmer';
import { createCrop, getCrops, getCrop } from '@functions/Crop';

const serverlessConfiguration: AWS = {
  service: 'farmbuddyapi',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
    FarmBuddyFarmersTable: {
      name : { "Ref": "FarmBuddyFarmersTable" },
      arn: {
        "Fn::GetAtt": ["FarmBuddyFarmersTable","Arn"]
      }
    },
    FarmBuddyCropsTable: {
      name : { "Ref": "FarmBuddyCropsTable" },
      arn: {
        "Fn::GetAtt": ["FarmBuddyCropsTable","Arn"]
      }
    }
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'ap-southeast-1',
    stage: "${opt:stage, 'dev'}",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      FARM_BUDDY_FARMERS_TABLE: "${self:custom.FarmBuddyFarmersTable.name}",
      FARM_BUDDY_CROPS_TABLE: "${self:custom.FarmBuddyCropsTable.name}"
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: ["dynamodb:PutItem","dynamodb:Scan","dynamodb:GetItem","dynamodb:UpdateItem","dynamodb:Query"],
        Resource: ["${self:custom.FarmBuddyFarmersTable.arn}"]
      },
      {
        Effect: "Allow",
        Action: ["dynamodb:PutItem","dynamodb:Scan","dynamodb:GetItem","dynamodb:UpdateItem","dynamodb:Query"],
        Resource: ["${self:custom.FarmBuddyCropsTable.arn}"]
      },
    ],
    lambdaHashingVersion: '20201221',
  },
  resources: {
    Resources: {
      FarmBuddyFarmersTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "FarmBuddyFarmersTables-${self:provider.stage}",
          BillingMode: "PAY_PER_REQUEST",
          AttributeDefinitions: [
            {
              AttributeName: "id",
              AttributeType: "S"
            }
          ],
          KeySchema: [
            {
              AttributeName: "id",
              KeyType: "HASH"
            }
          ]
        }
      },
      FarmBuddyCropsTable:{
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "FarmBuddyCropsTable-${self:provider.stage}",
          BillingMode: "PAY_PER_REQUEST",
          AttributeDefinitions: [
            {
              AttributeName: "id",
              AttributeType: "S"
            }
          ],
          KeySchema: [
            {
              AttributeName: "id",
              KeyType: "HASH"
            }
          ]
        }
      }
    }
  },
  functions: { getFarmers, createFarmer, getFarmer, createCrop, getCrops, getCrop },
};

module.exports = serverlessConfiguration;

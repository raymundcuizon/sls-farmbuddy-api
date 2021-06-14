import type { AWS } from '@serverless/typescript';
import { createFarmer, getFarmers, getFarmer } from '@functions/Farmer';

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
      FARM_BUDDY_FARMERS_TABLE: "${self:custom.FarmBuddyFarmersTable.name}"
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: [
          "dynamodb:PutItem",
          "dynamodb:Scan",
          "dynamodb:GetItem",
          "ynamodb:UpdateItem",
          "dynamodb:Query",
          "dynamodb:BatchWriteItem",
        ],
        Resource: [
          "${self:custom.FarmBuddyFarmersTable.arn}"
        ]
      }
    ],
    lambdaHashingVersion: '20201221',
  },
  resources: {
    Resources: {
      FarmBuddyFarmersTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "FarmBuddyFarmersTable-${self:provider.stage}",
          BillingMode: "PAY_PER_REQUEST",
          AttributeDefinitions: [
            {
              AttributeName: "id",
              AttributeType: "S"
            },
            {
              AttributeName: "name",
              AttributeType: "S"
            }
          ],
          KeySchema: [
            {
              AttributeName: "id",
              KeyType: "HASH"
            },
            {
              AttributeName: "name",
              KeyType: "RANGE"
            }
          ]
        }
      }
    }
  },
  functions: { getFarmers, createFarmer, getFarmer },
};

module.exports = serverlessConfiguration;

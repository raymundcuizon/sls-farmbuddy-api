import type { AWS } from '@serverless/typescript';
import { createFarmer, getFarmers, getFarmer } from '@functions/Farmer';
import { createCrop, getCrops, getCrop } from '@functions/Crop';
import FarmBuddyFarmersTableRes from './resources/FarmBuddyFarmersTable';
import FarmBuddyCropsTableRes from './resources/FarmBuddyCropsTable';
import IAMFarmBuddyFarmersTable from './iam/FarmBuddyFarmersTable';
import IAMFarmBuddyCropsTable from './iam/FarmBuddyCropsTable';

const serverlessConfiguration: AWS = {
  service: 'farmbuddyapi',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
    authorizer: "arn:aws:lambda:#{AWS::Region}:#{AWS::AccountId}:function:auth-service-${self:provider.stage}-auth",
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
  plugins: ['serverless-webpack', 'serverless-pseudo-parameters'],
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
      IAMFarmBuddyFarmersTable,
      IAMFarmBuddyCropsTable,
    ],
    lambdaHashingVersion: '20201221',
  },
  resources: {
    Resources: {
      FarmBuddyFarmersTable: FarmBuddyFarmersTableRes,
      FarmBuddyCropsTable: FarmBuddyCropsTableRes,
    }
  },
  functions: { getFarmers, createFarmer, getFarmer, createCrop, getCrops, getCrop },
};

module.exports = serverlessConfiguration;

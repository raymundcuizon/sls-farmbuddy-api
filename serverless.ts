import type { AWS } from '@serverless/typescript';
import { createFarmer, getFarmers, getFarmer, updateFarmer } from '@functions/Farmer';
import { createCrop, getCrops, getCrop } from '@functions/Crop';
import { createFarmersCrop } from '@functions/FarmersCrop';
import FarmBuddyFarmersTableRes from './resources/FarmBuddyFarmersTable';
import FarmBuddyCropsTableRes from './resources/FarmBuddyCropsTable';
import IAMFarmBuddyFarmersTable from './iam/FarmBuddyFarmersTable';
import IAMFarmBuddyCropsTable from './iam/FarmBuddyCropsTable';
import IAMFarmBuddyFarmersCropTable from './iam/FarmBuddyFarmersCropTable';
import FarmBuddyFarmersCropTableRes from './resources/FarmBuddyFarmersCropTable';


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
      arn: { "Fn::GetAtt": ["FarmBuddyFarmersTable","Arn"] }
    },
    FarmBuddyCropsTable: {
      name : { "Ref": "FarmBuddyCropsTable" },
      arn: { "Fn::GetAtt": ["FarmBuddyCropsTable","Arn"] }
    },
    FarmBuddyFarmersCropTable: {
      name : { "Ref": "FarmBuddyFarmersCropTable" },
      arn: { "Fn::GetAtt": ["FarmBuddyFarmersCropTable","Arn"] }
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
      FARM_BUDDY_CROPS_TABLE: "${self:custom.FarmBuddyCropsTable.name}",
      FARM_BUDDY_FARMERS_CROP_TABLE: "${self:custom.FarmBuddyFarmersCropTable.name}"
    },
    iamRoleStatements: [
      IAMFarmBuddyFarmersTable,
      IAMFarmBuddyCropsTable,
      IAMFarmBuddyFarmersCropTable,
    ],
    lambdaHashingVersion: '20201221',
  },
  resources: {
    Resources: {
      FarmBuddyFarmersTable: FarmBuddyFarmersTableRes,
      FarmBuddyCropsTable: FarmBuddyCropsTableRes,
      FarmBuddyFarmersCropTable: FarmBuddyFarmersCropTableRes
    }
  },
  functions: { 
    getFarmers, createFarmer, getFarmer, updateFarmer, 
    createCrop, getCrops, getCrop, 
    createFarmersCrop
  },
};

module.exports = serverlessConfiguration;

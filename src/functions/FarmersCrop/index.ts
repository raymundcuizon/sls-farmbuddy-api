// import createFarmersCropSchema from './schema/createFarmersCrop';
import { handlerPath } from '@libs/handlerResolver';

export const getFarmerCrops = {
  handler: `${handlerPath(__dirname)}/getFarmerCrops.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'farmer-crops/{farmerId}',
        cors: true,
        authorizer: "${self:custom.authorizer}",
      }
    }
  ]
}
export const createFarmersCrop = {
    handler: `${handlerPath(__dirname)}/createFarmersCrop.main`,
    events: [
      {
        http: {
          method: 'post',
          path: 'farmers-crop/create',
          cors: true,
          authorizer: "${self:custom.authorizer}",
        }
      }
    ]
  }

  
// import createFarmersCropSchema from './schema/createFarmersCrop';
import { handlerPath } from '@libs/handlerResolver';

export const createFarmersCrop = {
    handler: `${handlerPath(__dirname)}/createFarmersCrop.main`,
    events: [
      {
        http: {
          method: 'post',
          path: 'farmers-crop/create',
          cors: true,
          authorizer: "${self:custom.authorizer}",
          // request: {
          //   schema: {
          //     'application/json': createFarmersCropSchema,
          //   }
          // }
        }
      }
    ]
  }

  
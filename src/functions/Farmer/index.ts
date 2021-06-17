import createFarmerSchema from './schema/createFarmer';
import { handlerPath } from '@libs/handlerResolver';

export const createFarmer = {
    handler: `${handlerPath(__dirname)}/createFarmer.main`,
    events: [
      {
        http: {
          method: 'post',
          path: 'farmer/create',
          cors: true,
          authorizer: "${self:custom.authorizer}",
          request: {
            schema: {
              'application/json': createFarmerSchema
            }
          }
        }
      }
    ]
  }

export const getFarmers = {
  handler: `${handlerPath(__dirname)}/getFarmers.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'farmers',
        cors: true,
        authorizer: "${self:custom.authorizer}",
      }
    }
  ]
}

export const getFarmer = {
  handler: `${handlerPath(__dirname)}/getFarmer.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'farmer/{id}',
        cors: true,
        authorizer: "${self:custom.authorizer}",
      }
    }
  ]
}
  
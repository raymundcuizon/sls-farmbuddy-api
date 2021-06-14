import createFarmerSchema from './schema/createFarmer';
import { handlerPath } from '@libs/handlerResolver';

export const createFarmer = {
    handler: `${handlerPath(__dirname)}/createFarmer.main`,
    events: [
      {
        http: {
          method: 'post',
          path: 'farmer/create',
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
      }
    }
  ]
}
  
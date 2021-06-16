import createCropSchema from './schema/createCrop';
import { handlerPath } from '@libs/handlerResolver';

export const createCrop = {
    handler: `${handlerPath(__dirname)}/createCrop.main`,
    events: [
      {
        http: {
          method: 'post',
          path: 'crop/create',
          request: {
            schema: {
              'application/json': createCropSchema
            }
          }
        }
      }
    ]
  }

export const getCrops = {
  handler: `${handlerPath(__dirname)}/getCrops.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'crops',
      }
    }
  ]
}

export const getCrop = {
  handler: `${handlerPath(__dirname)}/getCrop.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'crop/{id}',
      }
    }
  ]
}
  
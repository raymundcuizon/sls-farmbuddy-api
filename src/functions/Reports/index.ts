import { handlerPath } from '@libs/handlerResolver';

export const reportGetCrops = {
    handler: `${handlerPath(__dirname)}/getCrops.main`,
    events: [
      {
        http: {
          method: 'get',
          path: 'report/crops',
          cors: true,
          authorizer: "${self:custom.authorizer}",
        }
      }
    ]
  }

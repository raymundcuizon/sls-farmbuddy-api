export default {
    type: 'object',
    properties: {
      queryStringParameters: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            default: '',
          },
        },
      },
    },
    required: [
      'queryStringParameters',
    ],
} as const;
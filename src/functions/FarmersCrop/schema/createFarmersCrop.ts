export default {
  type: "object",
  properties: {
    body: { 
      type: 'object',
      properties: {
        farmerId: { type: 'string' },
        cropId: { type: 'string' },
        farmerName: { type: 'string' },
        cropName: { type: 'string' },
        landArea: { type: 'string' },
        plantCount: { type: 'number' },
      },
      required: ['farmerId','cropId','farmerName','cropName','landArea','plantCount'],
    }
  },
  required: ['body']
} as const;

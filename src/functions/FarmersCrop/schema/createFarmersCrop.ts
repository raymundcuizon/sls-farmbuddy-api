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
        landArea: { type: 'number' },
        plantCount: { type: 'number' },
        locationReg: { type: 'string' },
        locationProv: { type: 'string' },
        locationCity: { type: 'string' },
      },
      required: [
        'farmerId',
        'cropId',
        'farmerName',
        'cropName',
        'landArea',
        'plantCount',
        'locationReg',
        'locationProv',
        'locationCity'
      ],
    }
  },
  required: ['body']
} as const;

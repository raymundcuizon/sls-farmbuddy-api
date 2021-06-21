export default {
  type: "object",
  properties: {
    name: { type: 'string' },
    address: {
      type: "object",
      properties: {
        regCode: { type: 'string' },
        provCode: { type: 'string' },
        citymunCode: { type: 'string' },
        psgcCode: { type: 'string' },
        citymunDesc: { type: 'string' },
        provDesc: { type: 'string' },
        regDesc: { type: 'string' }
      }
    }
  },
  required: ['name']
} as const;
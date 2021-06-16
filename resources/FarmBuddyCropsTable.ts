export default {
    Type: "AWS::DynamoDB::Table",
    Properties: {
      TableName: "FarmBuddyCropsTable-${self:provider.stage}",
      BillingMode: "PAY_PER_REQUEST",
      AttributeDefinitions: [
        {
          AttributeName: "id",
          AttributeType: "S"
        }
      ],
      KeySchema: [
        {
          AttributeName: "id",
          KeyType: "HASH"
        }
      ]
    }
} as const;
export default {
    Type: "AWS::DynamoDB::Table",
    Properties: {
      TableName: "FarmBuddyFarmersTable-${self:provider.stage}",
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
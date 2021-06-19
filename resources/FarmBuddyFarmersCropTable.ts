export default {
    Type: "AWS::DynamoDB::Table",
    Properties: {
      TableName: "FarmBuddyFarmersCropTable-${self:provider.stage}",
      BillingMode: "PAY_PER_REQUEST",
      AttributeDefinitions: [
        {
          AttributeName: "id",
          AttributeType: "S"
        },
        {
          AttributeName: "farmerId",
          AttributeType: "S"
        },
        {
          AttributeName: "cropId",
          AttributeType: "S"
        }
      ],
      KeySchema: [
        {
          AttributeName: "id",
          KeyType: "HASH"
        }
      ],
      GlobalSecondaryIndexes: [
        {
            IndexName: "farmersCrop",
            KeySchema: [
                {
                    AttributeName: "farmerId",
                    KeyType: "HASH"
                },
                {
                    AttributeName: "cropId",
                    KeyType: "RANGE"
                }
            ],
            Projection : {
                ProjectionType: "ALL"
            }
        }
      ]
    }
} as const;
export default {
    Type: "AWS::DynamoDB::Table",
    Properties: {
      TableName: "FarmBuddyFarmersCropTable-test-${self:provider.stage}",
      BillingMode: "PAY_PER_REQUEST",
      AttributeDefinitions: [
        {
          AttributeName: "pk",
          AttributeType: "S"
        },
        {
          AttributeName: "sk",
          AttributeType: "S"
        },
        {
          AttributeName: "isActive",
          AttributeType: "S"
        },
        {
          AttributeName: "updatedAt",
          AttributeType: "S"
        },
        {
          AttributeName: "location",
          AttributeType: "S"
        }
      ],
      KeySchema: [
        {
          AttributeName: "pk",
          KeyType: "HASH"
        },
        {
            AttributeName: "sk",
            KeyType: "RANGE"
        }
      ],
      GlobalSecondaryIndexes: [
        {
            IndexName: "isActive",
            KeySchema: [
                {
                    AttributeName: "isActive",
                    KeyType: "HASH"
                },
                {
                    AttributeName: "updatedAt",
                    KeyType: "RANGE"
                }
            ],
            Projection : {
                ProjectionType: "ALL"
            }
        },
        {
          IndexName: "location",
          KeySchema: [
              {
                  AttributeName: "location",
                  KeyType: "HASH"
              },
              {
                  AttributeName: "updatedAt",
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
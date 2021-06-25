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
        },
        {
          AttributeName: "locationReg",
          AttributeType: "S"
        },
        {
          AttributeName: "locationProv",
          AttributeType: "S"
        },
        {
          AttributeName: "locationCity",
          AttributeType: "S"
        },
        {
          AttributeName: "updatedAt",
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
                    AttributeName: "updatedAt",
                    KeyType: "RANGE"
                }
            ],
            Projection : {
                ProjectionType: "ALL"
            }
        },
        {
          IndexName: "IcropId",
          KeySchema: [
              {
                  AttributeName: "cropId",
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
          IndexName: "IlocationReg",
          KeySchema: [
              {
                  AttributeName: "locationReg",
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
          IndexName: "IlocationProv",
          KeySchema: [
              {
                  AttributeName: "locationProv",
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
          IndexName: "IlocationCity",
          KeySchema: [
              {
                  AttributeName: "locationCity",
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
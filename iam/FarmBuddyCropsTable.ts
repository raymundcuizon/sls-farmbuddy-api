export default {
    Effect: "Allow",
    Action: ["dynamodb:PutItem","dynamodb:Scan","dynamodb:GetItem","dynamodb:UpdateItem","dynamodb:Query"],
    Resource: ["${self:custom.FarmBuddyCropsTable.arn}"]
} as const;


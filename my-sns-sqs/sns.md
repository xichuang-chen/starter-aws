# SNS

## AWS::SNS::Topic
- [AWS::SNS::Topic](https://docs.aws.amazon.com/zh_cn/AWSCloudFormation/latest/UserGuide/aws-properties-sns-topic.html)
- AWS::SNS::Topic 中的 Subscription  
  The Amazon SNS subscriptions (endpoints) for this topic  
  For full control over subscription behavior 
  (for example, delivery policy, filtering, raw message delivery, 
  and cross-region subscriptions), 
  use the [AWS::SNS::Subscription](https://docs.aws.amazon.com/zh_cn/AWSCloudFormation/latest/UserGuide/aws-resource-sns-subscription.html) resource.  
  也就是说，写endpoint 可以用AWS::SNS::Topic 中的 Subscription 也可以直接用 AWS::SNS::Subscription  
  [Subscription参考](https://docs.aws.amazon.com/zh_cn/AWSCloudFormation/latest/UserGuide/aws-properties-sns-subscription.html)
  
## SNS 与 Lambda 结合使用
- [将 Amazon Lambda 与 Amazon Simple Notification Service 结合使用](https://docs.amazonaws.cn/lambda/latest/dg/with-sns-example.html)

## SNS 与 SQS
- [Using an AWS CloudFormation template to create a topic that sends messages to Amazon SQS queues](https://docs.aws.amazon.com/sns/latest/dg/SendMessageToSQS.cloudformation.html)
- [AWS::SQS::QueuePolicy](https://docs.aws.amazon.com/zh_cn/AWSCloudFormation/latest/UserGuide/aws-properties-sqs-policy.html)
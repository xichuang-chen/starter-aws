

## create cloudwatch event trigger for lambda function
- [参考 - 配置 CloudWatch Events 以调用函数](https://docs.aws.amazon.com/zh_cn/lambda/latest/dg/services-cloudwatchevents.html)



## Copy file from a s3 bucket to another s3 bucket

### 1. create s3 bucket
- create s3 bucket
  create bucket name(e.g: my-bucket-src) and select correctly region.
  
- create another s3 bucket  
  create bucket name(e.g: my-bucket-dest) and select correctly region.
  
### 2. config s3 bucket permission
  config s3 bucket permission to make lambda can access it.

- s3 console select s3 bucket.
- select permission.
- 存储桶策略 - 编辑  
  role name must same with lambda function.
```json
  {
  "Version": "2008-10-17",
  "Statement": [
  {
  "Effect": "Allow",
  "Principal": {
  "AWS": "arn:aws:iam::1600****7600:role/service-role/my-role-cxc"
  },
  "Action": "s3:*",
  "Resource": "arn:aws:s3:::my-bucket-cxc-src/*"
  },
  {
  "Effect": "Allow",
  "Principal": {
  "AWS": "arn:aws:iam::1600****7600:role/service-role/my-role-cxc"
  },
  "Action": "s3:*",
  "Resource": "arn:aws:s3:::my-bucket-cxc-src"
  }
  ]
  }
  ```
### 3. create lambda function
- lambda function console
- create function  
  - create function name
  - 更改默认执行角色 - 从AWS策略模版创建新角色（该角色步骤2在配置s3权限时使用）
    
- code lambda function which can copy file from one s3 to another s3  
```javascript
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  region: 'ap-southeast-2',
});

exports.handler = async (event, context) => {
  const sourceBucket = 'my-bucket-cxc-src';
  const destinationBucket = 'my-bucket-cxc-dest';
  const files = await s3
    .listObjects({
      Bucket: sourceBucket,
    })
    .promise();
  
  return Promise.all(
    files.Contents.map(async content => {
      await s3
        .copyObject({
          Bucket: destinationBucket,
          CopySource: `/${sourceBucket}/${content.Key}`,
          Key: content.Key,
        })
        .promise();
    })
  );
};
```

### 4. test
- config test event
- 创建新测试事件
- 事件模版 - s3 put
- 填写事件名称
- click Test
- 验证 destination s3 是否有目标文件

## Trigger Cloudwatch alarm when Lambda failed
  [Trigger Cloudwatch alarm when Lambda failed](https://docs.aws.amazon.com/zh_cn/lambda/latest/dg/services-cloudwatchevents-tutorial.html)
### 1. Create lambda function
- [参考 - 创建 Lambda 函数](https://docs.aws.amazon.com/zh_cn/lambda/latest/dg/services-cloudwatchevents-tutorial.html)
- lambda函数定时被 CloudEvent 触发
- 注意环境变量 site 和 expected 的配置  
  在lambda function 中，读取 site 所指网址的数据，然后检测是否包含 expected 数据  
  if in, success~  
  if not in, fail, trigger alarm to cloudwatch.
  
- Copy S3 lambda function 当src s3 bucket 没 object时触发错误
```javascript
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  region: 'ap-southeast-2',
});

exports.handler = async (event, context) => {
  const sourceBucket = 'my-bucket-cxc-src';
  const destinationBucket = 'my-bucket-cxc-dest';
  const files = await s3
    .listObjects({
      Bucket: sourceBucket,
    })
    .promise();
  
  if (files.Contents.length < 1) {
    return Error.New("There are no object on s3 bucket my-bucket-cxc-src");
  }
  
  return Promise.all(
    files.Contents.map(async content => {
      await s3
        .copyObject({
          Bucket: destinationBucket,
          CopySource: `/${sourceBucket}/${content.Key}`,
          Key: content.Key,
        })
        .promise();
    })
  );
};
```
  
### 2. Test lambda function
- [参考 - 测试 Lambda 函数](https://docs.aws.amazon.com/zh_cn/lambda/latest/dg/services-cloudwatchevents-tutorial.html)

### 3. Create an Amazon SNS topic and subscribe to it
- [参考 - 创建一个 Amazon SNS 主题并订阅此主题](https://docs.aws.amazon.com/zh_cn/lambda/latest/dg/services-cloudwatchevents-tutorial.html)
- cloudwatch 可以将 alarm 消息发布到SNS topic，SNS topic 将 alarm 消息发送到邮箱等  
  如果配置邮箱sub，则去邮箱点击confirm， 在 SNS console 查看 topic 状态
- 在配置 cloudwatch alarm消息发送时需要指定 SNS topic 
- SNS 类似与消息队列

### 4. Configure an alarm
- [参考 - Configure an alarm](https://docs.aws.amazon.com/zh_cn/lambda/latest/dg/services-cloudwatchevents-tutorial.html)
- 创建警报
- 选择指标
- 选择lambda
- 搜索 lambda function 关键字 （E.g cxc and Errors 按照函数名）
- Static - Sum
- Config Threshold
- Notification - 选择  In alarm
- select SNS topic, 如果之前有，可以直接选择，如果没有则新建topic

### 5. Test alarm
- lambda function 点击test, 触发异常  
  如果使用 my-function-s3-cxc 则将 my-bucket-cxc-src 清空
  如果使用另一函数，则配置环境变量
  
- cloudwatch console 页面选择alarm, In alarm页面有Errors, 邮箱有邮件通知
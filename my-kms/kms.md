## KMS 是什么服务？能解决什么问题？
- AWS Key Management Service (AWS KMS) 是一项托管服务，可让您轻松创建和控制
  customer master keys(CMK)，即用于加密您的数据的加密密钥  
  该服务为您提供可用性高的密钥生成、存储、管理和审计解决方案
  
## 使用 KMS key 的方式有哪些？
- 加密敏感信息

## kms key 操作
- 创建、查看、编辑、标记、启用、禁止

## Use aws-cli create kms key
### use saml2aws create local credential
本地已经安装 saml2aws 并且已经配置过aws local credential
#### login  
  saml2aws login --profile tw-aws-beach
  
#### export 环境变量
  export AWS_PROFILE=tw-aws-beach  
  aws sts get-caller-identity --profile tw-aws-beach
  
### 使用aws-cli 创建对称 kms key  
  - aws kms create-key  
  ```json
  {
    "KeyMetadata": {
        "AWSAccountId": "1600****7600",
        "KeyId": "ad2cb066-19de-4444-9669-078fbbf7d50d",
        "Arn": "arn:aws:kms:ap-southeast-2:1600****7600:key/ad2cb066-19de-4444-9669-078fbbf7d50d",
        "CreationDate": "2021-06-10T17:52:37.685000+08:00",
        "Enabled": true,
        "Description": "",
        "KeyUsage": "ENCRYPT_DECRYPT",
        "KeyState": "Enabled",
        "Origin": "AWS_KMS",
        "KeyManager": "CUSTOMER",
        "CustomerMasterKeySpec": "SYMMETRIC_DEFAULT",
        "EncryptionAlgorithms": [
            "SYMMETRIC_DEFAULT"
        ]
    }
  }
  ```  
  - [Creating symmetric CMKs](https://docs.aws.amazon.com/kms/latest/developerguide/create-keys.html)

### 在 kms 控制台查看创建的 kms key  
  - 自己创建的 kms key 在 `Customer managed keys` ，aws 托管的在 `AWS managed keys`  
  - 选择 `Customer managed keys` 搜索框输入 keyId （通过上述步骤创建的没有别名)  
  - [在控制台中查看 CMK](https://docs.aws.amazon.com/zh_cn/kms/latest/developerguide/viewing-keys-console.html)  


## 加密
- [encrypt](https://docs.aws.amazon.com/cli/latest/reference/kms/encrypt.html)
```shell
aws kms encrypt \
    --key-id ad2cb066-19de-4444-9669-078fbbf7d50d \
    --region ap-southeast-2 \
    --plaintext fileb://data.txt \
    --output text \
    --query CiphertextBlob | base64 \
    --decode > encrypt.txt
```
- 加密后数据在 encrypt.txt

## 再加密
```shell
aws kms encrypt \
    --key-id ad2cb066-19de-4444-9669-078fbbf7d50d \
    --region ap-southeast-2 \
    --plaintext fileb://encrypt.txt \
    --output text \
    --query CiphertextBlob | base64 \
    --decode > encrypt2.txt
```
- 加密后数据在 encrypt2.txt

## 脱密
- [decrypt](https://docs.aws.amazon.com/cli/latest/reference/kms/decrypt.html)
```shell
aws kms decrypt \
    --ciphertext-blob fileb://output.txt \
    --key-id ad2cb066-19de-4444-9669-078fbbf7d50d \
    --region ap-southeast-2 \
    --output text \
    --query Plaintext | base64 \
    --decode > decrypt.txt
```

## 使用 AWS CloudFormation 创建 AWS KMS 资源
[AWS::KMS::Key](https://docs.aws.amazon.com/zh_cn/AWSCloudFormation/latest/UserGuide/aws-resource-kms-key.html)

### Syntax
```yaml
Type: AWS::KMS::Key
Properties: 
  Description: String
  Enabled: Boolean  #Specifies whether the CMK is enabled. Disabled CMKs cannot be used in cryptographic operations
  EnableKeyRotation: Boolean #By default, not enabled.  not supported on asymmetric CMKs
  KeyPolicy: Json  #If you are unsure of which policy to use, consider the default key policy
  KeySpec: String  #Specifies the type of CMK to create. The default value, SYMMETRIC_DEFAULT
  KeyUsage: String  #Determines the cryptographic operations for which you can use the CMK. The default value is ENCRYPT_DECRYPT
  PendingWindowInDays: Integer
  Tags: 
    - Tag

```  
- create kms-template.yml
- create stack

## AWS KMS 加密 Amazon S3 存储桶中的特定文件夹
- [使用 aws key 加密 s3 中文件](https://aws.amazon.com/cn/premiumsupport/knowledge-center/s3-encrypt-specific-folder/)

### 使用 aws-cli
```shell
aws s3 cp s3://my-bucket-cxc-src/kms-test/ s3://my-bucket-cxc-src/kms-test/ --recursive --sse aws:kms --sse-kms-key-id ad2cb066-19de-4444-9669-078fbbf7d50d
```

## Key rotation？
- [AWS 如何进行自动 Key rotation](https://docs.aws.amazon.com/zh_cn/kms/latest/developerguide/rotate-keys.html)

- 启用和禁用 key rotation  
aws kms enable-key-rotation --key-id ad2cb066-19de-4444-9669-078fbbf7d50d  
aws kms disable-key-rotation --key-id ad2cb066-19de-4444-9669-078fbbf7d50d
  
- 查看  
aws kms get-key-rotation-status --key-id ad2cb066-19de-4444-9669-078fbbf7d50d
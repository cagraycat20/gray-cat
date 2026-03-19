import * as cdk from 'aws-cdk-lib';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { GC_CONFIG } from 'stacks/shared/config';

export class WebUiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const siteBucket = new s3.Bucket(this, 'WebSiteBucket', {
      bucketName: GC_CONFIG.DOMAIN_NAME,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: '404.html',
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      blockPublicAccess: new s3.BlockPublicAccess({
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      }),
    });

    new s3.Bucket(this, 'S3BucketForWwwRedirection', {
      bucketName: `www.${GC_CONFIG.DOMAIN_NAME}`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      websiteRedirect: {
        hostName: GC_CONFIG.DOMAIN_NAME,
      },
    });

    const distribution = new cloudfront.Distribution(this, 'CloudfrontDistribution', {
      comment: `Distribution for viktor-livar-personal-site`,
      // domainNames: [DOMAIN_NAME],
      // certificate,
      sslSupportMethod: cloudfront.SSLMethod.SNI,
      defaultRootObject: 'index.html',
      defaultBehavior: {
        origin: new origins.HttpOrigin(siteBucket.bucketWebsiteDomainName, {
          protocolPolicy: cloudfront.OriginProtocolPolicy.HTTP_ONLY,
        }),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        compress: true,
      },
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 404,
          responsePagePath: '/404.html',
          ttl: cdk.Duration.minutes(5),
        },
      ],
    });
  }
}

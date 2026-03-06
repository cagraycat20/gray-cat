import * as S3 from 'aws-sdk/clients/s3';
import uuidv4 from 'uuid/v4';
import uuidv5 from 'uuid/v5';

const {USER_CONTENT_BUCKET = '', CLOUDFRONT_BASE_URL = ''} = process.env;

const NAMESPACE = '7e1f0372-2169-4611-951a-55faa68d4ec6';

export async function pageUpload(s3: S3, page: string, userId: string): Promise<string> {
  const pageKey = `share/${uuidv5(userId, NAMESPACE)}/${uuidv4()}.html`;

  await s3.putObject({
    Bucket: USER_CONTENT_BUCKET,
    Key: pageKey,
    Body: new Buffer(page),
    CacheControl: 'max-age=2678400,public',
    ContentType: 'text/html',
  }).promise();

  return `${CLOUDFRONT_BASE_URL}/${pageKey}`;
}

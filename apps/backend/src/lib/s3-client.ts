import S3 from 'aws-sdk/clients/s3';

const {IS_OFFLINE, S3_URL, LOCAL_S3_URL} = process.env;

const s3Options = {
  endpoint: IS_OFFLINE ? LOCAL_S3_URL : S3_URL,
  s3ForcePathStyle: true,
};

export const s3 = new S3(s3Options);

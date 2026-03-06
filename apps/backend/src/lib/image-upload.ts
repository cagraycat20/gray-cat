import * as S3 from 'aws-sdk/clients/s3';
import fileType from 'file-type';
import fetch from 'node-fetch';
import uuidv4 from 'uuid/v4';
import uuidv5 from 'uuid/v5';
import { productUtils } from '../../../web-ui/src/shared';

const {MEDIA_BUCKET = '' } = process.env;

const NAMESPACE = 'f763ab7a-2aa9-49c8-8851-e9feeb61c040';
const ALLOWED_FILE_TYPES = ['jpg', 'png', 'jpeg'];
const THUMB_SIZE = 5;

export async function imageUpload(s3: S3, image: string, userId: string, isAdmin: boolean): Promise<string> {
  let body: Buffer;

  if (image.startsWith('http')) {
    body = await fetch(image).then((res) => res.buffer());
  } else if (image.startsWith('data:image')) {
    body = new Buffer(image.split(',')[1], 'base64');
  } else {
    return image; // Already uploaded
  }

  const {ext} = fileType(body);

  if (!ALLOWED_FILE_TYPES.some((type) => type === ext)) {
    throw new Error(`Forbidden file type ${ext}`); // TODO stronger security check
  }

  let mediaKey: string;
  if (isAdmin) {
    mediaKey = `${uuidv4()}.${ext}`;
  } else {
    mediaKey = `${uuidv5(userId, NAMESPACE)}/${uuidv4()}.${ext}`;
  }

  await s3.putObject({
    Bucket: MEDIA_BUCKET,
    Key: mediaKey,
    Body: body,
  }).promise();

  return mediaKey;
}

export async function getImageThumbnail(s3: S3, image: string): Promise<string> {
  if (!image) {
    return '';
  }
  const body = await fetch(
    productUtils.getProductImage(image, THUMB_SIZE, THUMB_SIZE) || '',
  ).then((res) => res.buffer());
  return Buffer.from(body).toString('base64');
}

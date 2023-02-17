import AWS from 'aws-sdk';
import { S3 } from '@aws-sdk/client-s3';
import { UploadedFile } from 'express-fileupload';

import * as dotenv from 'dotenv';
dotenv.config();

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID_S3,
  secretAccessKey: process.env.SECRET_ACCESS_KEY_S3,
  region: process.env.REGION_s3,
});

const s3 = new AWS.S3({ region: process.env.REGION_s3 });

async function uploadImage(file: UploadedFile): Promise<boolean> {
  const fileContents = Buffer.from(file.data as ArrayBuffer);

  const params: AWS.S3.PutObjectRequest = {
    Bucket: process.env.BUCKET_s3,
    Key: file.name,
    Body: fileContents,
  };

  const result = await s3.upload(params).promise();

  if (result.Location) {
    return true;
  } else {
    return false;
  }
}
export {  uploadImage };

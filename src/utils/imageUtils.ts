import AWS from 'aws-sdk';
import { UploadedFile } from 'express-fileupload';
import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { S3Client } from '@aws-sdk/client-s3';

import * as dotenv from 'dotenv';
dotenv.config();

AWS.config.update({
  // try to use the lasted version but not work :((
  accessKeyId: process.env.ACCESS_KEY_ID_S3,
  secretAccessKey: process.env.SECRET_ACCESS_KEY_S3,
  region: process.env.REGION_s3,
});

const s3Client = new S3Client({
  region: process.env.REGION_s3,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID_S3,
    secretAccessKey: process.env.SECRET_ACCESS_KEY_S3,
  },
});

const s3 = new AWS.S3({ region: process.env.REGION_s3 });

const uploadImage = async (userId: string, file: UploadedFile) => {
  console.log('ok upload');

  const fileContents = Buffer.from(file.data as ArrayBuffer);
  const key = userId + Date.now().toString();

  const params: AWS.S3.PutObjectRequest = {
    Bucket: process.env.BUCKET_s3,
    Key: key,
    Body: fileContents,
    ContentType: file.mimetype,
    ACL: 'public-read',
  };

  const result = await s3.upload(params).promise();

  if (result.Location) {
    return process.env.LINK_BUCKET_S3 + key;
  } else {
    return false;
  }
};

const deleteImage = async (urlImage: string) => {
  const key = urlImage.replace(process.env.LINK_S3, '');
  console.log(key);

  const bucketParams = {
    Bucket: 'cuoidicuoidi-store',
    Key: key,
  };
  try {
    const data = await s3Client.send(new DeleteObjectCommand(bucketParams));
    return data;
  } catch (err) {
    console.log('Error', err);
    return false;
  }
};

export { uploadImage, deleteImage };

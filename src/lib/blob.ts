import { env } from "@/env.mjs";
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const S3 = new S3Client({
  region: "auto",
  endpoint: `https://${env.STORAGE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.STORAGE_ACCESS_KEY_ID,
    secretAccessKey: env.STORAGE_SECRET_ACCESS_KEY,
  },
});

export function uploadFile(
  bucketName: string,
  buffer: Buffer,
  fileType: string,
  fileName: string,
) {
  return S3.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: buffer,
      ContentType: fileType,
    }),
  );
}

export function getStaticUrlFor(fileName: string) {
  return new URL(fileName, env.STORAGE_STATIC_URL);
}

export function getExpirableUrlFor(
  containerName: string,
  fileName: string,
  expiresInSeconds?: number | undefined,
) {
  const command = new GetObjectCommand({
    Bucket: containerName,
    Key: fileName,
  });
  return getSignedUrl(S3, command, {
    expiresIn: expiresInSeconds,
  });
}

export function deleteFile(containerName: string, fileName: string) {
  return S3.send(
    new DeleteObjectCommand({
      Bucket: containerName,
      Key: fileName,
    }),
  );
}

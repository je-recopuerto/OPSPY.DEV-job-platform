import { BlobServiceClient } from "@azure/storage-blob";

const sasToken = process.env.NEXT_PUBLIC_STORAGESASTOKEN;
const storageAccountName = process.env.NEXT_PUBLIC_STORAGERESOURCENAME;

export const blobService = new BlobServiceClient(
  `https://${storageAccountName}.blob.core.windows.net/${sasToken}`,
);

export async function uploadFile(
  containerName: string,
  buffer: ArrayBuffer,
  fileType: string,
  fileName: string,
) {
  const containerClient = blobService.getContainerClient(containerName);
  await containerClient.createIfNotExists({
    access: "container",
  });

  const blobClient = containerClient.getBlockBlobClient(fileName);
  const options = { blobHTTPHeaders: { blobContentType: fileType } };

  return await blobClient.uploadData(buffer, options);
}

export function getUrlFor(containerName: string, fileName: string) {
  const containerClient = blobService.getContainerClient(containerName);
  const blobClient = containerClient.getBlockBlobClient(fileName);

  return blobClient.url;
}

export async function deleteFile(containerName: string, fileName: string) {
  const containerClient = blobService.getContainerClient(containerName);
  const blobClient = containerClient.getBlockBlobClient(fileName);

  return await blobClient.deleteIfExists();
}

import {
  BlobSASPermissions,
  BlobSASSignatureValues,
  BlobServiceClient,
  generateBlobSASQueryParameters,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";

const storageAccountName = process.env.AZURE_STORAGE_ACCOUNT_NAME!;
const storageAccountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY!;

const sharedKeyCredential = new StorageSharedKeyCredential(
  storageAccountName,
  storageAccountKey,
);
export const blobService = new BlobServiceClient(
  `https://${storageAccountName}.blob.core.windows.net`,
  sharedKeyCredential,
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
  const blobClient = containerClient.getBlobClient(fileName);

  return blobClient.url;
}

export function getExpirableUrlFor(
  containerName: string,
  fileName: string,
  expiresAt: Date,
) {
  const containerClient = blobService.getContainerClient(containerName);
  const blobClient = containerClient.getBlobClient(fileName);

  // Start date
  const startsOn = new Date();

  const sasOptions: BlobSASSignatureValues = {
    containerName,
    // blobName: fileName,
    permissions: BlobSASPermissions.parse("r"),
    startsOn: startsOn,
    expiresOn: expiresAt,
    ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
  };

  const sasToken = generateBlobSASQueryParameters(
    sasOptions,
    sharedKeyCredential,
  ).toString();

  return `${blobClient.url}?${sasToken}`;
}

export async function deleteFile(containerName: string, fileName: string) {
  const containerClient = blobService.getContainerClient(containerName);
  const blobClient = containerClient.getBlockBlobClient(fileName);

  return await blobClient.deleteIfExists();
}

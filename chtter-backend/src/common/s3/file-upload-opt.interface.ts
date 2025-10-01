export interface FileUploadOptions {
  bucket: string;
  key: string; // file name
  file: Buffer;
}

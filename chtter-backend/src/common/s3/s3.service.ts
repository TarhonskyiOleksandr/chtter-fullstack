import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { FileUploadOptions } from './file-upload-opt.interface';

@Injectable()
export class S3Service {
  private readonly client: S3Client;
  private readonly region: string;

  constructor(private readonly configService: ConfigService) {
    const accessKeyId = configService.get('AWS_ADMIN_ACCESS_KEY');
    const secretAccessKey = configService.get('AWS_ADMIN_SECRET_KEY');
    this.region = configService.getOrThrow('AWS_REGION');

    this.client = new S3Client({
      region: this.region,
      credentials:
        accessKeyId && secretAccessKey
          ? { accessKeyId, secretAccessKey }
          : undefined,
    });
  }

  async upload({ bucket, key, file }: FileUploadOptions) {
    await this.client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: file,
      }),
    );
  }

  async getObjectUrl(bucket: string, key: string) {
    return `https://${bucket}.s3.${this.region}.amazonaws.com/${key}`;
  }
}

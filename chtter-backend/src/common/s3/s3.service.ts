import { PutObjectCommand, S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
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
    this.region = configService.get('AWS_REGION') ?? 'us-east-1';

    const clientConfig: S3ClientConfig = {};

    if (accessKeyId && secretAccessKey) {
      clientConfig.region = this.region;
      clientConfig.credentials = {
        accessKeyId,
        secretAccessKey,
      };
    }

    this.client = new S3Client(clientConfig);
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

  getObjectUrl(bucket: string, key: string) {
    const region = this.client.config.region;
    return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
  }
}

import multer, { StorageEngine } from 'multer';
import crypto from 'crypto';
import path from 'path';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 's3' | 'disk';

  tmpFolder: string;
  uploadFolder: string;
  multer: {
    storage: StorageEngine;
  };
  config: {
    disk: {
      storage: StorageEngine;
    };
    s3: {
      bucket: string;
      base_url: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVE,

  tmpFolder,
  uploadFolder: path.resolve(tmpFolder, 'uploads'),
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  },
  config: {
    disk: {},
    s3: {
      bucket: 'gobarber',
      base_url: 'https://gobarber.s3.Region.amazonaws.com/',
    },
  },
} as IUploadConfig;

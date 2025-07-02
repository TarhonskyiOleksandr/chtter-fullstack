import { UnprocessableEntityException } from '@nestjs/common';

export const handleMongoError = (err: any) => {
  if (err?.code === 11000) {
    const duplicatedField = Object.keys(err.keyValue)[0];
    const value = err.keyValue[duplicatedField];

    return new UnprocessableEntityException(
      `${duplicatedField} "${value}" already exists`,
    );
  }

  return err;
};

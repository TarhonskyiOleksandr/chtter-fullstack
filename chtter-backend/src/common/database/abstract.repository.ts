import { Logger, NotFoundException } from '@nestjs/common';
import { AbstractEntity } from './abstract.entity';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';

export abstract class AbstractRepository<T extends AbstractEntity> {
  protected readonly logger: Logger;

  constructor(protected readonly model: Model<T>) {}

  async create(document: Omit<T, '_id'>): Promise<T> {
    const newDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });

    return (await newDocument.save()).toObject();
  }

  async findOne(filterQuery: FilterQuery<T>): Promise<T> {
    const document = await this.model.findOne(filterQuery).lean<T>();

    if (!document) {
      this.logger.warn('Document not found', filterQuery);
      throw new NotFoundException('Document not found');
    }

    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<T>,
    updateQuery: UpdateQuery<T>,
  ): Promise<T> {
    const updatedDocument = await this.model
      .findOneAndUpdate(filterQuery, updateQuery, { new: true })
      .lean<T>();

    if (!updatedDocument) {
      this.logger.warn('Document not found', filterQuery);
      throw new NotFoundException('Document not found');
    }

    return updatedDocument;
  }

  async find(
    filterQuery: FilterQuery<T>,
    sortQuery?: Record<string, 1 | -1>,
  ): Promise<T[]> {
    const query = this.model.find(filterQuery);
    if (sortQuery) query.sort(sortQuery);
    return query.lean<T[]>();
  }

  async findOneAndDelete(filterQuery: FilterQuery<T>): Promise<T> {
    return await this.model.findOneAndDelete(filterQuery).lean<T>();
  }
}

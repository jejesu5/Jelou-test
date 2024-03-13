import { FilterQuery, Model, QueryOptions, UpdateQuery, Types } from 'mongoose';
export class BaseRepository<T> {
  private model: Model<T>;
  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(rawData: Partial<T>) {
    const document = new this.model(rawData);

    await document.save();
    return document;
  }

  findOne(query: FilterQuery<T>, projection?: string, options?: QueryOptions) {
    return this.model.findOne(query, projection, options);
  }

  findById(
    id: Types.ObjectId | string,
    projection?: string,
    options?: QueryOptions,
  ) {
    return this.model.findById(id, projection, options);
  }

  find(query: FilterQuery<T>, projection?: string, options?: QueryOptions) {
    return this.model.find(query, projection, options);
  }

  updateOne(
    query: FilterQuery<T>,
    update: UpdateQuery<T>,
    options?: QueryOptions,
  ) {
    return this.model.updateOne(query, update, options);
  }

  updateMany(
    query: FilterQuery<T>,
    update: UpdateQuery<T>,
    options?: QueryOptions,
  ) {
    return this.model.updateMany(query, update, options);
  }

  aggregate(pipeline: any[]) {
    return this.model.aggregate(pipeline);
  }

  deleteOne(query: FilterQuery<T>) {
    return this.model.deleteOne(query);
  }

  deleteMany(query: FilterQuery<T>) {
    return this.model.deleteMany(query);
  }

  async countDocuments(query: FilterQuery<T>): Promise<number> {
    return this.model.countDocuments(query);
  }
}

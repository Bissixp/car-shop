import { isValidObjectId, Model, UpdateQuery } from 'mongoose';
import { IModel } from '../interfaces/IModel';
import ErrorHttp, { ErrorTypes } from '../errors/errorHandler';

abstract class MongoModel<T> implements IModel<T> {
  protected _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  public async create(obj: T): Promise<T> {
    const newObj = await this._model.create(obj);
    return newObj;
  }

  public async read(): Promise<T[]> {
    const findAll = await this._model.find();
    return findAll;
  }

  public async readOne(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new ErrorHttp(ErrorTypes.InvalidMongoId, 400);

    const findOne = await this._model.findOne({ _id });
    return findOne;
  }

  public async update(_id: string, payload: Partial<T>): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new ErrorHttp(ErrorTypes.InvalidMongoId, 400);

    const updated = await this._model.findByIdAndUpdate(
      { _id },
      { ...payload } as UpdateQuery<T>,
      { new: true },
    );
    
    return updated as T;
  }

  public async delete(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new ErrorHttp(ErrorTypes.InvalidMongoId, 400);

    const deleted = await this._model.deleteOne({ _id });
    return deleted as unknown as T;
  }
}

export default MongoModel;
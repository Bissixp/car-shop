import { ICar, CarZodSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import ErrorHttp, { ErrorTypes } from '../errors/errorHandler';

export default class CarService {
  constructor(private _car: IModel<ICar>) { }

  public async create(obj: unknown): Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }

    const newCar = await this._car.create(parsed.data);
    return newCar;
  }

  public async read(): Promise<ICar[]> {
    const allCars = await this._car.read();
    return allCars;
  }

  public async readOne(_id: string): Promise<ICar> {
    const findCar = await this._car.readOne(_id);
    if (!findCar) throw new ErrorHttp(ErrorTypes.EntityNotFound, 404);
    return findCar;
  }

  public async update(_id: string, payload: ICar): Promise<ICar> {
    const parsed = CarZodSchema.safeParse(payload);
    if (!parsed.success) {
      throw parsed.error;
    }

    const updated = await this._car.update(_id, payload);
    
    if (!updated) throw new ErrorHttp(ErrorTypes.EntityNotFound, 404);
    return updated;
  }

  public async delete(_id: string): Promise<ICar | null> {
    const findCar = await this._car.readOne(_id);
    if (!findCar) throw new ErrorHttp(ErrorTypes.EntityNotFound, 404);
    const deleted = await this._car.delete(_id);
    return deleted;
  }
}
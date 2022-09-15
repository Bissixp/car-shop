import { Request, Response } from 'express';
import CarService from '../services/CarService';

export default class CarController {
  constructor(private _service: CarService) { }

  public async create(req: Request, res: Response) {
    const newCar = await this._service.create(req.body);
    return res.status(201).json(newCar);
  }

  public async read(_req: Request, res: Response) {
    const listAllCars = await this._service.read();
    return res.status(200).json(listAllCars);
  }

  public async readOne(req: Request, res: Response) {
    const listOneCar = await this._service.readOne(req.params.id);
    return res.status(200).json(listOneCar);
  }
}
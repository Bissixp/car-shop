import { Router } from 'express';
import CarController from '../controllers/CarController';
import CarModel from '../models/ICarModel';
import CarService from '../services/CarService';

const route = Router();

const Car = new CarModel();
const newCarService = new CarService(Car);
const newCarController = new CarController(newCarService);

route.post('/cars', (req, res) => newCarController.create(req, res));

export default route;
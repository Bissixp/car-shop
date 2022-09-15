import { Router } from 'express';
import CarController from '../controllers/CarController';
import CarModel from '../models/ICarModel';
import CarService from '../services/CarService';

const route = Router();

const Car = new CarModel();
const newCarService = new CarService(Car);
const newCarController = new CarController(newCarService);

route.get('/:id', (req, res) => newCarController.readOne(req, res));
route.put('/:id', (req, res) => newCarController.update(req, res));
route.delete('/:id', (req, res) => newCarController.delete(req, res));
route.post('/', (req, res) => newCarController.create(req, res));
route.get('/', (req, res) => newCarController.read(req, res));

export default route;
import { expect } from 'chai';
import { Request, Response } from 'express';
import Sinon, * as sinon from 'sinon';
import ICarController from '../../../controllers/CarController';
import ICarModel from '../../../models/ICarModel';
import ICarService from '../../../services/CarService';
import { carMock, carMockUpdate } from '../Mocks/ModelMocks';


describe('Car Controller', () => {
  const carModel = new ICarModel()
  const carService = new ICarService(carModel);
  const carController = new ICarController(carService);
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(() => {
    sinon.restore()
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });
  describe('Create', () => {
    it('Should return a car object with status 201', async () => {
      sinon.stub(carService, 'create').resolves(carMock);
      req.body = carMock;
      await carController.create(req, res);

      const statusStub = res.status as sinon.SinonStub
      const jsonStub = res.json as sinon.SinonStub

      expect(statusStub.calledWith(201)).to.be.true;
      expect(jsonStub.calledWith(carMock)).to.be.true;
    });
  });

  describe('Read', () => {
    it('Should return cars an array with status 200', async () => {
      sinon.stub(carService, 'read').resolves([carMock]);
      await carController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([carMock])).to.be.true;
    });
  });
  describe('Read One', () => {
    it('Should return just one car with status 200', async () => {
      sinon.stub(carService, 'readOne').resolves(carMock);
      req.params = { id: carMock._id };

      await carController.readOne(req, res);

      const statusStub = res.status as Sinon.SinonStub;
      const jsonStub = res.json as Sinon.SinonStub;

      expect(statusStub.calledWith(200)).to.be.true;
      expect(jsonStub.calledWith(carMock)).to.be.true;
    })
  })
  describe('Update', () => {
    it('Should update a car with status 200', async () => {
      sinon.stub(carService, 'update').resolves(carMockUpdate);
      req.params = { id: carMock._id };
      req.body = carMock;

      await carController.update(req, res);

      const statusStub = res.status as Sinon.SinonStub;
      const jsonStub = res.json as Sinon.SinonStub;

      expect(statusStub.calledWith(200)).to.be.true;
      expect(jsonStub.calledWith(carMockUpdate)).to.be.true;
    })
  })
  describe('Delete', () => {
    it('Should delete a car with status 204', async () => {
      sinon.stub(carService, 'delete').resolves(carMock);
      req.params = { id: carMock._id };

      await carController.delete(req, res);

      const statusStub = res.status as Sinon.SinonStub;
      const jsonStub = res.json as Sinon.SinonStub;

      expect(statusStub.calledWith(204)).to.be.true;
      expect(jsonStub.calledWith(carMock)).to.be.true;
    })
  })
});
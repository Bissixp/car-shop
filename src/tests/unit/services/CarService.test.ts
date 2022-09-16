import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/errorHandler';
import IcarModel from '../../../models/ICarModel';
import IcarService from '../../../services/CarService';
import { ICar } from '../../../interfaces/ICar';
import { carMock, carMockUpdate } from '../Mocks/ModelMocks';

describe('Car Service', () => {
  const carModel = new IcarModel();
  const carService = new IcarService(carModel);

  beforeEach(() => {
    sinon.restore()
  });

  describe('Create', () => {
    it('Should return a car object', async () => {
      sinon.stub(carModel, 'create').resolves(carMock);
      const carCreated = await carService.create(carMock);

      expect(carCreated).to.be.deep.equal(carMock);
    });

    it('Should return a error if fail', async () => {
      sinon.stub(carModel, 'create').resolves(carMock);
      let err: any;

      try {
        await carService.create({});
      } catch (error: any) {
        err = error;
      }

      expect(err).to.be.instanceOf(ZodError);
    });
  });

  describe('Read', () => {
    it('Should return cars an array', async () => {
      sinon.stub(carModel, 'read').resolves([carMock]);
      const allCars = await carService.read();
      expect(allCars).to.be.deep.equal([carMock]);
    });
  });
  describe('Read One', () => {
    it('Should return just one car', async () => {
      sinon.stub(carModel, 'readOne').resolves(carMock);
      const findCar = await carService.readOne(carMock._id);
      expect(findCar).to.be.deep.equal(carMock);
    })
    it('Should return a error if not found car', async () => {
      sinon.stub(carModel, 'readOne').resolves(null);
      let err: any;

      try {
        await carService.readOne(carMock._id);
      } catch (error) {
        err = error;
      }

      expect(err.message).to.be.deep.equal(ErrorTypes.EntityNotFound)
    });
  });
  describe('Update', () => {
    it('Should update a car', async () => {
      sinon.stub(carModel, 'update').resolves(carMockUpdate);
      const carCreated = await carService.update(carMock._id, carMockUpdate);

      expect(carCreated).to.be.deep.equal(carMockUpdate);
    });

    it('Should return a error if fail', async () => {
      sinon.stub(carModel, 'update').resolves(null);
      let err: any;

      try {
        await carService.update(carMockUpdate._id, {} as ICar);
      } catch (error: any) {
        err = error;
      }

      expect(err).to.be.instanceOf(ZodError);
    });
    it('Should return a error if not found car', async () => {
      sinon.stub(carModel, 'update').resolves(null);
      let err: any;

      try {
        await carService.update('any-id', carMockUpdate);
      } catch (error) {
        err = error;
      }

      expect(err.message).to.be.deep.equal(ErrorTypes.EntityNotFound)
    });
  });
  describe('Delete', () => {
    it('Should delete a car', async () => {
      sinon.stub(carModel, 'readOne').resolves(carMock);
      sinon.stub(carModel, 'delete').resolves(carMock);

      const deleted = await carService.delete(carMock._id);

      expect(deleted).to.be.deep.equal(carMock);
    });

    it('Should return a error if not found car', async () => {
      sinon.stub(carModel, 'readOne').resolves(null);

      let err: any;

      try {
        await carService.delete(carMock._id)
      } catch (error) {
        err = error
      };

      expect(err.message).to.be.deep.equal(ErrorTypes.EntityNotFound)
    });
  });
});
import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import ICarModel from '../../../models/ICarModel';
import { carMock, carMockUpdate, deletedMock } from '../Mocks/ModelMocks';
import {ErrorTypes} from '../../../errors/errorHandler';

const { expect } = chai;

describe('Car Model', () => {
  const carModel = new ICarModel();
  before(() => {
    sinon.stub(Model, 'create').resolves(carMock);
    sinon.stub(Model, 'find').resolves([carMock]);
    sinon.stub(Model, 'findOne').resolves(carMock);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockUpdate);
    sinon.stub(Model, 'deleteOne').resolves(deletedMock);
  });
  after(() => {
    sinon.restore();
  })

  describe('Create', () => {
    it('Should return a car object', async () => {
      const newCar = await carModel.create(carMock)
      expect(newCar).to.be.deep.equal(carMock);
    });
  });

  describe('Read', () => {
    it('Should return cars an array', async () => {
      const Allcars = await carModel.read();
      expect(Allcars).to.be.deep.equal([carMock]);
    });
  });

  describe('Read One', () => {
    it('Should return just one car', async () => {
      const findCar = await carModel.readOne(carMock._id);
      expect(findCar).to.be.deep.equal(carMock);
    });
    it('_id not found to change', async () => {
      try {
        await carModel.readOne('99999');
      } catch (error: any) {
        expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
      }
    });
  });

  describe('Update', () => {
    it('Should update a car', async () => {
      const updated = await carModel.update(carMock._id, carMockUpdate);

      expect(updated).to.be.deep.equal(carMockUpdate);
    });
    it('_id not found to change', async () => {
      try {
        await carModel.update('99999', carMock);
      } catch (error: any) {
        expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
      }
    });
  });

  describe('Delete', () => {
    it('Should delete a car', async () => {
      const deleted = await carModel.delete(carMock._id);

      expect(deleted).to.be.deep.equal(deletedMock);
    });
    it('_id not found to change', async () => {
      try {
        await carModel.delete('99999');
      } catch (error: any) {
        expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
      }
    });
  });
});
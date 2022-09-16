import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import ICarModel from '../../../models/ICarModel';
import { carMock, carMockUpdate, deletedMock } from '../Mocks/ModelMocks';
import { ErrorTypes } from '../../../errors/errorHandler';

const { expect } = chai;

describe('Car Model', () => {
  const carModel = new ICarModel();
  beforeEach(() => {
    sinon.restore();
  });

  describe('Create', () => {
    it('Should return a car object', async () => {
      sinon.stub(Model, 'create').resolves(carMock);
      const newCar = await carModel.create(carMock)
      expect(newCar).to.be.deep.equal(carMock);
    });
  });

  describe('Read', () => {
    it('Should return cars an array', async () => {
      sinon.stub(Model, 'find').resolves([carMock]);
      const Allcars = await carModel.read();
      expect(Allcars).to.be.deep.equal([carMock]);
    });
  });

  describe('Read One', () => {
    it('Should return just one car', async () => {
      sinon.stub(Model, 'findOne').resolves(carMock);
      const findCar = await carModel.readOne(carMock._id);
      expect(findCar).to.be.deep.equal(carMock);
    });
    it('_id not found to read', async () => {
      sinon.stub(Model, 'findOne').resolves(carMock);
      try {
        await carModel.readOne('99999');
      } catch (error: any) {
        expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
      }
    });
  });

  describe('Update', () => {
    it('Should update a car', async () => {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockUpdate);
      const updated = await carModel.update(carMock._id, carMockUpdate);

      expect(updated).to.be.deep.equal(carMockUpdate);
    });
    it('_id not found to change', async () => {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockUpdate);
      try {
        await carModel.update('99999', carMock);
      } catch (error: any) {
        expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
      }
    });
  });

  describe('Delete', () => {
    it('Should delete a car', async () => {
      sinon.stub(Model, 'deleteOne').resolves(deletedMock);
      const deleted = await carModel.delete(carMock._id);

      expect(deleted).to.be.deep.equal(deletedMock);
    });
    it('_id not found to delete', async () => {
      // sinon.stub(Model, 'deleteOne').resolves(carMock);
      try {
        await carModel.delete('99999');
      } catch (error: any) {
        expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
      }
    });
  });
});
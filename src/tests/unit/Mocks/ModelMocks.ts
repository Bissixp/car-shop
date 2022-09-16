import { ICar } from "../../../interfaces/ICar";

export const carMock: ICar & { _id: string } = {
  _id: "4edd40c86762e0fb12000003",
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
}

export const carMockUpdate: ICar & { _id: string } = {
  _id: "4edd40c86762e0fb12000003",
  model: "Fiat Uno",
  year: 1963,
  color: "blue",
  buyValue: 3500,
  seatsQty: 4,
  doorsQty: 4
}

//https://stackoverflow.com/questions/62610281/how-to-get-an-error-by-using-deleteone-method-of-mongoose-with-a-key-after-delet
export const deletedMock: any = {
  ...carMock,
  acknowledged: true,
  deletedCount: 1
}
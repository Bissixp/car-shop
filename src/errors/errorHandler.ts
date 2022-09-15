export default class ErrorHttp extends Error {
  public http: number;
  constructor(message: string, http: number) {
    super(message);
    this.http = http;
  }
}

export enum ErrorTypes {
  EntityNotFound = 'Entity not found',
  InvalidMongoId = 'Id must be a 24 characters hexadecimal',
  InvalidFields = 'Some fields are required',
}
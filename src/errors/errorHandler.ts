export default class ErrorHttp extends Error {
  public http: number;
  constructor(message: string, http: number) {
    super(message);
    this.http = http;
  }
}

export enum ErrorTypes {
  EntityNotFound = 'Object not found',
  InvalidMongoId = 'Id must have 24 hexadecimal characters',
}
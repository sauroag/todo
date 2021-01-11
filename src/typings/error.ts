import { ValidationFailure } from '@typings';

export class AppError extends Error {
  status: string;
  statusCode: number;
}

// tslint:disable-next-line: max-classes-per-file
export class ParametersError extends AppError {
  status: string = 'DEFAULT_ERRORS.PARAMETER_NOT_SENT';
  statusCode: number = 400;
  constructor(msg: string) {
    super(msg);
  }
}

// tslint:disable-next-line: max-classes-per-file
export class NotFoundError extends AppError {
  status: string = 'DEFAULT_ERRORS.RESOURCE_NOT_FOUND';
  statusCode: number = 404;

  constructor(msg: string) {
    super(msg);
  }
}

// tslint:disable-next-line: max-classes-per-file
export class ServerError extends AppError {
  status: string = 'DEFAULT_ERRORS.INTERNAL_SERVER_ERROR';
  statusCode: number = 500;

  constructor(msg: string) {
    super(msg);
  }
}

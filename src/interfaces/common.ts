import { IGenericErrorMessage } from './error';

export type IGenericErrorResponse = {
  status: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

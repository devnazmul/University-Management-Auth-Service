import mongoose from 'mongoose';
import { IGenericErrorResponse } from '../interfaces/common';
import { IGenericErrorMessage } from '../interfaces/error';

export const handleValidationError = (
  error: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const statusCode = 400;

  const errors: IGenericErrorMessage[] = Object.values(error?.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el.path,
        message: el.message,
      };
    }
  );
  // console.log({ ValidationError: error })
  return {
    status: statusCode,
    message: error?.name,
    errorMessages: errors,
  };
};

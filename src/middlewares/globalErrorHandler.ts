import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import ApiError from '../errorHandlers/ApiError';
import { handleValidationError } from '../errorHandlers/handleValidationError';
import handleZodError from '../errorHandlers/handleZodError';
import { IGenericErrorMessage } from '../interfaces/error';
import { errroLogger } from '../shared/logger';

const globalErrorHandler: ErrorRequestHandler = async (
  error,
  req,
  res,
  next
) => {
  let status = 500;
  let message = 'Something went wrong!';
  let errors: IGenericErrorMessage[] = [];

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);

    status = simplifiedError?.status;
    message = simplifiedError?.message;
    errors = simplifiedError?.errorMessages;
  } else if (error instanceof ApiError) {
    status = error.status;
    message = error.message;
    errors = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);

    status = simplifiedError?.status;
    message = simplifiedError?.message;
    errors = simplifiedError?.errorMessages;
  } else if (error instanceof Error) {
    message = error?.name;
    errors = error?.message ? [{ path: '', message: error?.message }] : [];
  }
  if (config.ENV !== 'production') {
    errroLogger.error({
      success: false,
      status,
      message,
      errors,
      stack: error?.stack,
    });
  }

  res.status(status).json({
    success: false,
    status,
    message,
    errors,
    stack: config.ENV !== 'production' ? error?.stack : undefined,
  });
  next();
};

export default globalErrorHandler;

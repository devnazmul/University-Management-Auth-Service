import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorResponse } from '../interfaces/common';
import { IGenericErrorMessage } from '../interfaces/error';
const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const status = 422;
  const errors: IGenericErrorMessage[] = error?.issues.map(
    (issue: ZodIssue) => ({
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    })
  );

  return {
    status,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handleZodError;

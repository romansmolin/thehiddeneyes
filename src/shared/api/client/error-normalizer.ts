import { AxiosError } from 'axios';
import { ErrorCode } from '../../errors/error-codes';

export interface NormalizedError {
  code: ErrorCode;
  message: string;
  fields?: Array<{ field: string; message: string }>;
}

export function normalizeError(error: unknown): NormalizedError {
  if (error instanceof AxiosError) {
    const data = error.response?.data;

    if (data?.error) {
      return {
        code: data.error.code || ErrorCode.INTERNAL_ERROR,
        message: data.error.message || 'An error occurred',
        fields: data.error.fields,
      };
    }

    return {
      code: ErrorCode.INTERNAL_ERROR,
      message: error.message || 'Network error occurred',
    };
  }

  if (error instanceof Error) {
    return {
      code: ErrorCode.INTERNAL_ERROR,
      message: error.message,
    };
  }

  return {
    code: ErrorCode.INTERNAL_ERROR,
    message: 'An unexpected error occurred',
  };
}

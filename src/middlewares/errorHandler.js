import { HttpError } from '../utils/HttpError.js';

export default function errorHandler(err, req, res, next) {
  if (!(err instanceof HttpError)) {
    err = new HttpError(500, err.message || 'Something went wrong');
  }

  res.status(err.status).json({
    status: err.status,
    message: err.message,
    data: err.data || null,
  });
}

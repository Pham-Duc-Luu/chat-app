import { Request, Response, NextFunction } from 'express';

export default function delayMiddleware(options: { delay: number }) {
  const delay = options.delay || 0; // default delay is 0 if not provided

  return function (req: Request, res: Response, next: NextFunction) {
    setTimeout(() => {
      next();
    }, delay);
  };
}

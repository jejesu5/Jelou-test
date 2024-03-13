import { HttpStatus, HttpException } from '@nestjs/common';

export abstract class BaseController {
  async execute(asyncFunction: () => Promise<any>) {
    try {
      const result = await asyncFunction();
      return this.ok('done', result);
    } catch (err) {
      console.log('[caught error]', {
        message: err.toString(),
        error: err,
      });
      if (err instanceof HttpException) {
        throw new HttpException(err.message, err.getStatus(), {
          cause: err,
        });
      }
      throw new HttpException(
        err.message,
        err.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: err,
        },
      );
    }
  }

  ok(message, result?) {
    return {
      statusCode: HttpStatus.OK,
      message,
      result,
    };
  }
}

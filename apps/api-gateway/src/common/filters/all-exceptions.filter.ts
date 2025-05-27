import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus ? exception.getStatus() : 500;
        response.status(status).json({
            statusCode: status,
            code: exception.code || status,
            args: exception.args,
            data: (exception.response ?? {}).data ? (exception.response ?? {}).data : null,
            message: Array.isArray(exception.response.message)
                ? exception.response.message[0]
                : exception.response.message,
        });
    }
}

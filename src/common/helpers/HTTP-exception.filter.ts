/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2019/4/25
 * Time: 13:51
 *
 */

import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { loggerInfo } from '../util/log4js';
import { ExtendableError } from './forbidden.exception';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: ExtendableError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        let name = request.url.split('/')[1];
        if (name) {
            loggerInfo(name, request, exception);
        }
        console.log(exception);
        if (exception.name === 'JsonWebTokenError' || exception.name === 'TokenExpiredError') {
            exception.status = 4003;
        }
        if (exception.name === 'BadRequestException') {
            exception.status = 4000;
        }
        if (exception.name === 'NotFoundException') {
            exception.status = 4004;
        }
        response.status(200).json({
            code: exception.status || 5000,
            error: exception.message,
            timestamp: new Date().toISOString(),
            path: request.url
        });
    }
}

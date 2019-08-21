/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2019/4/25
 * Time: 11:14
 *
 */

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
    public use(req: Request, res: Response, next: Function) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, x-access-token,Content-Type');
        res.header('Content-Type', 'application/json;charset=utf-8');
        const method = req.method;
        // OPTIONS请求直接返回成功
        if (method == 'OPTIONS') {
            res.status(200).send('{"res": "options ok"}');
            return;
        }
        next();
    }
}

/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2019/4/25
 * Time: 15:59
 *
 */

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '../config/config.service';
import { authorizationError } from '../helpers/forbidden.exception';

const config = ConfigService.init();

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<any> {
        const req = context.switchToHttp().getRequest();
        const token = req.body.token || req.query.token || req.headers['access-token'] || req.headers.refreshToken;
        if (!token) {
            throw new authorizationError('token 为null', 2002);
        }
        const decoded = await jwt.verify(token, config.jwtSecret);
        if (!decoded || !decoded.user) {
            throw new authorizationError('invalid user_id', 2002);
        }
        if (decoded.status == '0') {
            throw new authorizationError('用户邮箱未验证', 2002);
        }
        return true;
    }
}

export const tokenVerify = async function(token) {
    if (!token) {
        throw new authorizationError('token 为null', 2002);
    }
    const data = await jwt.verify(token, config.jwtSecret);
    if (!data) {
        throw new authorizationError('token无效', 2002);
    }
    return data.userid;
};

export const getClientIp = req => {
    return (
        req.headers['x-forwarded-for'] ||
        req.headers['x-real-ip'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress
    );
};

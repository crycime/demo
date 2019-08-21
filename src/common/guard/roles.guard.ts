/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2019/4/25
 * Time: 16:07
 *
 */

import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        request.user = { testEnvironment: '测试自定义装饰器' };
        if (!roles) {
            return true;
        }
        const user = request.user;
        const hasRole = () => user.roles.some(role => roles.includes(role));
        // return user && user.roles && hasRole();

        return true;
    }
}

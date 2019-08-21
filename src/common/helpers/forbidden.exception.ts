/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2019/4/25
 * Time: 11:37
 *
 */

/*
BadRequestException    错误的请求异常
UnauthorizedException  未经授权的例外
NotFoundException      未找到异常
ForbiddenException     禁止的例外
NotAcceptableException  不可接受表异常
RequestTimeoutException 请求超时异常
ConflictException        冲突例外
GoneException           消失的例外
PayloadTooLargeException  负载过大异常
UnsupportedMediaTypeException   不支持的媒体类型异常
UnprocessableEntityException    无法处理的实体异常
InternalServerErrorException    内部服务器错误异常
NotImplementedException         未实现异常
BadGatewayException             错误的网关异常
ServiceUnavailableException     服务不可用异常
GatewayTimeoutException         网关超时异常
* */

export class ExtendableError extends Error {
    status: number;
    isPublic: boolean;

    constructor(message: string, status: number = 500) {
        super(message);
        this.status = status;
        this.isPublic = true;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class ServiceApiError extends ExtendableError {
    constructor(message, status?) {
        super(message, status);
    }
}

export class BadRequestException extends ExtendableError {
    constructor(message, status?) {
        super(message, status);
    }
}

export class DBError extends ExtendableError {
    constructor(message, status?) {
        super(message, status);
    }
}

export class authorizationError extends ExtendableError {
    constructor(message, status?) {
        super(message, status);
    }
}

export class NotFoundException extends ExtendableError {
    constructor(message, status?) {
        super(message, status);
    }
}

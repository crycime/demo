/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2019/4/25
 * Time: 17:17
 *
 */

import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((data, req) => {
    return req.api_user;
});

/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2019/8/19
 * Time: 20:59
 *
 */

import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import BaseDto from '../../common/base.dto';
import { USER_REPOSITORY } from '../../common/constants/entity.constant';
import { DBError } from '../../common/helpers/forbidden.exception';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserDto extends BaseDto<User> {
    constructor(@Inject(USER_REPOSITORY) private readonly userModel: Model<User>) {
        super(userModel);
    }
}

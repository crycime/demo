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
import { ELECTOR_REPOSITORY } from '../../common/constants/entity.constant';
import { Elector } from './interfaces/elector.interface';

@Injectable()
export class ElectorDto extends BaseDto<Elector> {
    constructor(@Inject(ELECTOR_REPOSITORY) private readonly Model: Model<Elector>) {
        super(Model);
    }
}

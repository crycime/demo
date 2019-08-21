/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2019/4/25
 * Time: 14:25
 *
 */

import * as Joi from 'joi';
import undefsafe from 'undefsafe';
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { BadRequestException } from '../helpers/forbidden.exception';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
    constructor(private readonly schema: Object) {}

    transform(value: any, metadata: ArgumentMetadata) {
        if (['body', 'query', 'param'].indexOf(metadata.type) > -1) {
            const { error } = Joi.validate(value, this.schema, { allowUnknown: true, abortEarly: true });
            if (error) {
                throw new BadRequestException(undefsafe(error, 'details.0.message'), 5555);
            }
        }
        return value;
    }
}

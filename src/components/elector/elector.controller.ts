/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2019/8/19
 * Time: 20:58
 *
 */

import { Controller, Post, Delete, Body, UsePipes, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guard/auth.guard';
import { JoiValidationPipe } from '../../common/validata/JoiValidation.pipe';
import * as Joi from 'joi';
import { ElectorService } from './elector.service';
import { Elector } from './interfaces/elector.interface';

@Controller('/elector')
export class ElectorController {
    constructor(private readonly service: ElectorService) {}

    @UseGuards(AuthGuard)
    @UsePipes(
        new JoiValidationPipe({
            name: Joi.string().required(),
            campaign: Joi.string().required()
        })
    )
    @Post()
    async addElector(@Body() elector: Elector) {
        return await this.service.addElector(elector);
    }

    @UseGuards(AuthGuard)
    @Delete('/:electorId')
    async deleteElector(@Param('electorId') electorId: string) {
        return await this.service.deleteElector(electorId);
    }
}
